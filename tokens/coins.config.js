// The five fan meme coins, named after the races (tickers checked free on CoinGecko, 2026-11-03);
// change them here only. Supply is fixed and identical for all five.
// Rule: no price, launch date or promise of value in any text below.

const SUPPLY = 4_812_000_000n; // whole tokens: a nod to clause 4.812-c of the Census

const METADATA_BASE =
  process.env.METADATA_BASE_URL ||
  'https://raw.githubusercontent.com/robsonfreitasadv/the-four-exiles/main/tokens/metadata';

const coins = [
  {
    id: 'grays',
    name: 'Grays',
    symbol: 'GRAYS',
    face: 'vhal-ett-face.webp',
    description: {
      en: 'Fan meme coin of the Grays, The Scribes of Hevra, who filed 40,000 complaints about human genetic chaos. Procedure is protection. A collectible joke from THE FOUR EXILES, a sci-fi satire: no utility, no promise of value.',
      'pt-BR': 'Meme coin de fã dos Grays, Os Escrivães de Hevra, que protocolaram 40.000 reclamações contra o caos genético humano. Procedimento é proteção. Uma piada colecionável de THE FOUR EXILES, sátira de ficção científica: sem utilidade e sem promessa de valor.',
    },
  },
  {
    id: 'nordics',
    name: 'Nordics',
    symbol: 'NORDIC',
    face: 'ilvani-face.webp',
    description: {
      en: 'Fan meme coin of the Nordics, The Shepherds of Maia-Prime, hosts of the third dessert nobody manages to refuse. A better world is possible. A collectible joke from THE FOUR EXILES, a sci-fi satire: no utility, no promise of value.',
      'pt-BR': 'Meme coin de fã dos Nórdicos, Os Pastores de Maia-Prime, anfitriões da terceira sobremesa que ninguém consegue recusar. Um mundo melhor é possível. Uma piada colecionável de THE FOUR EXILES, sátira de ficção científica: sem utilidade e sem promessa de valor.',
    },
  },
  {
    id: 'reptilians',
    name: 'Reptilians',
    symbol: 'REPTILE',
    face: 'sazhi-face.webp',
    description: {
      en: 'Fan meme coin of the Reptilians, the Dynasty of Sazhath on Thaxis. One drop from the House of Cisterns, checked twice before anyone says thank you. Control the flow, control the future. A collectible joke from THE FOUR EXILES, a sci-fi satire: no utility, no promise of value.',
      'pt-BR': 'Meme coin de fã dos Reptilianos, a Dinastia de Sazhath em Thaxis. Uma gota da Casa das Cisternas, conferida duas vezes antes de alguém agradecer. Controle o fluxo, controle o futuro. Uma piada colecionável de THE FOUR EXILES, sátira de ficção científica: sem utilidade e sem promessa de valor.',
    },
  },
  {
    id: 'mantis',
    name: 'Mantis',
    symbol: 'MANTIS',
    face: 'xhalen-kthrix-face.webp',
    description: {
      en: 'Fan meme coin of the Mantis, The Commanders of Xhalen. Every threat in writing, every tone cordial. Discipline is freedom. A collectible joke from THE FOUR EXILES, a sci-fi satire: no utility, no promise of value.',
      'pt-BR': 'Meme coin de fã dos Mantis, Os Comandantes de Xhalen. Toda ameaça por escrito, todo tom cordial. Disciplina é liberdade. Uma piada colecionável de THE FOUR EXILES, sátira de ficção científica: sem utilidade e sem promessa de valor.',
    },
  },
  {
    id: 'resistance',
    name: 'Resistance',
    symbol: 'RESIST',
    face: 'dora-face.webp',
    description: {
      en: 'Fan meme coin of the human Resistance, led by Dora from Fortaleza, who found clause 4.812-c, the loophole nobody in the Census checked: does Earth get a vote? Humans. Not the enemy. A collectible joke from THE FOUR EXILES, a sci-fi satire: no utility, no promise of value.',
      'pt-BR': 'Meme coin de fã da Resistência humana, liderada por Dora, de Fortaleza, que achou a cláusula 4.812-c, a brecha que ninguém no Censo conferiu: a Terra tem direito a voto? Humanos. Não o inimigo. Uma piada colecionável de THE FOUR EXILES, sátira de ficção científica: sem utilidade e sem promessa de valor.',
    },
  },
];

const metadataURI = (coin) => `${METADATA_BASE}/${coin.id}.json`;

module.exports = { SUPPLY, METADATA_BASE, coins, metadataURI };
