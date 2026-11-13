import { json, type Handler } from '../../_lib/http';
import { clearSessionCookie, endSession } from '../../_lib/session';

/** POST /api/auth/logout: ends this browser's session (other devices stay signed in). */
export const onRequestPost: Handler = async ({ request, env }) => {
  await endSession(request, env);
  return json({ ok: true }, 200, { 'Set-Cookie': clearSessionCookie() });
};
