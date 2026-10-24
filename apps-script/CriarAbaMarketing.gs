/**
 * CRIA A ABA "KPIS Marketing" NA PLANILHA DE METAS
 * =============================================================================
 * Audiencia, conteudo e social seller nao existem em nenhuma das planilhas do
 * painel: esses numeros so vivem dentro do Instagram. Esta aba e o lugar onde
 * eles passam a existir - e o painel ja sabe le-la.
 *
 * Por que uma aba, e nao uma planilha nova: o time ja sabe preencher uma aba
 * KPIS. Mesmo formato, mesmas colunas, mesma rotina mensal.
 *
 * COMO USAR
 *   1. Abra a planilha "Metas e Resultados - Comercial [NOVA]".
 *   2. Extensoes > Apps Script.
 *   3. Cole este arquivo num script novo e salve.
 *   4. Rode a funcao  criarAbaMarketing  e autorize quando ele pedir.
 *   5. Volte a planilha: a aba "KPIS Marketing" esta la, pronta para preencher.
 *
 * Rodar de novo NAO apaga nada: se a aba ja existir, o script para e avisa.
 *
 * DEPOIS DE CRIADA
 *   Preencha "Meta Mensal" e, ao longo do mes, "Resultado do Mes". As colunas
 *   Meta Proporcional e os dois percentuais sao formula - nao precisa tocar.
 *   No painel, a tela de Marketing acende sozinha: cada Resultado Chave aqui
 *   corresponde a um indicador de la, pelo NOME. Renomear uma linha desliga o
 *   indicador dela, entao renomeie so se souber disso.
 */

/* Os nomes abaixo sao o contrato com o painel. O painel procura cada
   indicador por um pedaco do nome, ignorando acento e pontuacao. */
var KRS_MARKETING = [
  ['Audiência',      'Novos Seguidores (líquido)',                 'numero'],
  ['Audiência',      'Taxa de Crescimento de Seguidores',          'pct'],
  ['Audiência',      'Visitas ao Perfil',                          'numero'],
  ['Audiência',      'Cliques no Link da Bio',                     'numero'],
  ['Audiência',      'Cliques no WhatsApp (botão do perfil)',      'numero'],
  ['Audiência',      'Alcance Orgânico',                           'numero'],
  ['Audiência',      'Alcance de Não Seguidores (%)',              'pct'],

  ['Conteúdo',       'Conteúdo Publicado (Feed)',                  'numero'],
  ['Conteúdo',       'Volume Publicado (posts, Reels e stories)',  'numero'],
  ['Conteúdo',       'Cumprimento do Calendário (%)',              'pct'],
  ['Conteúdo',       'Taxa de Engajamento (%)',                    'pct'],
  ['Conteúdo',       'Salvamentos e Compartilhamentos',            'numero'],
  ['Conteúdo',       'Comentários',                                'numero'],
  ['Conteúdo',       'Retenção dos Reels (%)',                     'pct'],

  ['Social Seller',  'Conversas do Social Seller',                 'numero'],
  ['Social Seller',  'Interações Respondidas (%)',                 'pct'],
  ['Social Seller',  'Tempo de Resposta nas Redes (horas)',        'decimal'],
  ['Social Seller',  'Conversa em Lead (%)',                       'pct'],
  ['Social Seller',  'Leads Encaminhados à SDR',                   'numero'],

  ['Marca',          'NPS',                                        'numero'],
  ['Marca',          'Nota no Google',                             'decimal'],
  ['Marca',          'Avaliações Novas',                           'numero'],
  ['Marca',          'Menções e Marcações da BM',                  'numero'],

  ['Ética',          'Peças Revisadas pela Regra da OAB (%)',      'pct']
];

var LINHA_CABEC = 5;

function criarAbaMarketing() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (ss.getSheetByName('KPIS Marketing')) {
    SpreadsheetApp.getUi().alert(
      'A aba "KPIS Marketing" ja existe.\n\n' +
      'Para refazer do zero, renomeie ou apague a atual e rode de novo. ' +
      'O script nao sobrescreve para nao apagar o que ja foi preenchido.');
    return;
  }

  var n = KRS_MARKETING.length;
  var primeira = LINHA_CABEC + 1;                 /* 6  */
  var ultima   = LINHA_CABEC + n;                 /* 29 */
  var linhaAtualizacao = ultima + 2;              /* 31 */
  var linhaDiasMes     = ultima + 3;              /* 32 */
  var linhaDiasComp    = ultima + 4;              /* 33 */

  var aba = ss.insertSheet('KPIS Marketing', 2);
  aba.setHiddenGridlines(true);
  aba.setColumnWidth(1, 24);
  aba.setColumnWidth(2, 140);   /* Responsavel        */
  aba.setColumnWidth(3, 330);   /* Resultados Chaves  */
  aba.setColumnWidth(4, 120);
  aba.setColumnWidth(5, 140);
  aba.setColumnWidth(6, 140);
  aba.setColumnWidth(7, 210);
  aba.setColumnWidth(8, 180);

  /* ---- Titulo. O painel usa este texto para confirmar que leu a aba certa:
     o gviz devolve a PRIMEIRA aba quando o nome pedido nao existe, e sem uma
     marca no titulo nao haveria como perceber a troca. ---- */
  aba.getRange('B2:G2').merge()
     .setValue('   METAS E RESULTADOS | MARKETING | ' + new Date().getFullYear())
     .setFontSize(12).setFontWeight('bold').setVerticalAlignment('middle');
  aba.setRowHeight(2, 34);

  /* ---- Cabecalho, identico ao das abas KPIS ---- */
  var cabec = ['Responsável', 'Resultados Chaves', 'Meta Mensal', 'Meta Proporcional',
               'Resultado do Mês', 'Res. Mensal x Meta Proporcional', 'Res. Mensal x Meta Mensal'];
  aba.getRange(LINHA_CABEC, 2, 1, cabec.length).setValues([cabec])
     .setFontWeight('bold').setBackground('#bdbdbd').setVerticalAlignment('middle')
     .setWrap(true);
  aba.setRowHeight(LINHA_CABEC, 38);
  aba.setFrozenRows(LINHA_CABEC);

  /* ---- Resultados Chaves ---- */
  var grupos = KRS_MARKETING.map(function (k) { return [k[0]]; });
  var nomes  = KRS_MARKETING.map(function (k) { return [k[1]]; });
  aba.getRange(primeira, 2, n, 1).setValues(grupos).setVerticalAlignment('middle');
  aba.getRange(primeira, 3, n, 1).setValues(nomes);

  /* Uma celula por bloco, como nas abas irmas: o grupo se le de relance. */
  var ini = 0;
  for (var i = 1; i <= n; i++) {
    if (i === n || KRS_MARKETING[i][0] !== KRS_MARKETING[ini][0]) {
      if (i - ini > 1) aba.getRange(primeira + ini, 2, i - ini, 1).mergeVertically();
      ini = i;
    }
  }

  /* ---- Formulas. Meta Proporcional e os dois percentuais se mantem sozinhos.
     O IF em volta evita que uma linha ainda nao preenchida mostre 0 ou erro -
     no painel, celula vazia e "sem medicao" e zero e um numero. ---- */
  var prop = [], vsProp = [], vsMes = [];
  for (var r = primeira; r <= ultima; r++) {
    prop.push(['=IF(D' + r + '="","",D' + r + '*$H$' + linhaDiasComp + '/$H$' + linhaDiasMes + ')']);
    vsProp.push(['=IF(OR(E' + r + '="",E' + r + '=0,F' + r + '=""),"",F' + r + '/E' + r + ')']);
    vsMes.push(['=IF(OR(D' + r + '="",D' + r + '=0,F' + r + '=""),"",F' + r + '/D' + r + ')']);
  }
  aba.getRange(primeira, 5, n, 1).setFormulas(prop);
  aba.getRange(primeira, 7, n, 1).setFormulas(vsProp);
  aba.getRange(primeira, 8, n, 1).setFormulas(vsMes);

  /* ---- Formato por tipo de indicador ---- */
  for (var j = 0; j < n; j++) {
    var linha = primeira + j;
    var tipo = KRS_MARKETING[j][2];
    var fmt = tipo === 'pct' ? '0.0%' : (tipo === 'decimal' ? '0.0' : '#,##0');
    aba.getRange(linha, 4).setNumberFormat(fmt);   /* Meta Mensal       */
    aba.getRange(linha, 5).setNumberFormat(fmt);   /* Meta Proporcional */
    aba.getRange(linha, 6).setNumberFormat(fmt);   /* Resultado do Mes  */
  }
  aba.getRange(primeira, 7, n, 2).setNumberFormat('0%');
  aba.getRange(primeira, 4, n, 5).setHorizontalAlignment('center');
  aba.getRange(primeira, 2, n, 7).setVerticalAlignment('middle');
  for (var lr = primeira; lr <= ultima; lr++) aba.setRowHeight(lr, 26);

  /* Faixa zebrada, como nas abas irmas */
  aba.getRange(LINHA_CABEC, 2, n + 1, 7)
     .applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY, true, false);

  /* ---- Semaforo: a mesma regra de cor das abas KPIS ---- */
  var faixa = aba.getRange(primeira, 7, n, 2);
  var regras = [
    SpreadsheetApp.newConditionalFormatRule().whenNumberGreaterThanOrEqualTo(1)
      .setBackground('#b7e1cd').setRanges([faixa]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenNumberBetween(0.7, 0.9999)
      .setBackground('#cce5ff').setRanges([faixa]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenNumberBetween(0.0001, 0.6999)
      .setBackground('#f4cccc').setRanges([faixa]).build()
  ];
  aba.setConditionalFormatRules(regras);

  /* ---- Rodape. Dias no mes e dias computados sao formula: o calculo da meta
     proporcional vira o mes sozinho. "Ultima Atualizacao" fica em branco de
     proposito - quem preenche o resultado e quem data. ---- */
  aba.getRange(linhaAtualizacao, 7).setValue('Última Atualização').setFontWeight('bold');
  aba.getRange(linhaDiasMes, 7).setValue('Dias no Mês').setFontWeight('bold');
  aba.getRange(linhaDiasComp, 7).setValue('Dias Computados').setFontWeight('bold');
  aba.getRange(linhaDiasMes, 8).setFormula('=DAY(EOMONTH(TODAY(),0))');
  aba.getRange(linhaDiasComp, 8).setFormula('=DAY(TODAY())');
  aba.getRange(linhaAtualizacao, 8).setNumberFormat('dd/mm/yyyy');
  aba.getRange(linhaAtualizacao, 7, 3, 2).setHorizontalAlignment('center');

  /* Sobra de grade fora do uso so atrapalha a leitura. */
  var maxL = aba.getMaxRows(), maxC = aba.getMaxColumns();
  if (maxL > linhaDiasComp + 1) aba.deleteRows(linhaDiasComp + 2, maxL - linhaDiasComp - 1);
  if (maxC > 8) aba.deleteColumns(9, maxC - 8);

  SpreadsheetApp.getUi().alert(
    'Aba "KPIS Marketing" criada com ' + n + ' Resultados Chaves.\n\n' +
    'Preencha a Meta Mensal e, ao longo do mes, o Resultado do Mes. ' +
    'O resto e formula.\n\n' +
    'No painel do CEO, a tela de Marketing passa a ler esta aba na proxima ' +
    'atualizacao. Os indicadores sao achados pelo NOME do Resultado Chave: ' +
    'renomear uma linha desliga o indicador dela.');
}
