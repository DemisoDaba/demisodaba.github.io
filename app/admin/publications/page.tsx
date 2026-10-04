"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Publication = {
  id: number;
  title: string;
  authors: string | null;
  journal: string | null;
  year: number | null;
  doi: string | null;
  abstract: string | null;
  url: string | null;
  featured: boolean;
  published: boolean;
};

const emptyForm = {
  title: "",
  authors: "",
  journal: "",
  year: "",
  doi: "",
  abstract: "",
  url: "",
  featured: false,
  published: true,
};

export default function PublicationsPage() {
  const router = useRouter();

  const [publications, setPublications] = useState<Publication[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    checkAuthAndLoad();
  }, []);

  async function checkAuthAndLoad() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/admin/login");
      return;
    }

    await loadPublications();
  }

  async function loadPublications() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("publications")
      .select("*")
      .order("year", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setPublications(data ?? []);
    }

    setLoading(false);
  }

  function updateField(
    field: keyof typeof emptyForm,
    value: string | boolean
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function startEdit(publication: Publication) {
    setEditingId(publication.id);

    setForm({
      title: publication.title,
      authors: publication.authors ?? "",
      journal: publication.journal ?? "",
      year: publication.year?.toString() ?? "",
      doi: publication.doi ?? "",
      abstract: publication.abstract ?? "",
      url: publication.url ?? "",
      featured: publication.featured,
      published: publication.published,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
    setMessage("");
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    const publicationData = {
      title: form.title.trim(),
      authors: form.authors.trim() || null,
      journal: form.journal.trim() || null,
      year: form.year ? Number(form.year) : null,
      doi: form.doi.trim() || null,
      abstract: form.abstract.trim() || null,
      url: form.url.trim() || null,
      featured: form.featured,
      published: form.published,
    };

    if (!publicationData.title) {
      setError("Title is required.");
      setSaving(false);
      return;
    }

    if (editingId === null) {
      const { error } = await supabase
        .from("publications")
        .insert(publicationData);

      if (error) {
        setError(error.message);
      } else {
        setMessage("Publication added successfully.");
        resetForm();
        await loadPublications();
      }
    } else {
      const { error } = await supabase
        .from("publications")
        .update(publicationData)
        .eq("id", editingId);

      if (error) {
        setError(error.message);
      } else {
        setMessage("Publication updated successfully.");
        resetForm();
        await loadPublications();
      }
    }

    setSaving(false);
  }

  async function deletePublication(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this publication?"
    );

    if (!confirmed) {
      return;
    }

    const { error } = await supabase
      .from("publications")
      .delete()
      .eq("id", id);

    if (error) {
      setError(error.message);
      return;
    }

    setMessage("Publication deleted.");
    await loadPublications();
  }

  async function togglePublished(publication: Publication) {
    const { error } = await supabase
      .from("publications")
      .update({ published: !publication.published })
      .eq("id", publication.id);

    if (error) {
      setError(error.message);
      return;
    }

    await loadPublications();
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading publications...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-xl font-bold">Publications</h1>
            <p className="text-sm text-gray-500">Manage your research publications</p>
          </div>

          <button
            onClick={() => router.push("/admin")}
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Back to Dashboard
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-8 px-6 py-10">
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">
            {editingId === null ? "Add Publication" : "Edit Publication"}
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Title *
              </label>
              <input
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                required
                className="w-full rounded-lg border px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Authors
              </label>
              <input
                value={form.authors}
                onChange={(e) => updateField("authors", e.target.value)}
                className="w-full rounded-lg border px-4 py-3"
                placeholder="Daba, D., Author, A., ..."
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Journal
                </label>
                <input
                  value={form.journal}
                  onChange={(e) => updateField("journal", e.target.value)}
                  className="w-full rounded-lg border px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Year
                </label>
                <input
                  type="number"
                  value={form.year}
                  onChange={(e) => updateField("year", e.target.value)}
                  className="w-full rounded-lg border px-4 py-3"
                />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  DOI
                </label>
                <input
                  value={form.doi}
                  onChange={(e) => updateField("doi", e.target.value)}
                  className="w-full rounded-lg border px-4 py-3"
                  placeholder="10.xxxx/xxxxx"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Publication URL
                </label>
                <input
                  type="url"
                  value={form.url}
                  onChange={(e) => updateField("url", e.target.value)}
                  className="w-full rounded-lg border px-4 py-3"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Abstract
              </label>
              <textarea
                value={form.abstract}
                onChange={(e) => updateField("abstract", e.target.value)}
                rows={6}
                className="w-full rounded-lg border px-4 py-3"
              />
            </div>

            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => updateField("featured", e.target.checked)}
                />
                Featured publication
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => updateField("published", e.target.checked)}
                />
                Published on website
              </label>
            </div>

            {message && (
              <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
                {message}
              </div>
            )}

            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-black px-5 py-3 font-medium text-white disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editingId === null
                    ? "Add Publication"
                    : "Update Publication"}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border px-5 py-3 font-medium"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">
            Publications ({publications.length})
          </h2>

          <div className="mt-6 space-y-4">
            {publications.length === 0 ? (
              <p className="text-gray-500">
                No publications have been added yet.
              </p>
            ) : (
              publications.map((publication) => (
                <article
                  key={publication.id}
                  className="rounded-xl border p-5"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="font-semibold">{publication.title}</h3>

                      {publication.authors && (
                        <p className="mt-1 text-sm text-gray-600">
                          {publication.authors}
                        </p>
                      )}

                      <p className="mt-2 text-sm text-gray-500">
                        {publication.journal ?? "Journal not specified"}
                        {publication.year ? ` · ${publication.year}` : ""}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2 text-xs">
                        <span className="rounded-full bg-gray-100 px-3 py-1">
                          {publication.published ? "Published" : "Hidden"}
                        </span>

                        {publication.featured && (
                          <span className="rounded-full bg-gray-100 px-3 py-1">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => startEdit(publication)}
                        className="rounded-lg border px-3 py-2 text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => togglePublished(publication)}
                        className="rounded-lg border px-3 py-2 text-sm"
                      >
                        {publication.published ? "Hide" : "Publish"}
                      </button>

                      <button
                        onClick={() => deletePublication(publication.id)}
                        className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
