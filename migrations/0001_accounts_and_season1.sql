-- THE FOUR EXILES · Accounts and Season 1 on Cloudflare D1 (replaces supabase/migrations).
-- Same rules as before: points come only from approved community work, never from money; every score change is
-- logged. Row-level security is gone, so who may read or write what is checked by the API (functions/api/);
-- the rules that must hold whatever the API does live here, as checks and triggers.
-- D1 enforces foreign keys, so deleting a user removes their session, profile, entries, images and points.

-- Times are ISO 8601 text in UTC, e.g. 2026-11-13T15:04:08.388Z.

-- Logins --------------------------------------------------------------------
create table users (
  id text primary key,
  -- trimmed and lower-cased by the API before it gets here
  email text not null unique check (length(email) between 3 and 254 and email = lower(email)),
  -- pbkdf2-sha256$<iterations>$<salt base64>$<hash base64>
  password_hash text not null,
  created_at text not null default (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- Sessions: only the SHA-256 of the cookie token is stored, so a copy of the database can't sign anyone in.
create table sessions (
  token_hash text primary key,
  user_id text not null references users (id) on delete cascade,
  created_at text not null default (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  expires_at integer not null -- Unix time in milliseconds
);
create index sessions_user_idx on sessions (user_id);
create index sessions_expiry_idx on sessions (expires_at);

-- Sign-in and sign-up attempts per IP and per e-mail (keys are listed in functions/_lib/ratelimit.ts).
create table auth_attempts (
  key text primary key,
  count integer not null,
  window_start integer not null, -- Unix ms
  locked_until integer not null default 0 -- Unix ms
);

-- Profiles: one per signed-in person; the race is their side in the Census --------------
create table profiles (
  id text primary key references users (id) on delete cascade,
  display_name text not null check (length(display_name) between 2 and 30),
  -- nicknames are public, so no two people can share one (case-insensitive; filled by the API)
  name_key text not null unique,
  race text not null check (race in ('grays', 'nordics', 'reptilians', 'mantis')),
  created_at text not null default (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- The race chosen at sign-up holds for the whole season; id and creation date never change.
create trigger profiles_lock before update on profiles
when new.race is not old.race or new.id is not old.id or new.created_at is not old.created_at
begin
  select raise(abort, 'A raça fica fixa durante a temporada');
end;

-- Moderators: added by the owner (see docs/HANDOFF.md for the command).
create table moderators (
  user_id text primary key references users (id) on delete cascade
);

-- Missions: points are decided here, on the server, not by the browser.
create table missions (
  slug text primary key,
  race text check (race is null or race in ('grays', 'nordics', 'reptilians', 'mantis')),
  points integer not null check (points between 0 and 1000),
  open integer not null default 1 check (open in (0, 1))
);
insert into missions (slug, race, points) values
  ('operation-triplicate', 'grays', 120),
  ('the-dry-banquet', 'reptilians', 200),
  ('smile-audit', 'nordics', 80),
  ('courteous-surrender', 'mantis', 300);

-- Submissions: what people send for a mission. Moderators approve or reject. -------------
create table submissions (
  id text primary key,
  user_id text not null references users (id) on delete cascade,
  mission_slug text not null references missions (slug),
  title text not null check (length(title) between 2 and 120),
  link_url text check (link_url is null or (link_url like 'https://%' and length(link_url) between 12 and 508)),
  -- content type of the image in submission_images, when there is one
  image_type text check (image_type is null or image_type in ('image/png', 'image/jpeg', 'image/webp', 'image/gif')),
  note text check (note is null or length(note) <= 1000),
  licence_ok integer not null check (licence_ok = 1),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  moderator_note text check (moderator_note is null or length(moderator_note) <= 500),
  created_at text not null default (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  reviewed_at text,
  -- a moderator who deletes their account must not block it or erase other people's entries
  reviewed_by text references users (id) on delete set null,
  check (link_url is not null or image_type is not null)
);
create index submissions_user_idx on submissions (user_id, created_at desc);
create index submissions_status_idx on submissions (status, created_at);

-- Images live apart, so listing entries never drags the bytes along (D1 caps a value at 2 MB).
create table submission_images (
  submission_id text primary key references submissions (id) on delete cascade,
  data blob not null check (length(data) <= 1572864)
);

-- New entries: pending, unreviewed, from someone with a profile, for an open mission.
create trigger submissions_insert_check before insert on submissions
when new.status <> 'pending' or new.moderator_note is not null or new.reviewed_at is not null or new.reviewed_by is not null
  or not exists (select 1 from profiles p where p.id = new.user_id)
  or not exists (select 1 from missions m where m.slug = new.mission_slug and m.open = 1)
begin
  select raise(abort, 'Envio não permitido');
end;

-- Abuse guard: at most 10 submissions per person per day.
create trigger submissions_rate before insert on submissions
when (select count(*) from submissions s
      where s.user_id = new.user_id and s.created_at > strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-1 day')) >= 10
begin
  select raise(abort, 'Limite diário de envios atingido');
end;

-- Moderators may change only the status and the note; the entry itself stays as the author sent it.
create trigger submissions_protect before update on submissions
when new.id is not old.id or new.user_id is not old.user_id or new.mission_slug is not old.mission_slug
  or new.title is not old.title or new.link_url is not old.link_url or new.image_type is not old.image_type
  or new.note is not old.note or new.licence_ok is not old.licence_ok or new.created_at is not old.created_at
begin
  select raise(abort, 'A moderação só altera o status e o recado');
end;

-- Score log: written only by the review trigger, read by the API only as totals per race. --------
create table score_events (
  id integer primary key autoincrement,
  submission_id text unique references submissions (id) on delete cascade,
  user_id text not null references users (id) on delete cascade,
  race text not null check (race in ('grays', 'nordics', 'reptilians', 'mantis')),
  category text not null check (category in ('community', 'missions', 'events')),
  points integer not null,
  reason text not null,
  created_at text not null default (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
create index score_events_race_idx on score_events (race);

-- A status change replaces the entry's points: approved adds the mission's points to the author's race.
create trigger submissions_review after update of status on submissions
when new.status is not old.status
begin
  delete from score_events where submission_id = new.id;
  insert into score_events (submission_id, user_id, race, category, points, reason)
  select new.id, new.user_id, p.race, 'missions', m.points,
         'Missão “' || new.mission_slug || '” aprovada pela moderação (regra: missões)'
  from profiles p, missions m
  where new.status = 'approved' and p.id = new.user_id and m.slug = new.mission_slug;
end;
