// app/about/page.tsx

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Profile } from "@/components/types";

const profile: Profile = {
  name: "Demiso Daba",
  title: "Lecturer and Early-Career Scientist",
  affiliation:
    "Arba Minch Water Technology Institute, Arba Minch University",
  bio:
    "Early-career scientist working at the intersection of water resources, climate science, Earth system modelling, remote sensing, and artificial intelligence.",
  research_interests:
    "Water resources, climate science, Earth system modelling, remote sensing, CMIP, artificial intelligence, machine learning, hydrology, and geospatial science",
  email: "demisod390@gmail.com",
  location: "Arba Minch, Ethiopia",
  profile_image_url: null,
  orcid: "https://orcid.org/0000-0002-8431-2575",
  google_scholar: null,
  researchgate: "https://www.researchgate.net/profile/Demiso-Daba",
  github: "https://github.com/DemisoDaba",
  linkedin: "https://www.linkedin.com/in/demiso-daba-swre0/",
  cv_url: null,
};

export default function AboutPage() {
  return (
    <main
      className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 dark:text-slate-100"
      style={{ fontFamily: '"Times New Roman", Times, serif' }}
    >
      <Navbar />

      <article className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
        {/* ========== HERO HEADER ========== */}
        <header className="relative pl-6">
          <div className="absolute left-6 top-0 h-24 w-1.5 rounded-full bg-gradient-to-b from-blue-600 via-cyan-500 to-transparent dark:from-blue-500 dark:via-cyan-400" />

          <p className="pl-6 text-xs font-semibold uppercase tracking-[0.25em] text-blue-700 dark:text-blue-400">
            About
          </p>

          <h1 className="mt-3 pl-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            {profile.name}
          </h1>

          {/* Quote block */}
          <blockquote className="mt-6 max-w-2xl rounded-r-xl border-l-4 border-blue-600 bg-blue-50/60 py-4 pl-6 pr-6 text-slate-700 shadow-sm dark:border-blue-500 dark:bg-blue-950/30 dark:text-slate-300">
            <p className="text-[15px] italic leading-relaxed">
              Pronouns: <span className="font-medium not-italic">He / Him / His</span>
            </p>
            <p className="mt-1.5 text-[15px] italic leading-relaxed">
              Position:{" "}
              <span className="font-medium not-italic">
                Lecturer and Early-Career Scientist
              </span>
            </p>
          </blockquote>

          {/* Affiliation badges */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Arba Minch University
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              📍 {profile.location}
            </span>
          </div>
        </header>

        {/* ========== MAIN CONTENT GRID ========== */}
        <div className="mt-14 grid gap-8 pl-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,300px)] lg:gap-10">
          {/* ----- LEFT COLUMN: Narrative ----- */}
          <div className="space-y-6">
            {/* About */}
            <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60 sm:p-10">
              <h2 className="flex items-center gap-3 text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                  ✦
                </span>
                About
              </h2>

              <div className="mt-6 space-y-5 text-justify text-[15px] italic leading-relaxed text-slate-700 dark:text-slate-300">
                <p>
                  I am an early-career scientist and lecturer at the{" "}
                  <strong className="font-semibold not-italic text-slate-900 dark:text-white">
                    Arba Minch Water Technology Institute, Arba Minch
                    University
                  </strong>
                  , Ethiopia. My work lies at the intersection of water
                  resources, climate science, Earth system modelling, remote
                  sensing, and artificial intelligence. My research focuses on
                  understanding hydro-climatic variability, climate extremes,
                  and water-system dynamics using climate models, satellite
                  Earth observation, geospatial analysis, and data-driven
                  methods.
                </p>

                <p>
                  I work with CMIP data, remote sensing products, NetCDF,
                  Google Earth Engine, Python, and machine learning and AI
                  approaches to investigate complex environmental systems. My
                  broader research interests include hydrology, climate
                  change, hydro-climatic extremes, water resources management,
                  Earth observation, geospatial science, and the application
                  of artificial intelligence and machine learning to
                  environmental research.
                </p>

                <p>
                  I am also interested in developing reproducible scientific
                  workflows and computational tools that connect research,
                  Earth observation, climate information, and practical
                  water-resource applications. My work combines scientific
                  research with programming and software development to make
                  environmental data and analytical methods more accessible
                  and useful. I have a background in Hydraulic and Water
                  Resources Engineering and Sustainable Water Resources
                  Engineering, complemented by formal training in software
                  engineering and extensive experience with Python and
                  scientific computing.
                </p>
              </div>
            </section>

            {/* Education */}
            <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60 sm:p-10">
              <h2 className="flex items-center gap-3 text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400">
                  🎓
                </span>
                Education
              </h2>

              <ul className="mt-6 space-y-6">
                <li className="relative border-l-2 border-slate-200 pl-6 dark:border-slate-700">
                  <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-white bg-blue-600 dark:border-slate-900 dark:bg-blue-500" />
                  <p className="text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-400">
                    M.Sc.
                  </p>
                  <p className="mt-1 font-medium text-slate-900 dark:text-white">
                    Sustainable Water Resources Engineering
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Arba Minch University, Ethiopia
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      GPA:
                    </span>{" "}
                    3.75 / 4.00
                  </p>
                  <p className="mt-2 text-sm italic leading-relaxed text-slate-600 dark:text-slate-400">
                    <span className="font-semibold not-italic text-slate-700 dark:text-slate-300">
                      Thesis:
                    </span>{" "}
                    Effect of El Niño Southern Oscillation on Rainfall and
                    Streamflow
                  </p>
                </li>

                <li className="relative border-l-2 border-slate-200 pl-6 dark:border-slate-700">
                  <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-white bg-cyan-600 dark:border-slate-900 dark:bg-cyan-500" />
                  <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-400">
                    B.Sc.
                  </p>
                  <p className="mt-1 font-medium text-slate-900 dark:text-white">
                    Hydraulic and Water Resources Engineering
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Arba Minch University, Ethiopia
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      GPA:
                    </span>{" "}
                    3.73 / 4.00
                  </p>
                </li>

                <li className="relative border-l-2 border-slate-200 pl-6 dark:border-slate-700">
                  <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-white bg-slate-400 dark:border-slate-900 dark:bg-slate-500" />
                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                    Training
                  </p>
                  <p className="mt-1 font-medium text-slate-900 dark:text-white">
                    Software Engineering
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    ALX-Africa
                  </p>
                </li>
              </ul>
            </section>
          </div>

          {/* ----- RIGHT COLUMN: Sidebar ----- */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Role Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
              <h3 className="flex items-center gap-3 text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-400">
                  ⚑
                </span>
                Role
              </h3>

              <ul className="mt-5 space-y-3 text-sm leading-relaxed">
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600 dark:bg-blue-500" />
                  <span className="font-semibold text-blue-700 dark:text-blue-400">
                    Lecturer and Researcher
                  </span>
                </li>

                <li>
                  <p className="flex gap-2 font-semibold text-cyan-700 dark:text-cyan-400">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-600 dark:bg-cyan-500" />
                    <span>Professional &amp; Research Service</span>
                  </p>

                  <ul className="mt-2 space-y-2 pl-6">
                    <li className="flex gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-500 dark:bg-blue-400" />
                      <span className="font-medium text-blue-700 dark:text-blue-400">
                        CMIP7 MB Task Team Member
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-500 dark:bg-blue-400" />
                      <span className="font-medium text-blue-700 dark:text-blue-400">
                        Peer Reviewer
                      </span>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            {/* Connect Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Connect
              </h3>

              <div className="mt-4 space-y-2">
                <a
                  href="/cv"
                  className="group flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 transition-all hover:bg-blue-600 hover:text-white dark:bg-slate-800/60 dark:text-slate-200 dark:hover:bg-blue-600 dark:hover:text-white"
                >
                  <span>Curriculum Vitae</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>

                <a
                  href="https://demisodaba.github.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 transition-all hover:bg-blue-600 hover:text-white dark:bg-slate-800/60 dark:text-slate-200 dark:hover:bg-blue-600 dark:hover:text-white"
                >
                  <span>Professional Website</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>

              <div className="mt-6 border-t border-slate-200 pt-5 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  Research Profiles
                </h4>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <a
                    href={profile.orcid || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-slate-200 px-3 py-2 text-center text-xs font-semibold text-slate-700 transition-colors hover:border-blue-500 hover:text-blue-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:text-blue-400"
                  >
                    ORCID
                  </a>
                  <a
                    href={profile.researchgate || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-slate-200 px-3 py-2 text-center text-xs font-semibold text-slate-700 transition-colors hover:border-blue-500 hover:text-blue-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:text-blue-400"
                  >
                    ResearchGate
                  </a>
                  <a
                    href={profile.github || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-slate-200 px-3 py-2 text-center text-xs font-semibold text-slate-700 transition-colors hover:border-blue-500 hover:text-blue-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:text-blue-400"
                  >
                    GitHub
                  </a>
                  <a
                    href={profile.linkedin || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-slate-200 px-3 py-2 text-center text-xs font-semibold text-slate-700 transition-colors hover:border-blue-500 hover:text-blue-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:text-blue-400"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </article>

      <Footer profile={profile} />
    </main>
  );
}