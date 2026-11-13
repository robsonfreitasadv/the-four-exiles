import { newSessionToken, sha256Hex } from './crypto';
import { fail, type Env } from './http';

export const SESSION_COOKIE = 'fe_session';
export const SESSION_DAYS = 30;
const SESSION_MS = SESSION_DAYS * 24 * 60 * 60 * 1000;

export interface User {
  id: string;
  email: string;
}

/** First-party cookie: unreadable by scripts, HTTPS only, not sent on cross-site requests that change things. */
function cookie(value: string, maxAge: number): string {
  return `${SESSION_COOKIE}=${value}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${maxAge}`;
}

export function clearSessionCookie(): string {
  return cookie('', 0);
}

function readToken(request: Request): string | null {
  const header = request.headers.get('Cookie') ?? '';
  for (const part of header.split(';')) {
    const [name, ...rest] = part.trim().split('=');
    if (name === SESSION_COOKIE) {
      const value = rest.join('=');
      return /^[A-Za-z0-9_-]{43}$/.test(value) ? value : null;
    }
  }
  return null;
}

/** Starts a session and returns the Set-Cookie header for it. Expired sessions are swept on the way. */
export async function startSession(env: Env, userId: string): Promise<string> {
  const token = newSessionToken();
  const now = Date.now();
  await env.DB.batch([
    env.DB.prepare('delete from sessions where expires_at < ?').bind(now),
    env.DB.prepare('insert into sessions (token_hash, user_id, expires_at) values (?, ?, ?)').bind(
      await sha256Hex(token),
      userId,
      now + SESSION_MS,
    ),
  ]);
  return cookie(token, Math.floor(SESSION_MS / 1000));
}

export interface Current {
  user: User;
  tokenHash: string;
}

/** The signed-in person behind this request, or null. */
export async function currentUser(request: Request, env: Env): Promise<Current | null> {
  const token = readToken(request);
  if (!token) return null;
  const tokenHash = await sha256Hex(token);
  const user = await env.DB.prepare(
    'select u.id, u.email from sessions s join users u on u.id = s.user_id where s.token_hash = ? and s.expires_at > ?',
  )
    .bind(tokenHash, Date.now())
    .first<User>();
  return user ? { user, tokenHash } : null;
}

export async function endSession(request: Request, env: Env): Promise<void> {
  const token = readToken(request);
  if (token) await env.DB.prepare('delete from sessions where token_hash = ?').bind(await sha256Hex(token)).run();
}

/** For handlers that need a signed-in person: either the person or the 401 to send back. */
export async function requireUser(request: Request, env: Env): Promise<Current | Response> {
  return (await currentUser(request, env)) ?? fail('unauthorized', 401, { 'Set-Cookie': clearSessionCookie() });
}

export async function isModerator(env: Env, userId: string): Promise<boolean> {
  return Boolean(await env.DB.prepare('select 1 as yes from moderators where user_id = ?').bind(userId).first());
}

/** Moderation endpoints: signed in and listed in `moderators`, checked here on every call. */
export async function requireModerator(request: Request, env: Env): Promise<Current | Response> {
  const current = await requireUser(request, env);
  if (current instanceof Response) return current;
  return (await isModerator(env, current.user.id)) ? current : fail('forbidden', 403);
}
