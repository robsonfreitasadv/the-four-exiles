import type { Env } from './http';
import { isModerator, type User } from './session';

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
