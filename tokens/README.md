# Meme coins dos fãs — THE FOUR EXILES

**Status: pronto para implantar** (regra aprovada pelo dono em 2026-11-03: o projeto tem meme coins de fãs, lançadas fora do Brasil). A implantação na rede principal é feita pelo dono, com a carteira dele (seção "Rede principal").

Cinco moedas ERC-20 na rede **Base**, uma por raça e uma da Resistência, com os nomes das raças em inglês. Nomes e tickers mudam num só lugar: `coins.config.js`.

| Lado | Nome | Ticker | Imagem |
| --- | --- | --- | --- |
| Grays | Grays | GRAYS | VELLUM |
| Nórdicos | Nordics | NORDIC | AUREL |
| Reptilianos | Reptilians | REPTILE | SAZAR |
| Mantis | Mantis | MANTIS | VEX |
| Resistência | Resistance | RESIST | Dora |

Tickers conferidos no CoinGecko em 2026-11-03: nenhum dos cinco existe lá. Existe uma moeda chamada "Mantis" (ticker M), sem conflito de ticker. Conferir também no BaseScan na véspera.

**Alternativas** (trocar em `coins.config.js` e rodar `npm run logos` e `npm test`):

| Lado | Opção 1 | Opção 2 | Opção 3 |
| --- | --- | --- | --- |
| Grays | Greys · GREYS | Gray Scribes · SCRIBE | Grays of Hevra · HEVRA |
| Nórdicos | Nordics · NORDICS | Pleiadians · PLEIAD | Nordics of Maia · MAIA |
| Reptilianos | Reptilian · REPTO | Draco · DRACO | Reptilians of Thaxis · THAXIS |
| Mantis | Mantis Commanders · MANTIX | Mantids · MANTID | Mantis of Xhalen · XHALEN |
| Resistência | Human Resistance · HUMANS | The Resistance · RESISTANCE | Earth · EARTH |

GREYS, NORDICS, REPTO, HUMANS e RESISTANCE também estavam livres no CoinGecko; as demais não foram conferidas (DRACO e EARTH são nomes comuns e provavelmente já existem).

**Suprimento:** 4.812.000.000 de cada (18 casas decimais), cunhado uma única vez, na implantação, para uma carteira escolhida pelo dono.

## O que o contrato faz e não faz

`contracts/ExileCoin.sol` é um ERC-20 do OpenZeppelin 5 sem nada a mais:

- **Faz:** nome, ticker, saldo, transferência, autorização (`approve`/`transferFrom`) e um `metadataURI` fixo.
- **Não tem:** dono, mint depois da implantação, taxa em transferência, pausa, lista de bloqueio, função de atualização. Depois de implantado, ninguém (nem o dono) muda nada. Os testes conferem que o contrato expõe só essas funções.

Metadados em `metadata/<id>.json` (nome, ticker, descrição em EN e PT-BR, imagem) e logos 512×512 em `metadata/images/`, recortados dos rostos oficiais (`public/images/characters/*-face.webp`) por `npm run logos`. Toda descrição termina com "sem utilidade e sem promessa de valor", e um teste barra preço, data, "lançamento", "valorização", "lucro" e afins.

## Rodar os testes

Requer Node 20 ou mais novo. Tudo dentro de `tokens/`, que é separado do site:

```bash
cd tokens
npm install
npm test
```

Resultado em 2026-11-03 (nomes das raças): **39 testes passando** (contrato, as cinco moedas, metadados e regras de texto), num nó Hardhat em memória.

## Implantar num nó local

Dois terminais, dentro de `tokens/`:

```bash
npm run node
```

```bash
npm run deploy:local
```

Os endereços ficam em `deployments/localhost.json` (fora do git). O nó local usa contas de teste públicas do Hardhat, sem valor nenhum.

## Implantar na rede de teste (Base Sepolia)

ETH de teste não vale dinheiro e sai de graça em torneiras (faucets) da Base Sepolia.

1. Crie uma carteira **só para testes** (por exemplo, uma conta nova na MetaMask) e pegue ETH de teste da Base Sepolia numa torneira.
2. Copie `env.example` para `.env` (dentro de `tokens/`; o `.env` fica fora do git) e preencha `DEPLOYER_PRIVATE_KEY` com a chave dessa carteira de teste.
3. Rode:

```bash
npm run deploy:sepolia
```

4. Confira os endereços em https://sepolia.basescan.org e no arquivo `deployments/baseSepolia.json` (pode ir para o git: não tem segredo).

## Rede principal (Base): passos do dono, com a carteira dele

Nada disso foi feito nem será feito pelo Claude. É o dono, na carteira dele, depois de decidir.

1. **Nomes finais:** confirmar os nomes e tickers da tabela do topo (ou trocar por uma alternativa em `coins.config.js`, rodar `npm run logos` e `npm test`).
2. **Conferir os tickers na véspera:** procurar GRAYS, NORDIC, REPTILE, MANTIS e RESIST no CoinGecko, no CoinMarketCap e no BaseScan.
3. **Publicar os metadados:** juntar este branch em `main` para que os links `raw.githubusercontent.com/.../main/tokens/metadata/...` funcionem. Alternativa mais durável: subir `metadata/` para o IPFS e pôr o endereço em `METADATA_BASE_URL` antes de implantar (o `metadataURI` fica gravado para sempre no contrato).
4. **Carteiras:** uma carteira nova só para pagar a implantação, com pouco ETH na Base. Em `RECIPIENT_ADDRESS`, a carteira que guarda o suprimento; de preferência um cofre multiassinatura (Safe), não a carteira de implantação.
5. **Ensaio:** implantar antes na Base Sepolia (seção anterior) e conferir tudo.
6. **Implantar:** no PowerShell, dentro de `tokens/` (a trava recusa a rede principal sem a confirmação):

```powershell
$env:CONFIRM_MAINNET='I_UNDERSTAND'; npm run deploy:base; Remove-Item Env:CONFIRM_MAINNET
```

7. **Verificar o código no BaseScan** (precisa de `ETHERSCAN_API_KEY`), uma vez por moeda, com os valores de `deployments/base.json`:

```bash
npx hardhat verify --network base <endereço> "Grays" GRAYS 4812000000 <carteira que recebeu> <metadataURI>
```

8. **Depois:** apagar a chave do `.env`, fazer commit de `deployments/base.json` e, se quiser, pedir a atualização das informações do token (logo e site) no BaseScan.

Criar pool de liquidez, listar em corretora ou distribuir moedas são decisões à parte, do dono.

**Regra do projeto (continua):** pontos do campeonato e das missões do site nunca dependem de preço, volume, valor de mercado ou saldo de carteira; ter ou não as moedas não dá vantagem no jogo.
