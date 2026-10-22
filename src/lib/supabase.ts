import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase project "the-four-exiles" (sa-east-1). The URL and the publishable (anon) key are public by
 * design: every table is protected by row-level security (supabase/migrations). Leave them empty and the
 * site falls back to "coming soon" for logins and submissions.
 */
const SUPABASE_URL = '';
const SUPABASE_ANON_KEY = '';

export const supabase: SupabaseClient | null =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: true, storageKey: 'four-exiles:auth' } })
    : null;

export type Race = 'grays' | 'nordics' | 'reptilians' | 'mantis';

export interface Profile {
  id: string;
  display_name: string;
  race: Race;
}

export interface Submission {
  id: string;
  user_id: string;
  mission_slug: string;
  title: string;
  link_url: string | null;
  image_path: string | null;
  note: string | null;
  status: 'pending' | 'approved' | 'rejected';
  moderator_note: string | null;
  created_at: string;
}
