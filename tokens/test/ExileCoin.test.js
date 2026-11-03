const fs = require('node:fs');
const path = require('node:path');
const { expect } = require('chai');
const { ethers } = require('hardhat');
const { loadFixture } = require('@nomicfoundation/hardhat-toolbox/network-helpers');
const { SUPPLY, coins, metadataURI } = require('../coins.config');
const { deployAll } = require('../scripts/deploy');

const UNITS = SUPPLY * 10n ** 18n;
const ERC20_FUNCTIONS = [
  'allowance', 'approve', 'balanceOf', 'decimals', 'name',
  'symbol', 'totalSupply', 'transfer', 'transferFrom',
];

async function deployFiveFixture() {
  const [deployer, holder, fan, other] = await ethers.getSigners();
  const result = await deployAll({ recipient: holder.address });
  const tokens = await Promise.all(
    result.coins.map((c) => ethers.getContractAt('ExileCoin', c.address)),
  );
  return { deployer, holder, fan, other, result, tokens };
}

describe('ExileCoin contract', function () {
  it('exposes only the ERC-20 functions plus metadataURI (no mint, owner, pause, blocklist or fee)', async function () {
    const Factory = await ethers.getContractFactory('ExileCoin');
    const functions = Factory.interface.fragments
      .filter((f) => f.type === 'function')
      .map((f) => f.name)
      .sort();
    expect(functions).to.deep.equal([...ERC20_FUNCTIONS, 'metadataURI'].sort());
  });

  it('rejects a zero recipient and a zero supply', async function () {
    const [deployer] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory('ExileCoin');
    await expect(Factory.deploy('X', 'X', 1n, ethers.ZeroAddress, ''))
      .to.be.revertedWithCustomError(Factory, 'ZeroRecipient');
    await expect(Factory.deploy('X', 'X', 0n, deployer.address, ''))
      .to.be.revertedWithCustomError(Factory, 'ZeroSupply');
  });
});

describe('The five coins', function () {
  it('deploys one coin per race plus the Resistance', async function () {
    const { result } = await loadFixture(deployFiveFixture);
    expect(result.coins.map((c) => c.id)).to.deep.equal(['grays', 'nordics', 'reptilians', 'mantis', 'resistance']);
  });

  for (const [i, coin] of coins.entries()) {
    describe(`${coin.symbol} (${coin.name})`, function () {
      it('has the configured name, symbol, decimals and metadata URI', async function () {
        const { tokens } = await loadFixture(deployFiveFixture);
        expect(await tokens[i].name()).to.equal(coin.name);
        expect(await tokens[i].symbol()).to.equal(coin.symbol);
        expect(await tokens[i].decimals()).to.equal(18n);
        expect(await tokens[i].metadataURI()).to.equal(metadataURI(coin));
      });

      it('mints the whole fixed supply once, to the recipient', async function () {
        const { tokens, holder, deployer } = await loadFixture(deployFiveFixture);
        expect(await tokens[i].totalSupply()).to.equal(UNITS);
        expect(await tokens[i].balanceOf(holder.address)).to.equal(UNITS);
        expect(await tokens[i].balanceOf(deployer.address)).to.equal(0n);
      });

      it('transfers the exact amount (no fee) and never changes the supply', async function () {
        const { tokens, holder, fan, other } = await loadFixture(deployFiveFixture);
        const amount = 4812n * 10n ** 18n;
        await expect(tokens[i].connect(holder).transfer(fan.address, amount))
          .to.changeTokenBalances(tokens[i], [holder, fan], [-amount, amount]);
        await expect(tokens[i].connect(fan).transfer(other.address, amount))
          .to.changeTokenBalances(tokens[i], [fan, other], [-amount, amount]);
        expect(await tokens[i].totalSupply()).to.equal(UNITS);
      });

      it('lets any holder move tokens, including back to the deployer (no blocklist)', async function () {
        const { tokens, holder, fan, deployer } = await loadFixture(deployFiveFixture);
        await tokens[i].connect(holder).transfer(fan.address, 10n);
        await expect(tokens[i].connect(fan).transfer(deployer.address, 10n)).to.not.be.reverted;
      });

      it('supports approve and transferFrom', async function () {
        const { tokens, holder, fan, other } = await loadFixture(deployFiveFixture);
        await tokens[i].connect(holder).approve(fan.address, 100n);
        await expect(tokens[i].connect(fan).transferFrom(holder.address, other.address, 100n))
          .to.changeTokenBalances(tokens[i], [holder, other], [-100n, 100n]);
        await expect(tokens[i].connect(fan).transferFrom(holder.address, other.address, 1n))
          .to.be.revertedWithCustomError(tokens[i], 'ERC20InsufficientAllowance');
      });
    });
  }
});

describe('Coin configuration and metadata', function () {
  // No price, launch date or promise of value anywhere (project rule).
  const FORBIDDEN = /price|preço|preco|launch|lançamento|lancamento|moon|valoriza|invest|profit|lucro|rendimento|retorno|airdrop|presale|pré-venda|guarantee|garant|\b20\d\d\b/i;
  const META = path.join(__dirname, '..', 'metadata');

  it('has five unique, well-formed tickers and names', function () {
    const symbols = coins.map((c) => c.symbol);
    expect(new Set(symbols).size).to.equal(5);
    expect(new Set(coins.map((c) => c.name)).size).to.equal(5);
    for (const s of symbols) expect(s).to.match(/^[A-Z0-9]{3,6}$/);
  });

  for (const coin of coins) {
    it(`${coin.symbol}: metadata JSON matches the config and the logo exists`, function () {
      const meta = JSON.parse(fs.readFileSync(path.join(META, `${coin.id}.json`), 'utf8'));
      expect(meta.name).to.equal(coin.name);
      expect(meta.symbol).to.equal(coin.symbol);
      expect(meta.decimals).to.equal(18);
      expect(meta.description).to.equal(coin.description.en);
      expect(meta.description_pt_BR).to.equal(coin.description['pt-BR']);
      expect(meta.image.endsWith(`/images/${coin.id}.png`)).to.equal(true);
      expect(fs.existsSync(path.join(META, 'images', `${coin.id}.png`))).to.equal(true);
    });

    it(`${coin.symbol}: texts say "no promise of value" and carry no price, date or hype`, function () {
      for (const text of [coin.name, coin.description.en, coin.description['pt-BR']]) {
        expect(text).to.not.match(FORBIDDEN);
      }
      expect(coin.description.en).to.include('no promise of value');
      expect(coin.description['pt-BR']).to.include('sem promessa de valor');
    });
  }
});
