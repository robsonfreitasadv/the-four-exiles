/**
 * Typed content model. Every record is plain data so the mock layer in
 * `src/data/*` can later be swapped for Supabase queries returning the same shapes.
 */

export type Lang = 'en' | 'pt-BR';

/** A string available in every supported language. */
export type Localized = Record<Lang, string>;

export type FactionId = 'grays' | 'ilvani' | 'sazhi' | 'xhalen-kthrix';

export interface FactionPalette {
  primary: string;
  secondary: string;
  accent: string;
}

export interface TimelineEntry {
  year: string;
  text: Localized;
}

/** A raster artwork for a race. Missing or broken files fall back to the SVG figure. */
export interface ArtImage {
  src: string;
  alt: Localized;
  /** CSS object-position, to keep the face in frame when cropped. */
  focus?: string;
}

/** 3D-render reference set for a character: expression close-ups and turnaround frames, in rotation order. */
export interface CharacterSheet {
  expressions: string[];
  turnaround: string[];
}

export interface Faction {
  id: FactionId;
  /** Official character art; the first image is the main portrait. */
  art: ArtImage[];
  sheet: CharacterSheet;
  /** The race's motto, as printed on its character sheet. */
  quote: Localized;
  traits: Localized[];
  /** Meme and humor angles for community content. */
  memes: Localized[];
  name: string;
  title: Localized;
  homeworld: string;
  height: string;
  palette: FactionPalette;
  mood: Localized;
  /** One-line motivation for cards. */
  tagline: Localized;
  appearance: Localized;
  personality: Localized;
  motivation: Localized;
  comedy: Localized;
  /** The "serious motivation vs. ridiculous contradiction" in one line. */
  contradiction: Localized;
  claimBasis: Localized;
  leader: { name: Localized; role: Localized; description: Localized; quote: Localized };
  timeline: TimelineEntry[];
  /** Short in-universe classification code used on dossiers. */
  code: string;
}

export type Difficulty = 'trivial' | 'standard' | 'hazardous' | 'existential';
export type MissionStatus = 'open' | 'briefing' | 'closed';
export type RewardType = 'community-points' | 'lore-unlock' | 'cosmetic-badge';

export interface Mission {
  slug: string;
  faction: FactionId | 'human';
  title: Localized;
  summary: Localized;
  briefing: Localized;
  objectives: Localized[];
  difficulty: Difficulty;
  status: MissionStatus;
  reward: RewardType;
  points: number;
  thumb: 'stamps' | 'ocean' | 'smile';
}

export interface Season {
  id: string;
  label: Localized;
  status: 'archived' | 'active' | 'upcoming';
}

export interface FactionScore {
  faction: FactionId;
  /** Points from community activity: memes, stories, fan art judged by rubric. */
  community: number;
  /** Points from completed missions. */
  missions: number;
  /** Lore events, e.g. canon outcomes decided by community votes. */
  events: number;
}

/** A member of the human Resistance. */
export interface Human {
  id: string;
  name: string;
  role: Localized;
  quote: Localized;
  image: ArtImage;
  /** Only the lead has a full sheet. */
  sheet?: CharacterSheet;
  bio?: Localized;
  facts?: { label: Localized; value: Localized }[];
  skills?: Localized[];
  personality?: Localized[];
}
