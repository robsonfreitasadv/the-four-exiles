import { describe, expect, it } from 'vitest';
import {
  httpsLink,
  isId,
  MAX_IMAGE_BYTES,
  moderatorNote,
  nickname,
  nicknameKey,
  normalizeEmail,
  passwordAttempt,
  race,
  reviewStatus,
  sniffImage,
  submission,
  validPassword,
} from '../functions/_lib/validate';
import { crossSiteRejection, normalizeIp, readJson } from '../functions/_lib/http';

const PNG = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0]);
const b64 = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes));

describe('e-mail', () => {
  it('trims and lower-cases', () => {
    expect(normalizeEmail('  Dora@Fortaleza.BR ')).toBe('dora@fortaleza.br');
  });
  it('refuses what is not an address', () => {
    for (const bad of ['', 'dora', 'dora@', '@x.com', 'a b@x.com', 'dora@x', 42, null, `${'a'.repeat(250)}@x.com`]) {
      expect(normalizeEmail(bad)).toBeNull();
    }
  });
});

describe('passwords', () => {
  it('need 10 to 256 characters for a new password', () => {
    expect(validPassword('123456789')).toBe(false);
    expect(validPassword('1234567890')).toBe(true);
    expect(validPassword('ãéîõü😀😀😀😀😀')).toBe(true); // 10 characters, more UTF-16 units
    expect(validPassword('x'.repeat(257))).toBe(false);
    expect(validPassword(1234567890)).toBe(false);
  });
  it('sign-in accepts any non-empty attempt within the size cap', () => {
    expect(passwordAttempt('short')).toBe(true);
    expect(passwordAttempt('')).toBe(false);
    expect(passwordAttempt('x'.repeat(257))).toBe(false);
  });
});

describe('profile', () => {
  it('nickname: 2 to 30 characters, one line, trimmed', () => {
    expect(nickname('  RF ')).toBe('RF');
    expect(nickname('R')).toBeNull();
    expect(nickname('x'.repeat(31))).toBeNull();
    expect(nickname('two\nlines')).toBeNull();
    expect(nickname('bell\u0007')).toBeNull();
  });
  it('nickname: NFKC and no invisible format characters', () => {
    expect(nickname('Ｄｏｒａ')).toBe('Dora'); // full-width letters become plain ones
    expect(nickname('Do​ra')).toBeNull(); // zero-width space
    expect(nickname('Dora‮')).toBeNull(); // right-to-left override
    expect(nickname('⁦Dora⁩')).toBeNull(); // bidi isolates
    expect(nickname('Do­ra')).toBeNull(); // soft hyphen
    expect(nickname('Dorá Ñ')).toBe('Dorá Ñ');
  });
  it('nickname key ignores case', () => {
    expect(nicknameKey('Dora')).toBe(nicknameKey('dORA'));
  });
  it('race: only the four races', () => {
    expect(race('grays')).toBe('grays');
    expect(race('humans')).toBeNull();
    expect(race('Grays')).toBeNull();
  });
});

describe('mission entries', () => {
  const base = { mission_slug: 'smile-audit', title: 'My entry', licence_ok: true };

  it('accepts a link entry', () => {
    expect(submission({ ...base, link_url: 'https://example.com/post' })).toEqual({
      mission_slug: 'smile-audit',
      title: 'My entry',
      link_url: 'https://example.com/post',
      note: null,
      image: null,
    });
  });
  it('needs a link or an image, and the licence box', () => {
    expect(submission(base)).toBeNull();
    expect(submission({ ...base, link_url: 'https://example.com/post', licence_ok: false })).toBeNull();
    expect(submission({ ...base, link_url: 'https://example.com/post', licence_ok: 'true' })).toBeNull();
  });
  it('refuses links that are not https', () => {
    expect(httpsLink('http://example.com/post')).toBeUndefined();
    expect(httpsLink('javascript:alert(1)//x.com')).toBeUndefined();
    expect(httpsLink('https://exa mple.com/x')).toBeUndefined();
    expect(httpsLink('https://localhost/xx')).toBeUndefined();
    expect(httpsLink('')).toBeNull();
  });
  it('limits title and note', () => {
    expect(submission({ ...base, title: 'x', link_url: 'https://example.com/post' })).toBeNull();
    expect(submission({ ...base, title: 'x'.repeat(121), link_url: 'https://example.com/post' })).toBeNull();
    expect(submission({ ...base, note: 'x'.repeat(1001), link_url: 'https://example.com/post' })).toBeNull();
    expect(submission({ ...base, note: 'line one\nline two', link_url: 'https://example.com/post' })?.note).toBe('line one\nline two');
  });
  it('refuses odd mission slugs', () => {
    expect(submission({ ...base, mission_slug: "x' or 1=1 --", link_url: 'https://example.com/post' })).toBeNull();
  });
  it('accepts a real PNG and checks the bytes, not the label', () => {
    expect(submission({ ...base, image: { type: 'image/png', data: b64(PNG) } })?.image?.type).toBe('image/png');
    expect(submission({ ...base, image: { type: 'image/jpeg', data: b64(PNG) } })).toBeNull();
    const html = new TextEncoder().encode('<script>alert(1)</script>');
    expect(submission({ ...base, image: { type: 'image/png', data: b64(html) } })).toBeNull();
    expect(submission({ ...base, image: { type: 'image/png', data: 'not base64 !!' } })).toBeNull();
  });
  it('refuses images over 1.5 MB', () => {
    const big = new Uint8Array(MAX_IMAGE_BYTES + 1);
    big.set(PNG);
    let s = '';
    for (const b of big) s += String.fromCharCode(b);
    expect(submission({ ...base, image: { type: 'image/png', data: btoa(s) } })).toBeNull();
  });
  it('recognises the four image types', () => {
    expect(sniffImage(new Uint8Array([0xff, 0xd8, 0xff, 0xe0]))).toBe('image/jpeg');
    expect(sniffImage(new TextEncoder().encode('GIF89a'))).toBe('image/gif');
    expect(sniffImage(new TextEncoder().encode('RIFF\0\0\0\0WEBPVP8 '))).toBe('image/webp');
    expect(sniffImage(new TextEncoder().encode('%PDF-1.7'))).toBeNull();
  });
});

describe('moderation input', () => {
  it('status and note', () => {
    expect(reviewStatus('approved')).toBe('approved');
    expect(reviewStatus('pending')).toBeNull();
    expect(moderatorNote('')).toBeNull();
    expect(moderatorNote('x'.repeat(501))).toBeUndefined();
  });
  it('ids are UUIDs', () => {
    expect(isId('0b6c2c56-2f0e-4b0e-9d1a-6a0f7c1e2d3f')).toBe(true);
    expect(isId('1; drop table users')).toBe(false);
  });
});

describe('request guards', () => {
  const url = 'https://the-four-exiles.pages.dev/api/auth/login';
  const req = (headers: Record<string, string>, method = 'POST') => new Request(url, { method, headers, body: method === 'GET' ? undefined : '{}' });

  it('lets reads through', () => {
    expect(crossSiteRejection(new Request(url))).toBeNull();
  });
  it('needs JSON and the same origin on writes', async () => {
    expect(crossSiteRejection(req({ 'Content-Type': 'application/json', Origin: 'https://the-four-exiles.pages.dev' }))).toBeNull();
    expect(crossSiteRejection(req({ 'Content-Type': 'application/json; charset=utf-8', Origin: 'https://the-four-exiles.pages.dev' }))).toBeNull();
    expect(crossSiteRejection(req({ 'Content-Type': 'text/plain', Origin: 'https://the-four-exiles.pages.dev' }))?.status).toBe(415);
    expect(crossSiteRejection(req({ 'Content-Type': 'application/x-www-form-urlencoded', Origin: 'https://the-four-exiles.pages.dev' }))?.status).toBe(415);
    expect(crossSiteRejection(req({ 'Content-Type': 'application/json' }))?.status).toBe(403);
    expect(crossSiteRejection(req({ 'Content-Type': 'application/json', Origin: 'https://evil.example' }))?.status).toBe(403);
    expect(crossSiteRejection(req({ 'Content-Type': 'application/json', Origin: 'null' }))?.status).toBe(403);
    expect(crossSiteRejection(req({ 'Content-Type': 'application/json', Origin: 'https://the-four-exiles.pages.dev.evil.example' }))?.status).toBe(403);
    // same host, other scheme or port: a different origin
    expect(crossSiteRejection(req({ 'Content-Type': 'application/json', Origin: 'http://the-four-exiles.pages.dev' }))?.status).toBe(403);
    expect(crossSiteRejection(req({ 'Content-Type': 'application/json', Origin: 'https://the-four-exiles.pages.dev:8443' }))?.status).toBe(403);
  });
  it('limits counts IPv6 per /64 and keeps IPv4 whole', () => {
    expect(normalizeIp('203.0.113.7')).toBe('203.0.113.7');
    expect(normalizeIp('2001:db8:85a3:12:8a2e:370:7334:1')).toBe('2001:db8:85a3:12::/64');
    expect(normalizeIp('2001:DB8:85A3:0012:ffff::9')).toBe('2001:db8:85a3:12::/64');
    expect(normalizeIp('2001:db8::1')).toBe('2001:db8:0:0::/64');
    expect(normalizeIp('2001:db8::2')).toBe(normalizeIp('2001:db8:0:0:abcd::1'));
    expect(normalizeIp('::1')).toBe('0:0:0:0::/64');
    expect(normalizeIp('::ffff:192.0.2.1')).toBe('0:0:0:0::/64');
    expect(normalizeIp('')).toBe('unknown');
    expect(normalizeIp('not an ip')).toBe('unknown');
    expect(normalizeIp('1:2:3:4:5:6:7:8:9')).toBe('unknown');
  });
  it('reads only small JSON objects', async () => {
    const body = (text: string) => new Request(url, { method: 'POST', body: text });
    expect(await readJson(body('{"a":1}'))).toEqual({ a: 1 });
    expect(await readJson(body('[1,2]'))).toBeNull();
    expect(await readJson(body('not json'))).toBeNull();
    expect(await readJson(body(JSON.stringify({ a: 'x'.repeat(9000) })))).toBeNull();
    // the cap is in bytes: 3000 three-byte characters are 9000 bytes
    expect(await readJson(body(JSON.stringify({ a: '€'.repeat(3000) })))).toBeNull();
    expect(await readJson(body(JSON.stringify({ a: '€'.repeat(2000) })))).toEqual({ a: '€'.repeat(2000) });
  });
});
