import type { FactionScore, Season } from './types';

/**
 * FICTIONAL DEMO DATA. These numbers do not represent real users, real activity,
 * or any market value. Scoring is never derived from token price, volume,
 * market capitalization, wallet balances, or purchases.
 */
export const seasons: Season[] = [
  { id: 's0', label: { en: 'Season 0 · Pilot Census', 'pt-BR': 'Temporada 0 · Censo Piloto' }, status: 'archived' },
  { id: 's1', label: { en: 'Season 1 · The Signal', 'pt-BR': 'Temporada 1 · O Sinal' }, status: 'active' },
];

export const scoresBySeason: Record<string, FactionScore[]> = {
  s0: [
    { faction: 'grays', community: 410, missions: 520, events: 60 },
    { faction: 'nordics', community: 690, missions: 300, events: 90 },
    { faction: 'reptilians', community: 540, missions: 410, events: 120 },
    { faction: 'mantis', community: 380, missions: 610, events: 40 },
  ],
  s1: [
    { faction: 'grays', community: 820, missions: 1140, events: 150 },
    { faction: 'nordics', community: 1260, missions: 640, events: 110 },
    { faction: 'reptilians', community: 990, missions: 870, events: 240 },
    { faction: 'mantis', community: 760, missions: 1210, events: 90 },
  ],
};

export const totalScore = (s: FactionScore) => s.community + s.missions + s.events;

export const rankScores = (rows: FactionScore[]) =>
  [...rows].sort((a, b) => totalScore(b) - totalScore(a));
