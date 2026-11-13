import { fail, type Handler } from '../_lib/http';

/** Any other /api address: a JSON 404 instead of the site's HTML page. */
export const onRequest: Handler = async () => fail('not_found', 404);
