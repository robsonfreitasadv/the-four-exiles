/** Shared request and response helpers for the API in functions/api/. */

export interface Env {
  DB: D1Database;
}

export type Handler = PagesFunction<Env>;

/** Error codes the site understands (src/lib/api.ts); never a message that reveals data. */
export type ErrorCode =
  | 'invalid'
  | 'bad_login'
  | 'signup_failed'
  | 'too_many'
  | 'unauthorized'
  | 'forbidden'
  | 'not_found'
  | 'nickname_taken'
  | 'has_profile'
  | 'no_profile'
  | 'daily_limit'
  | 'quota'
  | 'not_allowed'
  | 'own_entry'
  | 'bad_origin'
  | 'bad_content_type'
  | 'too_large'
  | 'email_not_configured'
  | 'server_error';

export function json(data: unknown, status = 200, headers: HeadersInit = {}): Response {
  const h = new Headers(headers);
  h.set('Content-Type', 'application/json; charset=utf-8');
  return new Response(JSON.stringify(data), { status, headers: h });
}

export function fail(code: ErrorCode, status: number, headers: HeadersInit = {}): Response {
  return json({ error: code }, status, headers);
}

/** Small bodies by default; mission entries with an image get a larger cap. */
export const SMALL_BODY = 8 * 1024;
export const ENTRY_BODY = 2_200_000;

/**
 * Reads a JSON object body no larger than `max` bytes; null for anything else. The body is read in pieces and
 * dropped as soon as it passes the cap, so an oversized upload never sits whole in memory.
 */
export async function readJson(request: Request, max = SMALL_BODY): Promise<Record<string, unknown> | null> {
  const declared = Number(request.headers.get('Content-Length') ?? '0');
  if (!Number.isFinite(declared) || declared > max) return null;
  if (!request.body) return null;
  const reader = request.body.getReader();
  const parts: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > max) {
      await reader.cancel().catch(() => undefined);
      return null;
    }
    parts.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const part of parts) {
    bytes.set(part, offset);
    offset += part.byteLength;
  }
  try {
    const body = JSON.parse(new TextDecoder('utf-8', { fatal: true, ignoreBOM: false }).decode(bytes)) as unknown;
    return body && typeof body === 'object' && !Array.isArray(body) ? (body as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

/** Expands an IPv6 address to its eight groups; null when it isn't one. */
function ipv6Groups(ip: string): string[] | null {
  let address = ip.toLowerCase().split('%')[0];
  // IPv4 tail (::ffff:1.2.3.4) becomes two groups
  const v4 = address.match(/(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  if (v4) {
    const [a, b, c, d] = v4.slice(1).map(Number);
    address = address.slice(0, -v4[0].length) + `${((a << 8) | b).toString(16)}:${((c << 8) | d).toString(16)}`;
  }
  const halves = address.split('::');
  if (halves.length > 2) return null;
  const head = halves[0] ? halves[0].split(':') : [];
  const tail = halves.length === 2 && halves[1] ? halves[1].split(':') : [];
  const missing = 8 - head.length - tail.length;
  if (halves.length === 1 ? missing !== 0 : missing < 1) return null;
  const groups = [...head, ...Array<string>(halves.length === 2 ? missing : 0).fill('0'), ...tail];
  return groups.every((g) => /^[0-9a-f]{1,4}$/.test(g)) ? groups.map((g) => g.replace(/^0+(?=.)/, '')) : null;
}

/**
 * Network address of the person, as Cloudflare saw it, for attempt limits. IPv6 keeps only the /64 prefix:
 * one connection usually owns a whole /64, so counting single addresses would let it rotate past every limit.
 */
export function clientIp(request: Request): string {
  return normalizeIp(request.headers.get('CF-Connecting-IP') ?? '');
}

export function normalizeIp(ip: string): string {
  const raw = ip.trim();
  if (!raw) return 'unknown';
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(raw)) return raw;
  const groups = ipv6Groups(raw);
  if (!groups) return 'unknown';
  return `${groups.slice(0, 4).join(':')}::/64`;
}

/**
 * CSRF guard for every request that changes something: the body must be JSON (a plain HTML form can't send
 * that) and the Origin header must be this very origin (scheme, host and port).
 */
export function crossSiteRejection(request: Request): Response | null {
  if (['GET', 'HEAD', 'OPTIONS'].includes(request.method)) return null;
  const type = (request.headers.get('Content-Type') ?? '').split(';')[0].trim().toLowerCase();
  if (type !== 'application/json') return fail('bad_content_type', 415);
  const origin = request.headers.get('Origin');
  if (!origin) return fail('bad_origin', 403);
  try {
    if (new URL(origin).origin !== new URL(request.url).origin) return fail('bad_origin', 403);
  } catch {
    return fail('bad_origin', 403);
  }
  return null;
}

/** True when SQLite refused a write because of a unique index. */
export function isUniqueViolation(err: unknown): boolean {
  return err instanceof Error && /UNIQUE constraint failed/i.test(err.message);
}

export function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}
