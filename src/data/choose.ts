import type { LoreStatus } from './lore/dossier';
import type { FactionId, Localized } from './types';

/**
 * "Choose your race": the case for each race and the affinity quiz.
 * Framing (owner, 2026-10-21): every race wants Earth, none is the official villain,
 * and the visitor is a human who picks who should get the planet.
 */

export interface RaceCall {
  id: FactionId;
  status: LoreStatus;
  /** Recruitment slogan, one short line. */
  pitch: Localized;
  /** Three real virtues, each one short sentence. */
  virtues: Localized[];
  /** What this race honestly offers humanity, in its own view (2–3 sentences). */
  offer: Localized;
  /** The kind of person who identifies with this race (1–2 sentences). */
  forWho: Localized;
}

export interface QuizOption {
  text: Localized;
  race: FactionId;
}

/** Every question has exactly four options, one per race, in any order. */
export interface QuizQuestion {
  id: string;
  prompt: Localized;
  options: QuizOption[];
}

export const raceCalls: RaceCall[] = [
  {
    id: 'grays',
    status: 'PROVISIONAL',
    pitch: {
      en: 'Nothing lost. Nobody forgotten. Everything filed.',
      'pt-BR': 'Nada se perde. Ninguém se esquece. Tudo arquivado.',
    },
    virtues: [
      {
        en: 'They never lose a paper, so nobody goes unrecorded.',
        'pt-BR': 'Nunca perdem um papel, então ninguém fica sem registro.',
      },
      {
        en: 'They stay polite even when everything is on fire.',
        'pt-BR': 'Seguem educados mesmo com tudo pegando fogo.',
      },
      {
        en: 'They plan for every outcome, the embarrassing ones included.',
        'pt-BR': 'Planejam para todo desfecho, inclusive os constrangedores.',
      },
    ],
    offer: {
      en: 'Order. A registry of every human, a field office on every continent and a form for every problem. Yes, we need your genes. We would like to ask nicely, in triplicate. Nobody will be hurt, and everybody will be remembered.',
      'pt-BR': 'Ordem. Um cadastro de cada humano, um escritório de campo em cada continente e um formulário para cada problema. Sim, precisamos dos seus genes. Gostaríamos de pedir com educação, em três vias. Ninguém será machucado, e todo mundo será lembrado.',
    },
    forWho: {
      en: 'For people who label the boxes, keep the receipts and are right about the deadline. Someone has to remember. You are proud to be that someone.',
      'pt-BR': 'Para quem etiqueta as caixas, guarda o comprovante e acerta o prazo. Alguém precisa lembrar. Você tem orgulho de ser esse alguém.',
    },
  },
  {
    id: 'nordics',
    status: 'PROVISIONAL',
    pitch: {
      en: 'Come as you are. Stay for good.',
      'pt-BR': 'Venha como está. Fique de vez.',
    },
    virtues: [
      {
        en: 'Nobody is left alone at the party.',
        'pt-BR': 'Ninguém fica sozinho na festa.',
      },
      {
        en: 'They listen, and they remember your birthday.',
        'pt-BR': 'Escutam de verdade e lembram do seu aniversário.',
      },
      {
        en: 'They truly believe in peace, and work at it every day.',
        'pt-BR': 'Acreditam de verdade na paz e trabalham nela todo dia.',
      },
    ],
    offer: {
      en: 'A permanent Earth Assembly, open parties and a seat at the table for everyone who agrees. The Garden Plan is peace by cultivated consensus. We admit the weeds get removed. We just do it kindly, with dessert.',
      'pt-BR': 'Uma Assembleia Terrestre permanente, festas abertas e um lugar à mesa para todo mundo que concorda. O Plano Jardim é paz por consenso cultivado. Admitimos que as ervas daninhas são removidas. Só que com carinho, e com sobremesa.',
    },
    forWho: {
      en: 'For hosts, peacemakers and people who cannot leave a quiet guest in the corner. You believe a better world is possible. You are proud to be the one who says it first.',
      'pt-BR': 'Para anfitriões, pacificadores e quem não consegue deixar um convidado quieto no canto. Você acredita que um mundo melhor é possível. Tem orgulho de ser quem diz isso primeiro.',
    },
  },
  {
    id: 'reptilians',
    status: 'PROVISIONAL',
    pitch: {
      en: 'Rivers remember who kept them.',
      'pt-BR': 'Os rios lembram de quem cuidou deles.',
    },
    virtues: [
      {
        en: 'They think in centuries, not in quarters.',
        'pt-BR': 'Pensam em séculos, não em trimestres.',
      },
      {
        en: 'They treat water as sacred and every river as a duty.',
        'pt-BR': 'Tratam a água como sagrada e cada rio como um dever.',
      },
      {
        en: 'A deal with them outlives you.',
        'pt-BR': 'Um acordo com eles sobrevive a você.',
      },
    ],
    offer: {
      en: 'Stewardship. Earth becomes a water province, and every river gets an owner, a seal and an heir, so somebody finally answers for it. Humans keep their jobs, maintaining what used to be theirs. We call it flow management. We have a lot of patience and a long lease.',
      'pt-BR': 'Zelo. A Terra vira província hídrica, e cada rio ganha dono, selo e herdeiro, para que alguém finalmente responda por ele. Os humanos mantêm o emprego, cuidando do que antes era deles. Chamamos de gestão do fluxo. Temos muita paciência e um contrato longo.',
    },
    forWho: {
      en: 'For strategists, planners and the patient. You plant the tree you will never sit under, and you read every clause twice. You are proud that your plan outlasts the noise.',
      'pt-BR': 'Para estrategistas, planejadores e pacientes. Você planta a árvore cuja sombra não vai ver e lê cada cláusula duas vezes. Tem orgulho de o seu plano durar mais que o barulho.',
    },
  },
  {
    id: 'mantis',
    status: 'PROVISIONAL',
    pitch: {
      en: 'We keep our word. In writing.',
      'pt-BR': 'Cumprimos a palavra. Por escrito.',
    },
    virtues: [
      {
        en: 'They do exactly what they signed.',
        'pt-BR': 'Fazem exatamente o que assinaram.',
      },
      {
        en: 'Nobody is left behind in formation.',
        'pt-BR': 'Ninguém é deixado para trás na formação.',
      },
      {
        en: 'Orders are short, clear and honest about the risk.',
        'pt-BR': 'Ordens curtas, claras e honestas sobre o risco.',
      },
    ],
    offer: {
      en: 'Security with a contract and no end date. We run the defense of Earth, test every system and sell to every side, which we call neutrality. Humans get a proper performance review before anything drastic. Everything cordial, everything in writing.',
      'pt-BR': 'Segurança com contrato e sem data de término. Cuidamos da defesa da Terra, testamos cada sistema e vendemos para todos os lados, o que chamamos de neutralidade. Os humanos recebem uma avaliação de desempenho decente antes de qualquer medida drástica. Tudo cordial, tudo por escrito.',
    },
    forWho: {
      en: 'For the disciplined, the early risers and people who hate losing and love a good rival. You do what you promised. You are proud that your word is worth more than their speech.',
      'pt-BR': 'Para os disciplinados, os madrugadores e quem odeia perder e adora um bom rival. Você faz o que prometeu. Tem orgulho de a sua palavra valer mais que o discurso dos outros.',
    },
  },
];

export const quiz: QuizQuestion[] = [
  {
    id: 'q1',
    prompt: {
      en: 'The bank line has been stuck on ticket 52 for forty minutes. You hold ticket 87. You…',
      'pt-BR': 'A fila do banco está parada na senha 52 há quarenta minutos. Você tem a 87. Você…',
    },
    options: [
      {
        race: 'nordics',
        text: {
          en: 'Learn the names of the people around you. By ticket 60, you’re a group.',
          'pt-BR': 'Aprende o nome de quem está em volta. Na senha 60, já são um grupo.',
        },
      },
      {
        race: 'mantis',
        text: {
          en: 'Find the slowest teller and propose a rotation. Politely. Firmly.',
          'pt-BR': 'Descobre o caixa mais lento e propõe um rodízio. Com educação. Com firmeza.',
        },
      },
      {
        race: 'grays',
        text: {
          en: 'Time every teller quietly and keep the numbers. For later.',
          'pt-BR': 'Cronometra cada caixa em silêncio e guarda os números. Para depois.',
        },
      },
      {
        race: 'reptilians',
        text: {
          en: 'Wait, calm. Everyone gets called eventually, and you know the manager’s cousin.',
          'pt-BR': 'Espera, tranquilo. Todo mundo é chamado um dia, e você conhece o primo do gerente.',
        },
      },
    ],
  },
  {
    id: 'q2',
    prompt: {
      en: 'The family group chat is fighting about where to spend the holidays. You…',
      'pt-BR': 'O grupo da família está brigando por onde passar as festas. Você…',
    },
    options: [
      {
        race: 'reptilians',
        text: {
          en: 'Say nothing. Next year it’s at your house, and nobody remembers agreeing.',
          'pt-BR': 'Não diz nada. Ano que vem é na sua casa, e ninguém lembra de ter concordado.',
        },
      },
      {
        race: 'grays',
        text: {
          en: 'Post a poll and attach last year’s argument, with dates.',
          'pt-BR': 'Posta uma enquete e anexa a discussão do ano passado, com datas.',
        },
      },
      {
        race: 'mantis',
        text: {
          en: 'Assign dishes by name, with a deadline. Cancellations are explained in person.',
          'pt-BR': 'Distribui os pratos por nome, com prazo. Quem desistir explica pessoalmente.',
        },
      },
      {
        race: 'nordics',
        text: {
          en: 'Send a voice note: “We’re family! I’ll host, I’ll cook, come as you are!”',
          'pt-BR': 'Manda um áudio: “Somos uma família! Eu recebo, eu cozinho, venham como estão!”',
        },
      },
    ],
  },
  {
    id: 'q3',
    prompt: {
      en: 'The project is due tomorrow and it’s half done. You…',
      'pt-BR': 'O projeto vence amanhã e está pela metade. Você…',
    },
    options: [
      {
        race: 'mantis',
        text: {
          en: 'Split the work into blocks, check in every two hours, nobody leaves early.',
          'pt-BR': 'Divide o trabalho em blocos, cobra retorno a cada duas horas, ninguém sai antes.',
        },
      },
      {
        race: 'nordics',
        text: {
          en: 'Order pizza, put on music and tell the team this will be a story they love.',
          'pt-BR': 'Pede pizza, põe música e diz ao time que isso vai virar uma história que eles amam.',
        },
      },
      {
        race: 'reptilians',
        text: {
          en: 'Find out who actually decides if it’s late. Talk to that person, not the team.',
          'pt-BR': 'Descobre quem de fato decide se está atrasado. Conversa com essa pessoa, não com o time.',
        },
      },
      {
        race: 'grays',
        text: {
          en: 'Reread the brief. Page 3, line 2: you have two more days.',
          'pt-BR': 'Relê o briefing. Página 3, linha 2: você tem mais dois dias.',
        },
      },
    ],
  },
  {
    id: 'q4',
    prompt: {
      en: 'The neighbor’s party is still loud at 1 a.m. You…',
      'pt-BR': 'A festa do vizinho continua alta à 1 da manhã. Você…',
    },
    options: [
      {
        race: 'grays',
        text: {
          en: 'Write it down. Every night. Sooner or later the building rules do the talking.',
          'pt-BR': 'Anota. Toda noite. Mais cedo ou mais tarde o regimento do prédio fala por você.',
        },
      },
      {
        race: 'reptilians',
        text: {
          en: 'Say nothing tonight. Six months from now, you’ll be the one voting on the elevator.',
          'pt-BR': 'Não diz nada hoje. Daqui a seis meses, é você quem vota o elevador.',
        },
      },
      {
        race: 'nordics',
        text: {
          en: 'Walk in with a cake. Within an hour you’re choosing the playlist.',
          'pt-BR': 'Entra com um bolo. Em uma hora, você está escolhendo a playlist.',
        },
      },
      {
        race: 'mantis',
        text: {
          en: 'Send one polite note: quiet by 1:15, or a formal complaint at 1:16.',
          'pt-BR': 'Manda um bilhete educado: silêncio até 1h15, ou reclamação formal à 1h16.',
        },
      },
    ],
  },
  {
    id: 'q5',
    prompt: {
      en: 'You’re stranded on a desert island. You get to bring one thing.',
      'pt-BR': 'Você vai parar numa ilha deserta. Pode levar uma coisa só.',
    },
    options: [
      {
        race: 'nordics',
        text: {
          en: 'A guitar. By next week the crabs are a choir.',
          'pt-BR': 'Um violão. Na semana que vem, os caranguejos formam um coral.',
        },
      },
      {
        race: 'grays',
        text: {
          en: 'A notebook. Somebody has to count the coconuts.',
          'pt-BR': 'Um caderno. Alguém tem que contar os cocos.',
        },
      },
      {
        race: 'mantis',
        text: {
          en: 'A good knife and a whistle. Roles assigned by sunset.',
          'pt-BR': 'Uma boa faca e um apito. Funções definidas até o pôr do sol.',
        },
      },
      {
        race: 'reptilians',
        text: {
          en: 'A map of the tides. Whoever finds the spring first runs the island.',
          'pt-BR': 'Um mapa das marés. Quem achar a nascente primeiro manda na ilha.',
        },
      },
    ],
  },
  {
    id: 'q6',
    prompt: {
      en: 'Eight friends, one restaurant to choose, and everyone says “anything’s fine”. You…',
      'pt-BR': 'Oito amigos, um restaurante para escolher, e todo mundo diz “qualquer um serve”. Você…',
    },
    options: [
      {
        race: 'mantis',
        text: {
          en: 'Pick one, book it, send the address. Latecomers order last.',
          'pt-BR': 'Escolhe um, reserva, manda o endereço. Quem chegar atrasado pede por último.',
        },
      },
      {
        race: 'reptilians',
        text: {
          en: 'Let them argue. Suggest your cousin’s place once they’re tired enough.',
          'pt-BR': 'Deixa discutirem. Sugere o lugar do seu primo quando estiverem cansados.',
        },
      },
      {
        race: 'grays',
        text: {
          en: 'Open the spreadsheet of everyone’s allergies. You started it in March.',
          'pt-BR': 'Abre a planilha com a alergia de cada um. Você começou em março.',
        },
      },
      {
        race: 'nordics',
        text: {
          en: 'Pick the place where the waiter ends up sitting at your table.',
          'pt-BR': 'Escolhe o lugar onde o garçom acaba sentando na sua mesa.',
        },
      },
    ],
  },
];

export function raceCallById(id: FactionId): RaceCall | undefined {
  return raceCalls.find((c) => c.id === id);
}
