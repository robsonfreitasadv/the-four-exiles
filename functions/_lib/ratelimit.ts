import { sha256Hex } from './crypto';
import type { Env } from './http';

/**
 * Attempt limits for sign-in and sign-up, kept in D1 (table auth_attempts; keys like 'login-ip:<address>',
 * 'signup-ip:<address>', 'email:<sha-256>', 'password:<user id>'). Past the limit inside the window,
 * the key is locked for `lockMs`; every attempt during the lock is refused before any password is checked.
 */
export interface Rule {
  max: number;
  windowMs: number;
  lockMs: number;
}

const MIN = 60 * 1000;
/** Wrong passwords from one network address (shared networks get some room). */
export const LOGIN_IP: Rule = { max: 20, windowMs: 15 * MIN, lockMs: 15 * MIN };
/** Wrong passwords for one e-mail, from anywhere. */
export const LOGIN_EMAIL: Rule = { max: 5, windowMs: 15 * MIN, lockMs: 15 * MIN };
/** New accounts from one network address. */
export const SIGNUP_IP: Rule = { max: 10, windowMs: 60 * MIN, lockMs: 60 * MIN };
/** Wrong current passwords when changing the password. */
export const PASSWORD_CHANGE: Rule = { max: 5, windowMs: 15 * MIN, lockMs: 15 * MIN };

/** Sign-in and sign-up count apart, each with its own rule, so one never uses up the other's allowance. */
export function ipKey(action: 'login' | 'signup', ip: string): string {
  return `${action}-ip:${ip}`;
}

/** E-mails are kept only as a hash in this table. */
export async function emailKey(email: string): Promise<string> {
  return `email:${await sha256Hex(email)}`;
}

export async function isLocked(env: Env, key: string): Promise<boolean> {
  const row = await env.DB.prepare('select locked_until from auth_attempts where key = ?').bind(key).first<{ locked_until: number }>();
  return Boolean(row && row.locked_until > Date.now());
}

/** Counts one attempt; returns true when this attempt reached the limit and locked the key. */
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

export async function clear(env: Env, key: string): Promise<void> {
  await env.DB.prepare('delete from auth_attempts where key = ?').bind(key).run();
}
