import type { Profile } from "@/components/types";

type FooterProps = {
  profile?: Profile | null;
};

export default function Footer({ profile }: FooterProps) {
  const year = new Date().getFullYear();

  const name = profile?.name || "Demiso Daba";
  const affiliation = profile?.affiliation || "Arba Minch University";
  const location = profile?.location || "Arba Minch, Ethiopia";
  const email = profile?.email || "";
  const github = profile?.github || "";
  const orcid = profile?.orcid || "";
  const researchgate = profile?.researchgate || "";

  return (
    <footer
      className="border-t border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-300"
      style={{ fontFamily: '"Times New Roman", Times, serif' }}
    >
      <div className="mx-auto max-w-[1800px] px-6 py-7 lg:px-12 xl:px-20">

        {/* MAIN FOOTER */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[1fr_3fr_0.7fr_1.2fr] lg:gap-14">

          {/* DEMISO DABA */}
          <div>
            <h2
              className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-lg font-bold text-transparent"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              {name}
            </h2>

            <p className="mt-2 max-w-sm text-xs leading-5 text-slate-400">
              {affiliation}
            </p>

            {/* Location */}
            <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-3.5 w-3.5 shrink-0 text-cyan-400"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z"
                />
                <circle cx="12" cy="10" r="2.3" />
              </svg>

              {location}
            </p>
          </div>

          {/* RESEARCH */}
          <div>
            <h3 className="inline-block text-sm font-semibold text-cyan-400 underline decoration-cyan-400/50 underline-offset-4">
              Research
            </h3>

            <p className="mt-3 max-w-4xl text-xs leading-5 text-slate-400">
              Water Resources · Climate Science · Earth System Modelling ·
              Remote Sensing · CMIP · Artificial Intelligence · Machine
              Learning · Hydrology · Geospatial Science
            </p>
          </div>

          {/* EMAIL ME */}
          <div>
            <h3 className="inline-block text-sm font-semibold text-cyan-400 underline decoration-cyan-400/50 underline-offset-4">
              Email Me
            </h3>

            <div className="mt-3">
              {email && (
                <a
                  href={`mailto:${email}`}
                  aria-label={`Email ${name}`}
                  title={`Email ${name}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-cyan-400 transition hover:-translate-y-1 hover:border-cyan-400/70 hover:bg-cyan-400/10 hover:text-cyan-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <rect
                      width="20"
                      height="16"
                      x="2"
                      y="4"
                      rx="2"
                    />
                    <path d="m22 7-8.97 5.7a2 2 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* CONNECT */}
          <div>
            <h3 className="inline-block text-sm font-semibold text-violet-400 underline decoration-violet-400/50 underline-offset-4">
              Connect
            </h3>

            <div className="mt-3 flex items-center gap-2">

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/demiso-daba-swre0/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-400 transition hover:-translate-y-0.5 hover:border-blue-400/60 hover:bg-blue-400/10 hover:text-blue-300"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5S.02 4.881.02 3.5 1.13 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8h4v16h-4V8Zm7 0h3.83v2.19h.05c.53-1 1.83-2.5 4.77-2.5 5.1 0 6.05 3.36 6.05 7.73V24h-4v-7.61c0-1.82-.03-4.16-2.54-4.16-2.54 0-2.93 1.98-2.93 4.03V24h-4V8Z" />
                </svg>
              </a>

              {/* GitHub */}
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  title="GitHub"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-400 transition hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10 hover:text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  >
                    <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.48.99.11-.77.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.76.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.58A12 12 0 0 0 12 .5Z" />
                  </svg>
                </a>
              )}

              {/* ORCID */}
              {orcid && (
                <a
                  href={orcid}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="ORCID"
                  title="ORCID"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-[9px] font-bold text-slate-400 transition hover:-translate-y-0.5 hover:border-green-400/60 hover:bg-green-400/10 hover:text-green-300"
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                  iD
                </a>
              )}

              {/* ResearchGate */}
              {researchgate && (
                <a
                  href={researchgate}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="ResearchGate"
                  title="ResearchGate"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-[9px] font-bold text-slate-400 transition hover:-translate-y-0.5 hover:border-emerald-400/60 hover:bg-emerald-400/10 hover:text-emerald-300"
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                  RG
                </a>
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-6 flex flex-col gap-1.5 border-t border-slate-800 pt-4 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {name}. All rights reserved.
          </span>

          <span className="text-slate-600">
            Academic · Research · Innovation
          </span>
        </div>

      </div>
    </footer>
  );
}