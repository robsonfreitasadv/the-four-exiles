import { Link } from 'react-router-dom';

/** Wordmark: four orbit pips around a planet, one per race. */
export function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2" aria-label="THE FOUR EXILES">
      <svg viewBox="0 0 40 40" className="h-6 w-6 shrink-0" aria-hidden="true">
        <circle cx="20" cy="20" r="17" fill="none" stroke="#424245" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="8" fill="#2f6f8f" />
        <g
          className="transition-transform duration-700 group-hover:rotate-90 motion-reduce:transition-none"
          style={{ transformOrigin: '20px 20px' }}
        >
          <circle cx="20" cy="3" r="3" fill="#A7ADB5" />
          <circle cx="37" cy="20" r="3" fill="#B8D9F2" />
          <circle cx="20" cy="37" r="3" fill="#D7A64B" />
          <circle cx="3" cy="20" r="3" fill="#758D7C" />
        </g>
      </svg>
      <span className="font-display text-[15px] font-semibold tracking-[-0.01em]">The Four Exiles</span>
    </Link>
  );
}
