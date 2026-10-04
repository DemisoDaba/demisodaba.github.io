import type { Profile } from "@/components/types";

type FooterProps = {
  profile: Profile;
};

export default function Footer({ profile }: FooterProps) {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-6 py-8 text-xs text-slate-500 dark:text-slate-400 md:flex-row lg:px-10">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>

        <span>
          Hydrology · Climate · Earth Observation · AI
        </span>
      </div>
    </footer>
  );
}
