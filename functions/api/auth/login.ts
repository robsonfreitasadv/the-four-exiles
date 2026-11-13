import { accountPayload } from '../../_lib/account';
import { dummyHash, verifyPassword } from '../../_lib/crypto';
import { clientIp, fail, json, readJson, type Handler } from '../../_lib/http';
import { clear, emailKey, hit, ipKey, isLocked, LOGIN_EMAIL, LOGIN_IP } from '../../_lib/ratelimit';
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

  const ip = ipKey('login', clientIp(request));
  const byEmail = await emailKey(email);
  if ((await isLocked(env, ip)) || (await isLocked(env, byEmail))) return fail('too_many', 429);

  const user = await env.DB.prepare('select id, email, password_hash from users where email = ?')
    .bind(email)
    .first<{ id: string; email: string; password_hash: string }>();
  const ok = await verifyPassword(body.password, user?.password_hash ?? (await dummyHash()));

  if (!user || !ok) {
    const [ipLocked, emailLocked] = await Promise.all([hit(env, ip, LOGIN_IP), hit(env, byEmail, LOGIN_EMAIL)]);
    return ipLocked || emailLocked ? fail('too_many', 429) : fail('bad_login', 401);
  }

  await clear(env, byEmail);
  const cookie = await startSession(env, user.id);
  return json(await accountPayload(env, { id: user.id, email: user.email }), 200, { 'Set-Cookie': cookie });
};
