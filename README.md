# Painel do Gestor Comercial — Borges Macedo Advocacia

Painel único de gestão comercial. Reúne num só lugar as planilhas que medem a
operação, da entrada do lead ao honorário assinado.

**https://borgesmacedoadvocacia.github.io/CEO**

Acesso restrito por login e senha. Sem a credencial, a página não sabe quais
planilhas ler (ver *Segurança*).

---

## O que ele mostra

| Tela | O que responde |
|---|---|
| **Visão Geral** | Ritmo do mês contra a meta, evolução dos últimos meses e onde o resultado se forma |
| **Funil e pré-qualificação** | Do lead ao cliente, etapa por etapa, real x projetado |
| **Negociação** | Esteira de proposta e follow up: o que está em aberto, o que esfriou, por que se perde |
| **Vendas e receita** | Fechamentos, honorários, ticket, forma de pagamento e prazo |
| **Tráfego Meta Ads** | Investimento, CPL, campanhas e retorno sobre mídia |
| **Equipe** | Desempenho por closer e por SDR |
| **Metas e OKRs** | Metas do mês, plano de ação e acumulado do ano |
| **Fontes e dados** | De onde vem cada número e o que falhou na leitura |

Todas as telas respeitam os mesmos filtros: período, produto jurídico, closer,
SDR, origem e busca livre. As tabelas ordenam por qualquer coluna e exportam o
recorte inteiro em CSV.

## Fontes

| Planilha | Aba | Alimenta |
|---|---|---|
| Fluxo de Atendimentos [NOVA] | `Fluxo de Atendimentos` | Reuniões, proposta, esteira de FUP |
| FLUXO DE CLIENTES [2026] | `DADOS` | Fechamentos, honorários, ticket |
| Metas e Resultados - Comercial [NOVA] | `KPIS <mês>`, `OKRS`, `Produtos Jurídicos - <mês>` | Metas, plano de ação, funil de produto |
| Campanhas Meta Ads | `Insights diários`, `Campanhas`, `Reuniões` | Investimento, CPL, campanhas |
| Leads Kommo [DASHBOARDS] | `Leads` | Pré-qualificação lead a lead |
| Metas e Resultados - Comercial (antiga) | `Produtos Jurídicos [Acumulado <ano>]` | Base histórica do ano |

Leitura pelo endpoint `gviz` das próprias planilhas — **sem chave de API e sem
servidor**. O navegador lê e calcula tudo na hora; cada fonte cai de pé sozinha,
e uma planilha fora do ar aparece como lacuna declarada em *Fontes e dados*, não
como zero silencioso.

Releitura automática a cada 10 minutos enquanto a aba está à vista.

## Decisões que valem saber

- **CPF/CNPJ não é lido.** A coluna existe na planilha de clientes e não serve a
  nenhuma decisão comercial, então não trafega para o painel.
- **Metas são por responsável.** Na planilha, `Clientes` e `Honorários Iniciais`
  estão lançados no bloco do closer, não do time. O número grande do cartão é do
  time; a barra de ritmo recorta o realizado no mesmo escopo do KR e diz de quem
  é a meta — senão compararia 26 fechamentos do time com a meta de uma pessoa.
- **Honorário condicionado a liminar entra como R$ 0** na planilha (política
  D28). São vendas com honorário condicionado, não vendas sem valor: por isso o
  ticket médio aparece nas duas leituras, com e sem esses fechamentos.
- **Origens de lead não se encadeiam.** Orgânico, Kommo e Meta Ads são paralelos;
  entram somados no topo do funil, e a cadeia de conversão começa na triagem.
- **Taxa de ganho exclui quem não respondeu.** Ganhos sobre ganhos + perdidos —
  quem está sem resposta ainda não decidiu.
- **Nunca dois eixos Y.** Duas medidas de escalas diferentes viram dois gráficos.
- **Paleta de dados validada** para daltonismo e contraste sobre a superfície
  escura (pior par adjacente ΔE 8,4; todas as séries ≥ 3:1).

## Segurança

O que o login garante:

- A página só mostra número depois de abrir o cofre com login + senha. Os IDs das
  planilhas estão cifrados em **AES-256-GCM**, com chave derivada por
  **PBKDF2-SHA256 (310 mil iterações)**. Senha errada = nada decifra.
- A sessão vive na aba (`sessionStorage`), morre ao fechar e expira sozinha após
  **30 minutos** sem uso. A **senha nunca é guardada**.
- Cinco tentativas erradas travam o formulário por 30 segundos.
- `Content-Security-Policy` restringe a saída de dados: a página só fala com
  `docs.google.com`. Sem CDN, sem rastreador, sem outro destino.
- A página se recusa a renderizar dentro de iframe de terceiro.
- Sair limpa a sessão, os IDs da memória e os dados já carregados.

O que ele **não** garante — e precisa de decisão fora do código:

- **As planilhas de origem estão compartilhadas como "qualquer pessoa com o
  link".** Quem tiver o ID de uma delas lê os dados direto no Google, sem passar
  por este painel. O login protege a *descoberta*, não os dados na origem.
- O site do GitHub Pages é público por natureza em conta pessoal (controle de
  acesso em Pages é recurso de GitHub Enterprise Cloud). Qualquer pessoa com a
  URL chega à tela de login — e para nela.

## Manutenção

Arquivo único (`index.html`), sem dependência externa e sem build. As colunas são
achadas pelo **nome** do cabeçalho, com apelidos: renomear ou mover uma coluna não
troca o significado das outras, e o que não for encontrado aparece em
*Fontes e dados* em vez de virar zero.

As abas mensais (`KPIS Outubro`, `Produtos Jurídicos - Out/2026`) são montadas a
partir da data de hoje: o painel vira o mês sozinho.
