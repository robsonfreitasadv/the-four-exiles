import { checkCurrentPassword } from '../../_lib/account';
import { hashPassword } from '../../_lib/crypto';
import { fail, json, readJson, type Handler } from '../../_lib/http';
import { requireUser } from '../../_lib/session';
import { passwordAttempt, validPassword } from '../../_lib/validate';

/**
 * POST /api/me/password { current_password, new_password }. Asks for the current password, so a browser left
 * signed in isn't enough to take the account; afterwards every other device is signed out.
 */
export const onRequestPost: Handler = async ({ request, env }) => {
  const current = await requireUser(request, env);
  if (current instanceof Response) return current;
  const body = await readJson(request);
  if (!body || !passwordAttempt(body.current_password) || !validPassword(body.new_password)) return fail('invalid', 400);

  const check = await checkCurrentPassword(env, current.user.id, body.current_password);
  if (check === 'locked') return fail('too_many', 429);
  if (check === 'wrong') return fail('bad_login', 401);

  await env.DB.batch([
    env.DB.prepare('update users set password_hash = ? where id = ?').bind(await hashPassword(body.new_password), current.user.id),
    env.DB.prepare('delete from sessions where user_id = ? and token_hash <> ?').bind(current.user.id, current.tokenHash),
  ]);
  return json({ ok: true });
};
