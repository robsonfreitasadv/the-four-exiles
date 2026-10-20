# THE FOUR EXILES — Contexto do projeto

> **Leia este arquivo primeiro.** Ele é a fonte única de contexto para qualquer Claude que trabalhe no projeto: o Claude Code (que mexe no site) e o Claude do chat (projeto **THE FOUR EXILES — PROJECT MASTER**), em qualquer computador. O que não estiver no repositório não existe para a próxima sessão.

Repositório: https://github.com/robsonfreitasadv/the-four-exiles (branch `main`)

## O que é

Universo original de ficção científica satírica. Em 2049, um sinal revela que quatro civilizações alienígenas reivindicam a Terra num **Censo Intergaláctico**. A humanidade descobre que as regras talvez tenham uma brecha (a cláusula 4.812-c). A Resistência humana, liderada por **Dora**, de Fortaleza, enfrenta as quatro raças.

Tom: sátira de ficção científica, humor adulto, burocracia absurda, intriga política fictícia, cultura de memes (incluindo memes de cripto, sem nunca lançar ou prometer token).

Tagline: *Four species. One planet. No shared destiny.* / *Quatro espécies. Um planeta. Nenhum destino em comum.*

## Onde está cada coisa

| Arquivo | Para quê |
| --- | --- |
| `docs/CONTEXTO.md` | Este resumo. Ponto de partida. |
| `docs/canon/racas.md` | Cânone das quatro raças (o que está aprovado). |
| `docs/canon/resistencia.md` | Cânone da Resistência humana. |
| `docs/DECISOES.md` | Registro de decisões por status: aprovada, provisória, em aberto. |
| `docs/HANDOFF.md` | Onde paramos e próximos passos. Atualizar ao fim de cada sessão. |
| `docs/lore/` | Dossiês de lore aprovados (ex.: dossiê dos Grays). |
| `docs/lore/grays.json` e `grays-civilization.json` | Grays: dossiê e arquivo de civilização. O site lê esses arquivos (página `/grays`). Edite o JSON. |
| `docs/INSTRUCOES_PROJETO_CHAT.md` | Texto para colar nas instruções do projeto no chat. |
| `docs/NOTEBOOK.md` | Como configurar e sincronizar em outro computador. |
| `design/sheets/` | Fichas oficiais dos personagens (a única fonte de imagens). |
| `src/data/` | Textos que o site exibe (raças, Resistência, missões). |
| `CLAUDE.md` | Regras de trabalho para o Claude Code. |

## Regras que valem para os dois Claudes

1. **O Git é a fonte da verdade.** Toda decisão, texto de lore ou mudança aprovada vai para o repositório. Conversa que não virou arquivo se perde.
2. **Começo de sessão:** `git pull`, depois ler `docs/CONTEXTO.md`, `docs/HANDOFF.md` e `docs/DECISOES.md`.
3. **Fim de sessão:** atualizar `docs/HANDOFF.md`, registrar decisões em `docs/DECISOES.md`, fazer commit e `git push`.
4. **Decisões têm status:** aprovada (o dono confirmou), provisória (em uso, pode mudar), em aberto (não decidido). Não tratar provisória como cânone.
5. **Raças, não facções**, em todo texto para o público.
6. **Imagens dos personagens:** só as fichas de `design/sheets/`.
7. **Bilíngue:** todo texto do site em inglês e português do Brasil. O inglês é o idioma padrão do site; a conversa com o dono é em português.
8. **Sem dinheiro real:** nada de token, ticker, preço, carteira ou data de lançamento. Pontuação do campeonato nunca vem de mercado. Dados de demonstração são sempre rotulados como fictícios.

## Estado atual (resumo)

- Site MVP (Fase 1) pronto: página inicial, raças em 3D, Resistência, páginas das raças, Guerra Galáctica (dados fictícios), missões, lore, personagens, colecionáveis, mercado, transparência, privacidade, termos.
- Visual: estilo página de produto da Apple, escuro.
- Prévia privada do site: https://claude.ai/artifact/J6yY4A8qS5DLjFmF4qkBH6
- Detalhes e próximos passos: `docs/HANDOFF.md`.
