"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type SoftwareData = {
  id: number;
  title: string;
  description: string | null;
  type: string | null;
  category: string | null;
  url: string | null;
  github_url: string | null;
  documentation_url: string | null;
  image_url: string | null;
  year: number | null;
  featured: boolean;
  published: boolean;
};

const emptyForm = {
  title: "",
  description: "",
  type: "",
  category: "",
  url: "",
  github_url: "",
  documentation_url: "",
  image_url: "",
  year: "",
  featured: false,
  published: true,
};

export default function SoftwareAdminPage() {
  const [items, setItems] = useState<SoftwareData[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/admin/login";
      return;
    }

    await loadItems();
    setLoading(false);
  }

  async function loadItems() {
    const { data, error } = await supabase
      .from("software_data")
      .select("*")
      .order("year", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setItems(data || []);
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function startEdit(item: SoftwareData) {
    setEditingId(item.id);
    setForm({
      title: item.title || "",
      description: item.description || "",
      type: item.type || "",
      category: item.category || "",
      url: item.url || "",
      github_url: item.github_url || "",
      documentation_url: item.documentation_url || "",
      image_url: item.image_url || "",
      year: item.year?.toString() || "",
      featured: item.featured,
      published: item.published,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function saveItem(e: React.FormEvent) {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Title is required.");
      return;
    }

    setSaving(true);

    const payload = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      type: form.type.trim() || null,
      category: form.category.trim() || null,
      url: form.url.trim() || null,
      github_url: form.github_url.trim() || null,
      documentation_url: form.documentation_url.trim() || null,
      image_url: form.image_url.trim() || null,
      year: form.year ? Number(form.year) : null,
      featured: form.featured,
      published: form.published,
    };

    const { error } = editingId
      ? await supabase
          .from("software_data")
          .update(payload)
          .eq("id", editingId)
      : await supabase.from("software_data").insert(payload);

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    resetForm();
    await loadItems();
  }

  async function deleteItem(id: number) {
    if (!confirm("Delete this item?")) return;

    const { error } = await supabase
      .from("software_data")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    await loadItems();
  }

  async function togglePublished(item: SoftwareData) {
    const { error } = await supabase
      .from("software_data")
      .update({ published: !item.published })
      .eq("id", item.id);

    if (error) {
      alert(error.message);
      return;
    }

    await loadItems();
  }

  if (loading) {
    return <main className="p-8">Loading...</main>;
  }

  return (
    <main className="mx-auto max-w-6xl p-8">
      <div className="mb-8">
        <a href="/admin" className="text-sm text-gray-500 hover:text-gray-900">
          ← Back to Dashboard
        </a>

        <h1 className="mt-4 text-3xl font-bold">Software & Data</h1>
        <p className="mt-2 text-gray-600">
          Manage software, research tools, packages, datasets, and related
          resources.
        </p>
      </div>

      <form
        onSubmit={saveItem}
        className="mb-10 rounded-2xl border bg-white p-6 shadow-sm"
      >
        <h2 className="mb-5 text-xl font-semibold">
          {editingId ? "Edit Item" : "Add Software or Data"}
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Title *</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full rounded-lg border px-3 py-2"
              placeholder="e.g. kulfogw"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Type</label>
            <input
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full rounded-lg border px-3 py-2"
              placeholder="Software, Dataset, Tool..."
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Category</label>
            <input
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
              className="w-full rounded-lg border px-3 py-2"
              placeholder="Python, GIS, Hydrology..."
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Year</label>
            <input
              type="number"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows={4}
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Main URL
            </label>
            <input
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              className="w-full rounded-lg border px-3 py-2"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              GitHub URL
            </label>
            <input
              value={form.github_url}
              onChange={(e) =>
                setForm({ ...form, github_url: e.target.value })
              }
              className="w-full rounded-lg border px-3 py-2"
              placeholder="https://github.com/..."
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Documentation URL
            </label>
            <input
              value={form.documentation_url}
              onChange={(e) =>
                setForm({
                  ...form,
                  documentation_url: e.target.value,
                })
              }
              className="w-full rounded-lg border px-3 py-2"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Image URL
            </label>
            <input
              value={form.image_url}
              onChange={(e) =>
                setForm({ ...form, image_url: e.target.value })
              }
              className="w-full rounded-lg border px-3 py-2"
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-5">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) =>
                setForm({ ...form, featured: e.target.checked })
              }
            />
            Featured
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) =>
                setForm({ ...form, published: e.target.checked })
              }
            />
            Published
          </label>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-black px-5 py-2 text-white disabled:opacity-50"
          >
            {saving ? "Saving..." : editingId ? "Update Item" : "Add Item"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg border px-5 py-2"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <section>
        <h2 className="mb-4 text-xl font-semibold">
          Existing Items ({items.length})
        </h2>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold">{item.title}</h3>

                    {item.type && (
                      <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">
                        {item.type}
                      </span>
                    )}

                    {item.featured && (
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">
                        Featured
                      </span>
                    )}

                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        item.published
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.published ? "Published" : "Hidden"}
                    </span>
                  </div>

                  {item.category && (
                    <p className="mt-1 text-sm text-gray-500">
                      {item.category}
                      {item.year ? ` · ${item.year}` : ""}
                    </p>
                  )}

                  {item.description && (
                    <p className="mt-3 max-w-3xl text-sm text-gray-700">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => startEdit(item)}
                    className="rounded-lg border px-3 py-2 text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => togglePublished(item)}
                    className="rounded-lg border px-3 py-2 text-sm"
                  >
                    {item.published ? "Hide" : "Publish"}
                  </button>

                  <button
                    onClick={() => deleteItem(item.id)}
                    className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <div className="rounded-xl border border-dashed p-8 text-center text-gray-500">
              No software or data items yet.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
