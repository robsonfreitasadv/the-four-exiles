import type { Human } from './types';

const img = (id: string) => `/images/characters/${id}.webp`;

/** The human Resistance, from the official character sheet. */
export const resistance: Human[] = [
  {
    id: 'dora',
    name: 'Dora',
    role: { en: 'The Strategist', 'pt-BR': 'A Estrategista' },
    quote: { en: 'They think we’re just a species. We’re a problem.', 'pt-BR': 'Eles acham que somos só uma espécie. Somos um problema.' },
    image: {
      src: img('dora-3d-1'),
      focus: '50% 15%',
      alt: {
        en: 'Dora, a young woman with curly dark hair tied up, in a black jacket, crop top, olive cargo pants and combat boots, standing with a hand on her hip.',
        'pt-BR': 'Dora, jovem de cabelo escuro cacheado preso, de jaqueta preta, top, calça cargo verde-oliva e coturnos, em pé com a mão na cintura.',
      },
    },
    sheet: {
      expressions: [1, 2, 3, 4, 5, 6].map((i) => img(`dora-expr-${i}`)),
      turnaround: [1, 2, 3, 4, 5, 6].map((i) => img(`dora-3d-${i}`)),
    },
    bio: {
      en: 'Leader of the Resistance. A pragmatic human who reads the fine print and notices what four ancient civilizations missed: none of them checked whether Earth gets a vote.',
      'pt-BR': 'Líder da Resistência. Uma humana pragmática que lê as letras miúdas e percebe o que quatro civilizações milenares deixaram passar: nenhuma verificou se a Terra tem direito a voto.',
    },
    facts: [
      { label: { en: 'Role', 'pt-BR': 'Função' }, value: { en: 'Leader / Strategist', 'pt-BR': 'Líder / Estrategista' } },
      { label: { en: 'Age', 'pt-BR': 'Idade' }, value: { en: '28', 'pt-BR': '28' } },
      { label: { en: 'Origin', 'pt-BR': 'Origem' }, value: { en: 'Fortaleza, Brazil', 'pt-BR': 'Fortaleza, Brasil' } },
    ],
    skills: [
      { en: 'Analysis', 'pt-BR': 'Análise' },
      { en: 'Leadership', 'pt-BR': 'Liderança' },
      { en: 'Improvisation', 'pt-BR': 'Improviso' },
      { en: 'Meme warfare', 'pt-BR': 'Guerra de memes' },
    ],
    personality: [
      { en: 'Realist', 'pt-BR': 'Realista' },
      { en: 'Sarcastic', 'pt-BR': 'Sarcástica' },
      { en: 'Determined', 'pt-BR': 'Determinada' },
      { en: 'Empathetic', 'pt-BR': 'Empática' },
    ],
  },
  {
    id: 'rui',
    name: 'Ray',
    role: { en: 'The Hacker', 'pt-BR': 'O Hacker' },
    quote: { en: 'If it’s connected, I can break it.', 'pt-BR': 'Se está conectado, eu consigo quebrar.' },
    image: {
      src: img('rui-face'),
      focus: '50% 28%',
      alt: {
        en: 'Ray, a young man with curly hair, clear tech glasses and headphones around his neck, in a black jacket covered in pins.',
        'pt-BR': 'Ray, jovem de cabelo cacheado, óculos de tecnologia transparentes e fones no pescoço, de jaqueta preta cheia de bottons.',
      },
    },
  },
  {
    id: 'livia',
    name: 'Olivia',
    role: { en: 'The Medic', 'pt-BR': 'A Médica' },
    quote: { en: 'People first. Always.', 'pt-BR': 'Pessoas primeiro. Sempre.' },
    image: {
      src: img('livia-face'),
      focus: '50% 28%',
      alt: {
        en: 'Olivia, a young woman with short white hair and freckles, in a white and red medic jacket.',
        'pt-BR': 'Olivia, jovem de cabelo branco curto e sardas, de jaqueta médica branca e vermelha.',
      },
    },
  },
  {
    id: 'julio',
    name: 'Julian',
    role: { en: 'The Pilot', 'pt-BR': 'O Piloto' },
    quote: { en: 'Higher, faster, further, maybe.', 'pt-BR': 'Mais alto, mais rápido, mais longe, talvez.' },
    image: {
      src: img('julio-face'),
      focus: '50% 28%',
      alt: {
        en: 'Julian, a bearded man in a worn cap and a brown aviator jacket.',
        'pt-BR': 'Julian, homem de barba, boné gasto e jaqueta de aviador marrom.',
      },
    },
  },
  {
    id: 'tati',
    name: 'Tasha',
    role: { en: 'The Warrior', 'pt-BR': 'A Guerreira' },
    quote: { en: 'Courage is a habit.', 'pt-BR': 'Coragem é um hábito.' },
    image: {
      src: img('tati-face'),
      focus: '50% 28%',
      alt: {
        en: 'Tasha, a young woman with long black and purple braids and dark sport sunglasses, in a tactical vest.',
        'pt-BR': 'Tasha, jovem de longas tranças pretas e roxas e óculos escuros esportivos, de colete tático.',
      },
    },
  },
];

export const dora = resistance[0];
