"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import type { Profile } from "@/components/types";

type SoftwareItem = {
  id: string;
  name: string;
  description: string | null;
  url?: string | null;
  github_url?: string | null;
  type?: string | null;
  year?: string | number | null;
};

export default function SoftwarePage() {
  const [software, setSoftware] = useState<SoftwareItem[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSoftware();
  }, []);

  async function loadSoftware() {
    setLoading(true);

    const [softwareResult, profileResult] = await Promise.all([
      supabase
        .from("software_data")
        .select("*")
        .order("created_at", { ascending: false }),

      supabase
        .from("profile")
        .select("*")
        .limit(1)
        .maybeSingle(),
    ]);

    if (softwareResult.error) {
      console.error("Error loading software:", softwareResult.error);
    }

    if (profileResult.error) {
      console.error("Error loading profile:", profileResult.error);
    }

    setSoftware(softwareResult.data || []);

    if (!profileResult.error) {
      setProfile(profileResult.data);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fafafc] via-white to-[#f7f7f9] text-slate-900 dark:from-[#09090b] dark:via-[#0c0c10] dark:to-[#09090b] dark:text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-200/40 via-pink-200/30 to-indigo-200/40 blur-[120px] dark:from-purple-900/30 dark:via-pink-900/20 dark:to-indigo-900/30" />

        <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-10 lg:px-10 lg:pt-14">
          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <div className="max-w-5xl">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-12 bg-gradient-to-r from-purple-600 to-pink-500" />

                <span className="text-[11px] font-bold uppercase tracking-[0.32em] text-purple-600 dark:text-purple-400">
                  Scientific Computing & Digital Tools
                </span>
              </div>

              <h1 className="text-3xl font-bold leading-[1] tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                <span className="underline decoration-purple-500/60 decoration-[2px] underline-offset-[8px]">
                  Software
                </span>{" "}
                <span>&</span>{" "}
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 bg-clip-text text-transparent underline decoration-purple-500/60 decoration-[2px] underline-offset-[8px]">
                  Research Tools
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-400 sm:text-lg sm:leading-8">
                Software, Python packages, research tools, datasets, and
                computational resources developed for scientific research and
                data-driven applications.
              </p>
            </div>

            {!loading && software.length > 0 && (
              <div className="text-right">
                <div className="text-5xl font-semibold tracking-tight tabular-nums">
                  {String(software.length).padStart(2, "0")}
                </div>

                <div className="mt-1 text-[10px] uppercase tracking-[0.28em] text-slate-400">
                  Tools
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        {loading ? (
          <div className="grid gap-7 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-64 animate-pulse rounded-[28px] bg-slate-100 dark:bg-slate-900"
              />
            ))}
          </div>
        ) : software.length === 0 ? (
          <div className="rounded-[32px] border border-slate-200 bg-white p-20 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-xl font-semibold">
              No software or tools available yet
            </h3>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Software and research tools will appear here once they are added.
            </p>
          </div>
        ) : (
          <div className="grid gap-7 md:grid-cols-2">
            {software.map((item, index) => (
              <article
                key={item.id}
                className="group rounded-[28px] border border-slate-200/80 bg-white p-7 shadow-[0_20px_60px_-35px_rgba(76,29,149,0.35)] transition hover:-translate-y-1 hover:shadow-[0_30px_70px_-35px_rgba(76,29,149,0.45)] dark:border-slate-800 dark:bg-slate-900 sm:p-8"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-purple-600 dark:text-purple-400">
                    Tool {String(index + 1).padStart(2, "0")}
                  </span>

                  {item.year && (
                    <span className="text-xs text-slate-400">
                      {item.year}
                    </span>
                  )}
                </div>

                <h2 className="text-2xl font-bold">{item.name}</h2>

                {item.type && (
                  <div className="mt-3">
                    <span className="rounded-full bg-purple-50 px-3 py-1.5 text-xs font-medium text-purple-700 dark:bg-purple-950/40 dark:text-purple-300">
                      {item.type}
                    </span>
                  </div>
                )}

                {item.description && (
                  <p className="mt-6 whitespace-pre-line text-justify text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {item.description}
                  </p>
                )}

                {(item.url || item.github_url) && (
                  <div className="mt-7 flex flex-wrap gap-3">
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90"
                      >
                        Visit Tool →
                      </a>
                    )}

                    {item.github_url && (
                      <a
                        href={item.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-purple-300 hover:text-purple-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-purple-700 dark:hover:text-purple-300"
                      >
                        GitHub →
                      </a>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>

      <Footer profile={profile} />
    </main>
  );
}