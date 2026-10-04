import type { Publication } from "@/components/types";

type PublicationCardProps = {
  publication: Publication;
};

export default function PublicationCard({
  publication,
}: PublicationCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
      <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        {publication.year && <span>{publication.year}</span>}

        {publication.journal && (
          <>
            <span>·</span>
            <span className="font-medium">
              {publication.journal}
            </span>
          </>
        )}

        {publication.featured && (
          <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            Featured
          </span>
        )}
      </div>

      <h3 className="text-sm font-semibold leading-6 text-slate-900 dark:text-white">
        {publication.title}
      </h3>

      {publication.authors && (
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
          {publication.authors}
        </p>
      )}

      <div className="mt-4 flex gap-4 border-t border-slate-100 pt-3 dark:border-slate-800">
        {publication.url && (
          <a
            href={publication.url}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold text-slate-800 hover:underline dark:text-slate-200"
          >
            Read →
          </a>
        )}

        {publication.doi && (
          <a
            href={`https://doi.org/${publication.doi.replace(
              /^https?:\/\/doi.org\//,
              ""
            )}`}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400"
          >
            DOI ↗
          </a>
        )}
      </div>
    </article>
  );
}
