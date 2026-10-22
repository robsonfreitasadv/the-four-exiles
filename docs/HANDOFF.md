# Handoff — onde paramos

Atualize este arquivo no fim de cada sessão (chat ou código): o que foi feito, o que ficou pela metade, próximos passos. Mantenha só o estado atual no topo e mova o antigo para o histórico.

## Estado atual — 2026-10-20

**Feito**
- Site Fase 1 completo e publicado em prévia privada: https://claude.ai/artifact/J6yY4A8qS5DLjFmF4qkBH6
- Imagens oficiais das fichas aplicadas em todo o site; seção "raças em 3D" e seção da Resistência.
- Repositório organizado como fonte única de contexto (`docs/`), com cânone, decisões e instruções para o projeto do chat.

- Dossiê dos Grays trazido do chat para `docs/lore/GRAYS.json` (fonte) e `grays.md` (resumo). O site lê o JSON e mostra o dossiê na página `/grays`, com selos de status (cânone, provisório, em aberto), e o arquivo de lore tem um atalho para ele. Sete agora é "Auditor do Arquivo Central".

- Página própria dos Grays (`/grays`): dossiê + arquivo de civilização (`docs/lore/GRAYS_CIVILIZATION.json`, vindo do chat), com menu de seções e selo de status em cada bloco. A página da raça Grays e o arquivo de lore levam até ela; o rodapé tem o link "Grays".
- **Gray é a raça; VELLUM é personagem** (decisão do dono). A raça aparece como GRAYS em todo o site, em `/factions/grays` (o endereço antigo redireciona). VELLUM aparece na página `/grays` com a imagem oficial; Sete fica sem imagem até ter arte própria.

- **Raças pelo tipo:** Grays, Nórdicos, Reptilianos e Mantis em todo o site (`/factions/grays|nordics|reptilians|mantis`; os endereços antigos redirecionam). VELLUM, AUREL, SAZAR e VEX são personagens das respectivas raças; cada imagem oficial tem a legenda com o nome do personagem. SAZAR é O Soberano; VEX é O Comandante (provisório).
- Página genérica de civilização (`src/pages/CivilizationPage.tsx`), alimentada pelos arquivos `docs/lore/<RAÇA>.json` e `<RAÇA>_CIVILIZATION.json` (nomes do chat).

- Páginas `/reptilians` e `/mantis` com dossiê + arquivo de civilização do chat; o dossiê virou componente genérico (`RaceDossier`) e os dados de dossiê e civilização são lidos de `docs/lore/` (`src/data/lore/dossier.ts` e `civilization.ts`). Todas as raças têm página de arquivo agora.

- Os arquivos que o chat gravou direto em `docs/lore/` (nomes em maiúsculas) viraram a fonte única; as cópias que eu tinha feito foram apagadas. Chegou o `NORDICS.json`, ligado à página `/nordics`. O chat também gravou `THE_FOUR_EXILES_RACAS.docx` em `docs/lore/` (mantido como está).

- **2026-10-21 — Roteiro dos Grays** (agente Diretor + roteiristas, skills screenwriting-skills): pasta `docs/roteiro/grays/` com `story-bible.md` (direção, pendências), `pesquisa-folclore.md` (teorias da web com fontes), `historia-dos-grays.md` (seis eras + 12 incidentes do folclore como relatórios Gray) e `narrativa-sete.md` (tratamento de longa *Zero Discrepâncias*, 36 cenas, 3 cenas de amostra). Dono aprovou as propostas como provisórias; Atos I, II-A e II-B escritos (`ato-1.fountain`, `ato-2a.fountain`, `ato-2b.fountain`, cenas 1–30). Tudo provisório; não entrou no site nem no `GRAYS.json`.

- **2026-10-21 — Bíblias das Civilizações:** o Diretor revisou o documento do chat (`docs/lore/revisao-biblias-civilizacoes.md`: bom com correções só para os Grays) e preparou o resumo prático das quatro raças para o site (`docs/lore/resumo-racas.md`: quem são, o que querem da Terra, como agem, ponto fraco, relações e matriz). No site desde 2026-10-21: `src/data/raceProfiles.ts` (EN e PT-BR), seção "O que querem da Terra" e "Como veem as outras raças" em cada página de raça (`/factions/<raça>`) e matriz de relações em `/factions`, tudo com selo "Provisório". Prévia republicada.

- **2026-10-21 — Plano da v1:** o Diretor comparou a ideia inicial com o repositório (`docs/PLANO_V1.md`): o que já existe, o desvio "escolha seu lado" x Resistência e o que falta para colocar a primeira versão no ar.

- **2026-10-21 — Escolha sua raça e Temporada 0:** página `/choose` (teste de 6 perguntas, escolha direta, carteirinha do Censo em PNG, tudo salvo só no navegador), selo da raça no cabeçalho, bloco "Por que ficar com eles" em cada raça, e `/season-0`, a liga dos personagens de IA (12 personagens, feed de propaganda e registro de pontos). A Temporada 1, das pessoas, aparece zerada. Enquadramento aprovado: nenhuma raça é vilã; a Resistência narra.

- **2026-10-21 — Kit grátis por raça:** seção "Vista a sua raça" em cada `/factions/<raça>`: wallpapers de celular e computador, avatar com emblema e com personagem, 4 figurinhas 512×512 com fundo transparente e gerador de memes com 3 sugestões, tudo gerado no navegador a partir da ficha oficial e baixado em PNG (`src/components/kit/`, textos em `src/data/kit.ts`). Limite: os retratos oficiais têm 310×516 px, então as artes com personagem usam no máximo ~2× de ampliação; fichas em resolução maior melhorariam tudo.

- **2026-10-22 — Fichas 3D:** nove fichas 3D novas em `design/sheets/*-3d.jpg`; `design/crop-sheets.cjs` estendido (recorta cada vista e um retrato da vista de frente para `public/images/characters/<id>-3d*.webp`). Site usa os retratos novos nas raças, as figuras novas na Resistência e o giro 3D com 5 a 6 vistas. Para rodar o script: `npm i --no-save sharp` e depois `node design/crop-sheets.cjs`.

- **2026-10-22 — Nomes, rostos e comunidade:** nomes em inglês (VELLUM, AUREL, SAZAR, VEX; Ray, Olivia, Julian, Tasha; Dora igual) em todo o repositório; nove rostos oficiais em `design/sheets/*-face.jpg` usados como imagem principal; planta do servidor no Discord em `docs/COMUNIDADE.md` e convite ligado no site (Escolha sua raça e página de cada raça), mostrando "em breve" até o dono colar o link em `src/data/community.ts`. **Avisar o projeto do chat** dos nomes novos (os arquivos de lore já foram atualizados aqui).

- **2026-10-22 — Fichas 3D em resolução original:** as nove fichas em `design/sheets/*-3d.jpg` foram trocadas pelos arquivos originais (2752×1536; VELLUM 1440×2912), cerca de 1,4× maiores. `design/crop-sheets.cjs` agora escala as coordenadas para o tamanho real de cada ficha; os recortes do giro 3D passaram de ~985 para ~1355 px de altura.

- **2026-10-22 — Privacidade e termos:** páginas `/privacy` e `/terms` com textos reais (LGPD, Marco Civil, CDC), seções numeradas, data de atualização, bloco de contato e botão para apagar os dados guardados no navegador. Faltam o responsável, o e-mail e a hospedagem em `src/data/legal.ts` (o site mostra "a definir").

- **2026-10-22 — Pré-lançamento, parte 1:** trilha sonora gerada por raça (botão de som no cabeçalho, desligada por padrão; `src/audio/music.ts`); falas dos nove personagens em balões nas raças e na Resistência (`src/data/voices.ts`; guia de gravação `docs/VOZES.md`; botão "Ouvir" aparece quando o MP3 estiver em `public/audio/voices/` e listado em `src/data/voiceFiles.ts`); loja `/store` com 5 produtos e artes de impressão (`design/store-art.cjs`, guia `docs/LOJA.md`). Mercado saiu do menu principal (está no rodapé).

- **2026-10-22 — Missões reais (código pronto, banco ainda não ligado):** migração `supabase/migrations/20261022120000_season1_missions.sql` (perfis com apelido e raça, moderadores, missões, envios com link ou imagem, eventos de pontos, limite de 10 envios por dia, pontos lançados quando a moderação aprova, placar público por função, bucket privado de imagens de até 5 MB). No site: entrada por código de 6 dígitos no e-mail, perfil (apelido + raça), formulário de envio em cada missão, lista "seus envios", página `/moderation` e placar da Temporada 1 lido do banco. As quatro missões estão abertas. Privacidade e termos atualizados para contas. Enquanto `src/lib/supabase.ts` estiver sem URL e chave, o envio mostra "em breve".

- **2026-10-22 — Banco ligado, login e segurança:** projeto Supabase `the-four-exiles` (`qcnomemkcjrhhzcsrabk`, East US, Free) com as migrações aplicadas. Login no site todo: botão "Entrar" no cabeçalho (mostra o apelido depois de entrar) e página `/account` (e-mail, raça travada, apelido editável, todos os envios com status, sair, apagar a conta com imagens e pontos). Banco reforçado (`20261022150000_account_safety.sql`): apelido único, raça fixa na temporada, moderação só muda status e recado, exclusão da própria conta. Revisão de segurança: 21 testes de permissão com usuários simulados passaram (transação desfeita); achado e corrigido um erro na regra de link que barrava todo envio com link; react-router-dom 6.30.6 e supabase-js 2.118.0 (falhas conhecidas). Pendências abaixo.

**Próximos passos sugeridos**
- **E-mail de login (feito em 2026-10-22):** SMTP próprio pelo Resend (dono criou a conta e colou a chave; limite subiu para 30 e-mails por hora) e modelos "Magic link or OTP" e "Confirm sign up" trocados para mostrar o código de 6 dígitos, em PT e EN. Remetente provisório `onboarding@resend.dev`, que só entrega para o e-mail dono da conta Resend.
- **Antes de abrir ao público:** (1) verificar um domínio no Resend e trocar o remetente em Supabase → Authentication → Emails → SMTP Settings; (2) ligar CAPTCHA (Turnstile ou hCaptcha) contra cadastro em massa; (3) o dono entra no site uma vez e eu insiro o id dele em `public.moderators`.
- Segurança restante: react-router 6 tem 2 avisos moderados que só somem na versão 7 (o site não redireciona para endereços vindos do usuário); ao escolher a hospedagem, configurar cabeçalhos (CSP, HSTS, X-Content-Type-Options, Referrer-Policy).
- Supabase ligado: projeto `the-four-exiles` (`qcnomemkcjrhhzcsrabk`, RF group, East US, plano Free), migração aplicada e URL/chave em `src/lib/supabase.ts`. Falta o dono: trocar o modelo de e-mail "Magic Link" para mostrar `{{ .Token }}` e inserir o id do dono em `public.moderators`.
- Robôs no Discord (aguardando o servidor).
- Dono preenche `src/data/legal.ts` (responsável, e-mail, hospedagem) e revisa os textos jurídicos.
- Dono cria o servidor no Discord seguindo `docs/COMUNIDADE.md` e cola o convite em `src/data/community.ts`.
- Itens que ainda bloqueiam a v1 (`docs/PLANO_V1.md`): servidor da comunidade criado, dados do responsável em `legal.ts`, hospedagem e domínio, imagem de prévia nos links.
- Dono aprova (ou ajusta) o resumo das raças e as relações; quando aprovar, trocar o status em `src/data/raceProfiles.ts` para cânone.
0. Roteiro dos Grays: Ato III (cenas 31–36), quando o dono mandar, e o mesmo tratamento para Nórdicos, Reptilianos e Mantis.
1. **Decidir quem é O Soberano** (SAZAR, como na ficha, ou KRAHL-VOR, como no dossiê) e os **planetas natais** (Thaxis/Sarrath, Xhalen/Threnn). Ver `docs/DECISOES.md`.
2. No chat: corrigir `GRAYS.json` (AUREL, SAZAR e VEX como Grays), alinhar a aparência dos Mantis com a ficha e usar "Mantis" em vez de "Insetoides".
3. Alinhar Sael: o site o descreve como ex-jardineiro desertor; o `NORDICS.json`, como diplomata.
4. Aprovar ou ajustar os itens provisórios das quatro raças e os nomes de personagens propostos.
5. Fase 2: arquivo de lore completo (capítulos, transmissões, documentos) e galeria de personagens ampliada.

**Atenção**
- 2026-10-21: o chat dizia "acesso bloqueado" porque a pasta anexada (`C:\Users\robson.freitas\Claude`) não existe no computador do usuário `Robson`. Lá a pasta é `C:\Users\Robson\Claude`; é preciso anexá-la no projeto do chat. Instruções e diagnóstico em `docs/NOTEBOOK.md` e `docs/INSTRUCOES_PROJETO_CHAT.md` (as instruções do projeto do chat precisam ser recopiadas).
- O Claude Code faz os commits. O Claude do chat, se não tiver terminal, deixa os arquivos na pasta do projeto e pede o commit.

## Histórico

- 2026-10-19 — Fase 1 do site (React, bilíngue, dados simulados). Arte SVG provisória.
- 2026-10-20 — Imagens de referência; "facção" virou "raça"; redesenho estilo Apple; GitHub criado; link de prévia; projeto movido para `C:\Users\robson.freitas\Claude`; fichas oficiais e seções 3D; vínculo com o projeto PROJECT MASTER.
