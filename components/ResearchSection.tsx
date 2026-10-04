"use client";

import { useState } from "react";
import type { Software } from "@/components/types";

type ResearchSectionProps = {
  software: Software[];
};

const researchAreas = [
  {
    title: "Hydrology",
    text: "Water resources, groundwater, and extreme events.",
  },
  {
    title: "Earth Observation",
    text: "Satellite data, remote sensing, and spatial modelling.",
  },
  {
    title: "Climate Science",
    text: "CMIP6, extremes, variability, and projections.",
  },
  {
    title: "AI & ML",
    text: "Deep learning, uncertainty, and geospatial AI.",
  },
];

export default function ResearchSection({
  software,
}: ResearchSectionProps) {
  return (
<section
        id="research"
        className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="mb-10 max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Research
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white">
              Research & Tools
            </h2>

            <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-400">
              Research areas and the computational tools I develop around
              them.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {researchAreas.map((area) => (
                <div
                  key={area.title}
                  className="rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-600"
                >
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                    {area.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {area.text}
                  </p>
                </div>
              ))}
            </div>

            <div
              id="software"
              className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Software
                  </p>

                  <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
                    Software & Data
                  </h3>
                </div>

                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {software.length} items
                </span>
              </div>

              {software.length > 0 ? (
                <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                  {software.slice(0, 5).map((item) => (
                    <li key={item.id} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                            {item.title}
                          </p>

                          {item.description && (
                            <p className="mt-1 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
                              {item.description}
                            </p>
                          )}
                        </div>

                        <div className="flex shrink-0 gap-3">
                          {item.github_url && (
                            <a
                              href={item.github_url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs font-medium text-slate-700 hover:underline dark:text-slate-300"
                            >
                              Code
                            </a>
                          )}

                          {item.url && (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs font-medium text-slate-700 hover:underline dark:text-slate-300"
                            >
                              Open
                            </a>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Software and datasets will appear here.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
  );
}
