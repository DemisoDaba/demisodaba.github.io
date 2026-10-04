"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Profile = {
  id: number;
  name: string;
  title: string | null;
  affiliation: string | null;
  bio: string | null;
  research_interests: string | null;
  email: string | null;
  location: string | null;
  profile_image_url: string | null;
  orcid: string | null;
  google_scholar: string | null;
  researchgate: string | null;
  github: string | null;
  linkedin: string | null;
  cv_url: string | null;
};

const emptyForm = {
  name: "",
  title: "",
  affiliation: "",
  bio: "",
  research_interests: "",
  email: "",
  location: "",
  profile_image_url: "",
  orcid: "",
  google_scholar: "",
  researchgate: "",
  github: "",
  linkedin: "",
  cv_url: "",
};

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
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

    await loadProfile();
  }

  async function loadProfile() {
    setLoading(true);

    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (error) {
      setError(error.message);
    } else if (data) {
      setProfile(data);

      setForm({
        name: data.name ?? "",
        title: data.title ?? "",
        affiliation: data.affiliation ?? "",
        bio: data.bio ?? "",
        research_interests: data.research_interests ?? "",
        email: data.email ?? "",
        location: data.location ?? "",
        profile_image_url: data.profile_image_url ?? "",
        orcid: data.orcid ?? "",
        google_scholar: data.google_scholar ?? "",
        researchgate: data.researchgate ?? "",
        github: data.github ?? "",
        linkedin: data.linkedin ?? "",
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

    const profileData = {
      name: form.name.trim(),
      title: form.title.trim() || null,
      affiliation: form.affiliation.trim() || null,
      bio: form.bio.trim() || null,
      research_interests: form.research_interests.trim() || null,
      email: form.email.trim() || null,
      location: form.location.trim() || null,
      profile_image_url: form.profile_image_url.trim() || null,
      orcid: form.orcid.trim() || null,
      google_scholar: form.google_scholar.trim() || null,
      researchgate: form.researchgate.trim() || null,
      github: form.github.trim() || null,
      linkedin: form.linkedin.trim() || null,
      cv_url: form.cv_url.trim() || null,
      updated_at: new Date().toISOString(),
    };

    let result;

    if (profile) {
      result = await supabase
        .from("profile")
        .update(profileData)
        .eq("id", profile.id);
    } else {
      result = await supabase
        .from("profile")
        .insert(profileData);
    }

    if (result.error) {
      setError(result.error.message);
      setSaving(false);
      return;
    }

    await loadProfile();
    setSaving(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading profile...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-xl font-bold">Profile</h1>
            <p className="text-sm text-gray-500">
              Manage your academic profile
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
          <h2 className="text-xl font-bold">Academic Profile</h2>

          <p className="mt-1 text-sm text-gray-500">
            Update the information displayed on your website.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium">
                  Professional Title
                </label>

                <input
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  className="mt-2 w-full rounded-lg border px-4 py-3"
                  placeholder="Lecturer | Hydrology, Climate Science & AI"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Affiliation
                </label>

                <input
                  value={form.affiliation}
                  onChange={(e) =>
                    updateField("affiliation", e.target.value)
                  }
                  className="mt-2 w-full rounded-lg border px-4 py-3"
                  placeholder="Arba Minch University"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Email
                </label>

                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="mt-2 w-full rounded-lg border px-4 py-3"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Location
                </label>

                <input
                  value={form.location}
                  onChange={(e) =>
                    updateField("location", e.target.value)
                  }
                  className="mt-2 w-full rounded-lg border px-4 py-3"
                  placeholder="Arba Minch, Ethiopia"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">
                Biography
              </label>

              <textarea
                value={form.bio}
                onChange={(e) => updateField("bio", e.target.value)}
                rows={7}
                className="mt-2 w-full rounded-lg border px-4 py-3"
                placeholder="Write your academic biography..."
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
                rows={4}
                className="mt-2 w-full rounded-lg border px-4 py-3"
                placeholder="Hydrology, climate extremes, remote sensing, AI/ML..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Profile Image URL
              </label>

              <input
                type="url"
                value={form.profile_image_url}
                onChange={(e) =>
                  updateField("profile_image_url", e.target.value)
                }
                className="mt-2 w-full rounded-lg border px-4 py-3"
                placeholder="https://..."
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                Academic & Professional Links
              </h3>

              <div className="mt-4 grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium">
                    ORCID
                  </label>

                  <input
                    type="url"
                    value={form.orcid}
                    onChange={(e) =>
                      updateField("orcid", e.target.value)
                    }
                    className="mt-2 w-full rounded-lg border px-4 py-3"
                    placeholder="https://orcid.org/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Google Scholar
                  </label>

                  <input
                    type="url"
                    value={form.google_scholar}
                    onChange={(e) =>
                      updateField("google_scholar", e.target.value)
                    }
                    className="mt-2 w-full rounded-lg border px-4 py-3"
                    placeholder="https://scholar.google.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    ResearchGate
                  </label>

                  <input
                    type="url"
                    value={form.researchgate}
                    onChange={(e) =>
                      updateField("researchgate", e.target.value)
                    }
                    className="mt-2 w-full rounded-lg border px-4 py-3"
                    placeholder="https://www.researchgate.net/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    GitHub
                  </label>

                  <input
                    type="url"
                    value={form.github}
                    onChange={(e) =>
                      updateField("github", e.target.value)
                    }
                    className="mt-2 w-full rounded-lg border px-4 py-3"
                    placeholder="https://github.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    LinkedIn
                  </label>

                  <input
                    type="url"
                    value={form.linkedin}
                    onChange={(e) =>
                      updateField("linkedin", e.target.value)
                    }
                    className="mt-2 w-full rounded-lg border px-4 py-3"
                    placeholder="https://www.linkedin.com/in/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    CV URL
                  </label>

                  <input
                    type="url"
                    value={form.cv_url}
                    onChange={(e) =>
                      updateField("cv_url", e.target.value)
                    }
                    className="mt-2 w-full rounded-lg border px-4 py-3"
                    placeholder="https://..."
                  />
                </div>
              </div>
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
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}