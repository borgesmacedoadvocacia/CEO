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

## 6. Fechar as planilhas

Só depois que o passo 5 estiver funcionando, em **cada** planilha da tabela
acima: **Compartilhar** → *Acesso geral* → **Restrito**.

A partir daí o único caminho para o dado é o proxy, e o único jeito de passar
pelo proxy é a senha. Confira no painel: tudo deve continuar carregando.

### Onde cada planilha está hoje (24/10/2026)

A **escrita** por link já foi fechada nas duas que estavam abertas — *Fluxo de
Atendimentos* e *Campanhas Meta Ads* estavam como **editor** para qualquer
pessoa com o link. Ninguém mais edita por link.

Falta a **leitura**. As oito seguem como *qualquer pessoa com o link pode ver*,
e é isso que o passo 6 resolve:

| Planilha | Hoje | Depois do passo 6 |
|---|---|---|
| Fluxo de Atendimentos | pode ver | Restrito |
| FLUXO DE CLIENTES [2026] | pode ver | Restrito |
| Campanhas Meta Ads | pode ver | Restrito |
| Metas e Resultados [NOVA] | pode ver | Restrito |
| Metas e Resultados (antiga) | pode ver | Restrito |
| Leads Kommo [DASHBOARDS] | pode ver | Restrito |
| FLUXO FINANCEIRO 2026 | pode ver | Restrito |
| TODOS OS LEADS [CÉREBRO] | pode ver | Restrito |

> **Comece pelo Cérebro Comercial.** É a planilha com a base inteira de leads —
> nome, telefone e honorários de 14.463 linhas — e é a única que o painel já
> se recusa a ler por link. Fechá-la não tira nada da tela, porque a tela
> ainda não a usa: ela só passa a existir no painel quando o proxy entrar.

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
