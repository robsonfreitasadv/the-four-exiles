-- THE FOUR EXILES · Season 1: real missions, moderation and a public score log.
-- Rules: points come only from approved community work, never from money; every score change is logged.

-- Races ----------------------------------------------------------------
create type public.race as enum ('grays', 'nordics', 'reptilians', 'mantis');
create type public.submission_status as enum ('pending', 'approved', 'rejected');
create type public.score_category as enum ('community', 'missions', 'events');

-- Profiles: one per signed-in person; the race is their side in the Census.
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null check (char_length(display_name) between 2 and 30),
  race public.race not null,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "read own profile" on public.profiles for select to authenticated using (id = (select auth.uid()));
create policy "create own profile" on public.profiles for insert to authenticated with check (id = (select auth.uid()));
create policy "update own profile" on public.profiles for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));

-- Moderators: added by the owner in the dashboard (insert a row with the user's id).
create table public.moderators (
  user_id uuid primary key references auth.users (id) on delete cascade
);
alter table public.moderators enable row level security;
create policy "see own moderator row" on public.moderators for select to authenticated using (user_id = (select auth.uid()));

create or replace function public.is_moderator()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.moderators m where m.user_id = (select auth.uid()));
$$;

-- Missions: points are decided here, on the server, not by the browser.
create table public.missions (
  slug text primary key,
  race public.race,
  points integer not null check (points between 0 and 1000),
  open boolean not null default true
);
alter table public.missions enable row level security;
create policy "missions are public" on public.missions for select to anon, authenticated using (true);
insert into public.missions (slug, race, points) values
  ('operation-triplicate', 'grays', 120),
  ('the-dry-banquet', 'reptilians', 200),
  ('smile-audit', 'nordics', 80),
  ('courteous-surrender', 'mantis', 300);

-- Submissions: what people send for a mission. Moderators approve or reject.
create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  mission_slug text not null references public.missions (slug),
  title text not null check (char_length(title) between 2 and 120),
  link_url text check (link_url is null or link_url ~ '^https://[^\s]{4,500}$'),
  image_path text check (image_path is null or char_length(image_path) < 300),
  note text check (note is null or char_length(note) <= 1000),
  licence_ok boolean not null check (licence_ok),
  status public.submission_status not null default 'pending',
  moderator_note text check (moderator_note is null or char_length(moderator_note) <= 500),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users (id),
  check (link_url is not null or image_path is not null)
);
create index submissions_user_idx on public.submissions (user_id, created_at desc);
create index submissions_status_idx on public.submissions (status, created_at);
alter table public.submissions enable row level security;
create policy "read own or moderate" on public.submissions for select to authenticated
  using (user_id = (select auth.uid()) or (select public.is_moderator()));
create policy "send own, pending only" on public.submissions for insert to authenticated
  with check (
    user_id = (select auth.uid())
    and status = 'pending'
    and moderator_note is null and reviewed_at is null and reviewed_by is null
    and exists (select 1 from public.profiles p where p.id = (select auth.uid()))
    and exists (select 1 from public.missions m where m.slug = mission_slug and m.open)
  );
create policy "moderators review" on public.submissions for update to authenticated
  using ((select public.is_moderator())) with check ((select public.is_moderator()));

-- Abuse guard: at most 10 submissions per person per day.
create or replace function public.limit_submissions()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if (select count(*) from public.submissions s
      where s.user_id = new.user_id and s.created_at > now() - interval '1 day') >= 10 then
    raise exception 'Limite diário de envios atingido';
  end if;
  return new;
end;
$$;
create trigger submissions_rate before insert on public.submissions
  for each row execute function public.limit_submissions();

-- Score log: written only by the approval trigger, read through the public functions below.
create table public.score_events (
  id bigint generated always as identity primary key,
  submission_id uuid unique references public.submissions (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  race public.race not null,
  category public.score_category not null,
  points integer not null,
  reason text not null,
  created_at timestamptz not null default now()
);
alter table public.score_events enable row level security;
-- no policies: nobody reads or writes it directly

create or replace function public.on_submission_review()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if new.status is distinct from old.status then
    new.reviewed_at := now();
    new.reviewed_by := (select auth.uid());
    delete from public.score_events where submission_id = new.id;
    if new.status = 'approved' then
      insert into public.score_events (submission_id, user_id, race, category, points, reason)
      select new.id, new.user_id, p.race, 'missions', m.points,
             'Missão “' || new.mission_slug || '” aprovada pela moderação (regra: missões)'
      from public.profiles p, public.missions m
      where p.id = new.user_id and m.slug = new.mission_slug;
    end if;
  end if;
  return new;
end;
$$;
create trigger submissions_review before update on public.submissions
  for each row execute function public.on_submission_review();

-- Public read side: standings by race and the anonymised score log.
create or replace function public.season1_standings()
returns table (race public.race, community bigint, missions bigint, events bigint)
language sql stable security definer set search_path = '' as $$
  select r.race,
         coalesce(sum(e.points) filter (where e.category = 'community'), 0),
         coalesce(sum(e.points) filter (where e.category = 'missions'), 0),
         coalesce(sum(e.points) filter (where e.category = 'events'), 0)
  from unnest(enum_range(null::public.race)) as r(race)
  left join public.score_events e on e.race = r.race
  group by r.race;
$$;

create or replace function public.season1_log(max_rows integer default 50)
returns table (created_at timestamptz, display_name text, race public.race, category public.score_category, points integer, reason text)
language sql stable security definer set search_path = '' as $$
  select e.created_at, p.display_name, e.race, e.category, e.points, e.reason
  from public.score_events e join public.profiles p on p.id = e.user_id
  order by e.created_at desc
  limit least(greatest(max_rows, 1), 200);
$$;

revoke execute on function public.season1_standings() from public;
revoke execute on function public.season1_log(integer) from public;
grant execute on function public.season1_standings() to anon, authenticated;
grant execute on function public.season1_log(integer) to anon, authenticated;
revoke execute on function public.limit_submissions() from public, anon, authenticated;
revoke execute on function public.on_submission_review() from public, anon, authenticated;

-- Images: private bucket, 5 MB, images only; each person writes in their own folder.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('submissions', 'submissions', false, 5242880, array['image/png', 'image/jpeg', 'image/webp', 'image/gif']);

create policy "upload to own folder" on storage.objects for insert to authenticated
  with check (bucket_id = 'submissions' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "read own or moderate" on storage.objects for select to authenticated
  using (bucket_id = 'submissions' and ((storage.foldername(name))[1] = (select auth.uid())::text or (select public.is_moderator())));
