import { useEffect, useRef } from 'react';

/**
 * Cloudflare Turnstile site key (public by design). Empty = no CAPTCHA on the site; when filled, also turn on
 * CAPTCHA in Supabase → Authentication → Attack Protection with the matching secret key, or sign-ins fail.
 */
export const TURNSTILE_SITE_KEY = '';

const SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

interface Turnstile {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
}
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

let loading: Promise<void> | null = null;
function loadScript() {
  loading ??= new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = SCRIPT;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('turnstile'));
    document.head.appendChild(s);
  });
  return loading;
}

/**
 * Bot check shown above "Send code"; reports the token (or null when it expires). Each token works once, so
 * bump `resetKey` after using one. Renders nothing without a key.
 */
export function Captcha({ onToken, lang, resetKey }: { onToken: (token: string | null) => void; lang: string; resetKey: number }) {
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<string>();

  useEffect(() => {
    if (resetKey && widget.current) window.turnstile?.reset(widget.current);
  }, [resetKey]);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !box.current) return;
    let id: string | undefined;
    let alive = true;
    void loadScript().then(() => {
      if (!alive || !box.current || !window.turnstile) return;
      id = window.turnstile.render(box.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: 'dark',
        language: lang === 'pt-BR' ? 'pt-br' : 'en',
        callback: (token: string) => onToken(token),
        'expired-callback': () => onToken(null),
        'error-callback': () => onToken(null),
      });
      widget.current = id;
    });
    return () => {
      alive = false;
      if (id) window.turnstile?.remove(id);
    };
  }, [onToken, lang]);

  return TURNSTILE_SITE_KEY ? <div ref={box} className="min-h-[65px]" /> : null;
}
