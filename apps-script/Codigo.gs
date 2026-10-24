/**
 * PAINEL DO GESTOR COMERCIAL — PROXY DE LEITURA
 * Borges Macedo Advocacia
 * ---------------------------------------------------------------------------
 * Por que este arquivo existe
 *
 * O painel é uma página estática no GitHub Pages. Página estática não guarda
 * segredo: qualquer senha conferida no navegador pode ser contornada lendo o
 * código. Enquanto as planilhas estavam compartilhadas como "qualquer pessoa
 * com o link", a senha protegia a DESCOBERTA, não os dados — quem tivesse o ID
 * de uma planilha lia tudo direto no Google.
 *
 * Este web app resolve isso. Publicado como "executar como EU" e "acesso:
 * qualquer pessoa", ele roda com a permissão do dono das planilhas. Então:
 *
 *   • as planilhas voltam a ser PRIVADAS (sem compartilhamento por link);
 *   • a senha é conferida AQUI, no servidor, e não no navegador;
 *   • os IDs das planilhas ficam nas Propriedades do Script, nunca no
 *     repositório público;
 *   • a especificação de colunas é deste lado: CPF/CNPJ não é lido nem
 *     devolvido, em nenhuma hipótese;
 *   • tentativa errada é contada e bloqueada por janela de tempo.
 *
 * O que ele NÃO faz: escrever. Só leitura. Nenhuma função aqui grava, apaga ou
 * altera qualquer planilha.
 *
 * Publicação: veja LEIA-ME.md nesta mesma pasta.
 */

/* ===========================================================================
   AUTENTICAÇÃO
   O navegador deriva PBKDF2-SHA256(login + "\n" + senha, sal fixo, 310 mil) e
   envia só o resultado. A senha nunca trafega. Aqui comparamos o SHA-256 desse
   resultado com o hash guardado nas Propriedades do Script — nem o hash
   guardado permite voltar à senha.
   =========================================================================== */

/** Comparação em tempo constante: não vaza quantos caracteres bateram. */
function _igual(a, b) {
  a = String(a || '');
  b = String(b || '');
  if (a.length !== b.length) return false;
  var dif = 0;
  for (var i = 0; i < a.length; i++) dif |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return dif === 0;
}

function _sha256(txt) {
  return Utilities.base64Encode(
    Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(txt), Utilities.Charset.UTF_8));
}

var MAX_ERROS = 8;        // tentativas erradas por janela
var JANELA_SEG = 600;     // 10 minutos

function _bloqueado() {
  var c = CacheService.getScriptCache();
  var n = Number(c.get('erros') || 0);
  return n >= MAX_ERROS;
}

function _contarErro() {
  var c = CacheService.getScriptCache();
  var n = Number(c.get('erros') || 0) + 1;
  c.put('erros', String(n), JANELA_SEG);
}

function _autorizado(token) {
  var esperado = PropertiesService.getScriptProperties().getProperty('SENHA_HASH');
  if (!esperado) throw new Error('SENHA_HASH nao configurada nas Propriedades do Script');
  if (!token) return false;
  return _igual(_sha256(token), esperado);
}

/* ===========================================================================
   DE ONDE VEM CADA COISA
   Os IDs ficam nas Propriedades do Script (SHEET_atend, SHEET_clientes, ...),
   não aqui. Assim este arquivo pode viver no repositório público sem revelar
   qual planilha é qual.
   =========================================================================== */
function _idDe(chave) {
  var id = PropertiesService.getScriptProperties().getProperty('SHEET_' + chave);
  if (!id) throw new Error('SHEET_' + chave + ' nao configurado nas Propriedades do Script');
  return id;
}

var MESES_PT = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho',
                'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
var MESES_ABREV = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

function _semAcento(s) {
  return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '');
}

/** Nomes de aba que variam com o calendário, resolvidos no servidor. */
function _abasDoMes(base, deslocamento, formato) {
  var hoje = new Date();
  var i = hoje.getMonth() + (deslocamento || 0);
  var ano = hoje.getFullYear();
  while (i < 0) { i += 12; ano -= 1; }
  while (i > 11) { i -= 12; ano += 1; }
  var nomes = [];
  if (formato === 'abrev') {
    nomes.push(base + MESES_ABREV[i] + '/' + ano);
  } else {
    nomes.push(base + MESES_PT[i]);
    nomes.push(base + _semAcento(MESES_PT[i]));
  }
  return nomes;
}

/**
 * ESPECIFICAÇÃO DAS FONTES
 *   sheet   — chave do ID nas Propriedades do Script
 *   abas    — nomes aceitos, em ordem de tentativa (acento costuma variar)
 *   cabec   — linha do cabeçalho (1 = primeira). Abas em matriz têm título em
 *             cima, por isso 2 ou 5.
 *   colunas — índices 1-based devolvidos. null = todas.
 *             É AQUI que CPF/CNPJ fica de fora.
 *   limite  — teto de linhas, para a resposta não estourar.
 */
function _fontes() {
  return {
    atend: {
      sheet: 'atend', abas: ['Fluxo de Atendimentos'], cabec: 1, colunas: null
    },
    clientes: {
      /* A planilha tem CPF/CNPJ na coluna R (18). Paramos em Q (17). */
      sheet: 'clientes', abas: ['DADOS'], cabec: 1,
      colunas: _ate(17)
    },
    metaDia: {
      /* Fora a coluna "Ações (JSON)", que é 85% do peso da aba. */
      sheet: 'meta', abas: ['Insights diários', 'Insights diarios'], cabec: 1,
      colunas: _ate(14)
    },
    metaCamp: { sheet: 'meta', abas: ['Campanhas'], cabec: 1, colunas: null },
    metaReun: { sheet: 'meta', abas: ['Reuniões', 'Reunioes'], cabec: 1, colunas: null },

    kpisAtual:    { sheet: 'metas', abas: _abasDoMes('KPIS ', 0), cabec: 5, colunas: null },
    kpisAnterior: { sheet: 'metas', abas: _abasDoMes('KPIS ', -1), cabec: 5, colunas: null },
    prodAtual:    { sheet: 'metas', abas: _abasDoMes('Produtos Jurídicos - ', 0, 'abrev')
                                      .concat(_abasDoMes('Produtos Juridicos - ', 0, 'abrev')), cabec: 2, colunas: null },
    prodAnterior: { sheet: 'metas', abas: _abasDoMes('Produtos Jurídicos - ', -1, 'abrev')
                                      .concat(_abasDoMes('Produtos Juridicos - ', -1, 'abrev')), cabec: 2, colunas: null },
    okrs:         { sheet: 'metas', abas: ['OKRS'], cabec: 4, colunas: null },

    hist: {
      sheet: 'antiga',
      abas: ['Produtos Jurídicos [Acumulado ' + new Date().getFullYear() + ']',
             'Produtos Juridicos [Acumulado ' + new Date().getFullYear() + ']'],
      cabec: 2, colunas: null
    },

    fin: { sheet: 'financeiro', abas: ['DRE COMERCIAL'], cabec: 1, colunas: null },

    kommo: { sheet: 'kommo', abas: ['Leads'], cabec: 1, colunas: _ate(57), limite: 30000 },

    cerebro: {
      /* Espinha dorsal do Cérebro Comercial, 47 colunas padronizadas.
         Fora: E-MAIL (6), CPF/CNPJ (39) e colunas que o painel não usa. */
      sheet: 'cerebro', abas: ['TODOS OS LEADS'], cabec: 1,
      colunas: [1,2,3,4,5,8,9,10,11,12,13,14,15,16,17,18,19,22,24,25,26,29,31,32,33,34,35,42,43,47],
      limite: 30000
    },
    cerebroResumo: { sheet: 'cerebro', abas: ['RESUMO'], cabec: 1, colunas: null }
  };
}

function _ate(n) {
  var a = [];
  for (var i = 1; i <= n; i++) a.push(i);
  return a;
}

/* ===========================================================================
   LEITURA
   getDisplayValues() devolve o valor JÁ FORMATADO, igual ao que a pessoa vê na
   planilha — e, ao contrário do endpoint gviz, não devolve célula de texto
   vazia quando a coluna foi tipada como número. É por isso que o cabeçalho
   chega inteiro por aqui.
   =========================================================================== */
function _lerFonte(chave) {
  var spec = _fontes()[chave];
  if (!spec) throw new Error('fonte desconhecida: ' + chave);

  var ss = SpreadsheetApp.openById(_idDe(spec.sheet));
  var aba = null, nome = '';
  for (var i = 0; i < spec.abas.length; i++) {
    aba = ss.getSheetByName(spec.abas[i]);
    if (aba) { nome = spec.abas[i]; break; }
    aba = null;
  }
  if (!aba) throw new Error('aba nao encontrada (' + spec.abas.join(' / ') + ')');

  var ultLinha = aba.getLastRow();
  var ultCol = aba.getLastColumn();
  if (ultLinha < spec.cabec || ultCol < 1) return { aba: nome, linhas: [] };

  var primeira = spec.cabec;                       // cabeçalho entra como linha 1
  var qtd = ultLinha - primeira + 1;
  if (spec.limite && qtd > spec.limite) qtd = spec.limite;

  var valores = aba.getRange(primeira, 1, qtd, ultCol).getDisplayValues();

  /* Recorte de colunas: o que não está na lista não sai daqui. */
  if (spec.colunas) {
    var cols = spec.colunas;
    valores = valores.map(function (l) {
      var o = [];
      for (var j = 0; j < cols.length; j++) o.push(l[cols[j] - 1] == null ? '' : l[cols[j] - 1]);
      return o;
    });
  }

  /* Linha totalmente vazia não viaja. */
  valores = valores.filter(function (l) {
    for (var j = 0; j < l.length; j++) if (String(l[j]).trim() !== '') return true;
    return false;
  });

  return { aba: nome, linhas: valores };
}

/* ===========================================================================
   ENDPOINT
   POST com Content-Type text/plain de propósito: assim o navegador trata como
   requisição simples e não dispara preflight OPTIONS, que o Apps Script não
   responde.
   =========================================================================== */
function doPost(e) {
  var saida = { ok: false };
  try {
    var corpo = {};
    try { corpo = JSON.parse((e && e.postData && e.postData.contents) || '{}'); } catch (err) { corpo = {}; }

    if (_bloqueado()) {
      saida.erro = 'muitas tentativas invalidas; tente de novo em alguns minutos';
      return _json(saida);
    }
    if (!_autorizado(corpo.auth)) {
      _contarErro();
      saida.erro = 'credencial invalida';
      return _json(saida);
    }

    var pedidas = corpo.fontes;
    if (!pedidas || !pedidas.length) pedidas = Object.keys(_fontes());

    var dados = {}, erros = {};
    for (var i = 0; i < pedidas.length; i++) {
      var k = pedidas[i];
      try { dados[k] = _lerFonte(k); }
      catch (err) { erros[k] = String(err && err.message ? err.message : err); }
    }

    saida.ok = true;
    saida.dados = dados;
    saida.erros = erros;
    saida.lido_em = new Date().toISOString();
  } catch (err) {
    saida.erro = String(err && err.message ? err.message : err);
  }
  return _json(saida);
}

/** GET serve só para conferir, depois de publicar, que o endereço responde. */
function doGet() {
  return _json({ ok: true, servico: 'painel-comercial', metodo: 'use POST com {auth, fontes}' });
}

function _json(o) {
  return ContentService.createTextOutput(JSON.stringify(o))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ===========================================================================
   APOIO — rode uma vez, pelo editor, para conferir a configuração.
   Nenhuma destas funções grava em planilha.
   =========================================================================== */

/** Diz o que está configurado e o que falta, sem revelar valor nenhum. */
function conferirConfiguracao() {
  var p = PropertiesService.getScriptProperties();
  var precisa = ['SENHA_HASH', 'SHEET_atend', 'SHEET_clientes', 'SHEET_meta',
                 'SHEET_metas', 'SHEET_antiga', 'SHEET_kommo', 'SHEET_financeiro', 'SHEET_cerebro'];
  var faltando = precisa.filter(function (k) { return !p.getProperty(k); });
  var msg = faltando.length
    ? 'FALTA configurar: ' + faltando.join(', ')
    : 'Tudo configurado (' + precisa.length + ' propriedades).';
  Logger.log(msg);
  return msg;
}

/** Lê cada fonte e relata linhas e colunas — valida acesso e nomes de aba. */
function testarLeitura() {
  var fontes = Object.keys(_fontes());
  var linhas = [];
  fontes.forEach(function (k) {
    try {
      var r = _lerFonte(k);
      linhas.push(k + ': OK — aba "' + r.aba + '", ' + r.linhas.length + ' linhas, ' +
        (r.linhas[0] ? r.linhas[0].length : 0) + ' colunas');
    } catch (err) {
      linhas.push(k + ': FALHOU — ' + (err && err.message ? err.message : err));
    }
  });
  var msg = linhas.join('\n');
  Logger.log(msg);
  return msg;
}

/** Zera o bloqueio por tentativas erradas. */
function liberarTentativas() {
  CacheService.getScriptCache().remove('erros');
  Logger.log('bloqueio liberado');
}
