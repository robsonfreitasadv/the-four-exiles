import { accountPayload } from '../../_lib/account';
import { hashPassword } from '../../_lib/crypto';
import { clientIp, fail, isUniqueViolation, json, readJson, type Handler } from '../../_lib/http';
import { hit, ipKey, SIGNUP_IP } from '../../_lib/ratelimit';
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

  // Every attempt counts against this network; an e-mail that already has an account counts nowhere else,
  // so trying someone's address here never locks that person's sign-in.
  if (await hit(env, ipKey('signup', clientIp(request)), SIGNUP_IP)) return fail('too_many', 429);

  const id = crypto.randomUUID();
  try {
    await env.DB.prepare('insert into users (id, email, password_hash) values (?, ?, ?)')
      .bind(id, email, await hashPassword(body.password))
      .run();
  } catch (err) {
    if (!isUniqueViolation(err)) throw err;
    return fail('signup_failed', 400);
  }

  const cookie = await startSession(env, id);
  return json(await accountPayload(env, { id, email }), 201, { 'Set-Cookie': cookie });
};
