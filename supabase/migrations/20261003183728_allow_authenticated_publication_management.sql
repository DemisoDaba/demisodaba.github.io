create policy "Authenticated users can insert publications"
on public.publications
for insert
to authenticated
with check (true);

create policy "Authenticated users can update publications"
on public.publications
for update
to authenticated
using (true)
with check (true);

create policy "Authenticated users can delete publications"
on public.publications
for delete
to authenticated
using (true);
