"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Profile } from "@/components/types";

type Experience = {
  id: string;
  title: string;
  organization: string;
  location: string | null;
  period: string | null;
  description: string | null;
  image_url: string | null;
  sort_order: number;
};

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [selected, setSelected] = useState<Experience | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [experienceResult, profileResult] = await Promise.all([
        supabase
          .from("experience")
          .select(
            "id, title, organization, location, period, description, image_url, sort_order"
          )
          .order("sort_order", { ascending: true })
          .order("created_at", { ascending: false }),

        supabase
          .from("profile")
          .select("*")
          .limit(1)
          .maybeSingle(),
      ]);

      if (!experienceResult.error && experienceResult.data) {
        setExperiences(experienceResult.data);
        setSelected(experienceResult.data[0] ?? null);
      }

      if (!profileResult.error) {
        setProfile(profileResult.data);
      }

      setLoading(false);
    }

    loadData();
  }, []);

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
                  Career & Research
                </span>
              </div>

              <h1 className="whitespace-nowrap text-3xl font-bold leading-[1] tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                <span className="underline decoration-purple-500/60 decoration-[2px] underline-offset-[8px]">
                  Professional
                </span>{" "}
                <span>&</span>{" "}
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 bg-clip-text text-transparent underline decoration-purple-500/60 decoration-[2px] underline-offset-[8px]">
                  Research Experience
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-400 sm:text-lg sm:leading-8">
                Academic, professional, research, and international experience
                across water resources, climate science, remote sensing,
                computational research, and software development.
              </p>
            </div>

            {!loading && experiences.length > 0 && (
              <div className="flex flex-row items-center gap-8 md:gap-10">
                <div className="text-right">
                  <div className="text-5xl font-semibold tracking-tight tabular-nums">
                    {String(experiences.length).padStart(2, "0")}
                  </div>

                  <div className="mt-1 text-[10px] uppercase tracking-[0.28em] text-slate-400">
                    Experiences
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        {/* LOADING */}
        {loading ? (
          <div className="grid gap-10 lg:grid-cols-[360px_minmax(0,1fr)]">
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-24 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-900"
                />
              ))}
            </div>

            <div className="h-[600px] animate-pulse rounded-[32px] bg-slate-100 dark:bg-slate-900" />
          </div>
        ) : experiences.length === 0 ? (
          /* EMPTY STATE */
          <div className="rounded-[32px] border border-slate-200 bg-white p-20 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 text-2xl dark:from-purple-950 dark:to-slate-800">
              💼
            </div>

            <h3 className="text-xl font-semibold">
              No professional experience yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Professional and research experience will appear here once
              added through the admin panel.
            </p>
          </div>
        ) : (
          /* EXPERIENCE LAYOUT */
          <div className="grid gap-10 lg:grid-cols-[360px_minmax(0,1fr)]">
            {/* LEFT EXPERIENCE LIST */}
            <aside className="lg:sticky lg:top-24 lg:h-fit">
              <div className="mb-5 flex items-center justify-between px-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">
                  Experience
                </span>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  {experiences.length}
                </span>
              </div>

              <div className="max-h-[70vh] space-y-3 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
                {experiences.map((item, index) => {
                  const active = selected?.id === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelected(item)}
                      className={`group relative flex w-full gap-4 overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ${
                        active
                          ? "border-purple-200 bg-gradient-to-r from-purple-50/80 via-white to-white shadow-[0_8px_30px_-12px_rgba(139,92,246,0.35)] dark:border-purple-800/60 dark:from-purple-950/40 dark:via-slate-900 dark:to-slate-900"
                          : "border-slate-200/80 bg-white/80 hover:border-slate-300 hover:bg-white dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-slate-700 dark:hover:bg-slate-900"
                      }`}
                    >
                      {/* ACTIVE LINE */}
                      <span
                        className={`absolute bottom-0 left-0 top-0 w-[3px] transition-all duration-300 ${
                          active
                            ? "bg-gradient-to-b from-purple-500 via-pink-500 to-indigo-500"
                            : "bg-transparent"
                        }`}
                      />

                      {/* NUMBER */}
                      <div
                        className={`w-6 shrink-0 pt-1 text-[10px] font-bold tabular-nums transition-colors ${
                          active
                            ? "text-purple-600 dark:text-purple-400"
                            : "text-slate-300 group-hover:text-slate-400 dark:text-slate-600"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      {/* IMAGE */}
                      <div className="h-[76px] w-[92px] shrink-0 overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200/60 dark:bg-slate-800 dark:ring-slate-700/60">
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 text-lg font-bold text-purple-500 dark:from-purple-950 dark:via-pink-950 dark:to-slate-800">
                            D
                          </div>
                        )}
                      </div>

                      {/* LIST INFORMATION */}
                      <div className="min-w-0 flex-1">
                        <span
                          className={`text-[10px] font-medium uppercase tracking-wider ${
                            active
                              ? "text-purple-600 dark:text-purple-400"
                              : "text-slate-400"
                          }`}
                        >
                          {item.period || "Experience"}
                        </span>

                        <h3
                          className={`mt-1.5 line-clamp-2 text-[13.5px] font-semibold leading-5 transition-colors ${
                            active
                              ? "text-purple-700 dark:text-purple-300"
                              : "text-slate-800 group-hover:text-slate-900 dark:text-slate-200 dark:group-hover:text-white"
                          }`}
                        >
                          {item.title}
                        </h3>

                        <p className="mt-1 truncate text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                          {item.organization}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 rounded-2xl border border-dashed border-slate-200 p-4 text-center dark:border-slate-800">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                  Professional journey
                </p>
              </div>
            </aside>

            {/* RIGHT SELECTED EXPERIENCE */}
            {selected && (
              <article
                key={selected.id}
                className="group relative overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-[0_30px_90px_-40px_rgba(76,29,149,0.35)] transition-all duration-500 dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_30px_90px_-40px_rgba(139,92,246,0.25)]"
              >
                {/* HERO IMAGE */}
                <div className="relative h-[240px] overflow-hidden sm:h-[300px] lg:h-[380px]">
                  {selected.image_url ? (
                    <img
                      src={selected.image_url}
                      alt={selected.title}
                      className="h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-[#4a3b9b] via-[#7f4cae] to-[#d271a6]" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                  <div className="absolute bottom-6 left-6 sm:left-10">
                    <span className="inline-flex rounded-md bg-white/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                      Professional Experience
                    </span>
                  </div>
                </div>

                {/* EXPERIENCE DETAILS */}
                <div className="relative p-6 sm:p-10 lg:p-12">
                  <div className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent sm:left-10 sm:right-10 lg:left-12 lg:right-12" />

                  {/* PERIOD + LOCATION */}
                  <div className="mb-5 flex flex-wrap items-center gap-3">
                    {selected.period && (
                      <span className="inline-flex rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-md shadow-purple-500/20">
                        {selected.period}
                      </span>
                    )}

                    {selected.location && (
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {selected.location}
                      </span>
                    )}
                  </div>

                  {/* TITLE */}
                  <h2 className="max-w-4xl text-2xl font-bold leading-[1.15] tracking-[-0.03em] text-slate-900 dark:text-white sm:text-3xl lg:text-[38px]">
                    {selected.title}
                  </h2>

                  {/* ORGANIZATION */}
                  <p className="mt-3 text-base font-semibold text-purple-700 dark:text-purple-400">
                    {selected.organization}
                  </p>

                  {/* DESCRIPTION */}
                  {selected.description ? (
                    <div className="mt-6 max-w-4xl whitespace-pre-line text-justify text-[15px] leading-[1.85] text-slate-600 dark:text-slate-400">
                      {selected.description}
                    </div>
                  ) : (
                    <p className="mt-6 text-slate-400">
                      No additional details are available for this experience.
                    </p>
                  )}

                  {/* FOOTER */}
                  <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-slate-100 pt-6 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-sm font-bold text-white shadow-lg shadow-purple-500/30">
                        D
                      </div>

                      <div>
                        <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                          Demiso Daba
                        </div>

                        <div className="text-[10px] uppercase tracking-[0.15em] text-slate-400">
                          Professional Experience
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                        Experience
                      </div>

                      <div className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {String(
                          experiences.findIndex(
                            (item) => item.id === selected.id
                          ) + 1
                        ).padStart(2, "0")}{" "}
                        / {String(experiences.length).padStart(2, "0")}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )}
          </div>
        )}
      </section>

      <Footer profile={profile} />
    </main>
  );
}