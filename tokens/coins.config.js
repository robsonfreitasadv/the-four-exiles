// The five fan meme coins. Names and tickers are provisional (see docs/DECISOES.md);
// change them here only. Supply is fixed and identical for all five.
// Rule: no price, launch date or promise of value in any text below.

const SUPPLY = 4_812_000_000n; // whole tokens: a nod to clause 4.812-c of the Census

const METADATA_BASE =
  process.env.METADATA_BASE_URL ||
  'https://raw.githubusercontent.com/robsonfreitasadv/the-four-exiles/main/tokens/metadata';

const coins = [
  {
    id: 'grays',
    name: 'Form 40,000',
    symbol: 'F40K',
    face: 'vhal-ett-face.webp',
    description: {
      en: 'Fan meme coin of the Grays, The Scribes of Hevra. Named after the 40,000 complaints they filed about human genetic chaos. Procedure is protection. A collectible joke from THE FOUR EXILES, a sci-fi satire: no utility, no promise of value.',
      'pt-BR': 'Meme coin de fã dos Grays, Os Escrivães de Hevra. O nome lembra as 40.000 reclamações que eles protocolaram contra o caos genético humano. Procedimento é proteção. Uma piada colecionável de THE FOUR EXILES, sátira de ficção científica: sem utilidade e sem promessa de valor.',
    },
  },
  {
    id: 'nordics',
    name: 'Third Dessert',
    symbol: 'DSSRT',
    face: 'ilvani-face.webp',
    description: {
      en: 'Fan meme coin of the Nordics, The Shepherds of Maia-Prime. Named after the third dessert nobody manages to refuse. A better world is possible. A collectible joke from THE FOUR EXILES, a sci-fi satire: no utility, no promise of value.',
      'pt-BR': 'Meme coin de fã dos Nórdicos, Os Pastores de Maia-Prime. O nome lembra a terceira sobremesa que ninguém consegue recusar. Um mundo melhor é possível. Uma piada colecionável de THE FOUR EXILES, sátira de ficção científica: sem utilidade e sem promessa de valor.',
    },
  },
  {
    id: 'reptilians',
    name: 'Cistern Drop',
    symbol: 'CSTRN',
    face: 'sazhi-face.webp',
    description: {
      en: 'Fan meme coin of the Reptilians, the Dynasty of Sazhath on Thaxis. One drop from the House of Cisterns, checked twice before anyone says thank you. Control the flow, control the future. A collectible joke from THE FOUR EXILES, a sci-fi satire: no utility, no promise of value.',
      'pt-BR': 'Meme coin de fã dos Reptilianos, a Dinastia de Sazhath em Thaxis. Uma gota da Casa das Cisternas, conferida duas vezes antes de alguém agradecer. Controle o fluxo, controle o futuro. Uma piada colecionável de THE FOUR EXILES, sátira de ficção científica: sem utilidade e sem promessa de valor.',
    },
  },
  {
    id: 'mantis',
    name: 'Courteous Threat',
    symbol: 'CRTSY',
    face: 'xhalen-kthrix-face.webp',
    description: {
      en: 'Fan meme coin of the Mantis, The Commanders of Xhalen. Every threat in writing, every tone cordial. Discipline is freedom. A collectible joke from THE FOUR EXILES, a sci-fi satire: no utility, no promise of value.',
      'pt-BR': 'Meme coin de fã dos Mantis, Os Comandantes de Xhalen. Toda ameaça por escrito, todo tom cordial. Disciplina é liberdade. Uma piada colecionável de THE FOUR EXILES, sátira de ficção científica: sem utilidade e sem promessa de valor.',
    },
  },
  {
    id: 'resistance',
    name: 'Clause 4812-c',
    symbol: 'C4812',
    face: 'dora-face.webp',
    description: {
      en: 'Fan meme coin of the human Resistance, led by Dora from Fortaleza. Named after clause 4.812-c, the loophole nobody in the Census checked: does Earth get a vote? Humans. Not the enemy. A collectible joke from THE FOUR EXILES, a sci-fi satire: no utility, no promise of value.',
      'pt-BR': 'Meme coin de fã da Resistência humana, liderada por Dora, de Fortaleza. O nome lembra a cláusula 4.812-c, a brecha que ninguém no Censo conferiu: a Terra tem direito a voto? Humanos. Não o inimigo. Uma piada colecionável de THE FOUR EXILES, sátira de ficção científica: sem utilidade e sem promessa de valor.',
    },
  },
];

const metadataURI = (coin) => `${METADATA_BASE}/${coin.id}.json`;

module.exports = { SUPPLY, METADATA_BASE, coins, metadataURI };
