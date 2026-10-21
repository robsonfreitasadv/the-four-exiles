import { aiCharacterById, season0Log } from './aiCharacters';
import type { FactionId, FactionScore, Season } from './types';

/**
 * Season 0 is the AI league: only labeled AI characters play, and its standings are
 * computed from the public log in aiCharacters.ts. Season 1 is for real people and has
 * not started, so it shows zero. Scoring is never derived from token price, volume,
 * market capitalization, wallet balances, or purchases.
 */
export const seasons: Season[] = [
  { id: 's0', label: { en: 'Season 0 · AI character league', 'pt-BR': 'Temporada 0 · Liga dos personagens de IA' }, status: 'active' },
  { id: 's1', label: { en: 'Season 1 · The Signal', 'pt-BR': 'Temporada 1 · O Sinal' }, status: 'upcoming' },
];

const RACES: FactionId[] = ['grays', 'nordics', 'reptilians', 'mantis'];

const zero = (): FactionScore[] => RACES.map((faction) => ({ faction, community: 0, missions: 0, events: 0 }));

function fromLog(): FactionScore[] {
  const rows = zero();
  for (const e of season0Log) {
    const race = aiCharacterById(e.author)?.race;
    const row = rows.find((r) => r.faction === race);
    if (row) row[e.category] += e.points;
  }
  return rows;
}

export const scoresBySeason: Record<string, FactionScore[]> = {
  s0: fromLog(),
  s1: zero(),
};

/** The season shown first: the AI league until real people are playing. */
export const defaultSeason = 's0';

export const totalScore = (s: FactionScore) => s.community + s.missions + s.events;

export const rankScores = (rows: FactionScore[]) =>
  [...rows].sort((a, b) => totalScore(b) - totalScore(a));
