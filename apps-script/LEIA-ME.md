# Proxy de leitura — publicação

Este web app é o que permite **fechar as planilhas** e passar a conferir a senha
no servidor. Ele roda com a sua conta Google, então lê planilha privada; o
painel no GitHub Pages deixa de falar com o Google e passa a falar só com ele.

Leva uns 10 minutos. Nada aqui grava em planilha — é só leitura.

---

## 1. Criar o projeto

1. Abra **https://script.google.com** → **Novo projeto**.
2. Renomeie para `Painel Comercial — Proxy`.
3. Apague o conteúdo de `Código.gs` e cole o `Codigo.gs` desta pasta.
4. Salve (Ctrl+S).

## 2. Configurar as propriedades

No editor: engrenagem **Configurações do projeto** → **Propriedades do script** →
**Adicionar propriedade**. São 9 propriedades.

A senha:

| Propriedade | Valor |
|---|---|
| `SENHA_HASH` | o hash que eu passei no chat |

As planilhas. O ID é o trecho do endereço entre `/d/` e `/edit`:

```
https://docs.google.com/spreadsheets/d/ESTE_PEDACO_AQUI/edit
```

| Propriedade | Planilha de onde copiar o ID |
|---|---|
| `SHEET_atend` | Fluxo de Atendimentos [NOVA] |
| `SHEET_clientes` | FLUXO DE CLIENTES [2026] |
| `SHEET_meta` | Campanhas Meta Ads - Dashboard - App Script |
| `SHEET_metas` | Metas e Resultados - Comercial [NOVA] |
| `SHEET_antiga` | Metas e Resultados - Comercial (a antiga) |
| `SHEET_kommo` | Leads Kommo [DASHBOARDS] |
| `SHEET_financeiro` | FLUXO FINANCEIRO - BM ADVOCACIA - 2026 \| 2.0 |
| `SHEET_cerebro` | TODOS OS LEADS [CÉREBRO COMERCIAL] |

> Os IDs ficam **só aqui**, nunca no repositório — é parte do ponto.

## 3. Conferir antes de publicar

No editor, selecione a função e clique em **Executar**:

1. `conferirConfiguracao` — diz se falta alguma propriedade.
2. `testarLeitura` — abre cada planilha e relata aba, linhas e colunas.

Na primeira execução o Google pede autorização: **Revisar permissões** → sua
conta → *Avançado* → *Acessar Painel Comercial — Proxy* → **Permitir**.
É o que dá ao script o direito de ler as planilhas em seu nome.

Em `testarLeitura`, cada linha deve dizer `OK`. Se alguma disser
`aba nao encontrada`, confira o nome da aba na planilha.

## 4. Publicar

1. **Implantar** → **Nova implantação** → engrenagem → **App da Web**.
2. Preencha:
   - **Descrição**: `v1`
   - **Executar como**: **Eu** ← *essencial: é isso que lê planilha privada*
   - **Quem pode acessar**: **Qualquer pessoa** ← *a senha é a barreira, não o Google*
3. **Implantar** e copie o **URL do app da Web** (termina em `/exec`).

> "Qualquer pessoa" assusta, mas é correto: sem a credencial o endpoint não
> devolve dado nenhum, e é o que evita exigir login Google de quem usa o painel.

## 5. Ligar no painel

Abra o painel, vá em **Fontes e dados** → **Leitura pelo proxy** → cole o URL
e clique em **Usar o proxy**. O painel recarrega por ele e a tela passa a
mostrar `proxy` na coluna de transporte.

## 6. Fechar as planilhas — feito em 5 das 8

Em **cada** planilha: **Compartilhar** → *Acesso geral* → **Restrito**. A partir
daí o único caminho para o dado é o proxy, e o único jeito de passar pelo proxy
é a senha.

A **escrita** por link já tinha sido fechada antes, nas duas que estavam como
*editor para qualquer pessoa com o link*.

### Onde cada planilha está (24/10/2026, 23h)

| Planilha | Acesso geral | Por quê |
|---|---|---|
| TODOS OS LEADS [CÉREBRO] | **Restrito** | nenhum outro painel a lê |
| Fluxo de Atendimentos | **Restrito** | só citada num README |
| Campanhas Meta Ads | **Restrito** | a única referência é um Apps Script, que lê por conta nomeada |
| Metas e Resultados [NOVA] | **Restrito** | nenhuma referência |
| FLUXO FINANCEIRO 2026 | **Restrito** | nenhuma referência |
| Leads Kommo [DASHBOARDS] | aberta por link | `dashboard-kommo` lê por link |
| FLUXO DE CLIENTES [2026] | aberta por link | `dashboard-meta-ads`, `fluxodeclientes` e `dashboard` leem por link |
| Metas e Resultados (antiga) | aberta por link | `KPISdoComercial` e o `painel-tv` do site leem por link |

Conferido planilha a planilha: o `gviz` anônimo devolve **HTTP 401** nas cinco
fechadas e **200** nas três abertas, e o painel segue lendo **12 de 12 fontes
pelo proxy**.

As três últimas não são esquecimento. Fechá-las derruba painel publicado que
a equipe usa — a varredura dos 29 repositórios públicos da conta está na
tabela. Cada um precisa migrar para o proxy (ou para um proxy próprio) antes.

### A armadilha: de quem é a planilha que importa a outra

Fechar o *Fluxo de Atendimentos* quebrou o **Cérebro Comercial**, e vale
entender por quê antes de fechar as outras três.

O Cérebro é espelho: ele monta a espinha dorsal com `IMPORTRANGE` das quatro
planilhas comerciais. `IMPORTRANGE` roda com a identidade do **dono do arquivo
que importa**, e o dono do Cérebro é a `claude.bmadvocacia@gmail.com` — que
alcançava o *Fluxo de Atendimentos* **só pelo link público**. Fechado o link,
a célula virou `#REF!`, a aba Reuniões zerou e a espinha dorsal caiu de 14.476
para 13.572 registros. A própria aba `LEIA-ME` do Cérebro acusa isso, em
*"2) STATUS DAS CONEXÕES"*.

Conserto, um clique: no *Fluxo de Atendimentos*, **Compartilhar** → adicionar
`claude.bmadvocacia@gmail.com` como **Leitor**. A planilha segue restrita — o
que volta é o acesso **nomeado**, que é a forma certa de dar esse acesso.

Conserto definitivo: **transferir a propriedade do Cérebro para a
`gabriel@borgesmacedoadvocacia.com.br`**, que é dona das outras sete. Aí o
`IMPORTRANGE` passa a rodar como quem já tem acesso a tudo, nenhuma permissão
extra é necessária agora nem no futuro, e a base mais sensível do escritório
deixa de depender de uma conta Gmail avulsa.

> Antes de fechar *FLUXO DE CLIENTES*, o mesmo cuidado: o Cérebro também a
> espelha (Clientes 2026 e 2025). A *Leads Kommo* não corre esse risco — ali a
> `claude.bmadvocacia` já é editora nomeada.

---

## Depois

**Trocar a senha** — gere o novo hash e troque `SENHA_HASH`. Nenhuma outra
mudança é necessária; o painel pede a senha nova na próxima entrada.

**Bloqueou por engano** (8 tentativas erradas em 10 min) — rode
`liberarTentativas` no editor.

**Mudou o código** — depois de salvar, **Implantar** → **Gerenciar
implantações** → lápis → *Versão: Nova versão* → **Implantar**. O URL não muda.
Publicar nova implantação em vez de editar a existente gera um URL novo e o
painel para de achar o proxy.

**Mês novo** — as abas que mudam de nome com o calendário (`KPIS <mês>`,
`Produtos Jurídicos - <mês>/<ano>`) são resolvidas pelo script a partir da data
do dia. Não precisa mexer.

**Aba renomeada** — ajuste o nome em `_fontes()`, no `Codigo.gs`. Cada fonte
aceita uma lista de nomes, tentados em ordem.
