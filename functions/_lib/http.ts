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
  | 'not_allowed'
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

/** Reads a JSON object body no larger than `max` bytes; null for anything else. */
export async function readJson(request: Request, max = SMALL_BODY): Promise<Record<string, unknown> | null> {
  const declared = Number(request.headers.get('Content-Length') ?? '0');
  if (declared > max) return null;
  const raw = await request.text();
  if (raw.length > max) return null;
  try {
    const body = JSON.parse(raw) as unknown;
    return body && typeof body === 'object' && !Array.isArray(body) ? (body as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

/** Network address of the person, as Cloudflare saw it. */
export function clientIp(request: Request): string {
  return request.headers.get('CF-Connecting-IP') ?? 'unknown';
}

/**
 * CSRF guard for every request that changes something: the body must be JSON (a plain HTML form can't send
 * that) and the Origin header must be this same host.
 */
export function crossSiteRejection(request: Request): Response | null {
  if (['GET', 'HEAD', 'OPTIONS'].includes(request.method)) return null;
  const type = (request.headers.get('Content-Type') ?? '').split(';')[0].trim().toLowerCase();
  if (type !== 'application/json') return fail('bad_content_type', 415);
  const origin = request.headers.get('Origin');
  if (!origin) return fail('bad_origin', 403);
  try {
    if (new URL(origin).host !== new URL(request.url).host) return fail('bad_origin', 403);
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
