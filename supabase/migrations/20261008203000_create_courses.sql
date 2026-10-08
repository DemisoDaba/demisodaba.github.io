create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  sort_order integer default 0,
  created_at timestamptz default now()
);

create table if not exists public.chapters (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  description text,
  sort_order integer default 0,
  created_at timestamptz default now()
);

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  chapter_id uuid not null references public.chapters(id) on delete cascade,
  title text not null,
  objective text,
  youtube_url text,
  sort_order integer default 0,
  created_at timestamptz default now()
);

alter table public.courses enable row level security;
alter table public.chapters enable row level security;
alter table public.lessons enable row level security;

create policy "Public can view courses"
on public.courses
for select
using (true);

create policy "Authenticated users can manage courses"
on public.courses
for all
to authenticated
using (true)
with check (true);

create policy "Public can view chapters"
on public.chapters
for select
using (true);

create policy "Authenticated users can manage chapters"
on public.chapters
for all
to authenticated
using (true)
with check (true);

create policy "Public can view lessons"
on public.lessons
for select
using (true);

create policy "Authenticated users can manage lessons"
on public.lessons
for all
to authenticated
using (true)
with check (true);