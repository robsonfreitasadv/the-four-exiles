-- THE FOUR EXILES · Moderators can't review their own entries; daily image allowance; queue paging.

-- A moderator never approves or rejects their own entry (the API checks it too).
create trigger submissions_no_self_review before update on submissions
when new.reviewed_by is not null and new.reviewed_by = new.user_id
begin
  select raise(abort, 'A moderação não avalia o próprio envio');
end;

-- Image bytes sent per person and per network in the last day (keys 'img-user:<id>' and 'img-ip:<ip>').
create table upload_quota (
  key text primary key,
  bytes integer not null,
  window_start integer not null -- Unix ms
);

-- The moderation queue pages through pending entries by (created_at, id).
drop index submissions_status_idx;
create index submissions_status_idx on submissions (status, created_at, id);
