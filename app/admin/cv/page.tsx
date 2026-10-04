"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type CV = {
  id: number;
  name: string;
  title: string | null;
  affiliation: string | null;
  summary: string | null;
  education: string | null;
  experience: string | null;
  research_interests: string | null;
  skills: string | null;
  awards: string | null;
  memberships: string | null;
  languages: string | null;
  publications_summary: string | null;
  cv_url: string | null;
};

const emptyForm = {
  name: "",
  title: "",
  affiliation: "",
  summary: "",
  education: "",
  experience: "",
  research_interests: "",
  skills: "",
  awards: "",
  memberships: "",
  languages: "",
  publications_summary: "",
  cv_url: "",
};

export default function AdminCVPage() {
  const [cv, setCv] = useState<CV | null>(null);
  const [form, setForm] = useState(emptyForm);
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

    await loadCV();
  }

  async function loadCV() {
    setLoading(true);

    const { data, error } = await supabase
      .from("cv")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (error) {
      setError(error.message);
    } else if (data) {
      setCv(data);

      setForm({
        name: data.name ?? "",
        title: data.title ?? "",
        affiliation: data.affiliation ?? "",
        summary: data.summary ?? "",
        education: data.education ?? "",
        experience: data.experience ?? "",
        research_interests: data.research_interests ?? "",
        skills: data.skills ?? "",
        awards: data.awards ?? "",
        memberships: data.memberships ?? "",
        languages: data.languages ?? "",
        publications_summary: data.publications_summary ?? "",
        cv_url: data.cv_url ?? "",
      });
    }

    setLoading(false);
  }

  function updateField(field: keyof typeof emptyForm, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSaving(true);

    if (!form.name.trim()) {
      setError("Name is required.");
      setSaving(false);
      return;
    }

    const cvData = {
      name: form.name.trim(),
      title: form.title.trim() || null,
      affiliation: form.affiliation.trim() || null,
      summary: form.summary.trim() || null,
      education: form.education.trim() || null,
      experience: form.experience.trim() || null,
      research_interests: form.research_interests.trim() || null,
      skills: form.skills.trim() || null,
      awards: form.awards.trim() || null,
      memberships: form.memberships.trim() || null,
      languages: form.languages.trim() || null,
      publications_summary: form.publications_summary.trim() || null,
      cv_url: form.cv_url.trim() || null,
      updated_at: new Date().toISOString(),
    };

    let result;

    if (cv) {
      result = await supabase
        .from("cv")
        .update(cvData)
        .eq("id", cv.id);
    } else {
      result = await supabase
        .from("cv")
        .insert(cvData);
    }

    if (result.error) {
      setError(result.error.message);
      setSaving(false);
      return;
    }

    await loadCV();
    setSaving(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading CV...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-xl font-bold">CV</h1>
            <p className="text-sm text-gray-500">
              Manage your academic CV
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

      <div className="mx-auto max-w-5xl px-6 py-10">
        <section className="rounded-2xl border bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold">Academic CV</h2>

          <p className="mt-1 text-sm text-gray-500">
            Update the information used on your CV page.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium">
                  Name *
                </label>

                <input
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  required
                  className="mt-2 w-full rounded-lg border px-4 py-3"
                  placeholder="Demiso Daba"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Professional Title
                </label>

                <input
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  className="mt-2 w-full rounded-lg border px-4 py-3"
                  placeholder="Lecturer"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium">
                  Affiliation
                </label>

                <input
                  value={form.affiliation}
                  onChange={(e) =>
                    updateField("affiliation", e.target.value)
                  }
                  className="mt-2 w-full rounded-lg border px-4 py-3"
                  placeholder="Arba Minch Water Technology Institute, Arba Minch University"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">
                Professional Summary
              </label>

              <textarea
                value={form.summary}
                onChange={(e) => updateField("summary", e.target.value)}
                rows={6}
                className="mt-2 w-full rounded-lg border px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Education
              </label>

              <textarea
                value={form.education}
                onChange={(e) => updateField("education", e.target.value)}
                rows={7}
                className="mt-2 w-full rounded-lg border px-4 py-3"
                placeholder="BSc..., MSc..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Experience
              </label>

              <textarea
                value={form.experience}
                onChange={(e) =>
                  updateField("experience", e.target.value)
                }
                rows={8}
                className="mt-2 w-full rounded-lg border px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Research Interests
              </label>

              <textarea
                value={form.research_interests}
                onChange={(e) =>
                  updateField("research_interests", e.target.value)
                }
                rows={5}
                className="mt-2 w-full rounded-lg border px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Technical Skills
              </label>

              <textarea
                value={form.skills}
                onChange={(e) => updateField("skills", e.target.value)}
                rows={5}
                className="mt-2 w-full rounded-lg border px-4 py-3"
                placeholder="Python, Google Earth Engine, CMIP6, AI/ML..."
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium">
                  Awards & Achievements
                </label>

                <textarea
                  value={form.awards}
                  onChange={(e) => updateField("awards", e.target.value)}
                  rows={5}
                  className="mt-2 w-full rounded-lg border px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Memberships
                </label>

                <textarea
                  value={form.memberships}
                  onChange={(e) =>
                    updateField("memberships", e.target.value)
                  }
                  rows={5}
                  className="mt-2 w-full rounded-lg border px-4 py-3"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">
                Languages
              </label>

              <textarea
                value={form.languages}
                onChange={(e) => updateField("languages", e.target.value)}
                rows={3}
                className="mt-2 w-full rounded-lg border px-4 py-3"
                placeholder="English, Amharic..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Publications Summary
              </label>

              <textarea
                value={form.publications_summary}
                onChange={(e) =>
                  updateField("publications_summary", e.target.value)
                }
                rows={4}
                className="mt-2 w-full rounded-lg border px-4 py-3"
                placeholder="Brief publication record or metrics..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                CV Download URL
              </label>

              <input
                type="url"
                value={form.cv_url}
                onChange={(e) => updateField("cv_url", e.target.value)}
                className="mt-2 w-full rounded-lg border px-4 py-3"
                placeholder="https://..."
              />
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
              {saving ? "Saving..." : "Save CV"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
