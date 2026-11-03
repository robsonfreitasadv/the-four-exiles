require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

// Private keys only come from tokens/.env (never committed). Without a key,
// the public networks are configured with no accounts and deploys stop early.
const key = process.env.DEPLOYER_PRIVATE_KEY;
const accounts = key ? [key] : [];

module.exports = {
  solidity: {
    version: '0.8.28',
    settings: { optimizer: { enabled: true, runs: 200 }, evmVersion: 'cancun' },
  },
  networks: {
    hardhat: {},
    localhost: { url: 'http://127.0.0.1:8545' },
    baseSepolia: {
      url: process.env.BASE_SEPOLIA_RPC_URL || 'https://sepolia.base.org',
      chainId: 84532,
      accounts,
    },
    base: {
      url: process.env.BASE_RPC_URL || 'https://mainnet.base.org',
      chainId: 8453,
      accounts,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || '',
  },
  sourcify: { enabled: true },
};
