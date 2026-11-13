import { fail, type Handler } from '../../_lib/http';
import { isModerator, requireUser } from '../../_lib/session';
import { isId } from '../../_lib/validate';

/**
 * GET /api/images/:id: the image sent with an entry, for its author and for moderators only. Served so the
 * browser can only show it as an image, never run it.
 */
export const onRequestGet: Handler = async ({ request, env, params }) => {
  const current = await requireUser(request, env);
  if (current instanceof Response) return current;
  const id = params.id;
  if (!isId(id)) return fail('not_found', 404);

  const row = await env.DB.prepare(
    'select s.user_id, s.image_type, i.data from submissions s join submission_images i on i.submission_id = s.id where s.id = ?',
  )
    .bind(id)
    .first<{ user_id: string; image_type: string; data: ArrayBuffer | number[] }>();
  // Someone else's entry looks the same as one that doesn't exist.
  if (!row || (row.user_id !== current.user.id && !(await isModerator(env, current.user.id)))) return fail('not_found', 404);

  const bytes = row.data instanceof ArrayBuffer ? new Uint8Array(row.data) : new Uint8Array(row.data);
  return new Response(bytes, {
    headers: {
      'Content-Type': row.image_type,
      'Content-Disposition': 'inline',
      'Content-Security-Policy': "default-src 'none'; sandbox",
      'Cache-Control': 'private, no-store',
    },
  });
};
