"use client";

import { useEffect, useState } from "react";

type Profile = {
  name: string | null;
  title: string | null;
  affiliation: string | null;
  bio: string | null;
  email: string | null;
  location: string | null;
  profile_image_url: string | null;
  orcid: string | null;
  google_scholar: string | null;
  researchgate: string | null;
  github: string | null;
  linkedin: string | null;
  twitter: string | null;
  facebook: string | null;
  cv_url: string | null;
};

type HeroProps = {
  profile: Profile;
};

const fieldIcons = [
  <svg key="se" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>,
  <svg key="res" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M12 2v3"></path><path d="M12 19v3"></path><path d="M4.2 4.2l2.1 2.1"></path><path d="M17.7 17.7l2.1 2.1"></path><path d="M2 12h3"></path><path d="M19 12h3"></path><path d="M4.2 19.8l2.1-2.1"></path><path d="M17.7 6.3l2.1-2.1"></path></svg>,
  <svg key="esm" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>,
  <svg key="rs" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 7 9 3 5 7l4 4"></path><path d="m17 11 4 4-4 4-4-4"></path><path d="m8 12 4 4 6-6-4-4Z"></path><path d="m16 8 3-3"></path><path d="M9 21a6 6 0 0 0-6-6"></path></svg>,
  <svg key="cmip" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>,
  <svg key="water" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-13-7-13S5 10.7 5 15a7 7 0 0 0 7 7z"></path></svg>,
  <svg key="climate" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>,
  <svg key="wre" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
];

export default function Hero({ profile }: HeroProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white dark:bg-slate-950"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-50/80 blur-3xl dark:bg-blue-900/20" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple-50/80 blur-3xl dark:bg-purple-900/20" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_.85fr]">
          
          <div className="z-10">
            
            <span className="inline-flex items-center gap-2 rounded-full bg-red-50/80 px-3.5 py-1.5 text-xs font-medium text-red-700 backdrop-blur-sm border border-red-100 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800/50">
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-500 dark:bg-red-400 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
              Available for collaboration
            </span>

            <h1 className="mt-5 text-5xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-6xl md:text-7xl dark:text-white">
              {profile.name || "Demiso Daba"}
            </h1>

            <p className="mt-3 text-lg font-medium text-slate-700 dark:text-slate-300 md:text-xl">
              {profile.title || "Hydrology · Climate Science · AI"}
            </p>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400">
              {profile.bio}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#work"
                className="inline-flex items-center rounded-full bg-[#5b4dc4] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-[#4a3e9e] dark:shadow-none dark:hover:bg-indigo-500"
              >
                View my work
              </a>

              {profile.cv_url && (
                <a
                  href={profile.cv_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  CV ↗
                </a>
              )}
            </div>

            <div className="mt-8 space-y-4">
              
              <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-3.5 dark:border-indigo-900/50 dark:bg-indigo-950/30">
                <dt className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
                  Current Affiliation
                </dt>
                <dd className="mt-1 text-sm font-semibold leading-6 text-slate-800 dark:text-slate-200">
                  {profile.affiliation || "Arba Minch Water Technology Institute, Arba Minch University"}
                </dd>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    Location
                  </dt>
                  <dd className="mt-0.5 text-sm text-slate-700 dark:text-slate-300">
                    {profile.location || "Ethiopia"}
                  </dd>
                </div>

                {profile.email && (
                  <div>
                    <dt className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      Email
                    </dt>
                    <dd className="mt-0.5">
                      <a
                        href={`mailto:${profile.email}`}
                        className="text-sm font-medium text-[#5b4dc4] hover:underline dark:text-indigo-400"
                      >
                        {profile.email}
                      </a>
                    </dd>
                  </div>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                    Social Profiles
                  </dt>
                  <div className="flex flex-wrap items-center gap-2">
                    <a href="https://www.linkedin.com/in/demiso-daba-swre0/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:-translate-y-1 hover:border-[#5b4dc4] hover:text-[#5b4dc4] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-indigo-500 dark:hover:text-indigo-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h5v-8.306c0-1.796.343-3.535 2.586-3.535 2.207 0 2.236 2.063 2.236 3.652v8.189h5v-9.142c0-4.5-1.021-7.858-6.156-7.858-2.497 0-4.174 1.375-4.866 2.678h-.1l-.034-2.678z"/></svg>
                    </a>

                    <a href="https://x.com/DemoNkmt1" target="_blank" rel="noreferrer" aria-label="Twitter" className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:-translate-y-1 hover:border-[#5b4dc4] hover:text-[#5b4dc4] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-indigo-500 dark:hover:text-indigo-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>

                    <a href="https://web.facebook.com/demiso.25/" target="_blank" rel="noreferrer" aria-label="Facebook" className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:-translate-y-1 hover:border-[#5b4dc4] hover:text-[#5b4dc4] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-indigo-500 dark:hover:text-indigo-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                  </div>
                </div>

                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                    Talent Profiles
                  </dt>
                  <div className="flex flex-wrap items-center gap-2">
                    <a href={profile.github || "#"} target="_blank" rel="noreferrer" aria-label="GitHub" className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:-translate-y-1 hover:border-[#5b4dc4] hover:text-[#5b4dc4] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-indigo-500 dark:hover:text-indigo-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                    <a href={profile.orcid || "#"} target="_blank" rel="noreferrer" aria-label="ORCID" className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:-translate-y-1 hover:border-[#5b4dc4] hover:text-[#5b4dc4] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-indigo-500 dark:hover:text-indigo-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z"/></svg>
                    </a>
                    <a href={profile.researchgate || "#"} target="_blank" rel="noreferrer" aria-label="ResearchGate" className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:-translate-y-1 hover:border-[#5b4dc4] hover:text-[#5b4dc4] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-indigo-500 dark:hover:text-indigo-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.586 0H4.414A4.414 4.414 0 0 0 0 4.414v15.172A4.414 4.414 0 0 0 4.414 24h15.172A4.414 4.414 0 0 0 24 19.586V4.414A4.414 4.414 0 0 0 19.586 0zM9.916 15.398c-.988.756-2.352 1.111-4.012 1.111h-.252v3.033H2.733V7.03h3.87c1.411 0 2.537.327 3.317.953.792.626 1.198 1.593 1.198 2.86 0 .792-.207 1.461-.604 2.001-.396.54-.945.936-1.598 1.19l2.903 5.508h-3.033l-2.47-5.144zm11.099 1.198c-.612.828-1.53 1.242-2.754 1.242-.9 0-1.674-.27-2.322-.81-.648-.54-1.044-1.278-1.188-2.214h2.232c.084.432.27.774.558 1.026.288.252.648.378 1.08.378.468 0 .828-.108 1.08-.324.252-.216.378-.522.378-.918 0-.36-.144-.648-.432-.864-.288-.216-.792-.432-1.512-.648-.972-.288-1.674-.63-2.106-1.026-.432-.396-.648-.972-.648-1.728 0-.828.288-1.494.864-2.016.576-.522 1.35-.774 2.322-.774.936 0 1.692.234 2.268.702.576.468.9 1.116.972 1.944h-2.16c-.06-.36-.216-.648-.468-.864-.252-.216-.594-.324-1.026-.324-.396 0-.72.09-.972.27-.252.18-.378.414-.378.702 0 .324.162.594.486.81.324.216.882.432 1.674.648.972.288 1.674.612 2.106.972.432.36.648.882.648 1.566-.018.864-.306 1.638-.918 2.466z"/></svg>
                    </a>
                  </div>
                </div>

              </div>

            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[550px]">
            <div className="relative aspect-square flex items-center justify-center">
              
              <div className="absolute inset-0 rounded-full border-2 border-slate-200/80 dark:border-slate-800/80" />
              <div className="absolute inset-[12%] rounded-full border border-slate-200/60 dark:border-slate-800/60" />

              <div 
                className="absolute inset-[2%] rounded-full border-[3px] border-dashed border-[#5b4dc4]/70 dark:border-indigo-500/70"
                style={{ animation: "spin 30s linear infinite" }}
              >
                {fieldIcons.slice(0, 4).map((icon, i) => (
                  <div 
                    key={i} 
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ transform: `rotate(${i * 90}deg) translateY(calc(-50% + 24px))` }}
                  >
                    <div 
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#5b4dc4] shadow-lg border-2 border-indigo-100 dark:bg-slate-800 dark:border-indigo-900/50 dark:text-indigo-400 pointer-events-auto"
                      style={{ animation: "spin-reverse 30s linear infinite" }}
                    >
                      {icon}
                    </div>
                  </div>
                ))}
              </div>

              <div 
                className="absolute inset-[18%] rounded-full border-[3px] border-dashed border-[#5b4dc4]/50 dark:border-indigo-500/50"
                style={{ animation: "spin-reverse 25s linear infinite" }}
              >
                 {fieldIcons.slice(4, 8).map((icon, i) => (
                  <div 
                    key={i} 
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ transform: `rotate(${i * 90 + 45}deg) translateY(calc(-50% + 18px))` }}
                  >
                    <div 
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#5b4dc4] shadow-lg border-2 border-indigo-100 dark:bg-slate-800 dark:border-indigo-900/50 dark:text-indigo-400 pointer-events-auto"
                      style={{ animation: "spin 25s linear infinite" }}
                    >
                      {icon}
                    </div>
                  </div>
                ))}
              </div>

              {/* ===== CENTER — PROFILE IMAGE (any format: .png .jpg .jpeg .webp .avif .gif) ===== */}
              <div className="relative z-10 h-40 w-40 overflow-hidden rounded-full bg-[#5b4dc4] shadow-2xl shadow-indigo-200 ring-4 ring-white dark:bg-white dark:shadow-none dark:ring-slate-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/profile.png"
                  alt={profile.name || "Demiso Daba"}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    const img = e.currentTarget;
                    const tried = img.dataset.tried
                      ? img.dataset.tried.split(",")
                      : ["png"];

                    const candidates = [
                      "png",
                      "jpg",
                      "jpeg",
                      "webp",
                      "avif",
                      "gif",
                    ];
                    const next = candidates.find(
                      (ext) => !tried.includes(ext)
                    );

                    if (next) {
                      img.dataset.tried = [...tried, next].join(",");
                      img.src = `/profile.${next}`;
                    }
                  }}
                />
              </div>

            </div>

            {profile.profile_image_url && (
              <div className="absolute -bottom-3 -right-3 h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-xl dark:border-slate-950">
                <img
                  src={profile.profile_image_url}
                  alt={profile.name || "Demiso Daba"}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>
    </section>
  );
}