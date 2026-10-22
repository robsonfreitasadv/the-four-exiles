import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const SUPABASE = 'qcnomemkcjrhhzcsrabk.supabase.co';
const TURNSTILE = 'https://challenges.cloudflare.com';

/**
 * Content Security Policy for the published static site (GitHub Pages can't set headers, so it goes in a meta
 * tag). Only external hosts the site really uses are allowed. Left out of the dev server, whose hot reload
 * injects inline scripts.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' ${TURNSTILE}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  `img-src 'self' data: blob: https://${SUPABASE}`,
  "media-src 'self' data: blob:",
  `connect-src 'self' https://${SUPABASE} wss://${SUPABASE} ${TURNSTILE}`,
  `frame-src ${TURNSTILE}`,
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

function securityMeta(): Plugin {
  return {
    name: 'security-meta',
    apply: 'build',
    transformIndexHtml(html) {
      return html.replace(
        '<meta charset="UTF-8" />',
        `<meta charset="UTF-8" />\n    <meta http-equiv="Content-Security-Policy" content="${csp}" />\n    <meta name="referrer" content="strict-origin-when-cross-origin" />`,
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), securityMeta()],
  server: { port: 5173 },
});
