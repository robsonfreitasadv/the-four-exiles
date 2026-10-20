import type { FactionId } from '../../data/types';

interface EmblemProps {
  faction: FactionId;
  className?: string;
  title?: string;
}

/** Faction emblems: simple marks that stay legible at 24px. Use currentColor for tinting. */
export function Emblem({ faction, className, title }: EmblemProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {faction === 'grays' && (
        <>
          {/* the archival stamp: an eye inside a seal */}
          <circle cx="50" cy="50" r="42" />
          <circle cx="50" cy="50" r="32" strokeWidth="3" strokeDasharray="4 6" />
          <path d="M24 52 C34 32 66 32 76 52 C66 66 34 66 24 52 Z" fill="currentColor" stroke="none" />
          <path d="M28 46 L72 46" strokeWidth="5" stroke="#0b0d10" />
        </>
      )}
      {faction === 'nordics' && (
        <>
          {/* the garden: a six-petal bloom */}
          {[0, 60, 120, 180, 240, 300].map((r) => (
            <ellipse key={r} cx="50" cy="26" rx="10" ry="18" transform={`rotate(${r} 50 50)`} strokeWidth="4" />
          ))}
          <circle cx="50" cy="50" r="9" fill="currentColor" stroke="none" />
        </>
      )}
      {faction === 'reptilians' && (
        <>
          {/* the crown and the last drop */}
          <path d="M14 70 L18 26 L36 44 L50 16 L64 44 L82 26 L86 70 Z" />
          <path d="M50 52 C58 62 60 70 50 76 C40 70 42 62 50 52 Z" fill="currentColor" stroke="none" />
          <path d="M14 84 L86 84" />
        </>
      )}
      {faction === 'mantis' && (
        <>
          {/* the commander's chevron head */}
          <path d="M50 90 L12 22 L88 22 Z" />
          <path d="M24 30 L44 30 L40 48 Z M76 30 L56 30 L60 48 Z" fill="currentColor" stroke="none" />
          <path d="M34 62 L50 72 L66 62" strokeWidth="5" />
        </>
      )}
    </svg>
  );
}
