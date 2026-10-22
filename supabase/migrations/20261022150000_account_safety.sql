-- THE FOUR EXILES · Account safety: locked race, narrow moderation, unique nicknames, self-service deletion.

-- Nicknames are public, so no two people can share one (case-insensitive).
create unique index profiles_display_name_key on public.profiles (lower(display_name));

-- The race chosen at sign-up holds for the whole season; id and creation date never change.
create or replace function public.lock_profile()
returns trigger language plpgsql set search_path = '' as $$
begin
  if new.race is distinct from old.race then
    raise exception 'A raça fica fixa durante a temporada';
  end if;
  if new.id is distinct from old.id or new.created_at is distinct from old.created_at then
    raise exception 'Campo protegido';
  end if;
  return new;
end;
$$;
create trigger profiles_lock before update on public.profiles
  for each row execute function public.lock_profile();
revoke execute on function public.lock_profile() from public, anon, authenticated;

-- Moderators may change only the status and the note; the entry itself stays as the author sent it.
create or replace function public.on_submission_review()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if (new.id, new.user_id, new.mission_slug, new.title, new.link_url, new.image_path, new.note, new.licence_ok, new.created_at)
     is distinct from
     (old.id, old.user_id, old.mission_slug, old.title, old.link_url, old.image_path, old.note, old.licence_ok, old.created_at) then
    raise exception 'A moderação só altera o status e o recado';
  end if;
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
  else
    new.reviewed_at := old.reviewed_at;
    new.reviewed_by := old.reviewed_by;
  end if;
  return new;
end;
$$;
revoke execute on function public.on_submission_review() from public, anon, authenticated;

-- A moderator who deletes their account must not block it or erase other people's entries.
alter table public.submissions drop constraint submissions_reviewed_by_fkey;
alter table public.submissions add constraint submissions_reviewed_by_fkey
  foreign key (reviewed_by) references auth.users (id) on delete set null;

-- People can remove their own images (used before deleting the account, and for failed sends).
create policy "delete own files" on storage.objects for delete to authenticated
  using (bucket_id = 'submissions' and (storage.foldername(name))[1] = (select auth.uid())::text);

-- Self-service deletion (LGPD art. 18): removes the login, profile, entries and their points.
create or replace function public.delete_my_account()
returns void language plpgsql security definer set search_path = '' as $$
begin
  if (select auth.uid()) is null then
    raise exception 'Sem sessão';
  end if;
  delete from auth.users where id = (select auth.uid());
end;
$$;
revoke execute on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;
