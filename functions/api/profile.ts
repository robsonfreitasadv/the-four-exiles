import { accountPayload } from '../_lib/account';
import { fail, isUniqueViolation, json, readJson, type Handler } from '../_lib/http';
import { requireUser } from '../_lib/session';
import { nickname, nicknameKey, race } from '../_lib/validate';

/** POST /api/profile { display_name, race }: first visit after signing up. The race then stays for the season. */
export const onRequestPost: Handler = async ({ request, env }) => {
  const current = await requireUser(request, env);
  if (current instanceof Response) return current;
  const body = await readJson(request);
  const name = nickname(body?.display_name);
  const side = race(body?.race);
  if (!name || !side) return fail('invalid', 400);

  const exists = await env.DB.prepare('select 1 as yes from profiles where id = ?').bind(current.user.id).first();
  if (exists) return fail('has_profile', 409);
  try {
    await env.DB.prepare('insert into profiles (id, display_name, name_key, race) values (?, ?, ?, ?)')
      .bind(current.user.id, name, nicknameKey(name), side)
      .run();
  } catch (err) {
    if (isUniqueViolation(err)) return fail('nickname_taken', 409);
    throw err;
  }
  return json(await accountPayload(env, current.user), 201);
};

/** PUT /api/profile { display_name }: only the nickname can change. */
export const onRequestPut: Handler = async ({ request, env }) => {
  const current = await requireUser(request, env);
  if (current instanceof Response) return current;
  const body = await readJson(request);
  const name = nickname(body?.display_name);
  if (!name) return fail('invalid', 400);
  try {
    const result = await env.DB.prepare('update profiles set display_name = ?, name_key = ? where id = ?')
      .bind(name, nicknameKey(name), current.user.id)
      .run();
    if (!result.meta.changes) return fail('no_profile', 404);
  } catch (err) {
    if (isUniqueViolation(err)) return fail('nickname_taken', 409);
    throw err;
  }
  return json(await accountPayload(env, current.user));
};
