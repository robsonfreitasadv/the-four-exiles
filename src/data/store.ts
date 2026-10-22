import type { FactionId, Localized } from './types';

/**
 * First store products: one per race plus the Resistance, printed on demand by a partner store
 * (see docs/LOJA.md). Paste each product's link in `url` once it is listed; until then the
 * site shows "coming soon". Prices live on the partner store, never here.
 */

export interface Product {
  slug: string;
  owner: FactionId | 'resistance';
  kind: Localized;
  name: Localized;
  description: Localized;
  /** Web preview of the print, in public/images/store. */
  image: string;
  /** Product page on the partner store (https only). */
  url: string;
}

export const products: Product[] = [
  {
    slug: 'grays-deferido',
    owner: 'grays',
    kind: { en: 'T-shirt', 'pt-BR': 'Camiseta' },
    name: { en: '“Deferido” stamp', 'pt-BR': 'Carimbo “Deferido”' },
    description: {
      en: 'The Central Archive’s stamp of approval, crooked on purpose. For people who label the boxes.',
      'pt-BR': 'O carimbo de aprovação do Arquivo Central, torto de propósito. Para quem etiqueta as caixas.',
    },
    image: '/images/store/grays-deferido.webp',
    url: '',
  },
  {
    slug: 'nordics-esta-tudo-bem',
    owner: 'nordics',
    kind: { en: 'Mug', 'pt-BR': 'Caneca' },
    name: { en: '“Everything is fine” mug', 'pt-BR': 'Caneca “Está tudo bem”' },
    description: {
      en: 'Garden Plan approved. Serve the third coffee with a smile.',
      'pt-BR': 'Aprovada pelo Plano Jardim. Sirva o terceiro café com um sorriso.',
    },
    image: '/images/store/nordics-esta-tudo-bem.webp',
    url: '',
  },
  {
    slug: 'reptilians-controle-o-fluxo',
    owner: 'reptilians',
    kind: { en: 'T-shirt', 'pt-BR': 'Camiseta' },
    name: { en: 'SAZAR, “Control the flow”', 'pt-BR': 'SAZAR, “Controle o fluxo”' },
    description: {
      en: 'The Sovereign of the Sazhath Dynasty, in gold. Wear it near water.',
      'pt-BR': 'O Soberano da Dinastia de Sazhath, em dourado. Use perto da água.',
    },
    image: '/images/store/reptilians-controle-o-fluxo.webp',
    url: '',
  },
  {
    slug: 'mantis-disciplina-e-liberdade',
    owner: 'mantis',
    kind: { en: 'Poster (A3)', 'pt-BR': 'Pôster (A3)' },
    name: { en: 'VEX, “Discipline is freedom”', 'pt-BR': 'VEX, “Disciplina é liberdade”' },
    description: {
      en: 'The Commander on your wall. Unscheduled rest is mutiny.',
      'pt-BR': 'O Comandante na sua parede. Folga fora da agenda é motim.',
    },
    image: '/images/store/mantis-disciplina-e-liberdade.webp',
    url: '',
  },
  {
    slug: 'resistencia-humanos',
    owner: 'resistance',
    kind: { en: 'T-shirt', 'pt-BR': 'Camiseta' },
    name: { en: '“Humans. Not the enemy.”', 'pt-BR': '“Humanos. Não o inimigo.”' },
    description: {
      en: 'The Resistance motto, with the line only Dora’s readers get: “I read clause c.”',
      'pt-BR': 'O lema da Resistência, com a frase que só quem acompanha a Dora entende: “Eu li a letra c.”',
    },
    image: '/images/store/resistencia-humanos.webp',
    url: '',
  },
];

export function productUrl(p: Product): string | undefined {
  return /^https:\/\/\S+$/.test(p.url) ? p.url : undefined;
}
