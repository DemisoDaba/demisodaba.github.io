"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";

type Publication = {
  id: number;
  title: string;
  authors: string | null;
  journal: string | null;
  year: number | null;
  doi: string | null;
  abstract: string | null;
  url: string | null;
  featured: boolean;
};

type SortKey =
  | "my-first"
  | "year-desc"
  | "year-asc"
  | "title-asc"
  | "journal-asc";

export default function PublicationsPage() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState<SortKey>("my-first");

  useEffect(() => {
    async function loadPublications() {
      const { data } = await supabase
        .from("publications")
        .select(
          "id, title, authors, journal, year, doi, abstract, url, featured"
        )
        .eq("published", true);

      setPublications(data ?? []);
      setLoading(false);
    }

    loadPublications();
  }, []);

  /**
   * Check if the first author is Demiso Daba / Demiso Daba Dugassa / DDD.
   * Looks at the beginning of the authors string only — the first listed author.
   */
  const isFirstAuthorDemiso = (authors: string | null) => {
    if (!authors) return false;
    const firstAuthor = authors
      .split(/,| and /i)[0]
      .trim()
      .toLowerCase();

    return (
      firstAuthor.includes("demiso") ||
      firstAuthor.includes("daba") ||
      firstAuthor.includes("dugassa") ||
      firstAuthor === "ddd" ||
      firstAuthor.startsWith("ddd")
    );
  };

  /** Apply the currently selected sort key */
  const sortedPublications = useMemo(() => {
    const items = [...publications];

    switch (sortKey) {
      case "my-first":
        // Demiso first-author → newest year → title A–Z
        return items.sort((a, b) => {
          const aFirst = isFirstAuthorDemiso(a.authors) ? 0 : 1;
          const bFirst = isFirstAuthorDemiso(b.authors) ? 0 : 1;
          if (aFirst !== bFirst) return aFirst - bFirst;

          const yearA = a.year ?? 0;
          const yearB = b.year ?? 0;
          if (yearA !== yearB) return yearB - yearA;

          return (a.title ?? "")
            .trim()
            .toLowerCase()
            .localeCompare((b.title ?? "").trim().toLowerCase());
        });

      case "year-desc":
        // Newest year first → title A–Z
        return items.sort((a, b) => {
          const yearA = a.year ?? 0;
          const yearB = b.year ?? 0;
          if (yearA !== yearB) return yearB - yearA;
          return (a.title ?? "")
            .trim()
            .toLowerCase()
            .localeCompare((b.title ?? "").trim().toLowerCase());
        });

      case "year-asc":
        // Oldest year first → title A–Z
        return items.sort((a, b) => {
          const yearA = a.year ?? 0;
          const yearB = b.year ?? 0;
          if (yearA !== yearB) return yearA - yearB;
          return (a.title ?? "")
            .trim()
            .toLowerCase()
            .localeCompare((b.title ?? "").trim().toLowerCase());
        });

      case "title-asc":
        // Title A–Z (year desc as tiebreaker)
        return items.sort((a, b) => {
          const t = (a.title ?? "")
            .trim()
            .toLowerCase()
            .localeCompare((b.title ?? "").trim().toLowerCase());
          if (t !== 0) return t;
          return (b.year ?? 0) - (a.year ?? 0);
        });

      case "journal-asc":
        // Journal A–Z (year desc as tiebreaker)
        return items.sort((a, b) => {
          const j = (a.journal ?? "")
            .trim()
            .toLowerCase()
            .localeCompare((b.journal ?? "").trim().toLowerCase());
          if (j !== 0) return j;
          return (b.year ?? 0) - (a.year ?? 0);
        });

      default:
        return items;
    }
  }, [publications, sortKey]);

  const cleanDoi = (doi: string | null) =>
    doi ? doi.replace(/^https?:\/\/doi\.org\//, "") : null;

  const sortOptions: { key: SortKey; label: string }[] = [
    { key: "my-first", label: "My First-Author Work" },
    { key: "year-desc", label: "Newest First" },
    { key: "year-asc", label: "Oldest First" },
    { key: "title-asc", label: "Title A–Z" },
    { key: "journal-asc", label: "Journal A–Z" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fafafc] via-white to-[#f7f7f9] text-slate-900 dark:from-[#09090b] dark:via-[#0c0c10] dark:to-[#09090b] dark:text-white">
      <Navbar />

      {/* PAGE HEADER */}
      <section className="relative overflow-hidden border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[360px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-200/30 via-pink-200/20 to-indigo-200/30 blur-[100px] dark:from-purple-900/20 dark:via-pink-900/10 dark:to-indigo-900/20" />

        <div className="relative mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-12">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-10 bg-gradient-to-r from-purple-600 to-pink-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-purple-600 dark:text-purple-400">
                  Scholarly Record
                </span>
              </div>

              <h1 className="text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-slate-900 dark:text-white sm:text-4xl lg:text-[44px]">
                <span className="underline decoration-purple-500/60 decoration-[3px] underline-offset-[10px]">
                  Research
                </span>{" "}
                <span>&</span>{" "}
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 bg-clip-text text-transparent underline decoration-purple-500/60 decoration-[3px] underline-offset-[10px]">
                  Publications
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-[14.5px] leading-7 text-slate-600 dark:text-slate-400">
                Advancing knowledge at the intersection of hydrology,
                climate science, remote sensing, and artificial
                intelligence. Every paper tells a story of discovery.
              </p>
            </div>

            {!loading && publications.length > 0 && (
              <div className="flex flex-row items-center gap-7 md:gap-9">
                <div className="text-right">
                  <div className="text-4xl font-semibold tracking-tight tabular-nums text-slate-900 dark:text-white">
                    {String(publications.length).padStart(2, "0")}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.24em] text-slate-400">
                    Published
                  </div>
                </div>

                <div className="h-11 w-px bg-slate-200 dark:bg-slate-800" />

                <div className="text-right">
                  <div className="text-4xl font-semibold tracking-tight tabular-nums text-slate-900 dark:text-white">
                    {String(publications.filter((p) => p.featured).length).padStart(2, "0")}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.24em] text-slate-400">
                    Featured
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PUBLICATIONS */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-12">
        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-80 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-900"
              />
            ))}
          </div>
        ) : publications.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-16 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 text-2xl dark:from-purple-950 dark:to-slate-800">
              📚
            </div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
              No publications yet
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Peer-reviewed work will appear here once published.
            </p>
          </div>
        ) : (
          <>
            {/* ============ SORT BAR ============ */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">
                  Sort by
                </span>

                <div className="flex flex-wrap items-center gap-2">
                  {sortOptions.map((option) => {
                    const active = sortKey === option.key;

                    return (
                      <button
                        key={option.key}
                        onClick={() => setSortKey(option.key)}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium transition-all duration-200 ${
                          active
                            ? "border-purple-500 bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-sm shadow-purple-500/30"
                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:bg-slate-800"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="text-[11px] text-slate-400">
                <span className="tabular-nums font-semibold text-slate-600 dark:text-slate-300">
                  {sortedPublications.length}
                </span>{" "}
                {sortedPublications.length === 1 ? "result" : "results"}
              </div>
            </div>

            {/* ============ GRID ============ */}
            <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {sortedPublications.map((publication, index) => {
                const doiClean = cleanDoi(publication.doi);

                return (
                  <li
                    key={publication.id}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_12px_-6px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-[0_20px_40px_-20px_rgba(139,92,246,0.35)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-none dark:hover:border-purple-700 dark:hover:shadow-[0_20px_40px_-20px_rgba(139,92,246,0.35)]"
                  >
                    {/* Top gradient accent */}
                    <span className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Index + Featured */}
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] font-bold tabular-nums text-slate-400 transition-colors group-hover:text-purple-600 dark:group-hover:text-purple-400">
                        [{String(index + 1).padStart(2, "0")}]
                      </span>

                      {publication.featured && (
                        <span className="inline-flex items-center gap-1 rounded-sm bg-gradient-to-r from-amber-400 to-orange-400 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.12em] text-slate-900 shadow-sm">
                          <svg
                            className="h-2 w-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="font-serif text-[15.5px] font-bold leading-snug tracking-[-0.005em] text-slate-900 transition-colors group-hover:text-purple-800 dark:text-white dark:group-hover:text-purple-300">
                      {publication.url ? (
                        <a
                          href={publication.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="line-clamp-4">{publication.title}</span>
                        </a>
                      ) : (
                        <span className="line-clamp-4">{publication.title}</span>
                      )}
                    </h2>

                    {/* Authors */}
                    {publication.authors && (
                      <p className="mt-2.5 line-clamp-2 text-[12px] leading-5 text-slate-600 dark:text-slate-400">
                        {publication.authors}
                      </p>
                    )}

                    {/* Journal + Year */}
                    <p className="mt-2 line-clamp-2 text-[11.5px] font-medium italic text-purple-700 dark:text-purple-400">
                      {publication.journal ?? "Journal not specified"}
                      {publication.year ? (
                        <span className="text-slate-500 dark:text-slate-500">
                          , {publication.year}
                        </span>
                      ) : (
                        ""
                      )}
                    </p>

                    {/* Abstract */}
                    {publication.abstract && (
                      <p className="mt-3.5 line-clamp-6 text-[12px] leading-[1.65] text-slate-600 dark:text-slate-400">
                        {publication.abstract}
                      </p>
                    )}

                    {/* Links */}
                    {(doiClean || publication.url) && (
                      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-slate-100 pt-3.5 text-[11.5px] dark:border-slate-800">
                        {doiClean && (
                          <a
                            href={`https://doi.org/${doiClean}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-slate-600 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-purple-700 hover:decoration-purple-500 dark:text-slate-400 dark:decoration-slate-600 dark:hover:text-purple-400 dark:hover:decoration-purple-500"
                          >
                            DOI
                          </a>
                        )}

                        {publication.url && (
                          <a
                            href={publication.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-auto inline-flex items-center gap-1 font-medium text-purple-700 transition-colors hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-200"
                          >
                            Read
                            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                              →
                            </span>
                          </a>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </>
        )}
      </section>
    </main>
  );
}