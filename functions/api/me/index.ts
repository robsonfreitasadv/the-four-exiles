import { accountPayload, checkCurrentPassword } from '../../_lib/account';
import { fail, json, readJson, type Handler } from '../../_lib/http';
import { clearSessionCookie, currentUser, requireUser } from '../../_lib/session';
import { passwordAttempt } from '../../_lib/validate';

/** GET /api/me: the signed-in person (e-mail, profile, moderator) or { user: null }. */
export const onRequestGet: Handler = async ({ request, env }) => {
  const current = await currentUser(request, env);
  if (!current) return json({ user: null, profile: null, moderator: false });
  return json(await accountPayload(env, current.user));
};

/**
 * DELETE /api/me { password }: deletes the account (LGPD art. 18), after the current password. The database
 * removes the sessions, profile, entries, images and points with it; entries this person reviewed as a
 * moderator stay, without the reviewer.
 */
export const onRequestDelete: Handler = async ({ request, env }) => {
  const current = await requireUser(request, env);
  if (current instanceof Response) return current;
  const body = await readJson(request);
  if (!body || !passwordAttempt(body.password)) return fail('invalid', 400);

  const check = await checkCurrentPassword(env, current.user.id, body.password);
  if (check === 'locked') return fail('too_many', 429);
  if (check === 'wrong') return fail('bad_login', 401);

  await env.DB.batch([
    env.DB.prepare('delete from users where id = ?').bind(current.user.id),
    env.DB.prepare('delete from auth_attempts where key = ?').bind(`password:${current.user.id}`),
  ]);
  return json({ ok: true }, 200, { 'Set-Cookie': clearSessionCookie() });
};
