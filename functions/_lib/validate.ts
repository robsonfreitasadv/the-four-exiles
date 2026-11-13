/**
 * Checks for everything the API receives. Each returns the cleaned value or null; the API answers null with a
 * plain "invalid" error. The database checks the same limits again (migrations/).
 */

export const RACES = ['grays', 'nordics', 'reptilians', 'mantis'] as const;
export type Race = (typeof RACES)[number];

export const MIN_PASSWORD = 10;
/** Long enough for any passphrase, short enough that hashing it stays cheap. */
export const MAX_PASSWORD = 256;

export const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'] as const;
export type ImageType = (typeof IMAGE_TYPES)[number];
/** D1 keeps at most 2 MB in one value, so images stop at 1.5 MB. */
export const MAX_IMAGE_BYTES = 1_572_864;

// Control characters (C0, DEL, C1) never belong in names, titles or notes.
// eslint-disable-next-line no-control-regex
const CONTROL = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/;
const ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

/** Length in characters as people count them (and as SQLite's length() does), not UTF-16 units. */
function chars(s: string): number {
  return [...s].length;
}

function text(value: unknown, min: number, max: number, multiline = false): string | null {
  if (typeof value !== 'string') return null;
  const s = value.trim();
  if (chars(s) < min || chars(s) > max) return null;
  if (CONTROL.test(s) || (!multiline && /[\r\n\t]/.test(s))) return null;
  return s;
}

function optionalText(value: unknown, max: number, multiline = false): string | null | undefined {
  if (value === undefined || value === null) return null;
  if (typeof value === 'string' && value.trim() === '') return null;
  const s = text(value, 1, max, multiline);
  return s === null ? undefined : s;
}

/** Trimmed and lower-cased, so the same address can't open two accounts. */
export function normalizeEmail(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const s = value.trim().toLowerCase();
  if (s.length < 3 || s.length > 254) return null;
  if (!/^[^\s@"<>()[\]\\,;:]+@[^\s@"<>()[\]\\,;:]+\.[^\s@"<>()[\]\\,;:]+$/.test(s)) return null;
  return s;
}

export function validPassword(value: unknown): value is string {
  return typeof value === 'string' && chars(value) >= MIN_PASSWORD && chars(value) <= MAX_PASSWORD;
}

/** For sign-in only: any non-empty string within the size limit (old rules may differ from today's). */
export function passwordAttempt(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0 && chars(value) <= MAX_PASSWORD;
}

export function nickname(value: unknown): string | null {
  return text(value, 2, 30);
}

/** Case-insensitive key that keeps two people from sharing a nickname ("Dora" and "dora"). */
export function nicknameKey(name: string): string {
  return name.normalize('NFKC').toLowerCase();
}

export function race(value: unknown): Race | null {
  return typeof value === 'string' && (RACES as readonly string[]).includes(value) ? (value as Race) : null;
}

export function isId(value: unknown): value is string {
  return typeof value === 'string' && ID.test(value);
}

export function missionSlug(value: unknown): string | null {
  return typeof value === 'string' && /^[a-z0-9-]{1,60}$/.test(value) ? value : null;
}

export function httpsLink(value: unknown): string | null | undefined {
  if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) return null;
  if (typeof value !== 'string') return undefined;
  const s = value.trim();
  if (s.length < 12 || s.length > 508 || /\s/.test(s) || CONTROL.test(s)) return undefined;
  try {
    const url = new URL(s);
    return url.protocol === 'https:' && url.hostname.includes('.') ? s : undefined;
  } catch {
    return undefined;
  }
}

/** Checks that the bytes really are the image type claimed, not just the label. */
export function sniffImage(bytes: Uint8Array): ImageType | null {
  const starts = (...sig: number[]) => sig.every((b, i) => bytes[i] === b);
  if (starts(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a)) return 'image/png';
  if (starts(0xff, 0xd8, 0xff)) return 'image/jpeg';
  if (starts(0x47, 0x49, 0x46, 0x38)) return 'image/gif';
  if (starts(0x52, 0x49, 0x46, 0x46) && bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50)
    return 'image/webp';
  return null;
}

export interface SubmissionInput {
  mission_slug: string;
  title: string;
  link_url: string | null;
  note: string | null;
  image: { type: ImageType; bytes: Uint8Array } | null;
}

/** A mission entry: title, a link and/or an image, an optional note and the licence box ticked. */
export function submission(body: Record<string, unknown>): SubmissionInput | null {
  const slug = missionSlug(body.mission_slug);
  const title = text(body.title, 2, 120);
  const link = httpsLink(body.link_url);
  const note = optionalText(body.note, 1000, true);
  if (!slug || !title || link === undefined || note === undefined || body.licence_ok !== true) return null;

  let image: SubmissionInput['image'] = null;
  if (body.image !== undefined && body.image !== null) {
    const img = body.image as { type?: unknown; data?: unknown };
    if (typeof img !== 'object' || typeof img.data !== 'string' || typeof img.type !== 'string') return null;
    // base64 grows 4/3; refuse oversized text before decoding it
    if (img.data.length > Math.ceil(MAX_IMAGE_BYTES / 3) * 4 + 4) return null;
    let bytes: Uint8Array;
    try {
      const s = atob(img.data);
      bytes = new Uint8Array(s.length);
      for (let i = 0; i < s.length; i++) bytes[i] = s.charCodeAt(i);
    } catch {
      return null;
    }
    const type = sniffImage(bytes);
    if (!type || type !== img.type || bytes.length === 0 || bytes.length > MAX_IMAGE_BYTES) return null;
    image = { type, bytes };
  }
  if (!link && !image) return null;
  return { mission_slug: slug, title, link_url: link, note, image };
}

export function reviewStatus(value: unknown): 'approved' | 'rejected' | null {
  return value === 'approved' || value === 'rejected' ? value : null;
}

export function moderatorNote(value: unknown): string | null | undefined {
  return optionalText(value, 500, true);
}
