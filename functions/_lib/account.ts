import { verifyPassword } from './crypto';
import type { Env } from './http';
import { clear, hit, PASSWORD_CHECK } from './ratelimit';
import { isModerator, type User } from './session';

/**
 * Checks the signed-in person's current password before something serious (new password, deleting the account).
 * The attempt is counted before the check and cleared on success.
 */
export async function checkCurrentPassword(env: Env, userId: string, password: string): Promise<'ok' | 'wrong' | 'locked'> {
  const key = `password:${userId}`;
  if (await hit(env, key, PASSWORD_CHECK)) return 'locked';
  const row = await env.DB.prepare('select password_hash from users where id = ?').bind(userId).first<{ password_hash: string }>();
  if (!row || !(await verifyPassword(password, row.password_hash))) return 'wrong';
  await clear(env, key);
  return 'ok';
}

export interface Profile {
  id: string;
  display_name: string;
  race: string;
}

/** What /api/me and the sign-in calls return: the person's own data only, never the password hash. */
export async function accountPayload(env: Env, user: User) {
  const [profile, moderator] = await Promise.all([
    env.DB.prepare('select id, display_name, race from profiles where id = ?').bind(user.id).first<Profile>(),
    isModerator(env, user.id),
  ]);
  return { user: { id: user.id, email: user.email }, profile: profile ?? null, moderator };
}

/** Columns shown of an entry, to its author and to moderators (images come from /api/images/:id). */
export const ENTRY_COLUMNS =
  'id, mission_slug, title, link_url, image_type is not null as has_image, note, status, moderator_note, created_at';
