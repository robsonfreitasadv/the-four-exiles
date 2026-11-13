import { accountPayload } from '../../_lib/account';
import { json, type Handler } from '../../_lib/http';
import { clearSessionCookie, currentUser, requireUser } from '../../_lib/session';

/** GET /api/me: the signed-in person (e-mail, profile, moderator) or { user: null }. */
export const onRequestGet: Handler = async ({ request, env }) => {
  const current = await currentUser(request, env);
  if (!current) return json({ user: null, profile: null, moderator: false });
  return json(await accountPayload(env, current.user));
};

/**
 * DELETE /api/me: deletes the account (LGPD art. 18). The database removes the sessions, profile, entries,
 * images and points with it; entries this person reviewed as a moderator stay, without the reviewer.
 */
export const onRequestDelete: Handler = async ({ request, env }) => {
  const current = await requireUser(request, env);
  if (current instanceof Response) return current;
  await env.DB.prepare('delete from users where id = ?').bind(current.user.id).run();
  return json({ ok: true }, 200, { 'Set-Cookie': clearSessionCookie() });
};
