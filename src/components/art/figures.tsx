/**
 * Original character figures for THE FOUR EXILES, drawn as inline SVG.
 * Each figure is a bust in a 400×480 coordinate space and returns a <g>, so it can be
 * placed standalone (see Portrait.tsx) or composed into larger scenes (HeroEnsemble.tsx).
 *
 * These are intentional concept placeholders: final illustrated portraits can replace
 * them per character without touching layout code.
 */

const INK = '#0b0d10';
const line = { stroke: INK, strokeWidth: 5, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const };
const thin = { stroke: INK, strokeWidth: 3, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const };

/** Grays — Sete, auditor of the Central Archive. Huge head, tiny hands, enormous document. */
export function SeteFigure() {
  return (
    <g>
      {/* uniform */}
      <path d="M118 480 L132 392 Q200 360 268 392 L282 480 Z" fill="#30353d" {...line} />
      <path d="M170 372 L200 430 L230 372" fill="#E7E9EC" {...thin} />
      <path d="M200 430 L200 480" {...thin} fill="none" />
      {/* badge */}
      <rect x="222" y="410" width="40" height="30" rx="3" fill="#E7E9EC" {...thin} />
      <rect x="228" y="416" width="12" height="12" fill="#A7ADB5" />
      <text x="252" y="432" fontFamily="IBM Plex Mono, monospace" fontSize="11" fontWeight="600" textAnchor="middle" fill={INK}>07</text>
      {/* neck */}
      <path d="M188 318 L186 376 L214 376 L212 318 Z" fill="#9aa1aa" {...thin} />
      {/* head */}
      <path d="M200 52 C304 52 344 136 334 208 C324 282 254 330 200 336 C146 330 76 282 66 208 C56 136 96 52 200 52 Z" fill="#A7ADB5" {...line} />
      <path d="M268 78 C318 110 340 170 330 214 C318 276 262 318 214 332 C270 300 304 250 306 196 C308 146 294 104 268 78 Z" fill="#8c939c" />
      <path d="M140 92 C120 104 104 124 98 146" stroke="#d6dadf" strokeWidth="6" strokeLinecap="round" fill="none" />
      {/* eyes */}
      <path d="M100 206 C112 160 178 160 188 214 C180 250 116 246 100 206 Z" fill={INK} />
      <path d="M300 206 C288 160 222 160 212 214 C220 250 284 246 300 206 Z" fill={INK} />
      <ellipse cx="134" cy="196" rx="9" ry="6" fill="#fff" opacity="0.9" />
      <ellipse cx="248" cy="196" rx="9" ry="6" fill="#fff" opacity="0.9" />
      {/* heavy, unimpressed lids */}
      <path d="M92 168 L196 184 L196 198 C170 182 120 180 96 196 Z" fill="#A7ADB5" />
      <path d="M308 168 L204 184 L204 198 C230 182 280 180 304 196 Z" fill="#A7ADB5" />
      <path d="M98 194 C130 180 170 184 192 200" fill="none" {...thin} />
      <path d="M302 194 C270 180 230 184 208 200" fill="none" {...thin} />
      {/* nose + mouth */}
      <circle cx="194" cy="262" r="2.5" fill={INK} />
      <circle cx="206" cy="262" r="2.5" fill={INK} />
      <path d="M188 292 L212 292" {...thin} />
      {/* enormous document */}
      <g transform="rotate(-7 130 420)">
        <rect x="22" y="352" width="196" height="150" fill="#d9d3c3" {...line} />
        <rect x="30" y="344" width="196" height="150" fill="#ece6d6" {...line} />
        <g stroke="#8a8679" strokeWidth="3">
          <line x1="48" y1="372" x2="186" y2="372" />
          <line x1="48" y1="388" x2="206" y2="388" />
          <line x1="48" y1="404" x2="170" y2="404" />
          <line x1="48" y1="420" x2="200" y2="420" />
          <line x1="48" y1="436" x2="150" y2="436" />
        </g>
        <g transform="rotate(-14 160 452)">
          <rect x="112" y="434" width="96" height="34" rx="4" fill="none" stroke="#ff5b2e" strokeWidth="4" />
          <text x="160" y="457" fontFamily="IBM Plex Mono, monospace" fontSize="14" fontWeight="600" textAnchor="middle" fill="#ff5b2e">PENDING</text>
        </g>
        {/* tiny hands */}
        <g fill="#A7ADB5" {...thin}>
          <path d="M40 360 c-8 -6 -6 -18 4 -16 l2 -10 c2 -6 8 -4 8 2 l0 8 c4 -6 10 -2 8 4 l-6 14 Z" />
          <path d="M214 352 c8 -6 6 -18 -4 -16 l-2 -10 c-2 -6 -8 -4 -8 2 l0 8 c-4 -6 -10 -2 -8 4 l6 14 Z" />
        </g>
      </g>
    </g>
  );
}

/** ILVANI — Sael, the defector. Beautiful, symmetrical, and one smile too many. */
export function SaelFigure() {
  return (
    <g>
      <ellipse cx="200" cy="168" rx="150" ry="150" fill="none" stroke="#B8D9F2" strokeWidth="3" opacity="0.55" />
      <ellipse cx="200" cy="168" rx="132" ry="132" fill="none" stroke="#B8D9F2" strokeWidth="1.5" opacity="0.35" strokeDasharray="4 8" />
      {/* hair back */}
      <path d="M104 170 C96 80 150 34 204 36 C268 38 312 92 300 182 L316 360 C280 380 120 380 86 360 Z" fill="#d8d2bd" {...line} />
      {/* robe */}
      <path d="M44 480 C60 404 128 368 200 368 C272 368 340 404 356 480 Z" fill="#F4F6F8" {...line} />
      <path d="M200 368 L200 480" stroke="#243B59" strokeWidth="10" />
      <path d="M126 386 C150 420 170 440 200 448 C230 440 250 420 274 386" fill="none" stroke="#B8D9F2" strokeWidth="6" />
      {/* collar + neck */}
      <path d="M166 290 L164 372 L236 372 L234 290 Z" fill="#efdcd2" {...thin} />
      <path d="M150 344 C170 362 230 362 250 344 L256 378 C230 396 170 396 144 378 Z" fill="#F4F6F8" {...thin} />
      {/* face */}
      <path d="M200 74 C258 74 286 120 284 182 C282 250 246 304 200 308 C154 304 118 250 116 182 C114 120 142 74 200 74 Z" fill="#f4e5dc" {...line} />
      <path d="M262 108 C282 150 280 220 248 276 C268 230 272 170 262 108 Z" fill="#e6d0c4" />
      {/* hair front: smooth part */}
      <path d="M112 168 C108 96 150 60 204 60 C258 60 296 100 290 166 C276 120 244 100 206 98 C176 98 140 120 112 168 Z" fill="#efe9d6" {...line} />
      <path d="M206 98 C190 86 182 74 184 62" stroke="#c9c1a6" strokeWidth="4" fill="none" />
      {/* serene brows */}
      <path d="M140 160 Q160 148 182 158" fill="none" {...thin} />
      <path d="M218 158 Q240 148 260 160" fill="none" {...thin} />
      {/* wide, unblinking eyes */}
      <ellipse cx="162" cy="188" rx="20" ry="13" fill="#fff" {...thin} />
      <ellipse cx="238" cy="188" rx="20" ry="13" fill="#fff" {...thin} />
      <circle cx="162" cy="188" r="9" fill="#5aa6d6" />
      <circle cx="238" cy="188" r="9" fill="#5aa6d6" />
      <circle cx="162" cy="188" r="2.6" fill={INK} />
      <circle cx="238" cy="188" r="2.6" fill={INK} />
      <circle cx="165" cy="184" r="2" fill="#fff" />
      <circle cx="241" cy="184" r="2" fill="#fff" />
      {/* nose */}
      <path d="M200 196 L196 232 Q200 236 206 232" fill="none" {...thin} />
      {/* blush */}
      <ellipse cx="146" cy="236" rx="16" ry="8" fill="#f2b8b0" opacity="0.5" />
      <ellipse cx="254" cy="236" rx="16" ry="8" fill="#f2b8b0" opacity="0.5" />
      {/* the smile: slightly too wide, slightly too many teeth */}
      <path d="M140 246 Q200 300 260 246 Q200 268 140 246 Z" fill="#fff" {...thin} />
      <g stroke="#c8ced6" strokeWidth="2">
        {[156, 168, 180, 192, 204, 216, 228, 240].map((x) => (
          <line key={x} x1={x} y1="254" x2={x} y2="274" />
        ))}
      </g>
      <path d="M140 246 Q200 300 260 246" fill="none" {...thin} />
      <path d="M134 240 Q138 248 144 250" fill="none" {...thin} />
      <path d="M266 240 Q262 248 256 250" fill="none" {...thin} />
      {/* sigil */}
      <circle cx="200" cy="420" r="13" fill="#B8D9F2" {...thin} />
      <circle cx="200" cy="420" r="5" fill="#243B59" />
    </g>
  );
}

/** SAZHI — The Sovereign. Regal, ancient, smug, and thirsty. */
export function SovereignFigure() {
  return (
    <g>
      {/* robe */}
      <path d="M30 480 C40 390 110 350 190 350 C280 350 350 390 372 480 Z" fill="#381D20" {...line} />
      <path d="M120 360 C150 420 180 440 200 480 M280 360 C250 420 220 440 200 480" stroke="#D7A64B" strokeWidth="8" fill="none" />
      <path d="M60 420 C80 380 120 362 150 358 L140 392 C110 396 80 410 60 420 Z" fill="#D7A64B" {...thin} />
      <path d="M340 420 C320 380 280 362 250 358 L260 392 C290 396 320 410 340 420 Z" fill="#D7A64B" {...thin} />
      {/* frill / neck */}
      <path d="M140 280 L130 362 L262 362 L250 280 Z" fill="#5f7040" {...line} />
      <path d="M118 340 L150 300 L170 344 L200 304 L230 344 L250 300 L282 340 L272 372 L128 372 Z" fill="#D7A64B" {...thin} />
      <circle cx="200" cy="352" r="10" fill="#3f8fc0" {...thin} />
      {/* head: cranium right, long snout left (3/4 view) */}
      <path d="M150 112 C190 70 276 74 300 132 C318 176 312 236 282 270 C252 300 196 306 150 298 C110 292 62 280 50 254 C40 232 56 214 84 210 C110 206 126 180 130 150 C134 132 140 120 150 112 Z" fill="#73854A" {...line} />
      {/* belly scales jaw */}
      <path d="M58 252 C90 270 150 280 220 278 C250 276 274 266 288 252 C270 290 220 304 160 298 C110 294 66 280 58 252 Z" fill="#a6b07a" {...thin} />
      {/* scale pattern */}
      <g fill="none" stroke="#5a6a38" strokeWidth="3">
        <path d="M200 120 q10 10 20 0 q10 10 20 0" />
        <path d="M190 140 q10 10 20 0 q10 10 20 0 q10 10 20 0" />
        <path d="M250 180 q10 10 20 0" />
        <path d="M240 210 q10 10 20 0 q10 10 20 0" />
      </g>
      {/* smug mouth */}
      <path d="M60 248 C110 256 170 254 236 236 C246 232 254 226 258 220" fill="none" {...line} />
      <path d="M90 252 l4 10 l6 -9 M120 254 l4 10 l6 -10" fill="#fff" stroke={INK} strokeWidth="2" />
      {/* nostrils */}
      <path d="M66 224 q6 -4 10 2" fill="none" {...thin} />
      {/* brow ridge: one raised in suspicion */}
      <path d="M140 156 C160 128 200 126 220 146" fill="#5f7040" {...line} />
      <path d="M232 160 C248 150 268 152 280 166" fill="#5f7040" {...line} />
      {/* eyes: gold, vertical slits */}
      <ellipse cx="184" cy="172" rx="22" ry="18" fill="#e7c766" {...thin} />
      <ellipse cx="184" cy="172" rx="4" ry="16" fill={INK} />
      <path d="M162 170 C176 164 194 164 206 170" stroke="#73854A" strokeWidth="6" fill="none" />
      <ellipse cx="258" cy="182" rx="16" ry="15" fill="#e7c766" {...thin} />
      <ellipse cx="258" cy="183" rx="3.5" ry="13" fill={INK} />
      <path d="M242 176 C252 170 266 170 274 176" stroke="#73854A" strokeWidth="6" fill="none" />
      {/* crown with a single, precious drop of water */}
      <path d="M156 104 L150 40 L184 76 L210 22 L236 76 L270 44 L270 108 C236 92 190 92 156 104 Z" fill="#D7A64B" {...line} />
      <path d="M210 58 C220 72 222 82 210 88 C198 82 200 72 210 58 Z" fill="#3f8fc0" {...thin} />
      <circle cx="166" cy="96" r="5" fill="#9d2b2b" />
      <circle cx="258" cy="96" r="5" fill="#9d2b2b" />
      {/* goblet */}
      <g transform="translate(286 370)">
        <path d="M0 0 L60 0 C60 34 44 48 30 50 C16 48 0 34 0 0 Z" fill="#D7A64B" {...thin} />
        <rect x="26" y="50" width="8" height="34" fill="#D7A64B" {...thin} />
        <path d="M10 84 L50 84 L54 96 L6 96 Z" fill="#D7A64B" {...thin} />
        <path d="M30 -36 C38 -24 40 -16 30 -10 C20 -16 22 -24 30 -36 Z" fill="#3f8fc0" {...thin} />
        <path d="M-6 26 C-20 22 -30 30 -24 44 L4 40 Z" fill="#73854A" {...thin} />
      </g>
    </g>
  );
}

/** XHALEN-KTHRIX — The Commander. Polite, precise, and absolutely lethal. */
export function CommanderFigure() {
  return (
    <g>
      {/* antennae */}
      <path d="M176 92 C160 50 130 26 92 20" fill="none" {...line} />
      <path d="M224 92 C240 50 270 26 308 20" fill="none" {...line} />
      {/* armored torso */}
      <path d="M48 480 L72 392 L150 356 L250 356 L328 392 L352 480 Z" fill="#5f7566" {...line} />
      <path d="M150 356 L200 470 L250 356" fill="#758D7C" {...thin} />
      <path d="M118 400 L282 400 M100 440 L300 440" stroke="#4a5c50" strokeWidth="4" />
      {/* epaulettes */}
      <path d="M58 396 L110 368 L134 392 L80 420 Z" fill="#171C1B" {...thin} />
      <path d="M342 396 L290 368 L266 392 L320 420 Z" fill="#171C1B" {...thin} />
      <g stroke="#B8C5BD" strokeWidth="3">
        <line x1="78" y1="398" x2="112" y2="380" />
        <line x1="322" y1="398" x2="288" y2="380" />
      </g>
      {/* medals */}
      <g {...thin}>
        <rect x="262" y="410" width="14" height="22" fill="#a33b2c" />
        <rect x="280" y="410" width="14" height="22" fill="#B8C5BD" />
        <rect x="298" y="410" width="14" height="22" fill="#c99a3b" />
      </g>
      {/* segmented neck */}
      <path d="M182 300 L178 360 L222 360 L218 300 Z" fill="#6a8170" {...thin} />
      <path d="M180 320 L220 320 M179 340 L221 340" stroke={INK} strokeWidth="3" />
      {/* triangular head */}
      <path d="M200 316 L104 150 C110 104 152 86 200 86 C248 86 290 104 296 150 Z" fill="#758D7C" {...line} />
      <path d="M200 316 L262 196 C270 190 284 172 292 150 L296 150 Z" fill="#62786a" />
      {/* compound eyes */}
      <g>
        <path d="M108 152 C112 118 150 104 182 118 C188 150 168 186 136 188 C116 186 106 172 108 152 Z" fill="#1f2b25" {...line} />
        <path d="M292 152 C288 118 250 104 218 118 C212 150 232 186 264 188 C284 186 294 172 292 152 Z" fill="#1f2b25" {...line} />
        <g stroke="#3d5246" strokeWidth="2" fill="none">
          <path d="M124 136 l10 6 l0 12 l-10 6 l-10 -6 l0 -12 Z M146 130 l10 6 l0 12 l-10 6 l-10 -6 l0 -12 Z M140 158 l10 6 l0 12 l-10 6 l-10 -6 l0 -12 Z M162 150 l10 6 l0 12 l-10 6 l-10 -6 l0 -12 Z" />
          <path d="M276 136 l-10 6 l0 12 l10 6 l10 -6 l0 -12 Z M254 130 l-10 6 l0 12 l10 6 l10 -6 l0 -12 Z M260 158 l-10 6 l0 12 l10 6 l10 -6 l0 -12 Z M238 150 l-10 6 l0 12 l10 6 l10 -6 l0 -12 Z" />
        </g>
        <ellipse cx="140" cy="132" rx="10" ry="5" fill="#B8C5BD" opacity="0.7" />
        <ellipse cx="236" cy="132" rx="10" ry="5" fill="#B8C5BD" opacity="0.7" />
      </g>
      {/* mandibles: closed, courteous */}
      <path d="M184 282 C176 300 186 314 198 316" fill="none" {...thin} />
      <path d="M216 282 C224 300 214 314 202 316" fill="none" {...thin} />
      {/* officer cap */}
      <path d="M140 98 C150 56 250 56 260 98 Z" fill="#171C1B" {...line} />
      <path d="M126 102 C160 88 240 88 274 102 L270 114 C236 104 164 104 130 114 Z" fill="#232a28" {...thin} />
      <path d="M186 70 L200 82 L214 70" fill="none" stroke="#B8C5BD" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      {/* raptorial arm, folded in salute */}
      <path d="M72 424 L26 304 L56 294 L102 412 Z" fill="#6a8170" {...line} />
      <path d="M26 304 L104 112 L126 120 L56 298 Z" fill="#758D7C" {...line} />
      <path d="M104 112 L96 92 L120 100 L126 120 Z" fill="#62786a" {...thin} />
      <path d="M50 270 l-14 -10 M62 240 l-14 -10 M74 210 l-14 -10 M86 180 l-14 -10" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <circle cx="41" cy="300" r="9" fill="#171C1B" {...thin} />
    </g>
  );
}

/** Dora — human, unauthorized reader of contracts. */
export function DoraFigure() {
  return (
    <g>
      {/* jacket */}
      <path d="M50 480 C62 400 120 360 200 360 C280 360 338 400 350 480 Z" fill="#c8642d" {...line} />
      <path d="M160 362 L200 430 L240 362" fill="#f1ede4" {...thin} />
      <path d="M200 430 L200 480" {...thin} />
      <path d="M150 366 L176 420 L150 430 L120 380 Z M250 366 L224 420 L250 430 L280 380 Z" fill="#a84f22" {...thin} />
      <rect x="252" y="436" width="40" height="8" fill="#a84f22" />
      {/* neck */}
      <path d="M176 296 L174 368 L226 368 L224 296 Z" fill="#9e6644" {...thin} />
      {/* hair back + bun */}
      <circle cx="200" cy="58" r="36" fill="#1f1714" {...line} />
      <rect x="230" y="18" width="10" height="70" rx="2" transform="rotate(32 235 53)" fill="#e7b93c" {...thin} />
      <path d="M118 190 C100 120 140 70 200 70 C260 70 300 120 282 190 C296 230 280 260 262 270 L138 270 C120 260 104 230 118 190 Z" fill="#1f1714" {...line} />
      {/* face */}
      <path d="M200 102 C252 102 276 142 274 196 C272 254 240 298 200 302 C160 298 128 254 126 196 C124 142 148 102 200 102 Z" fill="#b0764f" {...line} />
      <path d="M248 126 C270 160 272 220 246 270 C262 226 262 170 248 126 Z" fill="#9a6442" />
      {/* curls fringe */}
      <g fill="#1f1714" {...thin}>
        <circle cx="150" cy="122" r="22" />
        <circle cx="180" cy="104" r="22" />
        <circle cx="214" cy="102" r="22" />
        <circle cx="246" cy="116" r="22" />
        <circle cx="128" cy="150" r="16" />
        <circle cx="270" cy="146" r="16" />
      </g>
      {/* ears + earrings */}
      <ellipse cx="128" cy="204" rx="10" ry="16" fill="#b0764f" {...thin} />
      <ellipse cx="272" cy="204" rx="10" ry="16" fill="#b0764f" {...thin} />
      <circle cx="128" cy="226" r="5" fill="#e7b93c" {...thin} />
      <circle cx="272" cy="226" r="5" fill="#e7b93c" {...thin} />
      {/* eyebrows: one skeptical, one flat */}
      <path d="M150 166 C160 150 178 146 190 152" fill="none" stroke={INK} strokeWidth="8" strokeLinecap="round" />
      <path d="M212 172 C226 168 240 168 252 172" fill="none" stroke={INK} strokeWidth="8" strokeLinecap="round" />
      {/* eyes */}
      <ellipse cx="170" cy="188" rx="9" ry="11" fill={INK} />
      <ellipse cx="232" cy="190" rx="9" ry="8" fill={INK} />
      <circle cx="173" cy="184" r="3" fill="#fff" />
      <circle cx="235" cy="187" r="2.5" fill="#fff" />
      <path d="M220 182 L246 182" stroke="#9a6442" strokeWidth="4" />
      {/* nose + smirk */}
      <path d="M200 200 C196 220 194 230 204 234" fill="none" {...thin} />
      <path d="M176 262 C198 268 218 264 236 250" fill="none" {...line} />
      <path d="M236 250 l6 -4" {...thin} />
      {/* the contract she actually read */}
      <g transform="rotate(6 280 430)">
        <rect x="214" y="386" width="132" height="104" fill="#d9d3c3" {...line} />
        <rect x="220" y="380" width="132" height="104" fill="#ece6d6" {...line} />
        <g stroke="#8a8679" strokeWidth="3">
          <line x1="234" y1="402" x2="334" y2="402" />
          <line x1="234" y1="416" x2="320" y2="416" />
          <line x1="234" y1="430" x2="338" y2="430" />
        </g>
        <rect x="228" y="440" width="110" height="18" fill="#ffe36b" opacity="0.8" />
        <text x="283" y="453" fontFamily="IBM Plex Mono, monospace" fontSize="11" fontWeight="600" textAnchor="middle" fill={INK}>§ 4,812-c</text>
        <path d="M222 400 c-14 0 -18 18 -6 22 l10 2 Z" fill="#b0764f" {...thin} />
      </g>
    </g>
  );
}
