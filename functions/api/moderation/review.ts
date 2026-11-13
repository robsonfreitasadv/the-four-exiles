import { errorMessage, fail, json, readJson, type Handler } from '../../_lib/http';
import { requireModerator } from '../../_lib/session';
import { isId, moderatorNote, reviewStatus } from '../../_lib/validate';

/**
 * POST /api/moderation/review { id, status: 'approved' | 'rejected', moderator_note? }. Moderators only.
 * A change of status records who and when; the database then replaces the entry's points (migrations/).
 */
export const onRequestPost: Handler = async ({ request, env }) => {
  const current = await requireModerator(request, env);
  if (current instanceof Response) return current;
  const body = await readJson(request);
  const status = reviewStatus(body?.status);
  const note = moderatorNote(body?.moderator_note);
  if (!body || !isId(body.id) || !status || note === undefined) return fail('invalid', 400);

  // Nobody reviews their own entry (the database refuses it too: migrations/0002).
  const entry = await env.DB.prepare('select user_id from submissions where id = ?').bind(body.id).first<{ user_id: string }>();
  if (!entry) return fail('not_found', 404);
  if (entry.user_id === current.user.id) return fail('own_entry', 403);

  // Right-hand sides see the old row, so `status is not ?1` means "the status is changing".
  try {
    const result = await env.DB.prepare(
      `update submissions set
         moderator_note = ?2,
         reviewed_at = case when status is not ?1 then strftime('%Y-%m-%dT%H:%M:%fZ', 'now') else reviewed_at end,
         reviewed_by = case when status is not ?1 then ?3 else reviewed_by end,
         status = ?1
       where id = ?4 and user_id <> ?3`,
    )
      .bind(status, note, current.user.id, body.id)
      .run();
    if (!result.meta.changes) return fail('not_found', 404);
  } catch (err) {
    if (errorMessage(err).includes('próprio envio')) return fail('own_entry', 403);
    throw err;
  }
  return json({ ok: true });
};
