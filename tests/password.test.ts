import { describe, expect, it } from 'vitest';
import {
  dummyHash,
  fromBase64,
  hashPassword,
  newSessionToken,
  PBKDF2_ITERATIONS,
  sha256Hex,
  timingSafeEqual,
  verifyPassword,
} from '../functions/_lib/crypto';

describe('password hash (PBKDF2-SHA256)', () => {
  it('uses the stored format with 100000 iterations and a 16-byte salt', async () => {
    const stored = await hashPassword('correct horse battery');
    const [prefix, iterations, salt, hash] = stored.split('$');
    expect(prefix).toBe('pbkdf2-sha256');
    expect(Number(iterations)).toBe(PBKDF2_ITERATIONS);
    expect(PBKDF2_ITERATIONS).toBe(100_000);
    expect(fromBase64(salt)).toHaveLength(16);
    expect(fromBase64(hash)).toHaveLength(32);
  });

  it('accepts the right password and refuses a wrong one', async () => {
    const stored = await hashPassword('correct horse battery');
    expect(await verifyPassword('correct horse battery', stored)).toBe(true);
    expect(await verifyPassword('correct horse batterY', stored)).toBe(false);
    expect(await verifyPassword('', stored)).toBe(false);
  });

  it('salts every hash, so the same password never gives the same text', async () => {
    const a = await hashPassword('same password here');
    const b = await hashPassword('same password here');
    expect(a).not.toBe(b);
    expect(await verifyPassword('same password here', b)).toBe(true);
  });

  it('refuses anything that is not a hash it wrote', async () => {
    const stored = await hashPassword('correct horse battery');
    const [, , salt, hash] = stored.split('$');
    expect(await verifyPassword('correct horse battery', 'plain-text')).toBe(false);
    expect(await verifyPassword('correct horse battery', `md5$100000$${salt}$${hash}`)).toBe(false);
    // more iterations than Workers allow, or nonsense counts
    expect(await verifyPassword('correct horse battery', `pbkdf2-sha256$200000$${salt}$${hash}`)).toBe(false);
    expect(await verifyPassword('correct horse battery', `pbkdf2-sha256$abc$${salt}$${hash}`)).toBe(false);
    expect(await verifyPassword('correct horse battery', `pbkdf2-sha256$100000$!!!$${hash}`)).toBe(false);
  });

  it('has a dummy hash for unknown e-mails that matches no password', async () => {
    const dummy = await dummyHash();
    expect(dummy.startsWith('pbkdf2-sha256$100000$')).toBe(true);
    expect(await verifyPassword('anything at all', dummy)).toBe(false);
  });
});

describe('constant-time comparison', () => {
  it('compares bytes and lengths', () => {
    expect(timingSafeEqual(new Uint8Array([1, 2, 3]), new Uint8Array([1, 2, 3]))).toBe(true);
    expect(timingSafeEqual(new Uint8Array([1, 2, 3]), new Uint8Array([1, 2, 4]))).toBe(false);
    expect(timingSafeEqual(new Uint8Array([1, 2, 3]), new Uint8Array([1, 2]))).toBe(false);
    expect(timingSafeEqual(new Uint8Array([]), new Uint8Array([]))).toBe(true);
  });
});

describe('session tokens', () => {
  it('are 32 random bytes in base64url (43 characters) and never repeat', () => {
    const a = newSessionToken();
    const b = newSessionToken();
    expect(a).toMatch(/^[A-Za-z0-9_-]{43}$/);
    expect(a).not.toBe(b);
  });

  it('are stored as SHA-256 hex', async () => {
    expect(await sha256Hex('abc')).toBe('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
  });
});
