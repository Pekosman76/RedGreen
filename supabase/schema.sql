create extension if not exists pgcrypto;

create type flag_type as enum ('green', 'red');
create type flag_language as enum ('fr', 'en');

create table if not exists public.flags (
  id uuid primary key default gen_random_uuid(),
  text varchar(120) not null unique,
  type flag_type not null,
  language flag_language not null,
  votes integer not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists flags_type_votes_idx on public.flags (type, votes desc);
create index if not exists flags_created_at_idx on public.flags (created_at desc);

alter table public.flags enable row level security;

create policy "Public read flags"
  on public.flags for select
  using (true);

create policy "Public insert flags"
  on public.flags for insert
  with check (char_length(text) between 8 and 120);

create policy "Public update votes"
  on public.flags for update
  using (true)
  with check (votes between -999999 and 999999);
