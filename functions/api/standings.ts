import { json, type Handler } from '../_lib/http';

/**
 * GET /api/standings: Season 1 points per race and category, public. Only totals: no names, no e-mails.
 * Same numbers as the old season1_standings() function: every race appears, with 0 when it has no points.
 */
export const onRequestGet: Handler = async ({ env }) => {
  const { results } = await env.DB.prepare(
    `select r.race,
            coalesce(sum(case when e.category = 'community' then e.points end), 0) as community,
            coalesce(sum(case when e.category = 'missions' then e.points end), 0) as missions,
            coalesce(sum(case when e.category = 'events' then e.points end), 0) as events
     from (select 'grays' as race union all select 'nordics' union all select 'reptilians' union all select 'mantis') r
     left join score_events e on e.race = r.race
     group by r.race`,
  ).all();
  // Public totals: browsers and Cloudflare may keep them for a minute (the middleware leaves this route alone).
  return json({ standings: results }, 200, { 'Cache-Control': 'public, max-age=60' });
};
