import type { Mission } from '../../data/types';

const INK = '#0b0d10';

/** Small scene thumbnails for mission cards (320×180). Decorative. */
export function MissionThumb({ kind, className }: { kind: Mission['thumb']; className?: string }) {
  return (
    <svg viewBox="0 0 320 180" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      {kind === 'stamps' && (
        <>
          <rect width="320" height="180" fill="#24272D" />
          <g stroke={INK} strokeWidth="3" fill="#ece6d6">
            <rect x="60" y="60" width="110" height="140" transform="rotate(-12 115 130)" fill="#cfc9b9" />
            <rect x="120" y="30" width="110" height="140" transform="rotate(6 175 100)" />
            <rect x="180" y="56" width="110" height="140" transform="rotate(18 235 126)" fill="#d9d3c3" />
          </g>
          <g stroke="#8a8679" strokeWidth="3" transform="rotate(6 175 100)">
            <line x1="138" y1="56" x2="210" y2="56" />
            <line x1="138" y1="70" x2="200" y2="70" />
            <line x1="138" y1="84" x2="214" y2="84" />
          </g>
          <g fill="none" stroke="#ff5b2e" strokeWidth="4" opacity="0.9">
            <circle cx="168" cy="118" r="26" />
            <circle cx="226" cy="100" r="18" />
            <circle cx="96" cy="128" r="20" />
          </g>
        </>
      )}
      {kind === 'ocean' && (
        <>
          <rect width="320" height="180" fill="#381D20" />
          <g stroke="#D7A64B" strokeOpacity="0.25" strokeWidth="2" fill="none">
            {[30, 60, 90, 120, 150].map((y) => (
              <path key={y} d={`M0 ${y} q40 -10 80 0 t80 0 t80 0 t80 0`} />
            ))}
          </g>
          <g stroke={INK} strokeWidth="4" strokeLinejoin="round">
            <path d="M126 60 L194 60 C194 100 176 116 160 118 C144 116 126 100 126 60 Z" fill="#D7A64B" />
            <rect x="155" y="118" width="10" height="30" fill="#D7A64B" />
            <path d="M138 148 L182 148 L188 162 L132 162 Z" fill="#D7A64B" />
            <path d="M160 18 C170 32 172 42 160 48 C148 42 150 32 160 18 Z" fill="#3f8fc0" />
          </g>
        </>
      )}
      {kind === 'smile' && (
        <>
          <rect width="320" height="180" fill="#243B59" />
          <rect x="90" y="16" width="140" height="160" fill="#F4F6F8" stroke={INK} strokeWidth="4" />
          <circle cx="160" cy="80" r="44" fill="#B8D9F2" stroke={INK} strokeWidth="4" />
          <circle cx="146" cy="72" r="3" fill={INK} />
          <circle cx="174" cy="72" r="3" fill={INK} />
          <path d="M128 88 Q160 124 192 88 Q160 102 128 88 Z" fill="#fff" stroke={INK} strokeWidth="3" />
          <g stroke="#8a8679" strokeWidth="3">
            <line x1="110" y1="140" x2="210" y2="140" />
            <line x1="118" y1="152" x2="202" y2="152" />
          </g>
          <line x1="122" y1="164" x2="198" y2="164" stroke="#ff5b2e" strokeWidth="3" />
        </>
      )}
    </svg>
  );
}
