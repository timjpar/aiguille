"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/lib/site";

function NeedleMark() {
  // A thin alpine needle / peak — the "aiguille".
  return (
    <svg
      width="20"
      height="26"
      viewBox="0 0 20 26"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M10 0 L20 26 H0 Z" fill="var(--color-basalt)" />
      <path d="M10 0 L14.5 26 H10 Z" fill="var(--color-send)" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // Lock scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-limestone/85 backdrop-blur-md">
      <div className="wrap flex items-center justify-between gap-6 py-3.5">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label={`${SITE.name} home`}
        >
          <NeedleMark />
          <span className="leading-none">
            <span className="font-display text-[1.35rem] font-extrabold uppercase tracking-tight text-basalt">
              Aiguille
            </span>
            <span className="mt-0.5 hidden font-mono text-[0.55rem] uppercase tracking-[0.24em] text-granite sm:block">
              Rock Climbing Center
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Primary"
        >
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`font-mono text-[0.72rem] uppercase tracking-[0.14em] transition-colors ${
                  active
                    ? "text-send"
                    : "text-granite hover:text-basalt"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a href={SITE.waiverUrl} className="btn btn--ink hidden sm:inline-flex">
            Sign waiver
          </a>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center border border-line-strong lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              {open ? (
                <path
                  d="M4 4l12 12M16 4L4 16"
                  stroke="var(--color-basalt)"
                  strokeWidth="1.8"
                />
              ) : (
                <path
                  d="M3 6h14M3 10h14M3 14h14"
                  stroke="var(--color-basalt)"
                  strokeWidth="1.8"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-line bg-limestone lg:hidden"
        >
          <nav className="wrap flex flex-col py-2" aria-label="Mobile">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between border-b border-line py-4 font-display text-xl font-bold uppercase tracking-tight text-basalt"
              >
                {item.label}
                <span className="font-mono text-xs text-granite-400">→</span>
              </Link>
            ))}
            <a
              href={SITE.waiverUrl}
              className="btn btn--send mt-4 justify-center"
            >
              Sign waiver
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
