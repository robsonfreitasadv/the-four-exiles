import type { Mission } from './types';

export const missions: Mission[] = [
  {
    slug: 'operation-triplicate',
    faction: 'vhal-ett',
    thumb: 'stamps',
    title: { en: 'Operation Triplicate', 'pt-BR': 'Operação Três Vias' },
    summary: {
      en: 'Help Sete locate the missing page 4,812 before the Census Bureau notices it was ever filed.',
      'pt-BR': 'Ajude Sete a localizar a página 4.812 antes que o Escritório do Censo perceba que ela foi protocolada.',
    },
    briefing: {
      en: 'A single page of the Census Contract has been misfiled into the Archive of Things That Did Not Happen. Retrieving it requires Form 77-B, which requires the page itself. Sete believes there is a loophole. Sete is usually right, and always slow.',
      'pt-BR': 'Uma única página do Contrato do Censo foi arquivada por engano no Arquivo das Coisas Que Não Aconteceram. Recuperá-la exige o Formulário 77-B, que exige a própria página. Sete acredita haver uma brecha. Sete geralmente está certo, e sempre demora.',
    },
    objectives: [
      { en: 'Write the most absurd bureaucratic form you can imagine.', 'pt-BR': 'Escreva o formulário burocrático mais absurdo que conseguir imaginar.' },
      { en: 'Caption a Vhal-Ett stamp meme.', 'pt-BR': 'Crie uma legenda para um meme de carimbo Vhal-Ett.' },
      { en: 'Wait seven seconds. Then wait seven more.', 'pt-BR': 'Espere sete segundos. Depois mais sete.' },
    ],
    difficulty: 'standard',
    status: 'open',
    reward: 'lore-unlock',
    points: 120,
  },
  {
    slug: 'the-dry-banquet',
    faction: 'sazhi',
    thumb: 'ocean',
    title: { en: 'The Dry Banquet', 'pt-BR': 'O Banquete Seco' },
    summary: {
      en: 'The Sovereign hosts a feast with no water on the table. Find out which heir drank the reserve.',
      'pt-BR': 'O Soberano oferece um banquete sem água na mesa. Descubra qual herdeiro bebeu a reserva.',
    },
    briefing: {
      en: 'Thaxis’ last royal reservoir is empty, and seven heirs each have a perfect alibi written by the same scribe. Write the confession, the cover-up, or the poem that exposes them.',
      'pt-BR': 'O último reservatório real de Thaxis está vazio, e sete herdeiros têm álibis perfeitos escritos pelo mesmo escriba. Escreva a confissão, o acobertamento ou o poema que os desmascara.',
    },
    objectives: [
      { en: 'Submit a short story under 300 words.', 'pt-BR': 'Envie um conto com menos de 300 palavras.' },
      { en: 'Vote on the most suspicious heir.', 'pt-BR': 'Vote no herdeiro mais suspeito.' },
    ],
    difficulty: 'hazardous',
    status: 'briefing',
    reward: 'community-points',
    points: 200,
  },
  {
    slug: 'smile-audit',
    faction: 'ilvani',
    thumb: 'smile',
    title: { en: 'Smile Audit', 'pt-BR': 'Auditoria do Sorriso' },
    summary: {
      en: 'Sael has leaked an Ilvani wellness poster. Spot the hidden instructions in its cheerful slogans.',
      'pt-BR': 'Sael vazou um cartaz de bem-estar Ilvani. Encontre as instruções escondidas nos slogans alegres.',
    },
    briefing: {
      en: 'The Garden Plan spreads through posters so pleasant that nobody reads them closely. Sael insists the fourth line of every poster is an order. Decode them before they are hung in every school on Earth.',
      'pt-BR': 'O Plano Jardim se espalha por cartazes tão agradáveis que ninguém os lê com atenção. Sael insiste que a quarta linha de todo cartaz é uma ordem. Decifre-os antes que sejam pendurados em todas as escolas da Terra.',
    },
    objectives: [
      { en: 'Design a parody Ilvani propaganda poster.', 'pt-BR': 'Crie um cartaz de propaganda Ilvani em paródia.' },
      { en: 'Find the hidden line in three official slogans.', 'pt-BR': 'Encontre a linha oculta em três slogans oficiais.' },
    ],
    difficulty: 'trivial',
    status: 'open',
    reward: 'cosmetic-badge',
    points: 80,
  },
  {
    slug: 'courteous-surrender',
    faction: 'xhalen-kthrix',
    thumb: 'stamps',
    title: { en: 'Courteous Surrender', 'pt-BR': 'Rendição Cortês' },
    summary: {
      en: 'The Commander has sent Dora a 900-page surrender procedure. Find the step that makes it impossible.',
      'pt-BR': 'O Comandante enviou a Dora um procedimento de rendição de 900 páginas. Encontre o passo que o torna impossível.',
    },
    briefing: {
      en: 'Xhalen etiquette forbids attacking an enemy who is mid-surrender. Dora suspects the procedure was written to never end. That may be the best weapon humanity has.',
      'pt-BR': 'A etiqueta de Xhalen proíbe atacar um inimigo que esteja no meio de uma rendição. Dora suspeita que o procedimento foi escrito para nunca terminar. Talvez seja a melhor arma da humanidade.',
    },
    objectives: [
      { en: 'Write step 451 of the surrender procedure.', 'pt-BR': 'Escreva o passo 451 do procedimento de rendição.' },
    ],
    difficulty: 'existential',
    status: 'closed',
    reward: 'lore-unlock',
    points: 300,
  },
];

export const missionBySlug = (slug: string) => missions.find((m) => m.slug === slug);
