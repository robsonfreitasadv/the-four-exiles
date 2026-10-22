import type { Lang } from './types';

/**
 * Recorded voice files in public/audio/voices, named <id>-<pt|en>.mp3 (see docs/VOZES.md).
 * Add a file name here once its audio is in place; until then the site shows the text only.
 */
export const recordedVoices: string[] = [];

export function voiceFile(id: string, lang: Lang): string {
  return `${id}-${lang === 'pt-BR' ? 'pt' : 'en'}.mp3`;
}
