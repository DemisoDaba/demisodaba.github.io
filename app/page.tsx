// app/page.tsx

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import type { Profile } from "@/components/types";
import { supabase } from "@/lib/supabase";

export const revalidate = 0; // always fetch fresh data (no caching)

/**
 * Complete fallback profile.
 * Every field must exist (even as `null`) so the Footer/Hero never crash
 * if Supabase returns no row.
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

export default async function Home() {
  const { data } = await supabase
    .from("profile")
    .select("*")
    .limit(1)
    .maybeSingle();

  // Use the DB row if it exists, otherwise a fully-shaped fallback.
  const profile: Profile = (data as Profile | null) ?? fallbackProfile;

  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />

      <Hero profile={profile} />

      <Footer profile={profile} />
    </main>
  );
}