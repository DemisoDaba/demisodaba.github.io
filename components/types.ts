export type Profile = {
  name: string | null;
  title: string | null;
  affiliation: string | null;
  bio: string | null;
  research_interests: string | null;
  email: string | null;
  location: string | null;
  profile_image_url: string | null;
  orcid: string | null;
  google_scholar: string | null;
  researchgate: string | null;
  github: string | null;
  linkedin: string | null;
  cv_url: string | null;
};

export type Project = {
  id: string;
  title: string;
  description: string | null;
  role: string | null;
  status: string | null;
  year: number | null;
  funding: string | null;
  location: string | null;
  url: string | null;
  image_url: string | null;
  featured: boolean | null;
};

export type Publication = {
  id: string;
  title: string;
  authors: string | null;
  journal: string | null;
  year: number | null;
  doi: string | null;
  abstract: string | null;
  url: string | null;
  featured: boolean | null;
};

export type Software = {
  id: string;
  title: string;
  description: string | null;
  type: string | null;
  category: string | null;
  url: string | null;
  github_url: string | null;
  documentation_url: string | null;
  image_url: string | null;
  year: number | null;
  featured: boolean | null;
};
