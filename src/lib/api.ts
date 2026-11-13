/**
 * Thin client for the site's own API (Cloudflare Pages Functions in functions/api/, database in D1). Same host
 * as the site, so the session is a first-party HttpOnly cookie that scripts never see. The address is absolute
 * (/api/...) because the static build uses hash URLs and relative paths.
 */

export type Race = 'grays' | 'nordics' | 'reptilians' | 'mantis';

export interface User {
  id: string;
  email: string;
}

export interface Profile {
  id: string;
  display_name: string;
  race: Race;
}

export interface Me {
  user: User | null;
  profile: Profile | null;
  moderator: boolean;
}

export interface Submission {
  id: string;
  mission_slug: string;
  title: string;
  link_url: string | null;
  has_image: boolean;
  note: string | null;
  status: 'pending' | 'approved' | 'rejected';
  moderator_note: string | null;
  created_at: string;
}

export interface Standing {
  race: Race;
  community: number;
  missions: number;
  events: number;
}

/** Error codes from the API (functions/_lib/http.ts); 'network' when it couldn't be reached at all. */
export type ApiError =
  | 'invalid'
  | 'bad_login'
  | 'signup_failed'
  | 'too_many'
  | 'unauthorized'
  | 'forbidden'
  | 'not_found'
  | 'nickname_taken'
  | 'has_profile'
  | 'no_profile'
  | 'daily_limit'
  | 'not_allowed'
  | 'too_large'
  | 'server_error'
  | 'network';

export type Result<T> = { data: T; error: null } | { data: null; error: ApiError };

/** Images sent with an entry: what the API takes (D1 keeps at most 2 MB per value). */
export const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
export const MAX_IMAGE_BYTES = 1_572_864;
export const MIN_PASSWORD = 10;

async function call<T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', path: string, body?: unknown): Promise<Result<T>> {
  try {
    const res = await fetch(`/api/${path}`, {
      method,
      credentials: 'same-origin',
      headers: method === 'GET' ? { Accept: 'application/json' } : { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: method === 'GET' ? undefined : JSON.stringify(body ?? {}),
    });
    const payload = (await res.json().catch(() => null)) as (T & { error?: ApiError }) | null;
    if (!res.ok) return { data: null, error: payload?.error ?? 'server_error' };
    // A host without the API (plain static hosting, the Vite dev server) answers with the HTML page instead.
    if (payload === null) return { data: null, error: 'network' };
    return { data: payload as T, error: null };
  } catch {
    return { data: null, error: 'network' };
  }
}

function base64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1] ?? '');
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export const api = {
  me: () => call<Me>('GET', 'me'),
  signUp: (email: string, password: string) => call<Me>('POST', 'auth/signup', { email, password }),
  signIn: (email: string, password: string) => call<Me>('POST', 'auth/login', { email, password }),
  signOut: () => call<{ ok: true }>('POST', 'auth/logout'),
  changePassword: (current_password: string, new_password: string) =>
    call<{ ok: true }>('POST', 'me/password', { current_password, new_password }),
  deleteAccount: () => call<{ ok: true }>('DELETE', 'me'),
  createProfile: (display_name: string, race: Race) => call<Me>('POST', 'profile', { display_name, race }),
  renameProfile: (display_name: string) => call<Me>('PUT', 'profile', { display_name }),
  mySubmissions: (mission?: string) =>
    call<{ submissions: Submission[] }>('GET', mission ? `submissions?mission=${encodeURIComponent(mission)}` : 'submissions'),
  async submit(entry: { mission_slug: string; title: string; link_url: string | null; note: string | null; licence_ok: boolean; image: File | null }) {
    const { image, ...rest } = entry;
    let encoded: { type: string; data: string } | null = null;
    if (image) {
      try {
        encoded = { type: image.type, data: await base64(image) };
      } catch {
        return { data: null, error: 'invalid' } as Result<{ id: string }>;
      }
    }
    return call<{ id: string }>('POST', 'submissions', { ...rest, image: encoded });
  },
  moderationQueue: () => call<{ submissions: Submission[] }>('GET', 'moderation/queue'),
  review: (id: string, status: 'approved' | 'rejected', moderator_note: string | null) =>
    call<{ ok: true }>('POST', 'moderation/review', { id, status, moderator_note }),
  standings: () => call<{ standings: Standing[] }>('GET', 'standings'),
  /** Address of an entry's image; the browser sends the session cookie, so only its author and moderators see it. */
  imageUrl: (submissionId: string) => `/api/images/${encodeURIComponent(submissionId)}`,
};
