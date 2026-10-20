# Handoff — onde paramos

Atualize este arquivo no fim de cada sessão (chat ou código): o que foi feito, o que ficou pela metade, próximos passos. Mantenha só o estado atual no topo e mova o antigo para o histórico.

## Estado atual — 2026-10-20

**Feito**
- Site Fase 1 completo e publicado em prévia privada: https://claude.ai/artifact/J6yY4A8qS5DLjFmF4qkBH6
- Imagens oficiais das fichas aplicadas em todo o site; seção "raças em 3D" e seção da Resistência.
- Repositório organizado como fonte única de contexto (`docs/`), com cânone, decisões e instruções para o projeto do chat.

- Dossiê dos Grays trazido do chat para `docs/lore/grays.json` (fonte) e `grays.md` (resumo). O site lê o JSON e mostra o dossiê na página dos Vhal-Ett, com selos de status (cânone, provisório, em aberto), e o arquivo de lore tem um atalho para ele. Sete agora é "Auditor do Arquivo Central".

- Página própria dos Grays (`/grays`): dossiê + arquivo de civilização (`docs/lore/grays-civilization.json`, vindo do chat), com menu de seções e selo de status em cada bloco. A página dos Vhal-Ett e o arquivo de lore levam até ela; o rodapé tem o link "Grays".

**Próximos passos sugeridos**
1. **Decidir o conflito de nomes** do dossiê dos Grays (ver `docs/DECISOES.md`, em aberto). Os quatro personagens Gray com nomes de raça, e as relações de KAEL-RUUM e ZEN-VARO com eles, estão fora do site até lá.
2. Aprovar (ou ajustar) os itens provisórios da civilização Grays e os nomes TERCE-OHM, KAEL-RUUM, OPHELIA-3 e ZEN-VARO.
2. Fazer o mesmo dossiê para Ilvani, Sazhi e Xhalen-Kthrix no chat, no mesmo formato JSON (`docs/lore/<raça>.json`), para o site ler automaticamente.
3. Fase 2: arquivo de lore completo (capítulos, transmissões, documentos) e galeria de personagens ampliada.
4. Decidir os nomes do Soberano e do Comandante.

**Atenção**
- O Claude Code faz os commits. O Claude do chat, se não tiver terminal, deixa os arquivos na pasta do projeto e pede o commit.

## Histórico

- 2026-10-19 — Fase 1 do site (React, bilíngue, dados simulados). Arte SVG provisória.
- 2026-10-20 — Imagens de referência; "facção" virou "raça"; redesenho estilo Apple; GitHub criado; link de prévia; projeto movido para `C:\Users\robson.freitas\Claude`; fichas oficiais e seções 3D; vínculo com o projeto PROJECT MASTER.
