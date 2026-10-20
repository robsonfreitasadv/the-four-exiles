import { useEffect, useRef, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useI18n } from '../../i18n/I18nProvider';

/** Always-visible marker for fictional / demo content. */
export function DemoDataBadge({ className = '', label }: { className?: string; label?: string }) {
  const { t } = useI18n();
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full bg-signal/15 px-3 py-1 text-xs font-medium text-signal ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
      {label ?? t.common.demoData}
    </span>
  );
}

interface SectionHeadingProps {
  kicker: string;
  title: string;
  intro?: ReactNode;
  as?: 'h1' | 'h2';
  aside?: ReactNode;
  center?: boolean;
}

export function SectionHeading({ kicker, title, intro, as: Tag = 'h2', aside, center }: SectionHeadingProps) {
  return (
    <Reveal
      className={`mb-10 flex flex-col gap-6 md:mb-14 ${
        center ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'
      }`}
    >
      <div className={center ? 'max-w-3xl' : 'max-w-3xl'}>
        <p className="kicker mb-3">{kicker}</p>
        <Tag className="display text-[40px] sm:text-[56px] lg:text-[64px]">{title}</Tag>
        {intro && <p className={`mt-5 max-w-2xl text-lg text-bone-dim sm:text-xl ${center ? 'mx-auto' : ''}`}>{intro}</p>}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </Reveal>
  );
}

/** Fades content up as it enters the viewport. Content is visible without JS or with reduced motion. */
export function Reveal({ children, className = '', as: Tag = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'li' | 'section' }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    el.classList.add('reveal');
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  );
}

export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/** Chevron used after text links, Apple-style. */
export function Arrow({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
