"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Experience = {
  id: string;
  title: string;
  organization: string;
  location: string | null;
  period: string | null;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  created_at: string;
};

const emptyForm = {
  title: "",
  organization: "",
  location: "",
  period: "",
  description: "",
  image_url: "",
  sort_order: 0,
};

export default function ExperienceAdminPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [form, setForm] = useState(emptyForm);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function loadExperiences() {
    setLoading(true);

    const { data, error } = await supabase
      .from("experience")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(error.message);
    } else {
      setExperiences(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadExperiences();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: name === "sort_order" ? Number(value) : value,
    }));
  }

  function startEdit(experience: Experience) {
    setEditingId(experience.id);

    setForm({
      title: experience.title,
      organization: experience.organization,
      location: experience.location || "",
      period: experience.period || "",
      description: experience.description || "",
      image_url: experience.image_url || "",
      sort_order: experience.sort_order || 0,
    });

    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setMessage("");
  }

  async function saveExperience(e: React.FormEvent) {
    e.preventDefault();

    if (!form.title.trim() || !form.organization.trim()) {
      setMessage("Title and organization are required.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const payload = {
        title: form.title.trim(),
        organization: form.organization.trim(),
        location: form.location.trim() || null,
        period: form.period.trim() || null,
        description: form.description.trim() || null,
        image_url: form.image_url.trim() || null,
        sort_order: Number(form.sort_order) || 0,
      };

      if (editingId) {
        const { error } = await supabase
          .from("experience")
          .update(payload)
          .eq("id", editingId);

        if (error) {
          throw new Error(error.message);
        }

        setMessage("Experience updated successfully.");
      } else {
        const { error } = await supabase
          .from("experience")
          .insert(payload);

        if (error) {
          throw new Error(error.message);
        }

        setMessage("Experience added successfully.");
      }

      setEditingId(null);
      setForm(emptyForm);

      await loadExperiences();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteExperience(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this experience?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("experience")
      .delete()
      .eq("id", id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Experience deleted successfully.");

    await loadExperiences();
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 text-gray-900 dark:bg-gray-950 dark:text-white">
      <div className="mx-auto max-w-5xl">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Professional Experience
          </h1>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Add, edit, and manage your professional experience.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={saveExperience}
          className="mb-10 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <h2 className="mb-6 text-xl font-semibold">
            {editingId ? "Edit Experience" : "Add Experience"}
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">

            {/* TITLE */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Title *
              </label>

              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="MSc Research Intern"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-purple-500 dark:border-gray-700 dark:bg-gray-800"
                required
              />
            </div>

            {/* ORGANIZATION */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Organization *
              </label>

              <input
                name="organization"
                value={form.organization}
                onChange={handleChange}
                placeholder="KU Leuven"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-purple-500 dark:border-gray-700 dark:bg-gray-800"
                required
              />
            </div>

            {/* LOCATION */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Location
              </label>

              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Leuven, Belgium"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-purple-500 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>

            {/* PERIOD */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Period
              </label>

              <input
                name="period"
                value={form.period}
                onChange={handleChange}
                placeholder="2024 – 2025"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-purple-500 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium">
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={5}
                placeholder="Describe your responsibilities, activities, fieldwork, research, achievements, etc."
                className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-purple-500 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>

            {/* IMAGE URL */}
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium">
                Experience Image URL
              </label>

              <input
                type="url"
                name="image_url"
                value={form.image_url}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-purple-500 dark:border-gray-700 dark:bg-gray-800"
              />

              <p className="mt-2 text-xs text-gray-500">
                Paste a direct URL to an image. The image will be displayed
                on the public Professional Experience page.
              </p>
            </div>

            {/* DISPLAY ORDER */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Display Order
              </label>

              <input
                type="number"
                name="sort_order"
                value={form.sort_order}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-purple-500 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>
          </div>

          {/* MESSAGE */}
          {message && (
            <div className="mt-5 rounded-lg bg-gray-100 px-4 py-3 text-sm dark:bg-gray-800">
              {message}
            </div>
          )}

          {/* BUTTONS */}
          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-purple-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-purple-700 disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : editingId
                ? "Update Experience"
                : "Add Experience"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* EXISTING EXPERIENCE */}
        <section>
          <h2 className="mb-5 text-xl font-semibold">
            Existing Experience
          </h2>

          {loading ? (
            <p className="text-sm text-gray-500">
              Loading...
            </p>
          ) : experiences.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900">
              No professional experience added yet.
            </div>
          ) : (
            <div className="space-y-4">
              {experiences.map((experience) => (
                <article
                  key={experience.id}
                  className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold">
                        {experience.title}
                      </h3>

                      <p className="mt-1 text-sm font-medium text-purple-600 dark:text-purple-400">
                        {experience.organization}
                      </p>

                      {(experience.location ||
                        experience.period) && (
                        <p className="mt-1 text-sm text-gray-500">
                          {[
                            experience.location,
                            experience.period,
                          ]
                            .filter(Boolean)
                            .join(" • ")}
                        </p>
                      )}

                      {experience.description && (
                        <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                          {experience.description}
                        </p>
                      )}

                      {experience.image_url && (
                        <p className="mt-2 truncate text-xs text-gray-400">
                          Image URL: {experience.image_url}
                        </p>
                      )}
                    </div>

                    {/* ACTIONS */}
                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(experience)}
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteExperience(experience.id)}
                        className="rounded-lg border border-red-300 px-3 py-2 text-sm text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
                      >
                        Delete
                      </button>
                    </div>

                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}