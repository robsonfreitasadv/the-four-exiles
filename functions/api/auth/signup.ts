import { accountPayload } from '../../_lib/account';
import { hashPassword } from '../../_lib/crypto';
import { clientIp, fail, isUniqueViolation, json, readJson, type Handler } from '../../_lib/http';
import { emailKey, hit, ipKey, isLocked, LOGIN_EMAIL, SIGNUP_IP } from '../../_lib/ratelimit';
import { startSession } from '../../_lib/session';
import { normalizeEmail, validPassword } from '../../_lib/validate';

/**
 * POST /api/auth/signup { email, password } → signed in right away (no e-mail confirmation until the project
 * has a domain to send from; see functions/_lib/email.ts).
 */
export const onRequestPost: Handler = async ({ request, env }) => {
  const body = await readJson(request);
  const email = normalizeEmail(body?.email);
  if (!body || !email || !validPassword(body.password)) return fail('invalid', 400);

  const ip = ipKey('signup', clientIp(request));
  if (await isLocked(env, ip)) return fail('too_many', 429);
  await hit(env, ip, SIGNUP_IP);

  const id = crypto.randomUUID();
  try {
    await env.DB.prepare('insert into users (id, email, password_hash) values (?, ?, ?)')
      .bind(id, email, await hashPassword(body.password))
      .run();
  } catch (err) {
    if (!isUniqueViolation(err)) throw err;
    // Same answer as any other failure; the attempt also counts against that e-mail.
    await hit(env, await emailKey(email), LOGIN_EMAIL);
    return fail('signup_failed', 400);
  }

  const cookie = await startSession(env, id);
  return json(await accountPayload(env, { id, email }), 201, { 'Set-Cookie': cookie });
};
