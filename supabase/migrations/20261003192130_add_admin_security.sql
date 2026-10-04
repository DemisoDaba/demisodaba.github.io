drop policy if exists "Authenticated users can insert publications"
on public.publications;

drop policy if exists "Authenticated users can update publications"
on public.publications;

drop policy if exists "Authenticated users can delete publications"
on public.publications;

drop policy if exists "Authenticated users can insert projects"
on public.projects;

drop policy if exists "Authenticated users can update projects"
on public.projects;

drop policy if exists "Authenticated users can delete projects"
on public.projects;

drop policy if exists "Authenticated users can insert profile"
on public.profile;

drop policy if exists "Authenticated users can update profile"
on public.profile;

drop policy if exists "Authenticated users can delete profile"
on public.profile;

drop policy if exists "Authenticated users can insert CV"
on public.cv;

drop policy if exists "Authenticated users can update CV"
on public.cv;

drop policy if exists "Authenticated users can delete CV"
on public.cv;

drop policy if exists "Authenticated users can insert news"
on public.news;

drop policy if exists "Authenticated users can update news"
on public.news;

drop policy if exists "Authenticated users can delete news"
on public.news;

drop policy if exists "Authenticated users can insert software and data"
on public.software_data;

drop policy if exists "Authenticated users can update software and data"
on public.software_data;

drop policy if exists "Authenticated users can delete software and data"
on public.software_data;


create policy "Admins can insert publications"
on public.publications
for insert
to authenticated
with check (
  exists (
    select 1 from public.admin_users
    where user_id = auth.uid()
  )
);

create policy "Admins can update publications"
on public.publications
for update
to authenticated
using (
  exists (
    select 1 from public.admin_users
    where user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.admin_users
    where user_id = auth.uid()
  )
);

create policy "Admins can delete publications"
on public.publications
for delete
to authenticated
using (
  exists (
    select 1 from public.admin_users
    where user_id = auth.uid()
  )
);


create policy "Admins can insert projects"
on public.projects
for insert
to authenticated
with check (
  exists (select 1 from public.admin_users where user_id = auth.uid())
);

create policy "Admins can update projects"
on public.projects
for update
to authenticated
using (
  exists (select 1 from public.admin_users where user_id = auth.uid())
)
with check (
  exists (select 1 from public.admin_users where user_id = auth.uid())
);

create policy "Admins can delete projects"
on public.projects
for delete
to authenticated
using (
  exists (select 1 from public.admin_users where user_id = auth.uid())
);


create policy "Admins can insert profile"
on public.profile
for insert
to authenticated
with check (
  exists (select 1 from public.admin_users where user_id = auth.uid())
);

create policy "Admins can update profile"
on public.profile
for update
to authenticated
using (
  exists (select 1 from public.admin_users where user_id = auth.uid())
)
with check (
  exists (select 1 from public.admin_users where user_id = auth.uid())
);

create policy "Admins can delete profile"
on public.profile
for delete
to authenticated
using (
  exists (select 1 from public.admin_users where user_id = auth.uid())
);


create policy "Admins can insert CV"
on public.cv
for insert
to authenticated
with check (
  exists (select 1 from public.admin_users where user_id = auth.uid())
);

create policy "Admins can update CV"
on public.cv
for update
to authenticated
using (
  exists (select 1 from public.admin_users where user_id = auth.uid())
)
with check (
  exists (select 1 from public.admin_users where user_id = auth.uid())
);

create policy "Admins can delete CV"
on public.cv
for delete
to authenticated
using (
  exists (select 1 from public.admin_users where user_id = auth.uid())
);


create policy "Admins can insert news"
on public.news
for insert
to authenticated
with check (
  exists (select 1 from public.admin_users where user_id = auth.uid())
);

create policy "Admins can update news"
on public.news
for update
to authenticated
using (
  exists (select 1 from public.admin_users where user_id = auth.uid())
)
with check (
  exists (select 1 from public.admin_users where user_id = auth.uid())
);

create policy "Admins can delete news"
on public.news
for delete
to authenticated
using (
  exists (select 1 from public.admin_users where user_id = auth.uid())
);


create policy "Admins can insert software and data"
on public.software_data
for insert
to authenticated
with check (
  exists (select 1 from public.admin_users where user_id = auth.uid())
);

create policy "Admins can update software and data"
on public.software_data
for update
to authenticated
using (
  exists (select 1 from public.admin_users where user_id = auth.uid())
)
with check (
  exists (select 1 from public.admin_users where user_id = auth.uid())
);

create policy "Admins can delete software and data"
on public.software_data
for delete
to authenticated
using (
  exists (select 1 from public.admin_users where user_id = auth.uid())
);
