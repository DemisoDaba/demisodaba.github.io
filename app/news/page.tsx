"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";

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

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [selected, setSelected] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("published", true)
        .order("featured", { ascending: false })
        .order("date", { ascending: false })
        .order("created_at", { ascending: false });

      if (!error && data) {
        setNews(data);
        setSelected(data[0] ?? null);
      }

      setLoading(false);
    }

    loadNews();
  }, []);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const readingTime = (text: string | null) =>
    text ? Math.max(1, Math.ceil(text.split(/\s+/).length / 200)) : 0;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fafafc] via-white to-[#f7f7f9] text-slate-900 dark:from-[#09090b] dark:via-[#0c0c10] dark:to-[#09090b] dark:text-white">
      <Navbar />

      {/* HERO / PAGE INTRO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-200/40 via-pink-200/30 to-indigo-200/40 blur-[120px] dark:from-purple-900/30 dark:via-pink-900/20 dark:to-indigo-900/30" />

        <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-10 lg:px-10 lg:pt-14">
          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-12 bg-gradient-to-r from-purple-600 to-pink-500" />
                <span className="text-[11px] font-bold uppercase tracking-[0.32em] text-purple-600 dark:text-purple-400">
                  Research Journal
                </span>
              </div>

              <h1 className="text-6xl font-bold leading-[0.95] tracking-[-0.045em] sm:text-7xl lg:text-[88px]">
                <span className="underline decoration-purple-500/60 decoration-[3px] underline-offset-[12px]">
                  News
                </span>{" "}
                <span>&</span>{" "}
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 bg-clip-text text-transparent underline decoration-purple-500/60 decoration-[3px] underline-offset-[12px]">
                  Insights
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-500 dark:text-slate-400">
                Stay at the forefront of discovery. From breakthrough
                publications to pioneering collaborations, this is where
                research comes alive and ideas shape the future.
              </p>
            </div>

            {!loading && news.length > 0 && (
              <div className="flex flex-row items-center gap-8 md:gap-10">
                <div className="text-right">
                  <div className="text-5xl font-semibold tracking-tight tabular-nums">
                    {String(news.length).padStart(2, "0")}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.28em] text-slate-400">
                    Published
                  </div>
                </div>

                <div className="h-12 w-px bg-slate-200 dark:bg-slate-800" />

                <div className="text-right">
                  <div className="text-5xl font-semibold tracking-tight tabular-nums">
                    {String(news.filter((n) => n.featured).length).padStart(2, "0")}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.28em] text-slate-400">
                    Featured
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
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
        ) : news.length === 0 ? (
          <div className="rounded-[32px] border border-slate-200 bg-white p-20 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 text-2xl dark:from-purple-950 dark:to-slate-800">
              📰
            </div>
            <h3 className="text-xl font-semibold">No stories yet</h3>
            <p className="mt-2 text-sm text-slate-500">
              Published news and updates will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[360px_minmax(0,1fr)]">
            {/* SIDEBAR INDEX */}
            <aside className="lg:sticky lg:top-24 lg:h-fit">
              <div className="mb-5 flex items-center justify-between px-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">
                  All Stories
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  {news.length}
                </span>
              </div>

              <div className="max-h-[70vh] space-y-3 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
                {news.map((item, index) => {
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
                      <span
                        className={`absolute bottom-0 left-0 top-0 w-[3px] transition-all duration-300 ${
                          active
                            ? "bg-gradient-to-b from-purple-500 via-pink-500 to-indigo-500"
                            : "bg-transparent"
                        }`}
                      />

                      <div
                        className={`w-6 shrink-0 pt-1 text-[10px] font-bold tabular-nums transition-colors ${
                          active
                            ? "text-purple-600 dark:text-purple-400"
                            : "text-slate-300 group-hover:text-slate-400 dark:text-slate-600"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="h-[76px] w-[92px] shrink-0 overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200/60 dark:bg-slate-800 dark:ring-slate-700/60">
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt=""
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 text-sm font-bold text-purple-500 dark:from-purple-950 dark:via-pink-950 dark:to-slate-800">
                            D
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-medium uppercase tracking-wider ${
                              active
                                ? "text-purple-600 dark:text-purple-400"
                                : "text-slate-400"
                            }`}
                          >
                            {formatDate(item.date)}
                          </span>

                          {item.featured && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
                              <span className="h-1 w-1 rounded-full bg-amber-500" />
                              Featured
                            </span>
                          )}
                        </div>

                        <h3
                          className={`mt-1.5 line-clamp-2 text-[13.5px] font-semibold leading-5 transition-colors ${
                            active
                              ? "text-purple-700 dark:text-purple-300"
                              : "text-slate-800 group-hover:text-slate-900 dark:text-slate-200 dark:group-hover:text-white"
                          }`}
                        >
                          {item.title}
                        </h3>

                        {item.category && (
                          <p className="mt-1.5 truncate text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                            {item.category}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Sidebar footer */}
              <div className="mt-5 rounded-2xl border border-dashed border-slate-200 p-4 text-center dark:border-slate-800">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                  Updated regularly
                </p>
              </div>
            </aside>

            {/* FEATURED STORY */}
            {selected && (
              <article
                key={selected.id}
                className="group relative overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-[0_30px_90px_-40px_rgba(76,29,149,0.35)] transition-all duration-500 dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_30px_90px_-40px_rgba(139,92,246,0.25)]"
              >
                {/* HERO IMAGE */}
                <div className="relative h-[240px] overflow-hidden sm:h-[300px] lg:h-[360px]">
                  {selected.image_url ? (
                    <img
                      src={selected.image_url}
                      alt={selected.title}
                      className="h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-[#4a3b9b] via-[#7f4cae] to-[#d271a6]" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>

                {/* BODY */}
                <div className="relative p-6 sm:p-10 lg:p-12">
                  <div className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent sm:left-10 sm:right-10 lg:left-12 lg:right-12" />

                  {/* META ROW */}
                  <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                    {selected.category && (
                      <span className="inline-flex items-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-sm shadow-purple-500/30">
                        {selected.category}
                      </span>
                    )}

                    {selected.featured && (
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-gradient-to-r from-amber-400 to-orange-400 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-900 shadow-sm shadow-amber-500/20">
                        <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Featured
                      </span>
                    )}

                    <span className="normal-case tracking-normal text-slate-600 dark:text-slate-400">
                      {formatDate(selected.date)}
                    </span>

                    <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />

                    <span className="normal-case tracking-normal text-slate-600 dark:text-slate-400">
                      Demiso Daba
                    </span>

                    {readingTime(selected.content) > 0 && (
                      <>
                        <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                        <span className="normal-case tracking-normal text-slate-600 dark:text-slate-400">
                          {readingTime(selected.content)} min read
                        </span>
                      </>
                    )}

                    {selected.url && (
                      <>
                        <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                        <a
                          href={selected.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="normal-case tracking-normal text-slate-600 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-slate-900 hover:decoration-slate-900 dark:text-slate-400 dark:hover:text-white dark:hover:decoration-white"
                        >
                          My work
                        </a>
                      </>
                    )}
                  </div>

                  {/* TITLE */}
                  <h2 className="max-w-4xl text-2xl font-bold leading-[1.15] tracking-[-0.03em] text-slate-900 dark:text-white sm:text-3xl lg:text-[38px]">
                    {selected.title}
                  </h2>

                  {/* EXCERPT */}
                  {selected.excerpt && (
                    <p className="mt-6 max-w-3xl text-base font-medium leading-7 text-slate-700 dark:text-slate-200 sm:text-lg sm:leading-8">
                      {selected.excerpt}
                    </p>
                  )}

                  {/* CONTENT */}
                  {selected.content && (
                    <div className="mt-6 max-w-3xl whitespace-pre-line text-[15px] leading-[1.85] text-slate-600 dark:text-slate-400">
                      {selected.content}
                    </div>
                  )}

                  {!selected.content && !selected.excerpt && (
                    <p className="text-slate-400">
                      No additional details are available for this story.
                    </p>
                  )}

                  {/* Footer */}
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
                          Author · {formatDate(selected.date)}
                        </div>
                      </div>
                    </div>

                    {selected.url && (
                      <a
                        href={selected.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-2.5 rounded-full bg-slate-900 px-6 py-3.5 text-xs font-semibold text-white shadow-lg shadow-slate-900/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:shadow-xl hover:shadow-purple-500/30 dark:bg-white dark:text-slate-900 dark:shadow-white/10 dark:hover:bg-gradient-to-r dark:hover:from-purple-500 dark:hover:to-pink-500 dark:hover:text-white"
                      >
                        Read full story
                        <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                          →
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            )}
          </div>
        )}
      </section>
    </main>
  );
}