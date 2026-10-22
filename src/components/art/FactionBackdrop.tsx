import type { FactionId } from '../../data/types';
import { factionById } from '../../data/factions';

/**
 * Faction-specific backdrop textures, so the four portraits never sit on identical cards:
 * Grays get ruled archival paper, Aurel a soft halo, Sazar an imperial lattice,
 * Vex hazard striping and a targeting reticle.
 */
export function FactionBackdrop({ faction, className = '' }: { faction: FactionId; className?: string }) {
  const p = factionById(faction)!.palette;
  return (
    <svg
      viewBox="0 0 400 480"
      preserveAspectRatio="xMidYMid slice"
      className={`absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    >
      <rect width="400" height="480" fill={p.secondary} />
      {faction === 'grays' && (
        <g>
          {Array.from({ length: 24 }, (_, i) => (
            <line key={i} x1="0" x2="400" y1={20 + i * 20} y2={20 + i * 20} stroke={p.primary} strokeOpacity="0.12" />
          ))}
          <line x1="48" x2="48" y1="0" y2="480" stroke="#ff5b2e" strokeOpacity="0.35" />
          <text x="388" y="30" textAnchor="end" fontFamily="IBM Plex Mono, monospace" fontSize="12" fill={p.primary} opacity="0.5">
            FORM 77-B · REV. 4,812
          </text>
        </g>
      )}
      {faction === 'nordics' && (
        <g>
          <defs>
            <radialGradient id="ilvani-halo" cx="0.5" cy="0.38" r="0.6">
              <stop offset="0" stopColor={p.primary} stopOpacity="0.45" />
              <stop offset="1" stopColor={p.primary} stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="480" fill="url(#ilvani-halo)" />
          {[60, 110, 160, 210].map((r) => (
            <circle key={r} cx="200" cy="180" r={r} fill="none" stroke={p.accent} strokeOpacity="0.12" />
          ))}
        </g>
      )}
      {faction === 'reptilians' && (
        <g>
          <defs>
            <pattern id="sazhi-lattice" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="40" height="40" fill="none" stroke={p.accent} strokeOpacity="0.14" strokeWidth="2" />
              <circle cx="20" cy="20" r="2.5" fill={p.accent} fillOpacity="0.2" />
            </pattern>
          </defs>
          <rect width="400" height="480" fill="url(#sazhi-lattice)" />
          <rect x="12" y="12" width="376" height="456" fill="none" stroke={p.accent} strokeOpacity="0.45" strokeWidth="2" />
          <rect x="20" y="20" width="360" height="440" fill="none" stroke={p.accent} strokeOpacity="0.2" />
        </g>
      )}
      {faction === 'mantis' && (
        <g>
          <defs>
            <pattern id="xk-hazard" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
              <rect width="12" height="24" fill={p.accent} fillOpacity="0.25" />
            </pattern>
          </defs>
          <rect width="400" height="22" fill="url(#xk-hazard)" />
          <g stroke={p.accent} strokeOpacity="0.22" fill="none">
            <circle cx="200" cy="190" r="150" />
            <circle cx="200" cy="190" r="100" strokeDasharray="6 10" />
            <line x1="200" y1="20" x2="200" y2="360" />
            <line x1="30" y1="190" x2="370" y2="190" />
          </g>
          <text x="16" y="470" fontFamily="IBM Plex Mono, monospace" fontSize="12" fill={p.accent} opacity="0.5">
            TGT-LOCK · COURTESY MODE
          </text>
        </g>
      )}
    </svg>
  );
}
