# Painel do Gestor Comercial — Borges Macedo Advocacia

Painel único de gestão comercial. Reúne num só lugar as planilhas que medem a
operação, da entrada do lead ao honorário assinado — e, com a DRE, até o lucro.

**https://borgesmacedoadvocacia.github.io/CEO**

Acesso por login e senha. Com o proxy publicado (ver *Segurança*), a senha é
conferida no servidor e as planilhas ficam privadas.

---

## As telas

| Tela | O que responde |
|---|---|
| **Visão Geral** | Ritmo do mês contra a meta, evolução e onde o resultado se forma |
| **KPIs do comercial** | Realizado (MTD), meta proporcional, projeção do mês e quanto falta por dia |
| **Funil e pré-qualificação** | Do lead ao cliente etapa a etapa, com avanço, perda e origem por campanha |
| **Negociação** | Esteira de proposta e follow up: o que está em aberto, o que esfriou, por que se perde |
| **Vendas e receita** | Fechamentos, honorários, ticket, prazo e evolução |
| **Fluxo de clientes** | Quem assina, por onde chega e quem fecha — por canal, pagamento, produto, PJ×PF, closer e SDR |
| **Tráfego Meta Ads** | Investimento → lead → reunião → cliente por campanha, criativo e pontos de atenção |
| **Financeiro e CAC** | Custo real do comercial, CAC, margem por cliente e estrutura de custo |
| **Equipe** | Desempenho por closer e por SDR |
| **Metas e OKRs** | Metas do mês, plano de ação e acumulado do ano |
| **Fontes e dados** | De onde vem cada número, o que falhou e por qual transporte |

Todas respeitam os mesmos filtros: período, produto jurídico, closer, SDR,
origem e busca livre. As tabelas ordenam por qualquer coluna e exportam o
recorte inteiro em CSV. Abaixo de 640px cada linha de tabela vira um cartão.

## Fontes

| Planilha | Aba | Alimenta |
|---|---|---|
| Fluxo de Atendimentos [NOVA] | `Fluxo de Atendimentos` | Reuniões, proposta, esteira de FUP |
| FLUXO DE CLIENTES [2026] | `DADOS` | Fechamentos, honorários, ticket |
| Metas e Resultados [NOVA] | `KPIS <mês>`, `OKRS`, `Produtos Jurídicos - <mês>` | Metas, plano de ação, funil de produto |
| Campanhas Meta Ads | `Insights diários`, `Campanhas`, `Reuniões`, `Anúncios`, `Janelas` | Investimento, CPL, campanha, criativo |
| FLUXO FINANCEIRO 2026 | `DRE COMERCIAL` | Custo real do comercial, CAC, margem |
| Leads Kommo [DASHBOARDS] | `Leads` | Pré-qualificação lead a lead |
| TODOS OS LEADS [CÉREBRO COMERCIAL] | `TODOS OS LEADS` | Jornada do lead, histórico 2025+2026 |
| Metas e Resultados (antiga) | `Produtos Jurídicos [Acumulado <ano>]` | Base histórica do ano |

Não há banco de dados: o painel lê e calcula na hora. Cada fonte cai de pé
sozinha — uma planilha fora do ar aparece como lacuna declarada em *Fontes e
dados*, não como zero silencioso. Releitura automática a cada 10 minutos.

## Decisões que valem saber

- **CPF/CNPJ não trafega.** Com o proxy, o servidor conta os dígitos e devolve
  só `PJ` ou `PF`: a classificação serve à gestão, o identificador não.
- **Ticket médio conta só quem teve honorário inicial.** Fechamento com
  honorário condicionado a liminar entra como R$ 0 (política D28): é venda, mas
  não é preço. Com os zeros no divisor, out/26 dava R$ 888 em vez de R$ 2.565.
  A contagem de clientes segue contando todos.
- **Metas são por responsável.** Na planilha, `Clientes` e `Honorários` estão
  no bloco do closer, não do time. O número grande é do time; a barra de ritmo
  recorta o realizado no mesmo escopo do KR e diz de quem é a meta.
- **Origens de lead não se encadeiam.** Orgânico, Kommo e Meta Ads são
  paralelos: entram somados no topo, e a conversão começa na triagem.
- **Avanço ≠ acumulado.** Avanço é sobre a etapa anterior; acumulado é sobre o
  topo. São taxas diferentes e o painel mostra as duas.
- **Antes de acusar, medir se dá para acusar.** O painel calcula a cobertura da
  atribuição e suspende os alertas de conversão por campanha quando a coluna
  Campanha está vazia na maioria das reuniões — campanha com zero reunião pode
  só não ter sido anotada.
- **Caixa ≠ competência.** A DRE é de caixa, a planilha de clientes é de
  competência. O painel mostra os dois e a diferença, em vez de escolher um.
- **Taxa de ganho exclui quem não respondeu.** Ganhos sobre ganhos + perdidos.
- **Nunca dois eixos Y.** Duas medidas de escalas diferentes viram dois gráficos.
- **Paleta de dados validada** para daltonismo e contraste sobre a superfície
  escura (pior par adjacente ΔE 8,4; todas as séries ≥ 3:1).

## Segurança

**Com o proxy publicado** (`apps-script/`, instruções em `apps-script/LEIA-ME.md`):

- As planilhas ficam **privadas**. O web app roda com a conta dona delas.
- A senha é conferida **no servidor**: o navegador deriva PBKDF2-SHA256
  (310 mil iterações) do login + senha e envia só o resultado. A senha nunca
  trafega e nunca é guardada.
- Os IDs das planilhas ficam nas Propriedades do Script, **não no repositório**.
- CPF/CNPJ é recortado no servidor.
- 8 tentativas erradas travam por 10 minutos. Nenhuma função grava.

**Sem o proxy**, o painel lê as planilhas direto do navegador. Isso só funciona
com planilha compartilhada por link — ou seja, **quem tiver o ID lê sem senha**.
A tela *Fontes e dados* mostra, linha por linha, qual transporte está em uso.

Em qualquer modo: sessão por aba com expiração em 30 minutos, `Content-Security-Policy`
limitando a saída de dados, e recusa de execução dentro de iframe.

> O site do GitHub Pages é público por natureza em conta pessoal — controle de
> acesso em Pages é recurso de Enterprise Cloud. Qualquer pessoa com a URL chega
> à tela de login, e para nela.

## Manutenção

Arquivo único (`index.html`), sem dependência externa e sem build. As colunas
são achadas pelo **nome** do cabeçalho, com apelidos: renomear ou mover uma
coluna não troca o significado das outras, e o que não for encontrado aparece em
*Fontes e dados* em vez de virar zero.

As abas mensais (`KPIS Outubro`, `Produtos Jurídicos - Out/2026`) são montadas a
partir da data do dia — o painel vira o mês sozinho.
