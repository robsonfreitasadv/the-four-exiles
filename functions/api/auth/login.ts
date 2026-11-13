import { accountPayload } from '../../_lib/account';
import { dummyHash, verifyPassword } from '../../_lib/crypto';
import { clientIp, fail, json, readJson, type Handler } from '../../_lib/http';
import { clear, giveBack, hit, isLocked, LOGIN_EMAIL, LOGIN_IP, LOGIN_PAIR, loginKeys } from '../../_lib/ratelimit';
import { startSession } from '../../_lib/session';
import { normalizeEmail, passwordAttempt } from '../../_lib/validate';

/**
 * POST /api/auth/login { email, password }. Wrong e-mail and wrong password get the same answer, in about the
 * same time, so nobody can find out which e-mails have accounts.
 */
export const onRequestPost: Handler = async ({ request, env }) => {
  const body = await readJson(request);
  const email = normalizeEmail(body?.email);
  if (!body || !email || !passwordAttempt(body.password)) return fail('bad_login', 401);

  const keys = await loginKeys(clientIp(request), email);
  if ((await isLocked(env, keys.ip)) || (await isLocked(env, keys.pair)) || (await isLocked(env, keys.email))) return fail('too_many', 429);

  // Count first, check the password after: parallel guesses can't all slip in before the counter moves.
  const locked = await Promise.all([hit(env, keys.ip, LOGIN_IP), hit(env, keys.pair, LOGIN_PAIR), hit(env, keys.email, LOGIN_EMAIL)]);
  if (locked.some(Boolean)) return fail('too_many', 429);

  const user = await env.DB.prepare('select id, email, password_hash from users where email = ?')
    .bind(email)
    .first<{ id: string; email: string; password_hash: string }>();
  const ok = await verifyPassword(body.password, user?.password_hash ?? (await dummyHash()));
  if (!user || !ok) return fail('bad_login', 401);

  await Promise.all([clear(env, keys.pair), clear(env, keys.email), giveBack(env, keys.ip)]);
  const cookie = await startSession(env, user.id);
  return json(await accountPayload(env, { id: user.id, email: user.email }), 200, { 'Set-Cookie': cookie });
};
