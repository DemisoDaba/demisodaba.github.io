insert into storage.buckets (id, name, public)
values ('experience-images', 'experience-images', true)
on conflict (id) do update
set public = true;

create policy "Public can view experience images"
on storage.objects
for select
using (bucket_id = 'experience-images');

create policy "Authenticated users can upload experience images"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'experience-images');

create policy "Authenticated users can update experience images"
on storage.objects
for update
to authenticated
using (bucket_id = 'experience-images')
with check (bucket_id = 'experience-images');

create policy "Authenticated users can delete experience images"
on storage.objects
for delete
to authenticated
using (bucket_id = 'experience-images');