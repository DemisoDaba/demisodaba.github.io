"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ResearchSection from "@/components/ResearchSection";
import WorkSection from "@/components/WorkSection";
import Footer from "@/components/Footer";

import type {
  Profile,
  Project,
  Publication,
  Software,
} from "@/components/types";

const fallbackProfile: Profile = {
  name: "Demiso Daba",
  title: "Hydrology · Climate Science · AI",
  affiliation:
    "Arba Minch Water Technology Institute, Arba Minch University",
  bio:
    "Researcher working at the intersection of hydrology, climate science, Earth observation, artificial intelligence, and geospatial analysis.",
  research_interests:
    "Hydrology, climate science, remote sensing, CMIP6, AI/ML, geospatial science",
  email: "demisod390@gmail.com",
  location: "Arba Minch, Ethiopia",
  profile_image_url: null,
  orcid: "https://orcid.org/0000-0002-8431-2575",
  google_scholar: null,
  researchgate: "https://www.researchgate.net/profile/Demiso-Daba",
  github: "https://github.com/DemisoDaba",
  linkedin: null,
  cv_url: null,
};

export default function Home() {
  const [profile, setProfile] = useState<Profile>(fallbackProfile);
  const [projects, setProjects] = useState<Project[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [software, setSoftware] = useState<Software[]>([]);

  useEffect(() => {
    async function loadData() {
      const [
        { data: profileData },
        { data: projectData },
        { data: publicationData },
        { data: softwareData },
      ] = await Promise.all([
        supabase.from("profile").select("*").limit(1).maybeSingle(),

        supabase
          .from("projects")
          .select("*")
          .eq("published", true)
          .order("featured", { ascending: false })
          .order("year", { ascending: false })
          .limit(6),

        supabase
          .from("publications")
          .select("*")
          .eq("published", true)
          .order("featured", { ascending: false })
          .order("year", { ascending: false })
          .limit(6),

        supabase
          .from("software_data")
          .select("*")
          .eq("published", true)
          .order("featured", { ascending: false })
          .order("year", { ascending: false })
          .limit(6),
      ]);

      if (profileData) setProfile(profileData);
      if (projectData) setProjects(projectData);
      if (publicationData) setPublications(publicationData);
      if (softwareData) setSoftware(softwareData);
    }

    loadData();
  }, []);

  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />

      <Hero profile={profile} />

      <WorkSection
        projects={projects}
        publications={publications}
      />

      <ResearchSection software={software} />

      <Footer profile={profile} />
    </main>
  );
}