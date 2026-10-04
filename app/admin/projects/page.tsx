"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Project = {
  id: number;
  title: string;
  description: string | null;
  role: string | null;
  status: string | null;
  year: number | null;
  funding: string | null;
  location: string | null;
  url: string | null;
  image_url: string | null;
  featured: boolean;
  published: boolean;
};

const emptyForm = {
  title: "",
  description: "",
  role: "",
  status: "",
  year: "",
  funding: "",
  location: "",
  url: "",
  image_url: "",
  featured: false,
  published: true,
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
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

    await loadProjects();
  }

  async function loadProjects() {
    setLoading(true);

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("year", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setProjects(data ?? []);
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

  function startEdit(project: Project) {
    setEditingId(project.id);

    setForm({
      title: project.title ?? "",
      description: project.description ?? "",
      role: project.role ?? "",
      status: project.status ?? "",
      year: project.year?.toString() ?? "",
      funding: project.funding ?? "",
      location: project.location ?? "",
      url: project.url ?? "",
      image_url: project.image_url ?? "",
      featured: project.featured,
      published: project.published,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSaving(true);

    const projectData = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      role: form.role.trim() || null,
      status: form.status.trim() || null,
      year: form.year ? Number(form.year) : null,
      funding: form.funding.trim() || null,
      location: form.location.trim() || null,
      url: form.url.trim() || null,
      image_url: form.image_url.trim() || null,
      featured: form.featured,
      published: form.published,
    };

    if (!projectData.title) {
      setError("Project title is required.");
      setSaving(false);
      return;
    }

    if (editingId) {
      const { error } = await supabase
        .from("projects")
        .update(projectData)
        .eq("id", editingId);

      if (error) {
        setError(error.message);
        setSaving(false);
        return;
      }
    } else {
      const { error } = await supabase
        .from("projects")
        .insert(projectData);

      if (error) {
        setError(error.message);
        setSaving(false);
        return;
      }
    }

    resetForm();
    await loadProjects();
    setSaving(false);
  }

  async function deleteProject(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) {
      setError(error.message);
      return;
    }

    await loadProjects();
  }

  async function togglePublished(project: Project) {
    const { error } = await supabase
      .from("projects")
      .update({ published: !project.published })
      .eq("id", project.id);

    if (error) {
      setError(error.message);
      return;
    }

    await loadProjects();
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading projects...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-xl font-bold">Projects</h1>
            <p className="text-sm text-gray-500">
              Manage your research projects
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
                {editingId ? "Edit Project" : "Add Project"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add or update a research project.
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
                Project Title *
              </label>

              <input
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                required
                className="mt-2 w-full rounded-lg border px-4 py-3"
                placeholder="AI-Driven Groundwater Monitoring Using Remote Sensing"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Description
              </label>

              <textarea
                value={form.description}
                onChange={(e) =>
                  updateField("description", e.target.value)
                }
                rows={5}
                className="mt-2 w-full rounded-lg border px-4 py-3"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium">Role</label>

                <input
                  value={form.role}
                  onChange={(e) => updateField("role", e.target.value)}
                  className="mt-2 w-full rounded-lg border px-4 py-3"
                  placeholder="Principal Investigator"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Status</label>

                <input
                  value={form.status}
                  onChange={(e) => updateField("status", e.target.value)}
                  className="mt-2 w-full rounded-lg border px-4 py-3"
                  placeholder="Ongoing"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Year</label>

                <input
                  type="number"
                  value={form.year}
                  onChange={(e) => updateField("year", e.target.value)}
                  className="mt-2 w-full rounded-lg border px-4 py-3"
                  placeholder="2026"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Funding</label>

                <input
                  value={form.funding}
                  onChange={(e) => updateField("funding", e.target.value)}
                  className="mt-2 w-full rounded-lg border px-4 py-3"
                  placeholder="1,000,000 ETB"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Location
                </label>

                <input
                  value={form.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  className="mt-2 w-full rounded-lg border px-4 py-3"
                  placeholder="Kulfo Watershed, Ethiopia"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Project URL
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

            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) =>
                    updateField("featured", e.target.checked)
                  }
                />
                Featured project
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
                  ? "Update Project"
                  : "Add Project"}
            </button>
          </form>
        </section>

        <section className="mt-8 rounded-2xl border bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold">
            Projects ({projects.length})
          </h2>

          <div className="mt-6 space-y-4">
            {projects.length === 0 ? (
              <p className="text-gray-500">
                No projects have been added yet.
              </p>
            ) : (
              projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-xl border p-5"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="font-semibold">
                        {project.title}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {[project.role, project.status, project.year]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.featured && (
                          <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
                            Featured
                          </span>
                        )}

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            project.published
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {project.published
                            ? "Published"
                            : "Hidden"}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(project)}
                        className="rounded-lg border px-3 py-2 text-sm"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => togglePublished(project)}
                        className="rounded-lg border px-3 py-2 text-sm"
                      >
                        {project.published ? "Hide" : "Publish"}
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteProject(project.id)}
                        className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {project.description && (
                    <p className="mt-4 text-sm leading-6 text-gray-600">
                      {project.description}
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