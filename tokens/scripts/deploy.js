// Deploys the five ExileCoins and records the addresses in deployments/<network>.json.
//   npm run deploy:local     (needs `npm run node` in another terminal)
//   npm run deploy:sepolia   (Base Sepolia testnet, key in tokens/.env)
//   npm run deploy:base      (Base mainnet: only the owner, only with CONFIRM_MAINNET)
const fs = require('node:fs');
const path = require('node:path');
const hre = require('hardhat');
const { SUPPLY, coins, metadataURI } = require('../coins.config');

const MAINNET_CHAIN_IDS = new Set([8453n, 1n]);

async function deployAll({ recipient } = {}) {
  const [deployer] = await hre.ethers.getSigners();
  if (!deployer) {
    throw new Error('No deployer account: set DEPLOYER_PRIVATE_KEY in tokens/.env');
  }
  const to = recipient || process.env.RECIPIENT_ADDRESS || deployer.address;
  if (!hre.ethers.isAddress(to)) throw new Error(`Invalid RECIPIENT_ADDRESS: ${to}`);

  const Factory = await hre.ethers.getContractFactory('ExileCoin');
  const deployed = [];
  for (const coin of coins) {
    const token = await Factory.deploy(coin.name, coin.symbol, SUPPLY, to, metadataURI(coin));
    await token.waitForDeployment();
    deployed.push({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      address: await token.getAddress(),
      txHash: token.deploymentTransaction()?.hash,
      metadataURI: metadataURI(coin),
    });
  }
  return { deployer: deployer.address, recipient: to, coins: deployed };
}

async function main() {
  const { chainId } = await hre.ethers.provider.getNetwork();
  if (MAINNET_CHAIN_IDS.has(chainId) && process.env.CONFIRM_MAINNET !== 'I_UNDERSTAND') {
    throw new Error(
      'Mainnet deploy is permanent. Follow "Rede principal" in tokens/README.md, ' +
        'then set CONFIRM_MAINNET=I_UNDERSTAND for this one command.',
    );
  }

  const result = await deployAll();
  const record = { network: hre.network.name, chainId: chainId.toString(), supply: SUPPLY.toString(), ...result };
  const dir = path.join(__dirname, '..', 'deployments');
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${hre.network.name}.json`);
  fs.writeFileSync(file, JSON.stringify(record, null, 2) + '\n');

  console.log(`Network ${hre.network.name} (chain ${chainId}); supply goes to ${result.recipient}`);
  for (const c of result.coins) console.log(`  ${c.symbol.padEnd(6)} ${c.address}  ${c.name}`);
  console.log(`Saved ${path.relative(process.cwd(), file)}`);
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err.message || err);
    process.exitCode = 1;
  });
}

module.exports = { deployAll };
