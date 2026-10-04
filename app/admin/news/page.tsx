"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type News = {
  id: number;
  title: string;
  excerpt: string | null;
  content: string | null;
  date: string;
  category: string | null;
  image_url: string | null;
  url: string | null;
  featured: boolean;
  published: boolean;
};

const emptyForm = {
  title: "",
  excerpt: "",
  content: "",
  date: new Date().toISOString().slice(0, 10),
  category: "",
  image_url: "",
  url: "",
  featured: false,
  published: true,
};

export default function AdminNewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    checkAuthAndLoad();
  }, []);

  async function checkAuthAndLoad() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/admin/login";
      return;
    }

    await loadNews();
  }

  async function loadNews() {
    setLoading(true);

    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("date", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setNews(data ?? []);
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

  function startEdit(item: News) {
    setEditingId(item.id);

    setForm({
      title: item.title ?? "",
      excerpt: item.excerpt ?? "",
      content: item.content ?? "",
      date: item.date ?? "",
      category: item.category ?? "",
      image_url: item.image_url ?? "",
      url: item.url ?? "",
      featured: item.featured,
      published: item.published,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);

    setForm({
      ...emptyForm,
      date: new Date().toISOString().slice(0, 10),
    });

    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSaving(true);

    if (!form.title.trim()) {
      setError("News title is required.");
      setSaving(false);
      return;
    }

    const newsData = {
      title: form.title.trim(),
      excerpt: form.excerpt.trim() || null,
      content: form.content.trim() || null,
      date: form.date || new Date().toISOString().slice(0, 10),
      category: form.category.trim() || null,
      image_url: form.image_url.trim() || null,
      url: form.url.trim() || null,
      featured: form.featured,
      published: form.published,
    };

    if (editingId) {
      const { error } = await supabase
        .from("news")
        .update(newsData)
        .eq("id", editingId);

      if (error) {
        setError(error.message);
        setSaving(false);
        return;
      }
    } else {
      const { error } = await supabase
        .from("news")
        .insert(newsData);

      if (error) {
        setError(error.message);
        setSaving(false);
        return;
      }
    }

    resetForm();
    await loadNews();
    setSaving(false);
  }

  async function deleteNews(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this news item?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("news")
      .delete()
      .eq("id", id);

    if (error) {
      setError(error.message);
      return;
    }

    await loadNews();
  }

  async function togglePublished(item: News) {
    const { error } = await supabase
      .from("news")
      .update({ published: !item.published })
      .eq("id", item.id);

    if (error) {
      setError(error.message);
      return;
    }

    await loadNews();
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading news...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-xl font-bold">News</h1>
            <p className="text-sm text-gray-500">
              Manage announcements and updates
            </p>
          </div>

          <Link
            href="/admin"
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <section className="rounded-2xl border bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">
                {editingId ? "Edit News" : "Add News"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Publish research updates, announcements, and academic news.
              </p>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border px-4 py-2 text-sm"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label className="block text-sm font-medium">
                Title *
              </label>

              <input
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                required
                className="mt-2 w-full rounded-lg border px-4 py-3"
                placeholder="New publication accepted..."
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium">
                  Date
                </label>

                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => updateField("date", e.target.value)}
                  className="mt-2 w-full rounded-lg border px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Category
                </label>

                <input
                  value={form.category}
                  onChange={(e) =>
                    updateField("category", e.target.value)
                  }
                  className="mt-2 w-full rounded-lg border px-4 py-3"
                  placeholder="Publication, Research, Conference..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">
                Short Excerpt
              </label>

              <textarea
                value={form.excerpt}
                onChange={(e) =>
                  updateField("excerpt", e.target.value)
                }
                rows={3}
                className="mt-2 w-full rounded-lg border px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Content
              </label>

              <textarea
                value={form.content}
                onChange={(e) =>
                  updateField("content", e.target.value)
                }
                rows={8}
                className="mt-2 w-full rounded-lg border px-4 py-3"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium">
                  Image URL
                </label>

                <input
                  type="url"
                  value={form.image_url}
                  onChange={(e) =>
                    updateField("image_url", e.target.value)
                  }
                  className="mt-2 w-full rounded-lg border px-4 py-3"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  External URL
                </label>

                <input
                  type="url"
                  value={form.url}
                  onChange={(e) => updateField("url", e.target.value)}
                  className="mt-2 w-full rounded-lg border px-4 py-3"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) =>
                    updateField("featured", e.target.checked)
                  }
                />
                Featured news
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) =>
                    updateField("published", e.target.checked)
                  }
                />
                Published
              </label>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-black px-6 py-3 font-medium text-white disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : editingId
                  ? "Update News"
                  : "Publish News"}
            </button>
          </form>
        </section>

        <section className="mt-8 rounded-2xl border bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold">
            News ({news.length})
          </h2>

          <div className="mt-6 space-y-4">
            {news.length === 0 ? (
              <p className="text-gray-500">
                No news items have been added yet.
              </p>
            ) : (
              news.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border p-5"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="font-semibold">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {[item.category, item.date]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.featured && (
                          <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
                            Featured
                          </span>
                        )}

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            item.published
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {item.published
                            ? "Published"
                            : "Hidden"}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        className="rounded-lg border px-3 py-2 text-sm"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => togglePublished(item)}
                        className="rounded-lg border px-3 py-2 text-sm"
                      >
                        {item.published ? "Hide" : "Publish"}
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteNews(item.id)}
                        className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {item.excerpt && (
                    <p className="mt-4 text-sm leading-6 text-gray-600">
                      {item.excerpt}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
