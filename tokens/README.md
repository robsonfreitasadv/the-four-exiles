# Meme coins dos fãs — THE FOUR EXILES

**Status: em aberto.** Hoje `CLAUDE.md` e `docs/DECISOES.md` dizem que o projeto não tem token e que nunca se inventa token, ticker, preço ou data de lançamento. Este código existe porque o dono pediu, mas nada daqui vai para a rede principal, nem para o site, antes de o dono decidir essa mudança de regra (ver `docs/DECISOES.md`, "Em aberto").

Cinco moedas ERC-20 na rede **Base**, uma por raça e uma da Resistência. Nomes e tickers são **provisórios** e mudam num só lugar: `coins.config.js`.

| Lado | Nome | Ticker | Piada | Imagem |
| --- | --- | --- | --- | --- |
| Grays | Form 40,000 | F40K | as 40.000 reclamações protocoladas contra o caos genético humano | VELLUM |
| Nórdicos | Third Dessert | DSSRT | a terceira sobremesa que ninguém consegue recusar | AUREL |
| Reptilianos | Cistern Drop | CSTRN | a gota da Casa das Cisternas, conferida antes do obrigado | SAZAR |
| Mantis | Courteous Threat | CRTSY | ameaça sempre por escrito, tom sempre cordial | VEX |
| Resistência | Clause 4812-c | C4812 | a brecha do Censo: a Terra tem direito a voto? | Dora |

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

Resultado em 2026-11-03: **39 testes passando** (contrato, as cinco moedas, metadados e regras de texto), num nó Hardhat em memória.

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

1. **Decidir a regra:** aprovar (ou não) em `docs/DECISOES.md` a mudança "o projeto passa a ter meme coins de fãs" e atualizar `CLAUDE.md` e `docs/CONTEXTO.md` para combinar. Ler "Antes de lançar", abaixo.
2. **Conferir os tickers:** procurar F40K, DSSRT, CSTRN, CRTSY e C4812 no CoinGecko, no CoinMarketCap e no BaseScan. Se algum já existir, trocar em `coins.config.js`, rodar `npm run logos` e `npm test`.
3. **Publicar os metadados:** juntar este branch em `main` para que os links `raw.githubusercontent.com/.../main/tokens/metadata/...` funcionem. Alternativa mais durável: subir `metadata/` para o IPFS e pôr o endereço em `METADATA_BASE_URL` antes de implantar (o `metadataURI` fica gravado para sempre no contrato).
4. **Carteiras:** uma carteira nova só para pagar a implantação, com pouco ETH na Base. Em `RECIPIENT_ADDRESS`, a carteira que guarda o suprimento; de preferência um cofre multiassinatura (Safe), não a carteira de implantação.
5. **Ensaio:** implantar antes na Base Sepolia (seção anterior) e conferir tudo.
6. **Implantar:** no PowerShell, dentro de `tokens/` (a trava recusa a rede principal sem a confirmação):

```powershell
$env:CONFIRM_MAINNET='I_UNDERSTAND'; npm run deploy:base; Remove-Item Env:CONFIRM_MAINNET
```

7. **Verificar o código no BaseScan** (precisa de `ETHERSCAN_API_KEY`), uma vez por moeda, com os valores de `deployments/base.json`:

```bash
npx hardhat verify --network base <endereço> "Form 40,000" F40K 4812000000 <carteira que recebeu> <metadataURI>
```

8. **Depois:** apagar a chave do `.env`, fazer commit de `deployments/base.json` e, se quiser, pedir a atualização das informações do token (logo e site) no BaseScan.

Criar pool de liquidez, listar em corretora ou distribuir moedas são decisões à parte, com os riscos abaixo.

## Antes de lançar (riscos jurídicos no Brasil, para o dono avaliar)

Notas de partida, não parecer. O dono é advogado e decide.

- **Lei 14.478/2022 (marco dos ativos virtuais).** As moedas se encaixam na definição de ativo virtual (art. 3º). Emitir e distribuir um token próprio não torna ninguém, por si só, prestadora de serviços de ativos virtuais, mas troca, custódia, intermediação ou venda em nome de terceiros podem tornar (art. 5º), e aí entra a autorização do Banco Central, designado regulador pelo Decreto 11.563/2023 (conferir a regulamentação do BCB em vigor). A lei também criou o crime de fraude com ativos virtuais (art. 171-A do Código Penal).
- **CVM, Parecer de Orientação 40/2022.** O token vira valor mobiliário quando funciona como contrato de investimento coletivo (Lei 6.385/1976, art. 2º, IX): investimento, expectativa de benefício econômico, esforço do empreendedor ou de terceiros e oferta pública. Promessa de valorização, plano de recompra, participação em receita do site ou da loja, "roadmap" ligado ao preço ou venda direta pelo projeto puxam para esse lado. Por isso o contrato não tem funções extras e os textos dizem "sem utilidade e sem promessa de valor". Se for valor mobiliário, a oferta segue as regras da CVM (Resolução CVM 88/2022 para ofertas por plataforma, entre outras).
- **CDC e publicidade.** Oferta e publicidade precisam ser claras e verdadeiras (arts. 30, 31, 36 e 37): nada de sugerir ganho, escassez artificial ou "oportunidade". Cuidado redobrado com menores: o site aceita contas a partir de 13 anos, então as moedas não devem ser anunciadas no site, nas missões nem para esse público. Personagens de IA nunca falam de token (regra aprovada em 2026-10-21).
- **Regra do projeto (não muda):** pontos do campeonato e das missões **nunca** dependem de preço, volume, valor de mercado ou saldo de carteira. Ter ou não ter as moedas não dá vantagem nenhuma no site.
- **Também conferir:** declaração e tributação de operações com ativos virtuais na Receita Federal (IN RFB 1.888/2019 e alterações), termos de uso e privacidade do site (hoje dizem "nada financeiro"), e uso dos nomes e imagens dos personagens na licença do kit de fã.
