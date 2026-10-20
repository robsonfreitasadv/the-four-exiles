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
      src: img('dora'),
      focus: '50% 15%',
      alt: {
        en: 'Dora, a young woman with curly dark hair tied up, in a black jacket, crop top, olive cargo pants and combat boots, standing with a hand on her hip.',
        'pt-BR': 'Dora, jovem de cabelo escuro cacheado preso, de jaqueta preta, top, calça cargo verde-oliva e coturnos, em pé com a mão na cintura.',
      },
    },
    sheet: {
      expressions: [1, 2, 3, 4, 5, 6].map((i) => img(`dora-expr-${i}`)),
      turnaround: [1, 2, 3].map((i) => img(`dora-turn-${i}`)),
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
    name: 'Rui',
    role: { en: 'The Hacker', 'pt-BR': 'O Hacker' },
    quote: { en: 'If it’s connected, I can break it.', 'pt-BR': 'Se está conectado, eu consigo quebrar.' },
    image: {
      src: img('rui'),
      focus: '50% 12%',
      alt: {
        en: 'Rui, a young man with tinted goggles and headphones around his neck, in a patched black jacket, carrying a laptop covered in stickers.',
        'pt-BR': 'Rui, jovem de óculos coloridos e fones no pescoço, com jaqueta preta cheia de patches, carregando um notebook coberto de adesivos.',
      },
    },
  },
  {
    id: 'livia',
    name: 'Lívia',
    role: { en: 'The Medic', 'pt-BR': 'A Médica' },
    quote: { en: 'People first. Always.', 'pt-BR': 'Pessoas primeiro. Sempre.' },
    image: {
      src: img('livia'),
      focus: '50% 12%',
      alt: {
        en: 'Lívia, a young woman with short white hair, in a white jacket with a red cross and a medical backpack.',
        'pt-BR': 'Lívia, jovem de cabelo branco curto, de jaqueta branca com cruz vermelha e mochila médica.',
      },
    },
  },
  {
    id: 'julio',
    name: 'Júlio',
    role: { en: 'The Pilot', 'pt-BR': 'O Piloto' },
    quote: { en: 'Higher, faster, further, maybe.', 'pt-BR': 'Mais alto, mais rápido, mais longe, talvez.' },
    image: {
      src: img('julio'),
      focus: '50% 12%',
      alt: {
        en: 'Júlio, a bearded man in a cap and a worn flight jacket full of straps and pouches.',
        'pt-BR': 'Júlio, homem de barba e boné, com jaqueta de piloto gasta cheia de alças e bolsos.',
      },
    },
  },
  {
    id: 'tati',
    name: 'Tati',
    role: { en: 'The Warrior', 'pt-BR': 'A Guerreira' },
    quote: { en: 'Courage is a habit.', 'pt-BR': 'Coragem é um hábito.' },
    image: {
      src: img('tati'),
      focus: '50% 12%',
      alt: {
        en: 'Tati, a young woman with long braids streaked purple and orange sunglasses, in a tactical vest and cargo pants.',
        'pt-BR': 'Tati, jovem de longas tranças com mechas roxas e óculos laranja, de colete tático e calça cargo.',
      },
    },
  },
];

export const dora = resistance[0];
