import type { LoreStatus } from './lore/dossier';
import type { FactionId, Localized } from './types';

/**
 * Practical race summary: what each race wants from Earth, how it acts, its weak point
 * and how it sees the others. Source: docs/lore/resumo-racas.md (2026-10-21).
 * Everything here is PROVISIONAL until the owner approves it; the site shows the badge.
 */

export type Viewee = FactionId | 'humans';

export interface RaceProfile {
  id: FactionId;
  status: LoreStatus;
  earthAmbition: Localized;
  howTheyAct: Localized;
  weakness: Localized;
  /** Longer relation text, shown on the race page. */
  relations: Partial<Record<Viewee, Localized>>;
  /** One-line cell for the relations matrix (row = this race looking at the column). */
  matrix: Record<Viewee, Localized>;
}

export const raceProfiles: RaceProfile[] = [
  {
    id: 'grays',
    status: 'PROVISIONAL',
    earthAmbition: {
      en: 'Genetic diversity. Generations of cloning left their genome too uniform, and they are dying of being alike. If they win the Census, Earth becomes a sample bank: a genetic registry of humanity, collections with “presumed consent” and a field office on every continent. Nobody gets hurt on purpose. Everybody gets filed, just in case.',
      'pt-BR': 'Diversidade genética. Gerações de clonagem deixaram o genoma uniforme demais, e eles estão morrendo de ser parecidos. Se ganharem o Censo, a Terra vira banco de amostras: cadastro genético da humanidade, coletas com “consentimento presumido” e um escritório de campo em cada continente. Ninguém é machucado de propósito. Todo mundo é arquivado por precaução.',
    },
    howTheyAct: {
      en: 'They observe, calculate, contain and file. They prefer to neutralize an opponent’s response before any open fight. Telepathy, containment and camouflage work, but they have limits, and the Grays know exactly where.',
      'pt-BR': 'Observam, calculam, contêm e protocolam. Preferem neutralizar a reação do adversário antes de qualquer briga aberta. Telepatia, contenção e camuflagem funcionam, mas têm limite, e eles sabem exatamente qual.',
    },
    weakness: {
      en: 'They need humanity’s genetic chaos to survive and have already filed 40,000 complaints about it. They react slowly to anyone with no boss and no form.',
      'pt-BR': 'Precisam do caos genético humano para sobreviver e já protocolaram 40.000 reclamações sobre ele. Reagem devagar a quem não tem chefe nem formulário.',
    },
    relations: {
      nordics: {
        en: 'Mutual debt. The Grays hold the statistics on Nordic persuasion; the Nordics hold the method. Neither admits needing the other.',
        'pt-BR': 'Dívida mútua. Os Grays têm as estatísticas da persuasão nórdica; os Nórdicos têm o método. Nenhum admite precisar do outro.',
      },
      reptilians: {
        en: 'Distrust that smells like business. The Reptilians think the Grays are hiding a cure for the drought. The Grays call it “information under review”.',
        'pt-BR': 'Desconfiança com cheiro de negócio. Os Reptilianos acham que os Grays escondem uma solução para a seca. Os Grays chamam isso de “informação sob análise”.',
      },
      mantis: {
        en: 'Use. There are Gray lockout modules inside Mantis systems. Who installed them, and with whose consent, is still unanswered.',
        'pt-BR': 'Uso. Há módulos de bloqueio Gray dentro de sistemas Mantis. Quem os instalou, e com o consentimento de quem, continua sem resposta.',
      },
      humans: {
        en: 'They treat human ufology as a dating error. To them, Dora is a form that won’t close.',
        'pt-BR': 'Tratam a ufologia humana como erro de data. Dora, para eles, é um formulário que não fecha.',
      },
    },
    matrix: {
      grays: { en: '“We are the record.”', 'pt-BR': '“Somos o registro.”' },
      nordics: { en: 'Backstage trade: data for method.', 'pt-BR': 'Troca de bastidor: dados por método.' },
      reptilians: { en: 'Secret under review: an answer they don’t offer.', 'pt-BR': 'Segredo sob análise: uma resposta que não oferecem.' },
      mantis: { en: 'Lockout installed, authorship unclear.', 'pt-BR': 'Bloqueio instalado, autoria não esclarecida.' },
      humans: { en: 'A dating error with legs.', 'pt-BR': 'Erro de data com pernas.' },
    },
  },
  {
    id: 'nordics',
    status: 'PROVISIONAL',
    earthAmbition: {
      en: 'To govern humanity “for its own good”. If they win, they apply the Garden Plan: peace by cultivated consensus, with the weeds removed. In practice, a permanent Earth Assembly, parties open to all, guest lists and symbolic votes. Anyone who disagrees gets dessert and an invitation to “talk”. Nobody is forced. Nobody manages to leave, either.',
      'pt-BR': 'Governar a humanidade “para o bem dela”. Se ganharem, aplicam o Plano Jardim: paz por consenso cultivado, com as ervas daninhas removidas. Na prática, uma Assembleia Terrestre permanente, festas abertas a todos, listas de convidados e votos simbólicos. Quem discordar ganha uma sobremesa e um convite para “conversar”. Ninguém é obrigado. Só ninguém consegue sair.',
    },
    howTheyAct: {
      en: 'Culture, translation, music and gifts. They prefer to end conflicts through alliance, mediation or withdrawn support. Force comes last, with an apology.',
      'pt-BR': 'Cultura, tradução, música e presentes. Preferem encerrar conflitos por aliança, mediação ou retirada de apoio. A força vem por último, com pedido de desculpas.',
    },
    weakness: {
      en: 'Charm fails on anyone who distrusts it on principle, and their translation sometimes mistakes hostility for courtesy.',
      'pt-BR': 'A simpatia não funciona em quem desconfia dela por princípio, e a tradução às vezes confunde hostilidade com cortesia.',
    },
    relations: {
      grays: {
        en: 'Backstage partnership. They trade behavioral data for Archive access. Both pretend it’s courtesy.',
        'pt-BR': 'Parceria de bastidor. Trocam dados de comportamento por acesso ao Arquivo. Os dois fingem que é cortesia.',
      },
      reptilians: {
        en: 'Use. They gift the great houses water and ceremony and note who reciprocates. The Reptilians check the water before saying thanks.',
        'pt-BR': 'Uso. Presenteiam as casas com água e cerimônia e anotam quem retribui. Os Reptilianos conferem a água antes de agradecer.',
      },
      mantis: {
        en: 'Polite contempt. Praise and party invitations slide off people who prefer orders in writing.',
        'pt-BR': 'Desprezo educado. Elogio e convite de festa escorregam em quem prefere ordens por escrito.',
      },
      humans: {
        en: 'Their favorite target: music, parties and the word “together”. The Resistance quickly learns to refuse the third dessert.',
        'pt-BR': 'O alvo preferido: música, festas e a palavra “juntos”. A Resistência aprende rápido a recusar a terceira sobremesa.',
      },
    },
    matrix: {
      nordics: { en: '“We are kindness.”', 'pt-BR': '“Somos a gentileza.”' },
      grays: { en: 'A source of numbers to calibrate the charm.', 'pt-BR': 'Fonte de números para calibrar a simpatia.' },
      reptilians: { en: 'Gifts for people who check the water.', 'pt-BR': 'Presentes para quem confere a água.' },
      mantis: { en: 'An invitation with no reply.', 'pt-BR': 'Convite sem resposta.' },
      humans: { en: 'Target and audience.', 'pt-BR': 'Alvo e plateia.' },
    },
  },
  {
    id: 'reptilians',
    status: 'PROVISIONAL',
    earthAmbition: {
      en: 'Water. Thaxis is drying up, and the empire depends on a blue planet that still has oceans. If they win, Earth becomes a water province: concessions over aquifers, glaciers and rivers, cistern barges in orbit and humans employed to maintain what used to be theirs. Every river gets an owner, a seal and an heir. They call it “flow management”.',
      'pt-BR': 'Água. Thaxis está secando, e o império depende de um planeta azul que ainda tem oceano. Se ganharem, a Terra vira província hídrica: concessões sobre aquíferos, geleiras e rios, barcaças-cisterna em órbita e humanos empregados na manutenção do que antes era deles. Cada rio ganha dono, selo e herdeiro. Eles chamam isso de “gestão do fluxo”.',
    },
    howTheyAct: {
      en: 'Secret pacts, long timelines, boarding actions and route control. They would rather seize than destroy. Human disguises are part of the repertoire, and nobody believes them.',
      'pt-BR': 'Pacto secreto, longo prazo, abordagem e controle de rotas. Preferem tomar a destruir. Disfarces humanos fazem parte do repertório, e ninguém acredita neles.',
    },
    weakness: {
      en: 'They have no biological fix for the drought and depend on partners who may be lying. They suffer in the cold. And the heirs are a separate problem.',
      'pt-BR': 'Não têm solução biológica para a seca e dependem de parceiros que podem mentir. Sofrem no frio. E os herdeiros são um problema à parte.',
    },
    relations: {
      grays: {
        en: 'Outstanding debt. They suspect the Grays hold an answer to the drought. They haven’t asked yet, out of pride.',
        'pt-BR': 'Dívida pendente. Suspeitam que os Grays guardam uma resposta para a seca. Ainda não perguntaram, por orgulho.',
      },
      nordics: {
        en: 'Calculated contempt. They accept the gifts, measure the contents and reciprocate with cordial resentment.',
        'pt-BR': 'Desprezo calculado. Aceitam os presentes, medem o conteúdo e retribuem com um rancor cordial.',
      },
      mantis: {
        en: 'Contract. Fleets and escorts are bought from the Mantis, and the bill is passed down from generation to generation.',
        'pt-BR': 'Contrato. Frotas e escoltas são compradas dos Mantis, e a conta passa de geração em geração.',
      },
      humans: {
        en: 'A resource with opinions. The Resistance is the only force that threatens to cut off the flow, so it is read as the enemy.',
        'pt-BR': 'Recurso com opinião. A Resistência é a única força que ameaça cortar o fluxo, e por isso é lida como inimiga.',
      },
    },
    matrix: {
      reptilians: { en: '“We are the flow.”', 'pt-BR': '“Somos o fluxo.”' },
      grays: { en: 'A creditor nobody wants to collect from.', 'pt-BR': 'Credor que ninguém quer cobrar.' },
      nordics: { en: 'Gift accepted, grudge kept.', 'pt-BR': 'Presente aceito, rancor guardado.' },
      mantis: { en: 'A client who pays in inheritance.', 'pt-BR': 'Cliente que paga em herança.' },
      humans: { en: 'Water with a union.', 'pt-BR': 'Água com sindicato.' },
    },
  },
  {
    id: 'mantis',
    status: 'PROVISIONAL',
    earthAmbition: {
      en: 'To turn war into a product line. If they win, Earth becomes a proving ground and arms fair: a security management contract with no end date, selling to every side and reviewing human performance before any extermination. Victory is an inconvenient state. A finished war is terrible for business.',
      'pt-BR': 'Transformar a guerra numa linha de produtos. Se ganharem, a Terra vira campo de testes e feira de armamentos: um contrato de administração de segurança sem prazo, vendendo para todos os lados e avaliando o desempenho dos humanos antes de qualquer extermínio. Vitória é um estado inconveniente. Guerra encerrada é péssima para os negócios.',
    },
    howTheyAct: {
      en: 'Logistics first: supply lines, target isolation, drone swarms and elite cells. Short orders, a time window and a reporting channel. Threats always come in writing, in a cordial tone.',
      'pt-BR': 'Logística primeiro: linhas de suprimento, isolamento do alvo, enxame de drones e células de elite. Ordem curta, janela de tempo e canal de reporte. Ameaçam sempre por escrito e com tom cordial.',
    },
    weakness: {
      en: 'The swarm depends on its central link: if the link drops, the unit freezes without orders. And they want to win, but can’t afford to.',
      'pt-BR': 'O enxame depende do elo central: se o elo cai, a unidade trava sem ordem. E eles querem vencer, mas não podem.',
    },
    relations: {
      grays: {
        en: 'Technical distrust. They notice the Grays alter orders, and they recognize the Gray audits, which annoys more than it helps.',
        'pt-BR': 'Desconfiança técnica. Percebem que os Grays alteram ordens e reconhecem as auditorias deles, o que irrita mais do que ajuda.',
      },
      nordics: {
        en: 'Boredom. Contracts and music don’t mix, and parties don’t pay.',
        'pt-BR': 'Tédio. Contratos e música não combinam, e as festas não pagam.',
      },
      reptilians: {
        en: 'Best client. They sell escorts, hulls and boarding crews and charge interest. They need the houses to keep fighting.',
        'pt-BR': 'O melhor cliente. Vendem escolta, casco e abordagem e cobram em juros. Precisam que as casas continuem brigando.',
      },
      humans: {
        en: 'A valuable opponent. They respect Dora and would rather have a long war with her than a quick victory.',
        'pt-BR': 'Adversário valioso. Respeitam Dora e preferem uma guerra longa com ela a uma vitória rápida.',
      },
    },
    matrix: {
      mantis: { en: '“We are duty.”', 'pt-BR': '“Somos o dever.”' },
      grays: { en: 'A partner who alters orders: keep watch.', 'pt-BR': 'Parceiro que altera ordens: se vigia.' },
      nordics: { en: 'Ceremony without a contract.', 'pt-BR': 'Cerimonial sem contrato.' },
      reptilians: { en: 'Captive client, high interest.', 'pt-BR': 'Cliente cativo, juros altos.' },
      humans: { en: 'A worthy opponent; a long war preferred.', 'pt-BR': 'Oponente digna; guerra longa, de preferência.' },
    },
  },
];

/** How the human Resistance sees each race (the matrix's last row). */
export const humanView: Record<Viewee, Localized> = {
  grays: { en: 'Faulty paperwork.', 'pt-BR': 'Papelada com defeito.' },
  nordics: { en: 'Dessert you don’t accept.', 'pt-BR': 'Sobremesa que não se aceita.' },
  reptilians: { en: 'A river that isn’t for sale.', 'pt-BR': 'Rio que não se vende.' },
  mantis: { en: 'A contract nobody signed.', 'pt-BR': 'Contrato sem assinatura.' },
  humans: { en: 'Dora and the 4.812-c loophole.', 'pt-BR': 'Dora e a brecha 4.812-c.' },
};

export const viewees: Viewee[] = ['grays', 'nordics', 'reptilians', 'mantis', 'humans'];

export function raceProfileById(id: FactionId): RaceProfile | undefined {
  return raceProfiles.find((p) => p.id === id);
}
