"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "/#about" },
  { label: "Research", href: "/#research" },
  { label: "Work", href: "/#work" },
  { label: "Software", href: "/#software" },
  { label: "Publications", href: "/publications" },
  { label: "News", href: "/news" },
  { label: "CV", href: "/cv" },
];

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  function toggleTheme() {
    const next = !dark;

    setDark(next);

    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-[#4a3b9b] via-[#7f4cae] to-[#d271a6] text-white shadow-sm">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center px-5 sm:px-6 lg:px-10">

        {/* Brand */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="group flex shrink-0 items-center gap-3"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-[11px] font-bold tracking-tight transition-all duration-200 group-hover:border-white group-hover:bg-white group-hover:text-[#4a3b9b]">
            D
          </span>

          <span className="text-[15px] font-semibold tracking-[-0.02em]">
            Demiso Daba
          </span>
        </Link>

        {/* Search */}
        <div className="mx-6 hidden max-w-[300px] flex-1 lg:block">
          <div className="relative">
            <svg
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            <input
              type="search"
              placeholder="Search..."
              aria-label="Search website"
              className="h-9 w-full rounded-full border border-white/20 bg-white pl-10 pr-4 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-white/40"
            />
          </div>
        </div>

        {/* Desktop navigation */}
        <nav className="ml-auto hidden items-center md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-md px-2.5 py-2 text-[12.5px] font-medium text-white/90 transition hover:bg-white/10 hover:text-white lg:px-3"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop theme */}
        <div className="ml-4 hidden items-center border-l border-white/20 pl-4 sm:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="rounded-full p-2 text-white/90 transition hover:bg-white/10 hover:text-white"
          >
            {dark ? (
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            ) : (
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="ml-auto rounded-md p-2 transition hover:bg-white/10 md:hidden"
        >
          {menuOpen ? (
            <svg
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-[#5d429f] md:hidden">
          <nav className="mx-auto max-w-7xl px-5 py-3">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}

            <button
              type="button"
              onClick={toggleTheme}
              className="mt-2 w-full border-t border-white/10 px-4 py-4 text-left text-sm text-white/90"
            >
              {dark ? "Switch to light mode" : "Switch to dark mode"}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
