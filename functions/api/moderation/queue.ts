import { ENTRY_COLUMNS } from '../../_lib/account';
import { json, type Handler } from '../../_lib/http';
import { requireModerator } from '../../_lib/session';

/** GET /api/moderation/queue: the oldest 50 entries waiting for review. Moderators only. */
export const onRequestGet: Handler = async ({ request, env }) => {
  const current = await requireModerator(request, env);
  if (current instanceof Response) return current;
  const { results } = await env.DB.prepare(`select ${ENTRY_COLUMNS} from submissions where status = 'pending' order by created_at limit 50`).all();
  return json({ submissions: results.map((r) => ({ ...r, has_image: Boolean(r.has_image) })) });
};
