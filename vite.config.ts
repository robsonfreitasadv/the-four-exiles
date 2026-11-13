/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Content Security Policy for the published static site (a meta tag, so it travels with the build to any host;
 * on Cloudflare Pages public/_headers sends the same policy as a header, plus frame-ancestors).
 * Everything the site loads is its own, including the API at /api, except Google Fonts. Left out of the dev
 * server, whose hot reload injects inline scripts.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  "media-src 'self' data: blob:",
  "connect-src 'self'",
  "frame-src 'none'",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'none'",
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
  // `npm run dev` sends /api to `wrangler pages dev` (port 8788) when it is running; without it, accounts show "soon".
  server: { port: 5173, proxy: { '/api': 'http://localhost:8788' } },
  test: { include: ['tests/**/*.test.ts'] },
});
