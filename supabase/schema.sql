create extension if not exists "uuid-ossp";

create type public.flag_type as enum ('green', 'red');
create type public.flag_language as enum ('fr', 'en');

create table if not exists public.flags (
  id uuid primary key default uuid_generate_v4(),
  text varchar(120) not null unique,
  type public.flag_type not null,
  language public.flag_language not null,
  votes integer not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists flags_type_votes_idx on public.flags (type, votes desc);
create index if not exists flags_created_at_idx on public.flags (created_at desc);

alter table public.flags enable row level security;

revoke all on public.flags from anon, authenticated;
grant select, insert on public.flags to anon, authenticated;
grant update (votes) on public.flags to anon, authenticated;

create policy "Public read flags"
  on public.flags
  for select
  using (true);

create policy "Public insert flags"
  on public.flags
  for insert
  with check (
    char_length(trim(text)) between 8 and 120
    and type in ('green', 'red')
    and language in ('fr', 'en')
  );

create policy "Public update votes only"
  on public.flags
  for update
  using (true)
  with check (votes between -999999 and 999999);

alter publication supabase_realtime add table public.flags;
