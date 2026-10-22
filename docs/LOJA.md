# Loja: primeiros produtos

**Status:** provisório · 2026-10-22 · a vitrine já está no site (`/store`); os botões dizem "Em breve" até o link de cada produto ser colado em `src/data/store.ts`.

## Modelo

Impressão sob demanda numa loja brasileira (por exemplo Reserva INK, Colab55 ou UmaPenca; confira a que tiver melhor produto e repasse na sua região). A loja produz, cobra, entrega e cuida de trocas; o projeto não guarda estoque nem dados de pagamento. O site mostra os produtos e leva à página de compra da loja parceira.

## Os cinco produtos e os arquivos

Os arquivos de impressão são gerados por `node design/store-art.cjs` (depois de `npm i --no-save sharp`) e ficam em `design/store/` (não vão para o Git, porque são grandes e se refazem em segundos). As prévias do site ficam em `public/images/store/`.

| Produto | Raça | Arquivo | Tamanho | Sugestão de peça |
| --- | --- | --- | --- | --- |
| Camiseta "Deferido" | Grays | `grays-deferido.png` | 4500×5400, fundo transparente | camiseta preta ou chumbo, estampa frontal |
| Caneca "Está tudo bem" | Nórdicos | `nordics-esta-tudo-bem.png` | 2475×1050 (arte envolvente) | caneca branca 325 ml |
| Camiseta SAZAR "Controle o fluxo" | Reptilianos | `reptilians-controle-o-fluxo.png` | 4500×5400, fundo transparente | camiseta preta, estampa frontal |
| Pôster VEX "Disciplina é liberdade" | Mantis | `mantis-disciplina-e-liberdade.png` | A3, 3508×4961 (300 dpi) | pôster fosco A3 |
| Camiseta "Humanos. Não o inimigo." | Resistência | `resistencia-humanos.png` | 4500×5400, fundo transparente | camiseta preta, estampa frontal |

As artes usam apenas as fichas oficiais (`design/sheets/*-face.jpg`) e os emblemas das raças. Textos em português; uma versão em inglês pode vir depois.

## Passo a passo

1. Crie a conta de criador(a) na loja escolhida (é você quem aceita os termos dela e cadastra os dados de recebimento).
2. Para cada produto: suba o arquivo, escolha a peça e as cores sugeridas, confira o posicionamento na prévia da loja, defina o preço (o repasse é seu) e publique.
3. Copie o link de cada produto publicado e cole em `src/data/store.ts`, no campo `url` do produto (só links `https://`). Ou me mande os links que eu coloco.
4. Publique o site de novo: os botões passam a "Comprar na loja parceira".

## Antes de vender

- Confirme na loja: prazo de produção e entrega, política de trocas e quem emite a nota.
- A página de termos já diz que compra, preço, entrega e trocas são com a loja parceira; se a loja exigir algo a mais, me avise.
- Não anuncie como "edição limitada" ou "colecionável com valor" (regra do projeto: nada de promessa financeira).
