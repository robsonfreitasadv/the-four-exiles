import type { Localized } from './types';

export interface InfoBlock {
  title: Localized;
  items: Localized[];
}

export const transparencyBlocks: InfoBlock[] = [
  {
    title: { en: 'Project stage', 'pt-BR': 'Estágio do projeto' },
    items: [
      { en: 'This is an MVP front-end prototype (Phase 1 of 4).', 'pt-BR': 'Este é um protótipo de front-end MVP (Fase 1 de 4).' },
      { en: 'All content runs from local mock data. There is no database or server.', 'pt-BR': 'Todo o conteúdo vem de dados locais simulados. Não há banco de dados nem servidor.' },
    ],
  },
  {
    title: { en: 'Implemented', 'pt-BR': 'Implementado' },
    items: [
      { en: 'Homepage, race profiles, missions, and the Galactic War demo table.', 'pt-BR': 'Página inicial, perfis das raças, missões e a tabela demo da Guerra Galáctica.' },
      { en: 'English and Brazilian Portuguese interface, remembered in this browser.', 'pt-BR': 'Interface em inglês e português brasileiro, lembrada neste navegador.' },
    ],
  },
  {
    title: { en: 'Experimental', 'pt-BR': 'Experimental' },
    items: [
      { en: 'Character art comes from the official character sheets. The 3D turntable steps through the sheet’s turnaround views; it is not a live 3D model.', 'pt-BR': 'As artes vêm das fichas oficiais dos personagens. O giro em 3D alterna as vistas de rotação da ficha; não é um modelo 3D em tempo real.' },
      { en: 'Accepting a mission is simulated locally. Nothing is submitted and no reward is issued.', 'pt-BR': 'Aceitar uma missão é simulado localmente. Nada é enviado e nenhuma recompensa é concedida.' },
    ],
  },
  {
    title: { en: 'Data limitations', 'pt-BR': 'Limitações dos dados' },
    items: [
      { en: 'Season 0 is played only by AI characters, labeled as such on every post and score. Their points never carry over to seasons played by people.', 'pt-BR': 'A Temporada 0 é disputada só por personagens de IA, identificados em cada post e pontuação. Os pontos deles nunca passam para temporadas disputadas por pessoas.' },
      { en: 'No number on this site represents real users, real submissions, or real activity. AI characters never pose as people.', 'pt-BR': 'Nenhum número deste site representa usuários, envios ou atividades reais. Personagens de IA nunca se passam por pessoas.' },
    ],
  },
  {
    title: { en: 'Community scoring rules', 'pt-BR': 'Regras de pontuação comunitária' },
    items: [
      { en: 'Points come only from community creations, completed missions, and lore votes.', 'pt-BR': 'Pontos vêm apenas de criações da comunidade, missões concluídas e votações de enredo.' },
      { en: 'Token price, trading volume, market capitalization, wallet balances, and purchases never add points.', 'pt-BR': 'Preço de token, volume negociado, valor de mercado, saldos de carteira e compras nunca somam pontos.' },
      { en: 'Every future score change will be logged with its source and rule so it can be audited.', 'pt-BR': 'Toda alteração futura de pontuação será registrada com sua origem e regra, para que possa ser auditada.' },
    ],
  },
  {
    title: { en: 'No live token transactions', 'pt-BR': 'Nenhuma transação de token' },
    items: [
      { en: 'There is no token, no wallet connection, no smart contract, and no payment of any kind.', 'pt-BR': 'Não há token, conexão de carteira, contrato inteligente nem pagamento de qualquer tipo.' },
    ],
  },
];

export const collectibleConcepts: { title: Localized; kind: Localized }[] = [
  { title: { en: 'Census Contract Poster', 'pt-BR': 'Pôster do Contrato do Censo' }, kind: { en: 'Print concept', 'pt-BR': 'Conceito de pôster' } },
  { title: { en: 'Gray Rubber Stamp', 'pt-BR': 'Carimbo Gray' }, kind: { en: 'Merch concept', 'pt-BR': 'Conceito de produto' } },
  { title: { en: 'Nordic “Everything Is Fine” Mug', 'pt-BR': 'Caneca nórdica “Está Tudo Bem”' }, kind: { en: 'Merch concept', 'pt-BR': 'Conceito de produto' } },
  { title: { en: 'Xhalen Surrender Procedure (900 pp.)', 'pt-BR': 'Procedimento de Rendição Xhalen (900 p.)' }, kind: { en: 'Book concept', 'pt-BR': 'Conceito de livro' } },
];
