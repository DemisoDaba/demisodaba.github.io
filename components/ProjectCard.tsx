import type { Project } from "@/components/types";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
      <div className="aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl font-bold text-slate-300 dark:text-slate-700">
            {project.title[0]}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          {project.status && (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {project.status}
            </span>
          )}

          {project.year && <span>{project.year}</span>}
        </div>

        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          {project.title}
        </h3>

        {project.description && (
          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
            {project.description}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {project.role || "Research"}
          </span>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-slate-800 hover:underline dark:text-slate-200"
            >
              View →
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
