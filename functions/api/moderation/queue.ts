import { ENTRY_COLUMNS } from '../../_lib/account';
import { fail, json, type Handler } from '../../_lib/http';
import { requireModerator } from '../../_lib/session';
import { isId } from '../../_lib/validate';

const PAGE = 50;
const STAMP = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

/**
 * GET /api/moderation/queue[?cursor=<created_at>|<id>]: entries waiting for review, oldest first, 50 at a time;
 * `next` is the cursor for the following page (null at the end). Moderators only, and never their own entries.
 */
export const onRequestGet: Handler = async ({ request, env }) => {
  const current = await requireModerator(request, env);
  if (current instanceof Response) return current;

  const cursor = new URL(request.url).searchParams.get('cursor');
  let after: [string, string] | null = null;
  if (cursor !== null) {
    const [stamp, id] = cursor.split('|');
    if (!STAMP.test(stamp ?? '') || !isId(id)) return fail('invalid', 400);
    after = [stamp, id];
  }

  const where = `status = 'pending' and user_id <> ?1${after ? ' and (created_at > ?2 or (created_at = ?2 and id > ?3))' : ''}`;
  const query = env.DB.prepare(`select ${ENTRY_COLUMNS} from submissions where ${where} order by created_at, id limit ${PAGE + 1}`);
  const { results } = await (after ? query.bind(current.user.id, after[0], after[1]) : query.bind(current.user.id)).all<{
    id: string;
    created_at: string;
    has_image: number;
  }>();

  const page = results.slice(0, PAGE);
  const last = page[page.length - 1];
  return json({
    submissions: page.map((r) => ({ ...r, has_image: Boolean(r.has_image) })),
    next: results.length > PAGE && last ? `${last.created_at}|${last.id}` : null,
  });
};
