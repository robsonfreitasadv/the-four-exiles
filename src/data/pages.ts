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
      { en: 'Character art is concept placeholder art and will be replaced by final illustrations.', 'pt-BR': 'As artes dos personagens são provisórias e serão substituídas por ilustrações finais.' },
      { en: 'Accepting a mission is simulated locally. Nothing is submitted and no reward is issued.', 'pt-BR': 'Aceitar uma missão é simulado localmente. Nada é enviado e nenhuma recompensa é concedida.' },
    ],
  },
  {
    title: { en: 'Data limitations', 'pt-BR': 'Limitações dos dados' },
    items: [
      { en: 'Every score and statistic on this site is fictional demo data.', 'pt-BR': 'Toda pontuação e estatística deste site é dado fictício de demonstração.' },
      { en: 'No demo number represents real users, real submissions, or real activity.', 'pt-BR': 'Nenhum número de demonstração representa usuários, envios ou atividades reais.' },
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

export const privacyBlocks: InfoBlock[] = [
  {
    title: { en: 'What this site stores', 'pt-BR': 'O que este site armazena' },
    items: [
      { en: 'Your language choice and any demo missions you accept, saved only in your own browser (localStorage).', 'pt-BR': 'Sua escolha de idioma e as missões demo que você aceitar, salvas apenas no seu navegador (localStorage).' },
      { en: '[Placeholder] Describe analytics, cookies, and third-party services here before launch.', 'pt-BR': '[Provisório] Descreva aqui análises, cookies e serviços de terceiros antes do lançamento.' },
    ],
  },
  {
    title: { en: 'Contact', 'pt-BR': 'Contato' },
    items: [{ en: '[Placeholder] Add a contact address for privacy requests.', 'pt-BR': '[Provisório] Adicione um endereço de contato para solicitações de privacidade.' }],
  },
];

export const termsBlocks: InfoBlock[] = [
  {
    title: { en: 'Fiction', 'pt-BR': 'Ficção' },
    items: [
      { en: 'THE FOUR EXILES is a work of fiction. Any resemblance to real aliens is coincidental.', 'pt-BR': 'THE FOUR EXILES é uma obra de ficção. Qualquer semelhança com alienígenas reais é coincidência.' },
      { en: 'Nothing on this site is financial, legal, or investment advice.', 'pt-BR': 'Nada neste site é recomendação financeira, jurídica ou de investimento.' },
    ],
  },
  {
    title: { en: 'Community content', 'pt-BR': 'Conteúdo da comunidade' },
    items: [{ en: '[Placeholder] Define ownership and licensing of community submissions before accepting any.', 'pt-BR': '[Provisório] Defina a titularidade e o licenciamento dos envios da comunidade antes de aceitar qualquer um.' }],
  },
];

export const collectibleConcepts: { title: Localized; kind: Localized }[] = [
  { title: { en: 'Census Contract Poster', 'pt-BR': 'Pôster do Contrato do Censo' }, kind: { en: 'Print concept', 'pt-BR': 'Conceito de pôster' } },
  { title: { en: 'Vhal-Ett Rubber Stamp', 'pt-BR': 'Carimbo Vhal-Ett' }, kind: { en: 'Merch concept', 'pt-BR': 'Conceito de produto' } },
  { title: { en: 'Ilvani “Everything Is Fine” Mug', 'pt-BR': 'Caneca Ilvani “Está Tudo Bem”' }, kind: { en: 'Merch concept', 'pt-BR': 'Conceito de produto' } },
  { title: { en: 'Xhalen Surrender Procedure (900 pp.)', 'pt-BR': 'Procedimento de Rendição Xhalen (900 p.)' }, kind: { en: 'Book concept', 'pt-BR': 'Conceito de livro' } },
];
