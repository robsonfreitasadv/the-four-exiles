import { sha256Hex } from './crypto';
import type { Env } from './http';

/**
 * Attempt limits, kept in D1 (table auth_attempts). Keys:
 * - 'login-ip:<ip>'                 every sign-in from one network (IPv6 counted per /64, see clientIp)
 * - 'login-pair:<ip>|<e-mail hash>' sign-ins for one e-mail from one network: the tight limit
 * - 'login-email:<e-mail hash>'     every sign-in for one e-mail, from anywhere: a high ceiling only, so a stranger
 *                                   can't lock someone out with a handful of wrong passwords
 * - 'signup-ip:<ip>'                new accounts from one network
 * - 'password:<user id>'            current-password checks (password change, account deletion)
 * Attempts are counted before the password is checked, so parallel requests can't slip past the limit; a success
 * then clears or gives back what it counted. Past the limit inside the window the key is locked for `lockMs`.
 */
export interface Rule {
  max: number;
  windowMs: number;
  lockMs: number;
}

const MIN = 60 * 1000;
export const LOGIN_IP: Rule = { max: 30, windowMs: 15 * MIN, lockMs: 15 * MIN };
export const LOGIN_PAIR: Rule = { max: 5, windowMs: 15 * MIN, lockMs: 15 * MIN };
export const LOGIN_EMAIL: Rule = { max: 50, windowMs: 60 * MIN, lockMs: 60 * MIN };
export const SIGNUP_IP: Rule = { max: 10, windowMs: 60 * MIN, lockMs: 60 * MIN };
export const PASSWORD_CHECK: Rule = { max: 5, windowMs: 15 * MIN, lockMs: 15 * MIN };

/** Sign-in and sign-up count apart, each with its own rule, so one never uses up the other's allowance. */
export function ipKey(action: 'login' | 'signup', ip: string): string {
  return `${action}-ip:${ip}`;
}

/** E-mails are kept only as a hash in this table. */
export async function loginKeys(ip: string, email: string) {
  const hash = await sha256Hex(email);
  return { ip: ipKey('login', ip), pair: `login-pair:${ip}|${hash}`, email: `login-email:${hash}` };
}

export async function isLocked(env: Env, key: string): Promise<boolean> {
  const row = await env.DB.prepare('select locked_until from auth_attempts where key = ?').bind(key).first<{ locked_until: number }>();
  return Boolean(row && row.locked_until > Date.now());
}

/** Counts one attempt; returns true when the key is locked (by this attempt or still from before). */
export async function hit(env: Env, key: string, rule: Rule): Promise<boolean> {
  const now = Date.now();
  // One statement: start a new window when the old one is over, otherwise add one; lock on reaching the limit.
  const row = await env.DB.prepare(
    `insert into auth_attempts (key, count, window_start, locked_until) values (?1, 1, ?2, case when 1 >= ?3 then ?2 + ?5 else 0 end)
     on conflict (key) do update set
       count = case when auth_attempts.window_start + ?4 <= ?2 then 1 else auth_attempts.count + 1 end,
       window_start = case when auth_attempts.window_start + ?4 <= ?2 then ?2 else auth_attempts.window_start end,
       locked_until = case
         when (case when auth_attempts.window_start + ?4 <= ?2 then 1 else auth_attempts.count + 1 end) >= ?3 then ?2 + ?5
         else auth_attempts.locked_until end
     returning locked_until`,
  )
    .bind(key, now, rule.max, rule.windowMs, rule.lockMs)
    .first<{ locked_until: number }>();
  return Boolean(row && row.locked_until > now);
}

/** Gives back one counted attempt (a successful sign-in shouldn't eat a shared network's allowance). */
export async function giveBack(env: Env, key: string): Promise<void> {
  await env.DB.prepare('update auth_attempts set count = max(count - 1, 0) where key = ? and locked_until <= ?').bind(key, Date.now()).run();
}

export async function clear(env: Env, key: string): Promise<void> {
  await env.DB.prepare('delete from auth_attempts where key = ?').bind(key).run();
}

/**
 * Daily byte allowance (table upload_quota): adds `amount` to the key's total for the last day and says whether
 * it still fits under `max`. Refused amounts stay counted, so trying again doesn't help.
 */
export async function consumeBytes(env: Env, key: string, amount: number, max: number): Promise<boolean> {
  const now = Date.now();
  const day = 24 * 60 * MIN;
  const row = await env.DB.prepare(
    `insert into upload_quota (key, bytes, window_start) values (?1, ?2, ?3)
     on conflict (key) do update set
       bytes = case when upload_quota.window_start + ?4 <= ?3 then ?2 else upload_quota.bytes + ?2 end,
       window_start = case when upload_quota.window_start + ?4 <= ?3 then ?3 else upload_quota.window_start end
     returning bytes`,
  )
    .bind(key, amount, now, day)
    .first<{ bytes: number }>();
  return Boolean(row && row.bytes <= max);
}
