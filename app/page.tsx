
"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import type { Profile } from "@/components/types";
import { supabase } from "@/lib/supabase";

/**
 * Fallback profile.
 * This is displayed immediately while Supabase is loading
 * and used if no profile record is available.
 */
const fallbackProfile: Profile = {
  name: "Demiso Daba",
  title: "Researcher | Lecturer | Early Career Scientist",
  affiliation: "Arba Minch University",
  bio: null,
  research_interests:
    "Water Resources · Climate Science · Earth System Modelling · Remote Sensing · CMIP · Artificial Intelligence · Machine Learning · Hydrology · Geospatial Science",
  email: null,
  location: "Arba Minch, Ethiopia",
  profile_image_url: null,
  orcid: null,
  google_scholar: null,
  researchgate: null,
  github: null,
  linkedin: null,
  cv_url: null,
};

export default function Home() {
  const [profile, setProfile] = useState<Profile>(fallbackProfile);

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      try {
        const { data, error } = await supabase
          .from("profile")
          .select("*")
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error("Error loading profile:", error);
          return;
        }

        if (data && mounted) {
          setProfile(data as Profile);
        }
      } catch (error) {
        console.error("Unexpected error loading profile:", error);
      }
    }

    loadProfile();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />

      <Hero profile={profile} />

      <Footer profile={profile} />
    </main>
  );
}