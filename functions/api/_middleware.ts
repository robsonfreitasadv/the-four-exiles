import { crossSiteRejection, errorMessage, fail, type Handler } from '../_lib/http';

/** Public routes that set their own caching; everything else is personal and never cached. */
const CACHEABLE = new Set(['/api/standings']);

/**
 * Runs before every /api route: CSRF guard on writes, no caching, and a plain error instead of a stack trace.
 */
export const onRequest: Handler = async ({ request, next }) => {
  const rejected = crossSiteRejection(request);
  let response: Response;
  if (rejected) response = rejected;
  else {
    try {
      response = await next();
    } catch (err) {
      console.error('api error', request.method, new URL(request.url).pathname, errorMessage(err));
      response = fail('server_error', 500);
    }
  }
  // Responses from next() can be immutable; copy before adding headers.
  response = new Response(response.body, response);
  const cacheable = request.method === 'GET' && response.ok && CACHEABLE.has(new URL(request.url).pathname);
  if (!cacheable) response.headers.set('Cache-Control', 'no-store');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'same-origin');
  return response;
};
