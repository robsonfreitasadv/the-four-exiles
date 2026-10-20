import type { ComponentType } from 'react';
import type { FactionId } from '../../data/types';
import { CommanderFigure, DoraFigure, SaelFigure, SeteFigure, SovereignFigure } from './figures';

export type CharacterKey = FactionId | 'dora';

export const characterFigures: Record<CharacterKey, ComponentType> = {
  'vhal-ett': SeteFigure,
  ilvani: SaelFigure,
  sazhi: SovereignFigure,
  'xhalen-kthrix': CommanderFigure,
  dora: DoraFigure,
};

interface PortraitProps {
  character: CharacterKey;
  /** Accessible description. Pass an empty string when the portrait is decorative. */
  alt: string;
  className?: string;
}

/** A single character bust. Transparent background — the container supplies the backdrop. */
export function Portrait({ character, alt, className }: PortraitProps) {
  const Figure = characterFigures[character];
  const decorative = alt === '';
  return (
    <svg
      viewBox="0 0 400 480"
      className={className}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : alt}
      aria-hidden={decorative ? true : undefined}
      preserveAspectRatio="xMidYMax meet"
    >
      <Figure />
    </svg>
  );
}
