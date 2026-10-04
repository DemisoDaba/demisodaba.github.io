"use client";

import { useState } from "react";
import Link from "next/link";

import ProjectCard from "@/components/ProjectCard";
import PublicationCard from "@/components/PublicationCard";

import type {
  Project,
  Publication,
} from "@/components/types";

type WorkSectionProps = {
  projects: Project[];
  publications: Publication[];
};

export default function WorkSection({
  projects,
  publications,
}: WorkSectionProps) {
  const [tab, setTab] = useState<"projects" | "publications">(
    "publications"
  );

  // 3-column × 2-row = 6 items max
  const previewProjects = projects.slice(0, 6);
  const previewPublications = publications.slice(0, 6);

  return (
    <section
      id="work"
      className="border-b border-slate-200 dark:border-slate-800"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Work
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white">
              Projects & Publications
            </h2>
          </div>

          <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-900">
            <button
              type="button"
              onClick={() => setTab("publications")}
              className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
                tab === "publications"
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              Publications ({publications.length})
            </button>

            <button
              type="button"
              onClick={() => setTab("projects")}
              className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
                tab === "projects"
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              Projects ({projects.length})
            </button>
          </div>
        </div>

        {tab === "projects" && (
          <>
            {previewProjects.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {previewProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 p-12 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                Projects will appear here.
              </div>
            )}
          </>
        )}

        {tab === "publications" && (
          <>
            {previewPublications.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {previewPublications.map((publication) => (
                  <PublicationCard
                    key={publication.id}
                    publication={publication}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 p-12 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                Publications will appear here.
              </div>
            )}

            <div className="mt-6 text-center">
              <Link
                href="/publications"
                className="text-sm font-semibold text-slate-800 hover:underline dark:text-slate-200"
              >
                View all publications →
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}