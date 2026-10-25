# Painel do Gestor Comercial — Borges Macedo Advocacia

Painel único de gestão comercial. Reúne num só lugar as planilhas que medem a
operação, da entrada do lead ao honorário assinado — e, com a DRE, até o lucro.

**https://borgesmacedoadvocacia.github.io/CEO**

Acesso por login e senha. Com o proxy publicado (ver *Segurança*), a senha é
conferida no servidor e as planilhas ficam privadas.

---

## Os módulos

Cinco itens na lateral. Dentro de cada módulo, abas — porque juntar tudo num
módulo não é o mesmo que juntar tudo numa *tela*.

| Módulo | Abas |
|---|---|
| **Painel semanal** | os 15 indicadores (5 por área) e os alertas de operação |
| **Campanhas Meta Ads** | Indicadores · Campanhas · Criativos |
| **Marketing** | tela única: audiência, conteúdo, marca e demanda sem verba |
| **Funil de Pré-Qualificação** | Indicadores · Funil do produto · Leads do CRM |
| **Negociação e Fechamento** | Indicadores · Esteira · Vendas · Clientes e equipe · Financeiro · Metas e OKRs |

*Fontes e dados* continua inteira, alcançada pelo rodapé da lateral: é
manutenção, não leitura diária.

**O que saiu, e por quê** — redundância, não corte:

- *Visão Geral* repetia o Painel semanal e os principais de cada módulo. O que
  ela tinha de único, os **alertas de operação**, subiu para o Painel semanal.
- *KPIs do comercial* repetia, numa tela inteira, o quadro que hoje vem dentro
  de cada cartão principal — realizado, meta até hoje, meta mensal, projeção.
- *Equipe* foi para dentro da aba **Clientes e equipe**, ao lado do desempenho
  por closer e SDR que já estava lá.
- Na aba *Vendas*, a linha de KPI e as quebras por closer/produto/origem saíram:
  os mesmos números já estavam nos Indicadores e na aba de Clientes.

Os filtros da barra de cima — período, produto, closer, SDR, origem e busca —
valem nas abas de detalhe. As abas de **Indicadores** têm escopo próprio: um
seletor de mês, porque meta é mensal.

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

### Dois pesos, nenhum dado a menos

Catorze cartões do mesmo tamanho não são hierarquia: são uma parede onde o
olho não tem onde pousar primeiro. Os indicadores que decidem a semana ficam
em **cartão**, com o quadro completo. Os demais descem para uma **lista
densa** que mostra exatamente os mesmos dados — realizado, meta, atingimento
com barra e variação contra o mês anterior — numa linha só.

Nenhum indicador prioritário sai da tela por causa disso. O que muda é o peso.

### Toda tabela diz a conta de cada coluna

Coluna que ninguém sabe de onde veio não é usada — ou, pior, é usada errado.
A tabela de campanhas e as três tabelas de indicadores trazem o glossário
**antes** da tabela: cada coluna com a conta que a produz, e a nota de uso
(ordenar, linha sem valor, o que o CSV leva).

Na tabela de campanhas, os **elegíveis** vêm do Kommo, não do Meta: é o CRM
que sabe se o lead passou da elegibilidade. O Kommo guarda a etapa *atual* do
lead, não a data em que ele entrou em cada etapa — então a contagem é pela
etapa de hoje, com o lead situado no tempo pela data de criação. Está escrito
no próprio glossário.

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

- **O CPF/CNPJ é lido, classificado e descartado.** O módulo *Fluxo de
  clientes* replica o painel da central, que mostra o corte PJ × PF — e esse
  corte só existe no documento. Na leitura direta o painel conta os dígitos
  da coluna e guarda apenas `PJ` ou `PF`: o número não entra em registro
  nenhum, não aparece na tela e não sai no CSV. Com o proxy publicado ele nem
  chega ao navegador — o Apps Script faz a classificação no servidor.
  CPF tem 11 dígitos e CNPJ 14; como a planilha guarda alguns CNPJ como
  número, perdendo o zero à esquerda, qualquer documento com 12 ou mais
  dígitos é PJ. Exigir 14 mandava um CNPJ para o lado do CPF.
- **Ticket médio conta só quem teve honorário inicial.** Fechamento com
  honorário condicionado a liminar entra como R$ 0 (política D28): é venda, mas
  não é preço. Com os zeros no divisor, out/26 dava R$ 888 em vez de R$ 2.565.
  A contagem de clientes segue contando todos.
- **Metas são por responsável.** Na planilha, `Clientes` e `Honorários` estão
  no bloco do closer, não do time. O número grande é do time; a barra de ritmo
  recorta o realizado no mesmo escopo do KR e diz de quem é a meta.
- **Todo lead entra no Kommo; Meta Ads e orgânico dividem esse total.**
  `Leads (Kommo)` é o total, não uma origem ao lado de `Leads (Orgânico)` —
  somar os dois contava o orgânico duas vezes e inflava o topo do funil, e com
  o topo inflado toda conversão abaixo saía menor do que é. A própria planilha
  confirma: ela encadeia *Responderam a Triagem* em cima do Kommo
  (990 ÷ 1.100 = 90%), nunca em cima da soma. Quando não há coluna de Meta Ads
  no mês, o pago é o total menos o orgânico — e a tela diz que é dedução.
- **Duas contagens de lead no mesmo mês, cada uma com nome próprio.** O KR da
  aba KPIS anota 440 em outubro e o CRM registra 795. Chamar o KR de "total" e
  pôr 762 leads de campanha logo abaixo fazia a parte parecer maior que o todo.
  Agora o rótulo diz de onde vem cada um: o KR carrega a meta, o total do CRM
  fecha com os dois recortes.
- **A profundidade da etapa é uma tabela, não uma expressão regular.** O Kommo
  guarda a etapa atual do lead e um `etapa_ordem` que é a ordem de *exibição*
  do pipeline — nela as caixas de perda vêm depois das de ganho (*Sem resposta:
  ELEGIBILIDADE* é 190, *Enviado ao ADVBOX* é 120), então usá-la como
  profundidade poria quem não respondeu a primeira pergunta acima de quem virou
  cliente. A escada está escrita etapa a etapa no código. Era regex antes, e a
  regex calava etapa inteira sem avisar: `/documenta/` não casa com *Sem
  resposta: AGUARDANDO DOCUMENTO* por uma letra, e 944 leads que já tinham
  passado da qualificação contavam como não elegíveis; `/qualificac/` também
  não casa com *Desqualificado*. Etapa nova que apareça no CRM fica com
  profundidade desconhecida — entra no total, em degrau nenhum, e a tela diz
  quantos leads estão assim.
- **Etapa não é tempo.** *Conversão por etapa* era um gráfico de linhas: a
  linha promete continuidade entre pontos, e entre *Elegíveis* e *Diagnósticos*
  não há continuidade nenhuma — são categorias. Virou barra lado a lado, que
  compara as duas taxas dentro da mesma etapa.
- **Avanço ≠ acumulado.** Avanço é sobre a etapa anterior; acumulado é sobre o
  topo. São taxas diferentes e o painel mostra as duas.
- **Antes de acusar, medir se dá para acusar.** O painel calcula a cobertura da
  atribuição e suspende os alertas de conversão por campanha quando a coluna
  Campanha está vazia na maioria das reuniões — campanha com zero reunião pode
  só não ter sido anotada.
- **Dedução de campanha, quando só há uma resposta possível.** O Kommo grava
  em `fonte_id` qual integração criou o lead. Quando, naquele mês e naquela
  integração, todos os leads nomeados (dez ou mais) apontam para a mesma
  campanha, o painel atribui a ela os leads que chegaram com o campo vazio ou
  com `-`, e marca quantos foram. Integração que serve duas campanhas não
  deduz nada — seria chute. Em outubro/2026 isso recuperou 74 leads da
  campanha de WhatsApp e levou a cobertura de 86,3% para 95,8%.
- **"Sem fonte" e "a preencher" são coisas diferentes.** Indicador que nenhuma
  planilha alimenta é problema de engenharia; indicador cuja linha já existe na
  planilha e só espera o número do mês é problema de digitação. A tela mostra os
  dois selos separados e conta cada um na faixa de resumo.
- **Caixa ≠ competência.** A DRE é de caixa, a planilha de clientes é de
  competência. O painel mostra os dois e a diferença, em vez de escolher um.
- **Taxa de ganho exclui quem não respondeu.** Ganhos sobre ganhos + perdidos.
- **Nunca dois eixos Y.** Duas medidas de escalas diferentes viram dois gráficos.
- **O painel abre no mês corrente.** É a pergunta de quem abre o painel hoje;
  histórico se pede no filtro, não se recebe por padrão.
- **A granularidade acompanha o recorte.** Com o período num mês só, um
  gráfico de "evolução" viraria uma coluna — e uma coluna não é evolução, é um
  número com moldura. Até dois meses o eixo é **diário**; acima disso, mensal.
- **Razão no eixo diário é acumulada.** Ticket, CPL e ROI num dia isolado são
  ruído: a maioria dos dias não tem fechamento. No eixo diário essas séries
  mostram o acumulado do recorte — "o ticket médio do mês até aqui" —, que é o
  número que a gestão acompanha no meio do mês. Cada cartão diz quando é assim.
- **A DRE não tem granularidade diária.** Na tela Financeiro os números do topo
  seguem o recorte, mas os gráficos olham os últimos seis meses fechados, e a
  tela diz isso.
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
  Em 24/10/2026, cinco das oito já estão **Restritas** e o painel lê as doze
  fontes pelo proxy. As três que seguem abertas por link — *Leads Kommo*,
  *FLUXO DE CLIENTES* e *Metas e Resultados (antiga)* — alimentam painel
  publicado que ainda lê direto; fechá-las antes de migrar esses painéis
  derruba a tela deles. O estado planilha a planilha está em
  [apps-script/LEIA-ME.md](apps-script/LEIA-ME.md).
- A senha é conferida **no servidor**: o navegador deriva PBKDF2-SHA256
  (310 mil iterações) do login + senha e envia só o resultado. A senha nunca
  trafega e nunca é guardada.
- Os IDs das planilhas ficam nas Propriedades do Script, **não no repositório**.
- CPF/CNPJ é recortado no servidor.
- 8 tentativas erradas travam por 10 minutos. Nenhuma função grava.

**Quem importa de quem.** O Cérebro Comercial monta a espinha dorsal com
`IMPORTRANGE` das outras planilhas, e `IMPORTRANGE` roda com a identidade do
**dono do arquivo que importa** — não com a de quem abre a planilha. Fechar
uma planilha espelhada sem que o dono do Cérebro tenha acesso **nomeado** a
ela faz a célula virar `#REF!` em silêncio: o painel continua lendo o Cérebro
normalmente, só que com menos linhas. Confira sempre a aba `LEIA-ME` do
Cérebro, em *"STATUS DAS CONEXÕES"*, depois de mexer em compartilhamento.

**Sem o proxy**, o painel lê as planilhas direto do navegador. Isso só funciona
com planilha compartilhada por link — ou seja, **quem tiver o ID lê sem senha**.
A tela *Fontes e dados* mostra, linha por linha, qual transporte está em uso.

Em qualquer modo: sessão por aba com expiração em 30 minutos, `Content-Security-Policy`
limitando a saída de dados, e recusa de execução dentro de iframe.

> O site do GitHub Pages é público por natureza em conta pessoal — controle de
> acesso em Pages é recurso de Enterprise Cloud. Qualquer pessoa com a URL chega
> à tela de login, e para nela.

## Manutenção

As três áreas são calculadas **uma vez por mês de painel** e guardadas em
memória: sem isso, o Painel semanal varreria 11 mil leads do Kommo e os
insights diários três vezes por clique. A memória cai quando as planilhas são
relidas ou uma meta muda. Na prática: abrir o Painel semanal pela primeira vez
custa ~430 ms, voltar a ele custa ~16 ms.

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
