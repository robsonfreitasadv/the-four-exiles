# Plano da primeira versão no ar (v1)

**Status:** proposta do Diretor · 2026-10-21 · comparação entre a ideia inicial do dono e o que o repositório tem hoje. Decisões ficam em `DECISOES.md`.

## A ideia inicial em uma frase

Um portal onde cada pessoa **escolhe uma das quatro raças**, cria vínculo com ela (cultura, memes, personagens, produtos) e compete num campeonato comunitário. A monetização vem de produtos físicos e digitais; tokens são o ápice, só depois de validar comunidade, marca, custos, segurança e estrutura jurídica (Fase 4). A própria ideia já define a ordem: universo → disputa → monetização → tokens.

## O que já temos (Fase 1, protótipo)

| Item da ideia | Situação |
| --- | --- |
| Universo, sinal de 2049, as quatro raças | Pronto: páginas das raças, dossiês e arquivos de civilização, resumo de ambições e matriz de relações (provisórios). |
| Personagens com a mesma qualidade, reconhecíveis | Fichas oficiais das quatro raças e da Resistência, giro 3D, expressões, emblemas SVG. Falta resolução maior. |
| Lore: capítulos, alianças, rivalidades | Dossiês e lore no site; roteiro *Zero Discrepâncias* (Atos I–II-B) só no repositório. |
| Ranking das raças (campeonato) | Tabela Guerra Galáctica com dados **fictícios**, regras de pontuação sem mercado. |
| Missões | Quatro missões demo; aceitar é simulado no navegador. |
| Colecionáveis / loja | Só conceitos (pôster, carimbo, caneca, livro). Sem loja. |
| Mercado | Página que diz claramente que não há token. Correto para a fase. |
| Transparência | Página pronta (estágio, regras, limitações). |
| Bilíngue EN / PT-BR | Pronto. |
| Privacidade e termos | Esqueleto com campos “[Provisório]”. |
| Hospedagem e domínio | **Não há.** Só a prévia privada no claude.ai. |

## O desvio mais importante: "escolha seu lado" x "a Resistência"

A ideia inicial diz: *a humanidade escolhe uma das quatro raças; nenhuma raça é oficialmente a vilã; as pessoas escolhem por identificação.* O universo construído depois colocou **a Resistência humana (Dora) contra as quatro raças**, e os textos das raças descrevem planos sombrios para a Terra (coleta com "consentimento presumido", "remoção de ervas daninhas", extermínio avaliado por desempenho). Isso é ótimo para roteiro, mas atrapalha o modelo de negócio: o visitante tende a torcer pela Resistência, não por uma raça, e não há motivo positivo para "vestir a camisa" de nenhuma delas.

Opções (decisão do dono):
1. **A Resistência vira a quinta torcida.** Simples, mas divide a comunidade em cinco.
2. **A Resistência é o narrador, não um time.** Dora e a equipe contam a história e organizam o Censo; quem entra escolhe uma das quatro raças. *(recomendação do Diretor)*
3. **Humanos escolhem a raça como "embaixadores"**: cada pessoa é um humano que se alia a uma raça e tenta convencê-la a tratar bem a Terra. Combina com a opção 2 e dá papel ao visitante dentro da história.

Em qualquer opção, cada raça precisa de um bloco **"Por que escolher esta raça"**: virtudes, o que ela oferece à humanidade e o tipo de pessoa que se identifica (o burocrata, o idealista, o estrategista, o disciplinado). Hoje o site só mostra defeitos e contradições.

## Andamento (2026-10-21)

- **Feito:** enquadramento aprovado (nenhuma raça é vilã; a Resistência narra); virtudes por raça; "Escolha sua raça" com teste e carteirinha do Censo (`/choose`); Temporada 0 com personagens de IA identificados (`/season-0`); placar da Temporada 1 zerado.
- **Falta:** itens 3, 4, 6, 7 e 8 abaixo.

## O que falta para colocar a v1 no ar

### Bloqueia o lançamento
1. **Decidir o enquadramento** acima e escrever as virtudes de cada raça (o Diretor e os roteiristas fazem em uma rodada).
2. **Mecânica "Escolha sua raça"** sem conta e sem banco de dados: um teste curto de afinidade (5–7 perguntas) ou escolha direta, que salva a raça no navegador, muda o visual do site para as cores dela e gera uma **carteirinha do Censo** para compartilhar (imagem com nome, raça e número).
3. **Kit gratuito por raça**: wallpaper, avatar, figurinhas e modelos de meme. É o produto digital de custo zero que a ideia propõe para testar o interesse.
4. **Canal da comunidade** por raça (Discord com quatro salas, ou grupos no WhatsApp/Telegram), com link no site. Sem isso não há onde a comunidade interagir.
5. **Campeonato honesto na estreia**: trocar os números fictícios por "Temporada 1 começa em [data]" e placar zerado, ou manter o selo de demonstração bem visível.
6. **Privacidade e termos reais** (LGPD): contato, o que é coletado, licença do conteúdo enviado pela comunidade. Precisa de revisão jurídica antes de receber envios.
7. **Hospedagem e domínio**: o `npm run build:static` já gera um site estático que roda de graça (Cloudflare Pages, Netlify ou GitHub Pages). O domínio cabe na reserva de até R$ 80.
8. **Compartilhamento**: imagem e texto de prévia (Open Graph) por página e por raça, para os links ficarem bonitos em redes sociais.

### Logo depois (Fase 2: testar a disputa)
- Missões reais de memes e arte, com envio por formulário ou pelo canal da comunidade, moderação manual e **registro público de pontos** (quem, quando, qual regra) na página de Transparência.
- Calendário da Temporada 1 e regras contra contas falsas e spam.
- Lore em capítulos curtos no site (o roteiro dos Grays rende uma série de capítulos ou HQ).
- Contas de redes sociais por raça, com propaganda galáctica de uma contra a outra.

### Fase 3: testar a monetização
- Loja com produção sob demanda (sem estoque), começando por camisetas, adesivos e pôsteres das quatro raças.
- Pacotes digitais pagos de baixo custo, com descrição clara do que se compra.
- Pré-venda de merchandising só com prazo de entrega e reembolso definidos.
- Artes das fichas em alta resolução (pendência aberta) antes de qualquer produto físico.

### Fase 4: tokens (o ápice, não agora)
Conforme a própria ideia e as regras do projeto, nada de token, ticker, preço ou data antes de validar comunidade, custos, segurança e estrutura jurídica, inclusive com especialista sobre a regulação de criptoativos no Brasil. A pontuação do campeonato nunca vem de mercado. Vale testar primeiro se um único token do universo funciona melhor que quatro.

## Pendências de cânone que não impedem a v1
Soberano (SAZHI ou KRAHL-VOR), planetas natais, comandante e motivação dos Mantis, Sael, alturas. O site pode estrear com os selos de "Provisório"; o importante é não apresentar provisório como oficial.
