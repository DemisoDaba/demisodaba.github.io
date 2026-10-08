create table if not exists public.experience (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  organization text not null,
  location text,
  period text,
  description text,
  image_url text,
  sort_order integer default 0,
  created_at timestamptz default now()
);

alter table public.experience enable row level security;

create policy "Public can view experience"
on public.experience
for select
using (true);

create policy "Authenticated users can manage experience"
on public.experience
for all
to authenticated
using (true)
with check (true);