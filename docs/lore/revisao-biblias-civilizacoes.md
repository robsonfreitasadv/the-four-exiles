# Revisão: "Bíblias das Civilizações" (revisão pt-BR, 21/10/2026)

**Status:** parecer do Diretor (guardião do cânone + roteirista de mundo) · 2026-10-21 · para o dono e para o projeto do chat corrigirem o documento-fonte.

## Veredito

**Bom com correções, e só para os Grays.** Para Nórdicos, Reptilianos e Mantis o documento é um andaime, não uma base de roteiro. Ele reformata os dossiês de `docs/lore/*.json`, traz pouco conteúdo novo e, ao reformatar, reintroduz conflitos que o dono já resolveu e apaga trechos de que o roteiro depende. **Não deve substituir** `docs/canon/racas.md`, `docs/DECISOES.md` nem os JSON. O resumo para o site (`resumo-racas.md`) segue o cânone e usa o documento só onde ele acrescenta.

## Conflitos com decisões aprovadas

1. **SAZAR e VEX listados como Grays** (arquivista dissidente, agente de contenção). Pela decisão de 2026-10-20, são Reptiliano e Mantis. VELLUM aparece como "raça a confirmar", mas já é Gray.
2. **"Insetoides"** em títulos e referências; a decisão aprovada é **Mantis**. Falta VEX (a ficha); IXUL-DRA ocupa o comando.
3. **Soberano = KRAHL-VOR**, sem citar SAZAR nem a Dinastia de Sazhath. O tema está em aberto; o documento escolheu sem avisar.
4. **Planetas** Vaelor, Sarrath, Threnn (o site usa Maia-Prime, Thaxis, Xhalen; em aberto).
5. **Alturas e aparência** divergentes das fichas oficiais: Nórdicos 1,85–2,10 m (ficha 1,8–2,2); Reptilianos 1,90–2,30 (2–2,5) e sem olhos amarelos, armadura vermelha e dourada e capa; Mantis 1,7–2,0 (≈ 2,3), quatro braços e olhos avermelhados (a ficha mostra olhos compostos verdes, antenas, casaco). A regra visual "não há folha aprovada" está errada: `design/sheets/races.webp` tem as quatro raças.
6. **Motivações aprovadas apagadas:** decadência genética dos Grays; Plano Jardim dos Nórdicos (e Sael como ex-jardineiro); a água da Terra, os herdeiros incompetentes e os disfarces dos Reptilianos; o negócio de armas dos Mantis (o documento põe "armas" como pergunta aberta). Faltam as reivindicações no Censo e os títulos (Escrivães, Pastores, Dinastia de Sazhath, Comandantes).
7. **Lemas** diferentes dos da ficha oficial (decisão de 2026-10-20).
8. **"Facção"** em três lugares (usar "corrente" para grupos internos e "raças" para o público). "Censo Galáctico" x "Censo Intergaláctico" (`CONTEXTO.md`).
9. **Estado do cânone superestimado:** dos Grays, só os sete itens `CANON_APPROVED` são cânone. Os códigos DEC-001 a DEC-005 não existem em `DECISOES.md`.

## Atritos com o roteiro dos Grays (`docs/roteiro/grays/`)

- O documento omite o que o roteiro usa: descarte de "autonomia excessiva" na certificação (base do fantasma Seis), clonagem e variantes, os rótulos confirmado / inferido / não verificado / não autorizado, os personagens propostos (NIRA-TOLL, PEL-ODRU, DRAV-KESS, SEIS, Hélio) e o modelo de trabalho da antiga decisão.
- **Escritório de Previsão de Riscos** e **Conselho de Continuidade** (propostos) se sobrepõem a OPHELIA-3/Câmara, ao POT-7 e à corrente Continuísta, e dariam ao público um suspeito pronto para a Q5. **Recomendação do Diretor: adiar.** O mandato do Arquivo Central e a Certificação de Confiabilidade são compatíveis (com o descarte restaurado).
- N1, I1 e R1 ainda perguntam se cada raça participou da antiga aliança; o dono já aprovou (provisório) a política comum das quatro raças na Era IV. Bom achado: os Nórdicos chamam a Era IV de "Acordo", os Mantis de "Pacto" e os Reptilianos de "Compacto". Três nomes para o mesmo evento podem virar ponto de roteiro.
- TERCE-OHM aparece como "Guardiã" no documento e "Guardião" no JSON e no roteiro.

## O que o documento traz de novo

Instituições Gray propostas e o mandato do Arquivo Central; direção visual Gray (geometria funcional, cor como sinal de função); AUREL como Tutora / orientadora de transição; armas como pergunta aberta para três raças; perguntas novas (N4 Sael é nórdico?, N5, I4/R4 região da galáxia, I5/R5 armas); os três nomes da Era IV. O resto é reformulação, e perde as personalidades e contradições dos Grays TERCE-OHM, KAEL-RUUM, OPHELIA-3 e ZEN-VARO e as relações dos personagens nórdicos.

## Lacunas para roteiro

- **Todas:** relações entre as raças (o documento só diz "ambíguas com os Grays"); a marca de cada raça no selo da Era IV; expectativa de vida; nada sobre o Contrato do Censo, a cláusula 4.812-c e a Resistência.
- **Grays:** o que querem da Terra em concreto; custo social da contenção.
- **Nórdicos:** o Plano Jardim como ambição; o que fazem quando a persuasão falha (N3); um rival na Terra.
- **Reptilianos:** uso concreto da água da Terra; o herdeiro incompetente; o frio como fraqueza.
- **Mantis:** quem compra as armas e o que é testado; Dora como "oponente digna" de VEX.

`resumo-racas.md` preenche as relações e as ambições, tudo marcado como provisório.

## Pendências para o dono

1. Soberano: SAZAR (ficha) ou KRAHL-VOR (chat).
2. Planetas natais.
3. Comandante dos Mantis (VEX ou IXUL-DRA) e a motivação: negócio de armas (cânone) ou dever (chat). O resumo combina: o dever como método, o negócio como fim.
4. Sael: ex-jardineiro desertor (site) ou diplomata (chat).
5. Alturas: seguir a ficha oficial ou ajustá-la.
6. Escritório de Previsão de Riscos e Conselho de Continuidade: aceitar, rejeitar ou adiar.
7. Aprovar, ajustar ou cortar as relações entre raças de `resumo-racas.md`.

## Ajustes para o chat fazer no documento (sem decisão do dono)

Tirar SAZAR e VEX da lista Gray; trocar "Insetoides" por "Mantis"; restaurar descarte, clonagem, rótulos e personalidades; corrigir o estado do cânone e a regra visual; trocar "facção" por "corrente"; corrigir acentos e hífens perdidos (IXUL DRA, KRAHL VOR, SSARA MIN); usar datas em vez de DEC-00n.
