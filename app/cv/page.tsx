"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import type { Profile } from "@/components/types";

type CVData = {
  id: string;
  [key: string]: unknown;
};

function getText(data: CVData | null, key: string) {
  if (!data) return "";

  const value = data[key];

  if (value === null || value === undefined) {
    return "";
  }

  return String(value);
}

export default function CVPage() {
  const [cv, setCv] = useState<CVData | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCV();
  }, []);

  async function loadCV() {
    setLoading(true);

    const [cvResult, profileResult] = await Promise.all([
      supabase
        .from("cv")
        .select("*")
        .limit(1)
        .maybeSingle(),

      supabase
        .from("profile")
        .select("*")
        .limit(1)
        .maybeSingle(),
    ]);

    if (cvResult.error) {
      console.error("Error loading CV:", cvResult.error);
    }

    if (profileResult.error) {
      console.error("Error loading profile:", profileResult.error);
    }

    setCv(cvResult.data);

    if (!profileResult.error) {
      setProfile(profileResult.data);
    }

    setLoading(false);
  }

  const cvUrl =
    getText(cv, "cv_url") ||
    getText(cv, "url") ||
    getText(cv, "file_url") ||
    getText(cv, "pdf_url");

  const education =
    getText(cv, "education") ||
    getText(cv, "education_text");

  const experience =
    getText(cv, "experience") ||
    getText(cv, "experience_text");

  const research =
    getText(cv, "research") ||
    getText(cv, "research_interests");

  const skills =
    getText(cv, "skills") ||
    getText(cv, "technical_skills");

  const awards =
    getText(cv, "awards") ||
    getText(cv, "awards_text");

  const certifications =
    getText(cv, "certifications") ||
    getText(cv, "certifications_text");

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
                  Academic Profile
                </span>
              </div>

              <h1 className="text-3xl font-bold leading-[1] tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                <span className="underline decoration-purple-500/60 decoration-[2px] underline-offset-[8px]">
                  Curriculum
                </span>{" "}
                <span>&</span>{" "}
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 bg-clip-text text-transparent underline decoration-purple-500/60 decoration-[2px] underline-offset-[8px]">
                  Vitae
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-400 sm:text-lg sm:leading-8">
                Academic background, research experience, professional
                activities, technical skills, publications, and other
                scholarly achievements.
              </p>
            </div>

            {cvUrl && (
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:-translate-y-0.5 hover:opacity-95"
              >
                Download CV →
              </a>
            )}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-5xl px-6 pb-24 lg:px-10">
        {loading ? (
          <div className="space-y-6">
            <div className="h-48 animate-pulse rounded-[28px] bg-slate-100 dark:bg-slate-900" />
            <div className="h-48 animate-pulse rounded-[28px] bg-slate-100 dark:bg-slate-900" />
            <div className="h-48 animate-pulse rounded-[28px] bg-slate-100 dark:bg-slate-900" />
          </div>
        ) : !cv ? (
          <div className="rounded-[32px] border border-slate-200 bg-white p-20 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-xl font-semibold">
              CV information is not available yet
            </h3>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              The academic CV will appear here once it has been added.
            </p>
          </div>
        ) : (
          <div className="space-y-7">
            {education && (
              <CVSection title="Education" text={education} />
            )}

            {experience && (
              <CVSection
                title="Professional Experience"
                text={experience}
              />
            )}

            {research && (
              <CVSection
                title="Research Interests"
                text={research}
              />
            )}

            {skills && (
              <CVSection
                title="Technical Skills"
                text={skills}
              />
            )}

            {awards && (
              <CVSection
                title="Awards & Achievements"
                text={awards}
              />
            )}

            {certifications && (
              <CVSection
                title="Certifications"
                text={certifications}
              />
            )}

            {!education &&
              !experience &&
              !research &&
              !skills &&
              !awards &&
              !certifications && (
                <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">
                    CV information has been added to the database, but no
                    displayable sections are currently available.
                  </p>
                </div>
              )}
          </div>
        )}
      </section>

      <Footer profile={profile} />
    </main>
  );
}

function CVSection({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <section className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_20px_60px_-35px_rgba(76,29,149,0.35)] dark:border-slate-800 dark:bg-slate-900">
      <div className="h-1 w-full bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500" />

      <div className="p-7 sm:p-9">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-8 bg-gradient-to-r from-purple-500 to-pink-500" />

          <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-purple-600 dark:text-purple-400">
            Academic Record
          </span>
        </div>

        <h2 className="text-2xl font-bold">
          {title}
        </h2>

        <div className="mt-5 whitespace-pre-line text-justify text-sm leading-8 text-slate-600 dark:text-slate-400">
          {text}
        </div>
      </div>
    </section>
  );
}