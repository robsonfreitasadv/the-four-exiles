// Ponta a ponta da API contra o `wrangler pages dev` local (nunca contra o site publicado).
//
//   npm run build:static
//   npx wrangler d1 migrations apply four-exiles --local --persist-to <pasta>
//   npx wrangler pages dev dist --persist-to <pasta>            (noutro terminal)
//   E2E_PERSIST=<pasta> npm run test:e2e
//
// E2E_BASE muda o endereço (padrão http://127.0.0.1:8788). Com E2E_PERSIST, o script também torna uma conta de
// teste moderadora no D1 local e testa a moderação e o placar. Cria só contas fictícias e2e-…@example.com.
import { execFileSync } from 'node:child_process';

const BASE = process.env.E2E_BASE ?? 'http://127.0.0.1:8788';
const PERSIST = process.env.E2E_PERSIST;
const run = Date.now().toString(36);
let failures = 0;
let passes = 0;

function check(name, ok, detail = '') {
  if (ok) passes++;
  else failures++;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}${ok || !detail ? '' : ` -> ${detail}`}`);
}

/** One browser: keeps its own session cookie, sends JSON with this site's Origin. */
function client() {
  let cookie = '';
  return {
    get cookie() {
      return cookie;
    },
    set cookie(v) {
      cookie = v;
    },
    async call(method, path, body, extraHeaders = {}) {
      const headers = { Accept: 'application/json', ...extraHeaders };
      if (cookie) headers.Cookie = cookie;
      // A header set to null in extraHeaders is left out on purpose (e.g. no Origin).
      if (method !== 'GET') {
        if (!('Content-Type' in headers)) headers['Content-Type'] = 'application/json';
        if (!('Origin' in headers)) headers.Origin = BASE;
      }
      for (const [k, v] of Object.entries(headers)) if (v === null) delete headers[k];
      const res = await fetch(`${BASE}/api/${path}`, {
        method,
        headers,
        body: method === 'GET' ? undefined : typeof body === 'string' ? body : JSON.stringify(body ?? {}),
        redirect: 'manual',
      });
      const setCookie = res.headers.get('set-cookie');
      if (setCookie) {
        const value = setCookie.split(';')[0];
        cookie = value.endsWith('=') ? '' : value;
      }
      const type = res.headers.get('content-type') ?? '';
      const data = type.includes('json') ? await res.json() : await res.arrayBuffer();
      return { status: res.status, data, setCookie, type, headers: res.headers };
    },
  };
}

const PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);
const password = 'senha-de-teste-123';
const emailA = `e2e-a-${run}@example.com`;
const emailB = `e2e-b-${run}@example.com`;

const a = client();
const b = client();

// Visitor ----------------------------------------------------------------------------------
let r = await a.call('GET', 'me');
check('GET /api/me sem sessão: user null', r.status === 200 && r.data.user === null, JSON.stringify(r.data));
r = await a.call('GET', 'standings');
check('GET /api/standings é público e tem as 4 raças', r.status === 200 && r.data.standings.length === 4, JSON.stringify(r.data));
r = await a.call('GET', 'nada-aqui');
check('rota desconhecida: 404 JSON', r.status === 404 && r.data.error === 'not_found');

// CSRF and input checks --------------------------------------------------------------------
r = await a.call('POST', 'auth/signup', { email: emailA, password }, { Origin: 'https://evil.example' });
check('cadastro com Origin de outro site: 403', r.status === 403 && r.data.error === 'bad_origin');
r = await a.call('POST', 'auth/signup', { email: emailA, password }, { Origin: null });
check('cadastro sem Origin: 403', r.status === 403);
r = await a.call('POST', 'auth/signup', `email=${emailA}`, { 'Content-Type': 'application/x-www-form-urlencoded' });
check('cadastro como formulário HTML: 415', r.status === 415 && r.data.error === 'bad_content_type');
r = await a.call('POST', 'auth/signup', { email: emailA, password: 'curta' });
check('senha com menos de 10 caracteres: 400', r.status === 400 && r.data.error === 'invalid');
r = await a.call('POST', 'auth/signup', { email: 'sem-arroba', password });
check('e-mail inválido: 400', r.status === 400);

// Sign-up ----------------------------------------------------------------------------------
r = await a.call('POST', 'auth/signup', { email: `  ${emailA.toUpperCase()} `, password });
check('cadastro: 201 já com sessão', r.status === 201 && r.data.user?.email === emailA, JSON.stringify(r.data));
check(
  'cookie __Host-fe_session; HttpOnly; Secure; SameSite=Lax; Path=/; 30 dias',
  /^__Host-fe_session=/.test(r.setCookie) && /HttpOnly/.test(r.setCookie) && /Secure/.test(r.setCookie) && /SameSite=Lax/.test(r.setCookie) && /Path=\//.test(r.setCookie) && /Max-Age=2592000/.test(r.setCookie),
  r.setCookie,
);
check('resposta nunca traz password_hash', !JSON.stringify(r.data).includes('password'));
check('API não guarda em cache', r.headers.get('cache-control') === 'no-store');
r = await b.call('POST', 'auth/signup', { email: emailA, password });
check('cadastro com e-mail repetido: erro genérico', r.status === 400 && r.data.error === 'signup_failed');
// Locally, wrangler rewrites an Origin with the same host to the request's own scheme, so this only means
// something against HTTPS (a preview URL); the unit tests cover it either way.
if (BASE.startsWith('https://')) {
  r = await a.call('POST', 'auth/signup', { email: emailA, password }, { Origin: BASE.replace('https://', 'http://') });
  check('Origin com outro esquema (http x https): 403', r.status === 403 && r.data.error === 'bad_origin');
}

r = await a.call('GET', 'me');
check('GET /api/me com sessão: e-mail, sem perfil, não moderador', r.data.user?.email === emailA && r.data.profile === null && r.data.moderator === false, JSON.stringify(r.data));

// Profile and entries ----------------------------------------------------------------------
r = await a.call('POST', 'submissions', { mission_slug: 'smile-audit', title: 'Sem perfil', link_url: 'https://example.com/x', licence_ok: true });
check('envio sem perfil: recusado', r.status === 403, JSON.stringify(r.data));
r = await a.call('POST', 'profile', { display_name: `Dora ${run}`, race: 'nordics' });
check('cria perfil (apelido + raça)', r.status === 201 && r.data.profile?.race === 'nordics', JSON.stringify(r.data));
r = await a.call('POST', 'profile', { display_name: `Outra ${run}`, race: 'grays' });
check('segundo perfil: recusado', r.status === 409 && r.data.error === 'has_profile');

r = await b.call('POST', 'auth/signup', { email: emailB, password });
check('segunda conta', r.status === 201);
r = await b.call('POST', 'profile', { display_name: `DORA ${run}`.toLowerCase(), race: 'grays' });
check('apelido repetido (outra caixa): 409', r.status === 409 && r.data.error === 'nickname_taken', JSON.stringify(r.data));
r = await b.call('POST', 'profile', { display_name: `Ray​ ${run}`, race: 'grays' });
check('apelido com caractere invisível: 400', r.status === 400 && r.data.error === 'invalid');
r = await b.call('POST', 'profile', { display_name: `Ray ${run}`, race: 'grays' });
check('perfil da segunda conta', r.status === 201);

r = await a.call('PUT', 'profile', { display_name: `Dora F ${run}` });
check('troca o apelido', r.status === 200 && r.data.profile?.display_name === `Dora F ${run}`);

r = await a.call('POST', 'submissions', { mission_slug: 'smile-audit', title: 'Auditoria do sorriso', link_url: 'https://example.com/post', licence_ok: true });
check('envio com link: 201', r.status === 201, JSON.stringify(r.data));
const linkEntry = r.data.id;
r = await a.call('POST', 'submissions', {
  mission_slug: 'smile-audit',
  title: 'Com imagem',
  note: 'linha 1\nlinha 2',
  licence_ok: true,
  image: { type: 'image/png', data: PNG.toString('base64') },
});
check('envio com imagem PNG: 201', r.status === 201, JSON.stringify(r.data));
const imageEntry = r.data.id;
r = await a.call('POST', 'submissions', {
  mission_slug: 'smile-audit',
  title: 'HTML disfarçado',
  licence_ok: true,
  image: { type: 'image/png', data: Buffer.from('<script>alert(1)</script>').toString('base64') },
});
check('arquivo que não é imagem: 400', r.status === 400);
r = await a.call('POST', 'submissions', { mission_slug: 'missao-que-nao-existe', title: 'X x', link_url: 'https://example.com/x', licence_ok: true });
check('missão inexistente: recusado', r.status === 403, JSON.stringify(r.data));

r = await a.call('GET', 'submissions?mission=smile-audit');
check(
  'lista os próprios envios',
  r.status === 200 && r.data.submissions.length === 2 && r.data.submissions.some((s) => s.has_image === true && s.status === 'pending'),
  JSON.stringify(r.data),
);
r = await b.call('GET', 'submissions');
check('outra conta não vê esses envios', r.status === 200 && r.data.submissions.length === 0);

r = await a.call('GET', `images/${imageEntry}`);
check('autor vê a própria imagem', r.status === 200 && r.type === 'image/png' && r.headers.get('content-security-policy')?.includes('sandbox'));
r = await b.call('GET', `images/${imageEntry}`);
check('outra conta não vê a imagem: 404', r.status === 404);
r = await b.call('GET', 'moderation/queue');
check('fila da moderação para não moderador: 403', r.status === 403);
r = await b.call('POST', 'moderation/review', { id: linkEntry, status: 'approved' });
check('aprovar sem ser moderador: 403', r.status === 403);

// Moderation (needs the local database folder) ------------------------------------------------
if (PERSIST) {
  // Runs wrangler's own script with node (no shell, so the SQL reaches it as one argument).
  execFileSync(
    process.execPath,
    [
      'node_modules/wrangler/bin/wrangler.js',
      'd1',
      'execute',
      'four-exiles',
      '--local',
      '--persist-to',
      PERSIST,
      '--command',
      `insert into moderators (user_id) select id from users where email = '${emailB}'`,
    ],
    { stdio: 'ignore' },
  );
  r = await b.call('GET', 'me');
  check('conta B agora é moderadora', r.data.moderator === true);
  const before = (await b.call('GET', 'standings')).data.standings.find((s) => s.race === 'nordics').missions;
  r = await b.call('GET', 'moderation/queue');
  check('moderadora vê a fila', r.status === 200 && r.data.submissions.some((s) => s.id === linkEntry));
  r = await b.call('GET', `images/${imageEntry}`);
  check('moderadora vê a imagem', r.status === 200);
  r = await b.call('POST', 'moderation/review', { id: linkEntry, status: 'approved', moderator_note: 'Boa!' });
  check('moderadora aprova', r.status === 200);
  let after = (await b.call('GET', 'standings')).data.standings.find((s) => s.race === 'nordics').missions;
  check('placar: +80 para os Nórdicos (missão smile-audit)', after - before === 80, `${before} -> ${after}`);
  r = await b.call('POST', 'moderation/review', { id: linkEntry, status: 'approved', moderator_note: 'De novo' });
  after = (await b.call('GET', 'standings')).data.standings.find((s) => s.race === 'nordics').missions;
  check('aprovar de novo não soma duas vezes', after - before === 80, `${before} -> ${after}`);
  r = await b.call('POST', 'moderation/review', { id: linkEntry, status: 'rejected' });
  after = (await b.call('GET', 'standings')).data.standings.find((s) => s.race === 'nordics').missions;
  check('recusar depois tira os pontos', after === before, `${before} -> ${after}`);
  await b.call('POST', 'moderation/review', { id: linkEntry, status: 'approved' });
  r = await a.call('GET', 'submissions?mission=smile-audit');
  check('autor vê o status e o recado', r.data.submissions.some((s) => s.id === linkEntry && s.status === 'approved' && s.moderator_note === null));

  // A moderator's own entry: not in their queue, and they can't review it.
  r = await b.call('POST', 'submissions', { mission_slug: 'operation-triplicate', title: 'Da moderadora', link_url: 'https://example.com/mod', licence_ok: true });
  const ownEntry = r.data.id;
  r = await b.call('GET', 'moderation/queue');
  check('fila não mostra o envio da própria moderadora', r.status === 200 && !r.data.submissions.some((s) => s.id === ownEntry) && 'next' in r.data);
  r = await b.call('POST', 'moderation/review', { id: ownEntry, status: 'approved' });
  check('moderadora não aprova o próprio envio: 403', r.status === 403 && r.data.error === 'own_entry', JSON.stringify(r.data));
  r = await b.call('GET', 'moderation/queue?cursor=nada');
  check('cursor inválido na fila: 400', r.status === 400);
  r = await b.call('GET', `moderation/queue?cursor=${encodeURIComponent('2000-01-01T00:00:00.000Z|00000000-0000-4000-8000-000000000000')}`);
  check('cursor válido pagina a fila', r.status === 200 && Array.isArray(r.data.submissions) && r.data.next === null);
  // The database refuses it too, whatever the API does.
  let dbRefused = false;
  try {
    execFileSync(
      process.execPath,
      [
        'node_modules/wrangler/bin/wrangler.js',
        'd1',
        'execute',
        'four-exiles',
        '--local',
        '--persist-to',
        PERSIST,
        '--command',
        `update submissions set status = 'approved', reviewed_by = user_id where id = '${ownEntry}'`,
      ],
      { stdio: 'ignore' },
    );
  } catch {
    dbRefused = true;
  }
  check('gatilho do banco recusa autoavaliação', dbRefused);
} else {
  console.log('(moderação pulada: defina E2E_PERSIST com a pasta do D1 local)');
}

// Sign out, sign in, wrong passwords ---------------------------------------------------------
const oldCookie = a.cookie;
r = await a.call('POST', 'auth/logout');
check('sair: 200 e cookie apagado', r.status === 200 && /Max-Age=0/.test(r.setCookie));
a.cookie = oldCookie;
r = await a.call('GET', 'me');
check('cookie antigo não vale mais depois de sair', r.data.user === null);
a.cookie = '';

r = await a.call('POST', 'auth/login', { email: emailA, password: 'senha-errada-123' });
const wrong = r;
r = await a.call('POST', 'auth/login', { email: `ninguem-${run}@example.com`, password: 'senha-errada-123' });
check(
  'senha errada e e-mail inexistente: mesma resposta',
  wrong.status === 401 && r.status === 401 && wrong.data.error === 'bad_login' && r.data.error === 'bad_login',
  `${wrong.status} ${JSON.stringify(wrong.data)} / ${r.status} ${JSON.stringify(r.data)}`,
);
r = await a.call('POST', 'auth/login', { email: emailA.toUpperCase(), password });
check('entrar (e-mail em maiúsculas): 200', r.status === 200 && r.data.user?.email === emailA && r.data.profile !== null, JSON.stringify(r.data));
r = await a.call('GET', 'me');
check('GET /api/me depois de entrar', r.data.user?.email === emailA);

// Password change signs out other devices ----------------------------------------------------
const other = client();
await other.call('POST', 'auth/login', { email: emailA, password });
r = await a.call('POST', 'me/password', { current_password: 'errada-errada', new_password: 'senha-nova-456789' });
check('trocar senha com a atual errada: 401', r.status === 401);
r = await a.call('POST', 'me/password', { current_password: password, new_password: 'senha-nova-456789' });
check('trocar senha: 200', r.status === 200);
check('esta sessão continua', (await a.call('GET', 'me')).data.user?.email === emailA);
check('a outra sessão saiu', (await other.call('GET', 'me')).data.user === null);
r = await other.call('POST', 'auth/login', { email: emailA, password });
check('senha antiga não entra mais', r.status === 401);

// Lockout after repeated wrong passwords for one e-mail ----------------------------------------
const brute = client();
const target = `e2e-c-${run}@example.com`;
await brute.call('POST', 'auth/signup', { email: target, password });
brute.cookie = '';
const statuses = [];
for (let i = 0; i < 6; i++) statuses.push((await brute.call('POST', 'auth/login', { email: target, password: `errada-${i}-xxxx` })).status);
r = await brute.call('POST', 'auth/login', { email: target, password });
check('bloqueio após 5 erros na mesma rede, mesmo com a senha certa: 429', statuses.slice(0, 4).every((s) => s === 401) && statuses[4] === 429 && r.status === 429, `${statuses} / ${r.status}`);
// The lock is per (network, e-mail): the owner on another network still gets in. Locally wrangler passes the
// CF-Connecting-IP header through, which stands in for another network here (Cloudflare overwrites it in production).
const elsewhere = client();
r = await elsewhere.call('POST', 'auth/login', { email: target, password }, { 'CF-Connecting-IP': '2001:db8:aaaa:1::5' });
check('dona da conta entra de outra rede apesar do bloqueio', r.status === 200, `${r.status} ${JSON.stringify(r.data)}`);
// Many sign-ups with someone else's e-mail don't lock that person's sign-in.
const squatter = client();
for (let i = 0; i < 6; i++) await squatter.call('POST', 'auth/signup', { email: emailB, password }, { 'CF-Connecting-IP': '198.51.100.20' });
r = await client().call('POST', 'auth/login', { email: emailB, password }, { 'CF-Connecting-IP': '198.51.100.21' });
check('cadastros repetidos com o e-mail da vítima não travam o login dela', r.status === 200, `${r.status}`);

// Daily image allowance ----------------------------------------------------------------------
const uploader = client();
await uploader.call('POST', 'auth/signup', { email: `e2e-d-${run}@example.com`, password }, { 'CF-Connecting-IP': '198.51.100.30' });
await uploader.call('POST', 'profile', { display_name: `Upload ${run}`, race: 'reptilians' });
const big = Buffer.alloc(1_572_864);
PNG.copy(big);
const uploads = [];
for (let i = 0; i < 5; i++) {
  r = await uploader.call('POST', 'submissions', {
    mission_slug: 'the-dry-banquet',
    title: `Imagem grande ${i}`,
    licence_ok: true,
    image: { type: 'image/png', data: big.toString('base64') },
  });
  uploads.push(r.status === 201 ? 'ok' : r.data.error);
}
check('teto diário de imagens: 4 de 1,5 MB passam, a 5ª não', uploads.slice(0, 4).every((u) => u === 'ok') && uploads[4] === 'quota', uploads.join(','));

// Cache --------------------------------------------------------------------------------------
r = await a.call('GET', 'standings');
check('placar público em cache por 60 s', r.headers.get('cache-control') === 'public, max-age=60', r.headers.get('cache-control'));
r = await a.call('GET', 'me');
check('/api/me nunca em cache', r.headers.get('cache-control') === 'no-store');

// Delete account ---------------------------------------------------------------------------
r = await a.call('DELETE', 'me', { password: 'senha-nova-456789' }, { Origin: 'https://evil.example' });
check('apagar conta de outro site: 403', r.status === 403);
const nordicsBefore = (await a.call('GET', 'standings')).data.standings.find((s) => s.race === 'nordics').missions;
r = await a.call('DELETE', 'me');
check('apagar conta sem senha: 400', r.status === 400);
r = await a.call('DELETE', 'me', { password: 'senha-errada-999' });
check('apagar conta com senha errada: 401', r.status === 401 && r.data.error === 'bad_login');
r = await a.call('DELETE', 'me', { password: 'senha-nova-456789' });
check('apagar conta com a senha: 200', r.status === 200);
check('depois de apagar: sem sessão', (await a.call('GET', 'me')).data.user === null);
r = await a.call('POST', 'auth/login', { email: emailA, password: 'senha-nova-456789' });
check('conta apagada não entra', r.status === 401);
if (PERSIST) {
  const nordicsAfter = (await a.call('GET', 'standings')).data.standings.find((s) => s.race === 'nordics').missions;
  check('pontos da conta apagada saem do placar', nordicsBefore - nordicsAfter === 80, `${nordicsBefore} -> ${nordicsAfter}`);
  r = await b.call('GET', `images/${imageEntry}`);
  check('imagem da conta apagada sumiu', r.status === 404);
}

console.log(`\n${passes} ok, ${failures} falha(s)`);
process.exit(failures ? 1 : 0);
