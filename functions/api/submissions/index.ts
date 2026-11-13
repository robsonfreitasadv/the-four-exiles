import { ENTRY_COLUMNS } from '../../_lib/account';
import { clientIp, ENTRY_BODY, errorMessage, fail, json, readJson, type Handler } from '../../_lib/http';
import { consumeBytes } from '../../_lib/ratelimit';
import { requireUser } from '../../_lib/session';
import { missionSlug, submission } from '../../_lib/validate';

/** Image bytes a day: four full-size images per person, eight per network. */
const IMAGE_BYTES_PER_USER = 6 * 1024 * 1024;
const IMAGE_BYTES_PER_IP = 12 * 1024 * 1024;

/** GET /api/submissions[?mission=<slug>]: the signed-in person's own entries, newest first. */
export const onRequestGet: Handler = async ({ request, env }) => {
  const current = await requireUser(request, env);
  if (current instanceof Response) return current;
  const param = new URL(request.url).searchParams.get('mission');
  const slug = param === null ? null : missionSlug(param);
  if (param !== null && !slug) return fail('invalid', 400);

  const query = slug
    ? env.DB.prepare(`select ${ENTRY_COLUMNS} from submissions where user_id = ? and mission_slug = ? order by created_at desc limit 200`).bind(
        current.user.id,
        slug,
      )
    : env.DB.prepare(`select ${ENTRY_COLUMNS} from submissions where user_id = ? order by created_at desc limit 200`).bind(current.user.id);
  const { results } = await query.all();
  return json({ submissions: results.map((r) => ({ ...r, has_image: Boolean(r.has_image) })) });
};

/**
 * POST /api/submissions { mission_slug, title, link_url?, image?: { type, data (base64) }, note?, licence_ok }.
 * The database refuses entries without a profile, for closed missions or past 10 a day (migrations/).
 */
export const onRequestPost: Handler = async ({ request, env }) => {
  const current = await requireUser(request, env);
  if (current instanceof Response) return current;
  const body = await readJson(request, ENTRY_BODY);
  if (!body) return fail('too_large', 413);
  const entry = submission(body);
  if (!entry) return fail('invalid', 400);

  // Images have a daily allowance per person and per network, on top of the 10 entries a day.
  if (entry.image) {
    const size = entry.image.bytes.byteLength;
    const [userOk, ipOk] = await Promise.all([
      consumeBytes(env, `img-user:${current.user.id}`, size, IMAGE_BYTES_PER_USER),
      consumeBytes(env, `img-ip:${clientIp(request)}`, size, IMAGE_BYTES_PER_IP),
    ]);
    if (!userOk || !ipOk) return fail('quota', 429);
  }

  const id = crypto.randomUUID();
  const statements = [
    env.DB.prepare(
      'insert into submissions (id, user_id, mission_slug, title, link_url, image_type, note, licence_ok) values (?, ?, ?, ?, ?, ?, ?, 1)',
    ).bind(id, current.user.id, entry.mission_slug, entry.title, entry.link_url, entry.image?.type ?? null, entry.note),
  ];
  if (entry.image) statements.push(env.DB.prepare('insert into submission_images (submission_id, data) values (?, ?)').bind(id, entry.image.bytes));

  try {
    // One batch is one transaction: the entry and its image are saved together or not at all.
    await env.DB.batch(statements);
  } catch (err) {
    const message = errorMessage(err);
    if (message.includes('Limite diário')) return fail('daily_limit', 429);
    if (message.includes('Envio não permitido') || message.includes('FOREIGN KEY')) return fail('not_allowed', 403);
    throw err;
  }
  return json({ id }, 201);
};
