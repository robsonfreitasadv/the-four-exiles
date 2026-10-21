# Handoff — onde paramos

Atualize este arquivo no fim de cada sessão (chat ou código): o que foi feito, o que ficou pela metade, próximos passos. Mantenha só o estado atual no topo e mova o antigo para o histórico.

## Estado atual — 2026-10-20

**Feito**
- Site Fase 1 completo e publicado em prévia privada: https://claude.ai/artifact/J6yY4A8qS5DLjFmF4qkBH6
- Imagens oficiais das fichas aplicadas em todo o site; seção "raças em 3D" e seção da Resistência.
- Repositório organizado como fonte única de contexto (`docs/`), com cânone, decisões e instruções para o projeto do chat.

- Dossiê dos Grays trazido do chat para `docs/lore/GRAYS.json` (fonte) e `grays.md` (resumo). O site lê o JSON e mostra o dossiê na página `/grays`, com selos de status (cânone, provisório, em aberto), e o arquivo de lore tem um atalho para ele. Sete agora é "Auditor do Arquivo Central".

- Página própria dos Grays (`/grays`): dossiê + arquivo de civilização (`docs/lore/GRAYS_CIVILIZATION.json`, vindo do chat), com menu de seções e selo de status em cada bloco. A página da raça Grays e o arquivo de lore levam até ela; o rodapé tem o link "Grays".
- **Gray é a raça; VHAL-ETT é personagem** (decisão do dono). A raça aparece como GRAYS em todo o site, em `/factions/grays` (o endereço antigo redireciona). VHAL-ETT aparece na página `/grays` com a imagem oficial; Sete fica sem imagem até ter arte própria.

- **Raças pelo tipo:** Grays, Nórdicos, Reptilianos e Mantis em todo o site (`/factions/grays|nordics|reptilians|mantis`; os endereços antigos redirecionam). VHAL-ETT, ILVANI, SAZHI e XHALEN-KTHRIX são personagens das respectivas raças; cada imagem oficial tem a legenda com o nome do personagem. SAZHI é O Soberano; XHALEN-KTHRIX é O Comandante (provisório).
- Página genérica de civilização (`src/pages/CivilizationPage.tsx`), alimentada pelos arquivos `docs/lore/<RAÇA>.json` e `<RAÇA>_CIVILIZATION.json` (nomes do chat).

- Páginas `/reptilians` e `/mantis` com dossiê + arquivo de civilização do chat; o dossiê virou componente genérico (`RaceDossier`) e os dados de dossiê e civilização são lidos de `docs/lore/` (`src/data/lore/dossier.ts` e `civilization.ts`). Todas as raças têm página de arquivo agora.

- Os arquivos que o chat gravou direto em `docs/lore/` (nomes em maiúsculas) viraram a fonte única; as cópias que eu tinha feito foram apagadas. Chegou o `NORDICS.json`, ligado à página `/nordics`. O chat também gravou `THE_FOUR_EXILES_RACAS.docx` em `docs/lore/` (mantido como está).

- **2026-10-21 — Roteiro dos Grays** (agente Diretor + roteiristas, skills screenwriting-skills): pasta `docs/roteiro/grays/` com `story-bible.md` (direção, pendências), `pesquisa-folclore.md` (teorias da web com fontes), `historia-dos-grays.md` (seis eras + 12 incidentes do folclore como relatórios Gray) e `narrativa-sete.md` (tratamento de longa *Zero Discrepâncias*, 36 cenas, 3 cenas de amostra). Tudo provisório; não entrou no site nem no `GRAYS.json`.

**Próximos passos sugeridos**
0. Dono decide as pendências do roteiro dos Grays (`docs/roteiro/grays/story-bible.md`); depois, roteiro do primeiro ato e o mesmo tratamento para Nórdicos, Reptilianos e Mantis.
1. **Decidir quem é O Soberano** (SAZHI, como na ficha, ou KRAHL-VOR, como no dossiê) e os **planetas natais** (Thaxis/Sarrath, Xhalen/Threnn). Ver `docs/DECISOES.md`.
2. No chat: corrigir `GRAYS.json` (ILVANI, SAZHI e XHALEN-KTHRIX como Grays), alinhar a aparência dos Mantis com a ficha e usar "Mantis" em vez de "Insetoides".
3. Alinhar Sael: o site o descreve como ex-jardineiro desertor; o `NORDICS.json`, como diplomata.
4. Aprovar ou ajustar os itens provisórios das quatro raças e os nomes de personagens propostos.
5. Fase 2: arquivo de lore completo (capítulos, transmissões, documentos) e galeria de personagens ampliada.

**Atenção**
- O Claude Code faz os commits. O Claude do chat, se não tiver terminal, deixa os arquivos na pasta do projeto e pede o commit.

## Histórico

- 2026-10-19 — Fase 1 do site (React, bilíngue, dados simulados). Arte SVG provisória.
- 2026-10-20 — Imagens de referência; "facção" virou "raça"; redesenho estilo Apple; GitHub criado; link de prévia; projeto movido para `C:\Users\robson.freitas\Claude`; fichas oficiais e seções 3D; vínculo com o projeto PROJECT MASTER.
