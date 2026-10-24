# Painel do Gestor Comercial — Borges Macedo Advocacia

Painel único de gestão comercial. Reúne num só lugar as planilhas que medem a
operação, da entrada do lead ao honorário assinado — e, com a DRE, até o lucro.

**https://borgesmacedoadvocacia.github.io/CEO**

Acesso por login e senha. Com o proxy publicado (ver *Segurança*), a senha é
conferida no servidor e as planilhas ficam privadas.

---

## As telas

**Comando**

| Tela | O que responde |
|---|---|
| **Painel semanal** | Os cinco indicadores de cada área, quinze no total — e quais pedem diagnóstico |
| **Visão Geral** | Ritmo do mês contra a meta, evolução e onde o resultado se forma |
| **KPIs do comercial** | Realizado (MTD), meta proporcional, projeção do mês e quanto falta por dia |

**Áreas** — cada uma com os indicadores principais em evidência e o diagnóstico do especialista abaixo

| Tela | O que responde |
|---|---|
| **Comercial** | Pré-qualificação e fechamento, com o corte Meta Ads × orgânico onde ele existe |
| **Tráfego Meta Ads** | Investimento → lead → reunião → cliente, por campanha e por criativo |
| **Marketing** | Audiência, conteúdo, marca e a demanda que chega sem verba |

**Funil comercial**

| Tela | O que responde |
|---|---|
| **Funil e pré-qualificação** | Do lead ao cliente etapa a etapa, com avanço, perda e origem por campanha |
| **Negociação** | Esteira de proposta e follow up: o que está em aberto, o que esfriou, por que se perde |
| **Vendas e receita** | Fechamentos, honorários, ticket, prazo e evolução |
| **Fluxo de clientes** | Quem assina, por onde chega e quem fecha — por canal, pagamento, produto, PJ×PF, closer e SDR |

**Gestão**

| Tela | O que responde |
|---|---|
| **Financeiro e CAC** | Custo real do comercial, CAC, margem por cliente e estrutura de custo |
| **Equipe** | Desempenho por closer e por SDR |
| **Metas e OKRs** | Metas do mês, plano de ação e acumulado do ano |
| **Fontes e dados** | De onde vem cada número, o que falhou e por qual transporte |

As telas de funil e gestão respeitam os filtros da barra de cima: período,
produto jurídico, closer, SDR, origem e busca livre. As tabelas ordenam por
qualquer coluna e exportam o recorte inteiro em CSV. Abaixo de 640px cada
linha de tabela vira um cartão.

As telas de **indicador** (Painel semanal e as três áreas) têm escopo próprio:
um seletor de **mês**, porque meta é mensal — não existe meta de "últimos 6
meses". Na tela de Tráfego os dois escopos convivem, e a tela diz onde um
termina e o outro começa.

## Os indicadores

São mais de 120 indicadores, em três áreas. Nenhuma operação acompanha todos
toda semana, então o painel segue a regra do próprio gestor:

- **Painel semanal**: os cinco primeiros de cada área, quinze no total.
- **Diagnóstico**: o resto, aberto quando um dos quinze acende.

Cada indicador principal traz o quadro das quatro leituras — elas respondem
coisas diferentes e vivem sendo confundidas:

| Linha | O que é |
|---|---|
| **Realizado** | O número grande: o que já entrou no mês |
| **Realizado × meta proporcional** | A razão entre os dois, com cor e ícone. É a única linha colorida |
| **Meta proporcional (Nd)** | O que *deveria* estar entregue a esta altura do mês |
| **Meta mensal** | A meta cheia |
| **Projeção (mês)** | Onde o mês termina se o ritmo de hoje continuar |

Em indicador que **acumula** (leads, clientes, faturamento), projetar é dividir
o realizado pela fração do mês já corrida. Em **taxa, ticket ou custo** não se
projeta assim: numerador e denominador crescem juntos, e a razão de hoje já é a
estimativa do mês.

Em indicador **invertido** (CAC, custo por lead, no-show) a meta é um teto, e o
quadro escreve "Limite mensal" em vez de "Meta mensal": acima de 100% significa
que o realizado está *dentro* do limite.

### Indicador sem fonte não é zero

Um indicador que nenhuma planilha alimenta aparece com **borda tracejada**,
travessão no lugar do número e, no pé do cartão, exatamente o que falta para ele
existir — a coluna, o campo do coletor ou a aba. Inventar um número ali seria
pior que a lacuna: o gestor decidiria sobre ele sem saber.

Hoje são 29 indicadores assim em Marketing, 12 em Tráfego e 10 no Comercial. A
maioria tem conserto conhecido e está escrito no próprio cartão.

### A aba `KPIS Marketing`

Audiência, conteúdo e social seller não existem em nenhuma das oito planilhas:
esses números hoje só vivem dentro do Instagram. Para o painel passar a lê-los,
basta criar na planilha **Metas e Resultados [NOVA]** uma aba `KPIS Marketing`
no **mesmo formato** das abas `KPIS <mês>` (cabeçalho na linha 5: Responsável ·
Resultados Chaves · Meta Mensal · Meta Proporcional · Resultado do Mês). Cada
indicador é um Resultado Chave com o nome que o cartão mostra — *Novos
Seguidores*, *Visitas ao Perfil*, *Conteúdo Publicado*, *Cliques no Link da
Bio*, *Cliques no WhatsApp*, *Conversas do Social Seller*, e assim por diante.

Nada muda no painel: a aba acende a tela sozinha.

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
- **Duas contagens de lead não são o mesmo lead.** O Meta conta por plataforma
  (cada formulário, conversa e evento de pixel) e o CRM conta lead criado. O
  painel mostra os dois lado a lado e avisa quando o primeiro passa o segundo;
  os indicadores de custo usam o número do CRM quando ele existe.
- **Fechamento se conta pela data do fechamento**, não pela data da reunião.
  Pelo mês da reunião, out/26 mostrava 3 fechamentos enquanto a planilha de
  clientes registrava 26 — os outros 23 foram reuniões de meses anteriores.
- **O degrau da esteira é lido do próprio follow up.** O FUP mais alto marcado
  *Feito* é onde a venda aconteceu: 1 = oferta de 24h, 7 = D21 Buckner,
  8 = D28 honorários em liminar, 9 = D45 apenas êxito. Quando *Tipo de Contrato
  (Honorários)* está preenchido, ele manda — diz a oferta que fechou.
- **Alcance somado é um teto, não gente única.** A Meta dá alcance único por
  campanha; somar campanhas conta duas vezes quem viu as duas. Por isso a
  frequência é a média das frequências por campanha, ponderada por impressão.
- **Colunas vazias viram cobertura, não lacuna.** *Desfecho da reunião*,
  *Desconto extra autorizado*, *Data do aceite* e *Data do pagamento* já
  existem na planilha e o painel já as lê: o indicador mostra 0% de
  preenchimento e acende sozinho quando o time começar a preencher.

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

> **Armadilha do gviz, e ela é séria.** Quando o nome da aba pedida não existe,
> o Google **não devolve erro**: devolve a *primeira* aba da planilha. Como
> todas as abas `KPIS <mês>` têm o mesmo cabeçalho, o painel receberia setembro
> inteiro achando que é outubro, e nada na tela denunciaria isso. Por isso a
> leitura se confirma pelo conteúdo: o título da planilha carrega o mês
> (`… | COMERCIAL | OUTUBRO 2026`) e a aba é recusada se nomear outro mês; a
> `KPIS Marketing` é confirmada pelos próprios Resultados Chaves. Pelo proxy o
> problema não existe — o Apps Script erra quando a aba não está lá.
