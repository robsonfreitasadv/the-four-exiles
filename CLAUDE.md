# THE FOUR EXILES — project rules

Original sci-fi satire site: four alien races dispute Earth in a cosmic Census, and the human Resistance led by Dora pushes back. Bilingual (EN / PT-BR), React + TypeScript + Tailwind, built with Vite. Local mock data only: no backend, wallet, token or real transactions.

## Standing rules from the owner

- **Character art:** always use the official character sheets in `design/sheets/` (`races.webp`, `resistance.webp`). Never swap in stock or generated images for these characters. Crops come from `design/crop-sheets.cjs` into `public/images/characters/`; if a new sheet arrives, add it to `design/sheets/` and extend the script.
- **Wording:** the four civilizations are **races / raças**, never "factions / facções", in any user-facing text. Code identifiers and the `/factions` URLs stay as they are.
- **Git:** commit and push every change set to `origin/main` (https://github.com/robsonfreitasadv/the-four-exiles) without asking.
- **Preview link:** after visible changes, republish https://claude.ai/artifact/J6yY4A8qS5DLjFmF4qkBH6 (same URL):
  1. `npm run build:static`
  2. write `dist/artifact.html` (title, Google Fonts link, the built CSS/JS from `dist/assets`, `<div id="root">`)
  3. publish it with that `url` and every file under `dist/` in `files`, setting paths that no longer exist to `null`.
- **Language:** every UI string goes in both `src/i18n/en.ts` and `src/i18n/pt-BR.ts`; content records use `Localized` objects (`{ en, 'pt-BR' }`).
- **Fiction and money:** label demo scores as fictional. Never invent a token, ticker, price or launch date. Championship points never come from token price, volume, market cap or wallet balances.

## Layout

| Path | What |
| --- | --- |
| `src/data/` | Typed mock data: `factions.ts` (races), `resistance.ts` (humans), `missions.ts`, `championship.ts`, `pages.ts` |
| `src/i18n/` | UI dictionaries and `useI18n()` |
| `src/components/art/` | `CharacterImage`, `RaceArt`, `TiltCard`, `TurnaroundViewer`, SVG fallbacks |
| `src/components/` | `RacesShowcase` (3D races), `ResistanceSection`, cards, leaderboard, layout |
| `src/pages/` | Route pages |
| `design/` | Source sheets and crop script |

## Running

```
npm install
npm run dev            # http://localhost:5173
npm run build
npm run build:static   # hash routes + relative paths, for any static host
```

Visual style: Apple-like dark product page (SF/Inter, sentence case, pill buttons, rounded 28–36px surfaces).
