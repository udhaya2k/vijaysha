create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Anonymous' check (char_length(btrim(name)) between 1 and 100),
  message text not null check (char_length(btrim(message)) between 1 and 1000),
  created_at timestamptz not null default now()
);

alter table public.notes
  add column if not exists name text not null default 'Anonymous'
  check (char_length(btrim(name)) between 1 and 100);

alter table public.notes enable row level security;

revoke all on table public.notes from public, anon, authenticated;
grant insert on table public.notes to anon;

drop policy if exists "Allow anonymous birthday note submissions" on public.notes;
create policy "Allow anonymous birthday note submissions"
  on public.notes
  for insert
  to anon
  with check (
    char_length(btrim(name)) between 1 and 100
    and char_length(btrim(message)) between 1 and 1000
  );
