create extension if not exists pgcrypto;

create table if not exists public.flags (
  id uuid primary key default gen_random_uuid(),
  text varchar(140) not null,
  slug text unique,
  type text not null check (type in ('green', 'red')),
  language text not null check (language in ('fr', 'en')),
  votes integer not null default 0,
  upvotes integer not null default 0,
  downvotes integer not null default 0,
  status text not null default 'approved' check (status in ('approved', 'rejected', 'pending')),
  is_seed boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.flag_votes (
  id uuid primary key default gen_random_uuid(),
  flag_id uuid not null references public.flags(id) on delete cascade,
  voter_key text not null,
  vote_type text not null check (vote_type in ('up', 'down')),
  created_at timestamptz not null default now(),
  unique (flag_id, voter_key)
);

create index if not exists flags_type_idx on public.flags(type);
create index if not exists flags_language_idx on public.flags(language);
create index if not exists flags_votes_idx on public.flags(votes desc);
create index if not exists flags_created_at_idx on public.flags(created_at desc);
create index if not exists flag_votes_flag_idx on public.flag_votes(flag_id);
create index if not exists flag_votes_voter_idx on public.flag_votes(voter_key);

alter table public.flags enable row level security;
alter table public.flag_votes enable row level security;

revoke all on public.flags from anon, authenticated;
revoke all on public.flag_votes from anon, authenticated;

grant select on public.flags to anon, authenticated;
grant insert on public.flags to anon, authenticated;
grant select on public.flag_votes to anon, authenticated;

drop policy if exists "public read approved flags" on public.flags;
create policy "public read approved flags"
  on public.flags for select
  using (status = 'approved');

drop policy if exists "public insert approved flags" on public.flags;
create policy "public insert approved flags"
  on public.flags for insert
  with check (
    status in ('approved', 'pending')
    and char_length(trim(text)) between 8 and 140
    and type in ('green', 'red')
    and language in ('fr', 'en')
  );

drop policy if exists "read own and public votes" on public.flag_votes;
create policy "read own and public votes"
  on public.flag_votes for select
  using (true);

create or replace function public.refresh_flag_score(p_flag_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update public.flags
  set
    upvotes = coalesce((select count(*) from public.flag_votes where flag_id = p_flag_id and vote_type = 'up'), 0),
    downvotes = coalesce((select count(*) from public.flag_votes where flag_id = p_flag_id and vote_type = 'down'), 0),
    votes = coalesce((select count(*) filter (where vote_type = 'up') - count(*) filter (where vote_type = 'down') from public.flag_votes where flag_id = p_flag_id), 0)
  where id = p_flag_id;
$$;

create or replace function public.cast_flag_vote(p_flag_id uuid, p_voter_key text, p_vote_type text)
returns public.flags
language plpgsql
security definer
set search_path = public
as $$
declare
  existing_vote text;
  result_row public.flags;
begin
  if p_vote_type not in ('up', 'down') then
    raise exception 'Invalid vote type';
  end if;

  select vote_type into existing_vote
  from public.flag_votes
  where flag_id = p_flag_id and voter_key = p_voter_key;

  if existing_vote is null then
    insert into public.flag_votes(flag_id, voter_key, vote_type)
    values (p_flag_id, p_voter_key, p_vote_type);
  elsif existing_vote = p_vote_type then
    delete from public.flag_votes where flag_id = p_flag_id and voter_key = p_voter_key;
  else
    update public.flag_votes
    set vote_type = p_vote_type, created_at = now()
    where flag_id = p_flag_id and voter_key = p_voter_key;
  end if;

  perform public.refresh_flag_score(p_flag_id);

  select * into result_row from public.flags where id = p_flag_id;
  return result_row;
end;
$$;

grant execute on function public.cast_flag_vote(uuid, text, text) to anon, authenticated;
grant execute on function public.refresh_flag_score(uuid) to anon, authenticated;

alter publication supabase_realtime add table public.flags;
