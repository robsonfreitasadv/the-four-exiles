# Handoff — onde paramos

Atualize este arquivo no fim de cada sessão (chat ou código): o que foi feito, o que ficou pela metade, próximos passos. Mantenha só o estado atual no topo e mova o antigo para o histórico.

## Estado atual — 2026-10-20

**Feito**
- Site Fase 1 completo e publicado em prévia privada: https://claude.ai/artifact/J6yY4A8qS5DLjFmF4qkBH6
- Imagens oficiais das fichas aplicadas em todo o site; seção "raças em 3D" e seção da Resistência.
- Repositório organizado como fonte única de contexto (`docs/`), com cânone, decisões e instruções para o projeto do chat.

- Dossiê dos Grays trazido do chat para `docs/lore/grays.json` (fonte) e `grays.md` (resumo). O site lê o JSON e mostra o dossiê na página `/grays`, com selos de status (cânone, provisório, em aberto), e o arquivo de lore tem um atalho para ele. Sete agora é "Auditor do Arquivo Central".

- Página própria dos Grays (`/grays`): dossiê + arquivo de civilização (`docs/lore/grays-civilization.json`, vindo do chat), com menu de seções e selo de status em cada bloco. A página da raça Grays e o arquivo de lore levam até ela; o rodapé tem o link "Grays".
- **Gray é a raça; VHAL-ETT é personagem** (decisão do dono). A raça aparece como GRAYS em todo o site, em `/factions/grays` (o endereço antigo redireciona). VHAL-ETT aparece na página `/grays` com a imagem oficial; Sete fica sem imagem até ter arte própria.

- **Raças pelo tipo:** Grays, Nórdicos, Reptilianos e Mantis em todo o site (`/factions/grays|nordics|reptilians|mantis`; os endereços antigos redirecionam). VHAL-ETT, ILVANI, SAZHI e XHALEN-KTHRIX são personagens das respectivas raças; cada imagem oficial tem a legenda com o nome do personagem. SAZHI é O Soberano; XHALEN-KTHRIX é O Comandante (provisório).
- Página genérica de civilização (`src/pages/CivilizationPage.tsx`), alimentada por `docs/lore/<raça>-civilization.json`. Grays (`/grays`, com dossiê) e Nórdicos (`/nordics`) já usam. Para Reptilianos e Mantis basta o JSON + uma linha em `src/data/lore/civilization.ts` e os textos em `civPages`.

**Próximos passos sugeridos**
1. **No chat, corrigir `docs/lore/grays.json`:** tirar ILVANI, SAZHI e XHALEN-KTHRIX da lista de personagens Gray (ou dar outros nomes a esses papéis) e ajustar as relações de KAEL-RUUM e ZEN-VARO.
2. Trazer o `NORDICS.json` citado no arquivo nórdico (personagens nórdicos, incluindo Torven) para `docs/lore/`.
3. Arquivos de civilização de Reptilianos e Mantis (`docs/lore/reptilians-civilization.json`, `mantis-civilization.json`).
4. Aprovar ou ajustar os itens provisórios (Grays e Nórdicos) e os nomes de personagens propostos.
5. Fase 2: arquivo de lore completo (capítulos, transmissões, documentos) e galeria de personagens ampliada.

**Atenção**
- O Claude Code faz os commits. O Claude do chat, se não tiver terminal, deixa os arquivos na pasta do projeto e pede o commit.

## Histórico

- 2026-10-19 — Fase 1 do site (React, bilíngue, dados simulados). Arte SVG provisória.
- 2026-10-20 — Imagens de referência; "facção" virou "raça"; redesenho estilo Apple; GitHub criado; link de prévia; projeto movido para `C:\Users\robson.freitas\Claude`; fichas oficiais e seções 3D; vínculo com o projeto PROJECT MASTER.
