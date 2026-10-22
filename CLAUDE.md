# THE FOUR EXILES — regras para o Claude Code

Site de sátira de ficção científica: quatro raças alienígenas disputam a Terra num Censo cósmico, e a Resistência humana, liderada por Dora, reage. Bilíngue (EN / PT-BR), React + TypeScript + Tailwind, Vite. Só dados locais simulados: sem backend, carteira, token ou transação real.

**O contexto do projeto está em `docs/`, compartilhado com o Claude do chat e entre computadores. Comece por `docs/CONTEXTO.md`.**

## Rotina obrigatória

**No início de toda sessão**
1. `git pull` (o dono trabalha no desktop e no notebook).
2. Ler `docs/CONTEXTO.md`, `docs/HANDOFF.md` e `docs/DECISOES.md`.

**Ao terminar cada conjunto de mudanças**
1. Atualizar `docs/HANDOFF.md` (feito, pela metade, próximos passos).
2. Registrar decisões novas em `docs/DECISOES.md` com status: aprovada, provisória ou em aberto.
3. Commit com mensagem clara e `git push` para `origin/main`, sem pedir confirmação.
4. Se mudou algo visível no site, republicar a prévia (abaixo).

Nada importante fica só na conversa ou na memória local: o que não está no repositório se perde no outro computador e é invisível para o projeto do chat.

## Lugares vinculados

| O quê | Onde |
| --- | --- |
| Projeto no chat | **THE FOUR EXILES — PROJECT MASTER** (`cse_018zLyy8LsrdugSyWGkrBKAL`): lore, decisões e análise de conversas; lê esta pasta e segue `docs/INSTRUCOES_PROJETO_CHAT.md` |
| Repositório | https://github.com/robsonfreitasadv/the-four-exiles |
| Prévia do site | https://claude.ai/artifact/J6yY4A8qS5DLjFmF4qkBH6 |
| Pasta local | `C:\Users\<usuário do Windows>\Claude`: `C:\Users\robson.freitas\Claude` num computador, `C:\Users\Robson\Claude` no outro (ver `docs/NOTEBOOK.md`) |

## Regras do dono

- **Imagens:** sempre as fichas oficiais em `design/sheets/`: as fichas 3D `<personagem>-3d.jpg` (VELLUM, AUREL, SAZAR, VEX, Dora, Ray, Olivia, Julian, Tasha; desde 2026-10-22, são a referência principal), os rostos `<personagem>-face.jpg` (imagem principal no site). Os arquivos usam os ids antigos (`vhal-ett`, `ilvani`, `sazhi`, `xhalen-kthrix`, `dora`, `rui`, `livia`, `julio`, `tati`); os nomes públicos mudaram em 2026-10-22 e as antigas `races.webp` e `resistance.webp` (ainda usadas para os rostos de expressão). Nunca trocar por imagens de banco ou geradas. Os recortes saem de `design/crop-sheets.cjs` para `public/images/characters/`; ficha nova vai para `design/sheets/` e o script é estendido.
- **Palavra:** "raças" / "races" em todo texto para o público, nunca "facções" / "factions". Identificadores no código e URLs `/factions` ficam como estão.
- **Idiomas:** todo texto de interface em `src/i18n/en.ts` e `src/i18n/pt-BR.ts`; registros de conteúdo usam objetos `Localized` (`{ en, 'pt-BR' }`). Converse com o dono em português.
- **Cânone:** o site segue `docs/canon/`. Mudou o cânone, atualize os dois (`docs/canon/` e `src/data/`).
- **Dinheiro:** dados de demonstração rotulados como fictícios. Nunca inventar token, ticker, preço ou data de lançamento. Pontos do campeonato nunca vêm de preço, volume, valor de mercado ou saldo de carteira.

## Publicar a prévia

1. `npm run build:static`
2. Escrever `dist/artifact.html`: `<title>The Four Exiles</title>`, link do Google Fonts (Inter + IBM Plex Mono), o CSS e o JS de `dist/assets`, `<div id="root">`.
3. Publicar com o `url` da prévia e todos os arquivos de `dist/` em `files`, marcando como `null` os caminhos que deixaram de existir.

## Estrutura

| Caminho | O quê |
| --- | --- |
| `docs/` | Contexto, cânone, decisões, handoff, lore, guias |
| `src/data/` | Dados tipados: `factions.ts` (raças), `resistance.ts`, `missions.ts`, `championship.ts`, `pages.ts` |
| `src/i18n/` | Dicionários e `useI18n()` |
| `src/components/art/` | `CharacterImage`, `RaceArt`, `TiltCard`, `TurnaroundViewer`, SVGs de reserva |
| `src/components/` | `RacesShowcase` (raças em 3D), `ResistanceSection`, cards, placar, layout |
| `src/pages/` | Páginas |
| `design/` | Fichas originais e script de recorte |

## Comandos

```
npm install
npm run dev            # http://localhost:5173
npm run build
npm run build:static   # rotas com # e caminhos relativos, para qualquer hospedagem estática
```

Visual: página de produto estilo Apple, escura (SF/Inter, frases sem caixa-alta, botões em pílula, superfícies arredondadas de 28–36 px).
