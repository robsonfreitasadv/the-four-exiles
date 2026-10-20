# THE FOUR EXILES — MVP front end (Phase 1)

> Contexto do projeto (cânone, decisões, onde paramos): comece por [docs/CONTEXTO.md](docs/CONTEXTO.md). Para trabalhar em outro computador: [docs/NOTEBOOK.md](docs/NOTEBOOK.md).

React 18 + TypeScript + Tailwind CSS + React Router, built with Vite. No backend, no wallet, no token.

```
npm install
npm run dev      # http://localhost:5173
npm run build
npm run build:static   # hash routes + relative paths, for any static file host
```

## Where things live

| Path | What |
| --- | --- |
| `src/data/types.ts` | Typed content model (shapes to keep when moving to Supabase) |
| `src/data/*.ts` | Mock data: factions, missions, championship (fictional), info pages |
| `src/i18n/` | `en.ts` (source of keys), `pt-BR.ts` (typed against it), provider + `useI18n()` |
| `src/components/art/` | Original SVG character art, emblems, hero scene, mission thumbnails |
| `src/components/` | FactionCard, MissionCard, Leaderboard (table + season selector), layout, primitives |
| `src/pages/` | Route pages |
| `tailwind.config.js` | Design tokens: colors (incl. faction palettes), fonts, motion |

Content strings that belong to data records use `Localized` objects (`{ en, 'pt-BR' }`); UI chrome uses the dictionaries.
