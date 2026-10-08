"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const sections = [
  {
    title: "Publications",
    href: "/admin/publications",
    description: "Manage publications and research papers.",
  },
  {
    title: "Projects",
    href: "/admin/projects",
    description: "Manage research projects and funding.",
  },
  {
    title: "CV",
    href: "/admin/cv",
    description: "Manage your academic CV information.",
  },
  {
    title: "Profile",
    href: "/admin/profile",
    description: "Manage your public profile and links.",
  },
  {
    title: "News",
    href: "/admin/news",
    description: "Manage news, updates, and announcements.",
  },
  {
    title: "Software & Data",
    href: "/admin/software",
    description: "Manage software, datasets, and tools.",
  },
  {
    title: "Teaching / Courses",
    href: "/admin/teaching",
    description:
      "Manage courses, chapters, lessons, objectives, and YouTube videos.",
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.replace("/admin/login");
        return;
      }

      setLoading(false);
    }

    checkAuth();
  }, [router]);

  async function signOut() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white text-black">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black">
      {/* HEADER */}
      <header className="border-b border-black/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Admin Dashboard
            </h1>

            <p className="mt-1 text-sm text-black/50">
              Manage your academic website
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm font-medium hover:opacity-60"
            >
              View Site
            </Link>

            <button
              type="button"
              onClick={signOut}
              className="rounded-full border border-black/20 px-4 py-2 text-sm font-medium transition hover:bg-black hover:text-white"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* ADMIN SECTIONS */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-2xl border border-black/10 p-6 transition hover:border-black/30 hover:shadow-sm"
            >
              <h2 className="text-lg font-semibold">
                {section.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-black/50">
                {section.description}
              </p>

              <p className="mt-6 text-sm font-medium group-hover:underline">
                Manage →
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}