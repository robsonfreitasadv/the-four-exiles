# Plano de lançamento com foco em receita

**Status:** provisório · proposta do agente de marketing, revisada em 2026-11-03 · aguarda aprovação do dono. As taxas marcadas "(est.)" são estimativas; confira a página oficial de preços antes de assinar qualquer plataforma.

## Estratégia

O ativo mais forte do projeto é o conteúdo, não a moeda: a série de 33 episódios, o álbum, as estampas e a carteirinha do Censo. A série atrai o público no YouTube e nos vídeos curtos, e esse público é levado para um só lugar (site, Discord e lista de e-mail). A primeira receita vem de itens sem estoque: álbum em PDF, estampas sob demanda e apoio dos fãs. As meme coins só entram quando a comunidade e a receita mostrarem que o projeto se sustenta sem elas.

## Fase 0: base e canais (semanas 1–2)

**Objetivo:** ter domínio, e-mail e contas para receber dinheiro e falar com o público.

| # | Passo | Quem faz |
| --- | --- | --- |
| 1 | Comprar o domínio .com (cerca de R$ 80 por ano, da reserva) | Dono |
| 2 | Criar o e-mail do projeto (Cloudflare Email Routing ou Zoho, ambos gratuitos, est.) | Dono |
| 3 | Reservar o mesmo @ no YouTube, TikTok, Instagram, X e Reddit | Dono |
| 4 | Criar o Discord seguindo `docs/COMUNIDADE.md` e colocar o convite em `src/data/community.ts` | Dono cria o servidor, Claude liga ao site |
| 5 | Preencher o responsável em `src/data/legal.ts` (pessoa física ou MEI) | Dono decide, Claude preenche |
| 6 | Ligar o login do Google e refazer o SMTP com o domínio novo | Dono no painel, Claude no código |
| 7 | Apontar o domínio para o GitHub Pages e criar a imagem de prévia dos links (Open Graph) | Claude |
| 8 | Ligar o CAPTCHA (Turnstile) | Dono gera as chaves, Claude faz o código |
| 9 | **Produzir com antecedência os episódios E01–E03**, com vozes e edição | Ver abaixo |

O passo 9 foi acrescentado na revisão: os episódios existem só como roteiro. Pelo `formato-youtube.md`, cada um tem de 11 a 15 minutos, feito com as fichas animadas (paralaxe e zoom), a narração de Dora e as vozes dos personagens. Cada episódio precisa de gravação de voz e edição. Por isso, a estreia só acontece com três episódios já prontos.

- **Custo:** R$ 80 a R$ 100.
- **Duração:** 10 a 14 dias.
- **Critério para passar à Fase 1:**
  - o site abre no domínio;
  - o Discord está ligado ao site;
  - o e-mail recebe mensagens;
  - o login funciona de ponta a ponta;
  - não há "a definir" no `legal.ts`;
  - E01–E03 estão editados.

## Fase 1: audiência (semanas 2–6, em paralelo com a Fase 2)

**Objetivo:** 1.000 inscritos no YouTube e 300 pessoas na lista de e-mail ou no Discord.

| # | Passo | Quem faz |
| --- | --- | --- |
| 1 | Publicar **1 episódio por semana**, com legenda em inglês e português, e manter sempre 2 episódios prontos de reserva. O agente sugeria 2 por semana, mas isso não é sustentável para uma pessoa só. | Roteirista prepara, dono grava e sobe, Claude escreve títulos, descrições e capítulos |
| 2 | Tirar 3 clipes verticais de 30 a 45 segundos de cada episódio, para Shorts, TikTok e Reels | Claude escolhe os trechos, dono edita |
| 3 | Publicar 1 post por dia no X: uma ficha de caso ufológico real com o "parecer do Censo", usando o material das 24 figurinhas de casos | Designer e Claude |
| 4 | Usar a carteirinha do Censo como isca de compartilhamento ("qual raça é você?"), com o link no perfil e na descrição, nunca dentro do vídeo | Claude |
| 5 | Participar de comunidades de ufologia, ficção científica e memes, seguindo as regras de cada uma, sem spam | Dono |
| 6 | Montar a lista de e-mail (Buttondown ou Beehiiv, gratuitos, est.), oferecendo o kit grátis por raça | Dono cria a conta, Claude faz o formulário |
| 7 | Medir toda semana: inscritos, visualizações, carteirinhas e entradas no Discord | Claude |

- **Custo:** R$ 0 a R$ 150 (programa de edição).
- **Critério para passar à Fase 3:**
  - 1.000 inscritos;
  - 300 pessoas na lista ou no Discord;
  - 500 carteirinhas;
  - 10 mil visualizações somadas.

## Fase 2: primeira receita (semanas 2–5, junto com a Fase 1)

**Objetivo:** os primeiros R$ 500 a R$ 1.000 de receita bruta, sem estoque.

1. Aprovar o álbum (`design/album/checklist.md`) e fechar a edição em inglês. Dono e designer.
2. Vender o **álbum em PDF para imprimir** a um preço baixo, por exemplo R$ 29 a 39 ou US$ 6 a 9; o preço final é decisão do dono. No Brasil, Kiwify ou Hotmart (com Pix); fora dele, Gumroad ou Lemon Squeezy.
3. Vender pacotes digitais: figurinhas por raça, wallpapers e avatares. Designer.
4. Abrir o apoio dos fãs: Ko-fi lá fora, Apoia.se ou Catarse no Brasil. Os benefícios são episódio antecipado, nome nos créditos e uma sala exclusiva no Discord.
5. Abrir uma loja sob demanda com só 5 produtos, a partir de `design/print/`: Printify ou Printful ligado à Etsy. No Brasil, pesquisar um fornecedor sob demanda nacional.
6. Criar a página `/store` no site, só com links externos. O site continua sem carteira e sem transação.
7. Fazer uma compra de teste em cada plataforma antes de divulgar.
8. Anunciar no Discord, na lista e nas descrições, sem urgência falsa.

- **Custo:** R$ 0 a R$ 400. Evite a Shopify no início (US$ 29 a 39 por mês).
- **Critério para passar à Fase 3:**
  - 30 vendas ou apoiadores;
  - R$ 1.000 de receita bruta;
  - nenhum problema de entrega em aberto.

## Fase 3: escalar o que funciona (semanas 6–12)

**Objetivo:** R$ 2.000 a R$ 3.000 por mês de receita recorrente e 2.500 pessoas na comunidade.

1. Reforçar o canal que mais vendeu e cortar o resto.
2. Lançar o **álbum físico** em pré-venda, só depois de 150 compradores do PDF.
3. Fazer um sorteio semanal de envelopes digitais no Discord: 5 figurinhas, resgatadas por código.
4. Ativar a monetização do YouTube (confira as regras vigentes do programa de parceiros).
5. Abrir a Temporada 1 do campeonato com pessoas, sem pontos vindos de mercado.
6. Procurar 3 parcerias: podcasts de ufologia, canais de ficção científica e eventos de quadrinhos. Claude prepara o material, o dono envia.

- **Custo:** R$ 0 a R$ 1.500 (gráfica; o custo cai se a pré-venda pagar a tiragem).

## Fontes de receita (por velocidade)

| Fonte | Prazo | Margem | Plataformas | Taxa aproximada |
| --- | --- | --- | --- | --- |
| Álbum em PDF e pacotes digitais | Dias | Quase total | Kiwify ou Hotmart; Gumroad ou Lemon Squeezy | Gumroad: 10% + US$ 0,50 por venda, mais o cartão. Kiwify e Hotmart: cerca de 8–10% (est.) |
| Apoio dos fãs | 1–2 semanas | Alta | Apoia.se, Catarse; Ko-fi, Patreon | Ko-fi: 0% em doações no plano grátis. As outras: 5–10% (est.) |
| Estampas sob demanda | 2–3 semanas | Baixa a média | Printify, Printful, Etsy | Cerca de US$ 5–12 de lucro por peça (est.) |
| YouTube | 6–12 semanas | Média | YouTube | O YouTube fica com cerca de 45% dos anúncios (est.) |
| Álbum físico | 8–12 semanas | Média, com risco | Gráfica | A cotar |
| Licenciamento e parcerias | 3 meses ou mais | Variável | Contato direto | Nenhuma |
| NFT | Não priorizar | Incerta | — | As 12 candidatas ficam guardadas |

## Calendário das primeiras 4 semanas

| Semana | Conteúdo |
| --- | --- |
| 1 (preparação) | Teaser de 15 s do sinal de 2049 no X e no TikTok. Post fixo "faça sua carteirinha do Censo". Abertura do Discord. Um caso ufológico por dia no X (Roswell, Varginha, Phoenix, Nimitz). |
| 2 (estreia) | **E01** e 3 clipes. Post "qual raça é você?". Primeiro e-mail da lista. Um post útil no Reddit. |
| 3 | **E02** e clipes. Carrosséis com os rostos de VELLUM e Dora. Um post por raça. Abertura da lista de espera do álbum. |
| 4 (primeira oferta) | **E03** e clipes. Abertura da venda do álbum em PDF e do apoio. Mockups das estampas oficiais. Balanço com os números reais no Discord. |

## Quando lançar as meme coins

Todas as condições abaixo precisam valer, medidas e anotadas pelo dono:

1. **Comunidade:** 2.500 membros somando Discord e lista, 40% deles ativos nos últimos 30 dias, e 1.500 carteirinhas.
2. **Receita:** R$ 5.000 brutos acumulados e 2 meses seguidos de receita recorrente, sem depender das moedas.
3. **Marca:** pelo menos 12 episódios publicados e a Temporada 1 em andamento.
4. **Segurança:** implantação testada na Base Sepolia e símbolos conferidos no CoinGecko e no BaseScan na véspera.

Como lançar sem prejudicar a marca:

- Apresentar como "meme coins de fãs, sem utilidade e sem promessa de valor".
- Nunca citar preço, meta ou prazo.
- Só o dono implanta, com a carteira dele, fora do Brasil.
- Publicar o contrato oficial uma única vez, na página de Transparência e no Discord, para evitar golpes com contratos falsos.
- Nada no campeonato, no álbum ou nas missões depende das moedas.
- No Discord, a regra é clara: a equipe não fala de cotação, e golpes e "airdrops" falsos são removidos.

## Riscos

| Risco | Como reduzir |
| --- | --- |
| Pouca tração no YouTube | Clipes curtos todo dia, testar 3 ganchos por semana, usar o X como segundo canal |
| O dono ficar sobrecarregado pela produção dos vídeos | 1 episódio por semana, 2 sempre de reserva; Claude e os agentes cuidam dos textos e da arte |
| Associação com golpes de cripto | Moedas só no fim, aviso fixo, nunca mencionar preço |
| Pessoas reais citadas nos episódios | Revisar os nomes (`formato-youtube.md` §8) antes de publicar |
| Pagamentos e impostos | Começar como pessoa física ou MEI e guardar os relatórios das plataformas |
| Álbum físico encalhado | Só depois de 150 compradores do PDF, em pré-venda |
| Resolução das imagens | Usar as fichas 3D e não ampliar mais de 2× |

## O que o dono faz esta semana

1. Comprar o domínio e criar o e-mail do projeto.
2. Reservar o @ do projeto no YouTube, X, TikTok, Instagram e Reddit.
3. Criar o Discord e mandar o convite.
4. Decidir o responsável (pessoa física ou MEI).
5. Aprovar o álbum e escolher o preço do PDF.
6. Decidir como gravar as vozes: a sua, de atores ou de amigos.
7. Criar as contas na Kiwify ou Gumroad, no Ko-fi e no Apoia.se.
