"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import {
  Building2,
  FileText,
  Search,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import { departments } from "@/data/departments";
import { doctors } from "@/data/doctors";

type ResultKind = "page" | "department" | "doctor";

interface SearchItem {
  label: string;
  href: string;
  kind: ResultKind;
}

/* Local search index — pages, every department and every doctor. */
const searchIndex: SearchItem[] = [
  { label: "About Us", href: "/about", kind: "page" },
  { label: "Doctors", href: "/doctors", kind: "page" },
  { label: "Departments", href: "/departments", kind: "page" },
  { label: "Services", href: "/services", kind: "page" },
  { label: "Book Appointment", href: "/appointment", kind: "page" },
  { label: "Gallery", href: "/gallery", kind: "page" },
  { label: "Testimonials", href: "/testimonials", kind: "page" },
  { label: "FAQ", href: "/faq", kind: "page" },
  { label: "Blog", href: "/blog", kind: "page" },
  { label: "Contact", href: "/contact", kind: "page" },
  ...departments.map((department) => ({
    label: department.name,
    href: `/departments/${department.slug}`,
    kind: "department" as const,
  })),
  ...doctors.map((doctor) => ({
    label: doctor.name,
    href: `/doctors/${doctor.slug}`,
    kind: "doctor" as const,
  })),
];

const kindIcon: Record<ResultKind, LucideIcon> = {
  page: FileText,
  department: Building2,
  doctor: Stethoscope,
};

const kindLabel: Record<ResultKind, string> = {
  page: "Page",
  department: "Department",
  doctor: "Doctor",
};

const MAX_RESULTS = 12;

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = React.useState("");

  /* Escape closes, even when focus is outside the input */
  React.useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onOpenChange(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  /* Reset the query every time the dialog closes */
  React.useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const trimmed = query.trim().toLowerCase();
  const results = (
    trimmed
      ? searchIndex.filter((item) =>
          item.label.toLowerCase().includes(trimmed)
        )
      : searchIndex.filter((item) => item.kind === "page")
  ).slice(0, MAX_RESULTS);

  return (
    <AnimatePresence>
      {open && (
        <>
          <div
            aria-hidden
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 z-[70] animate-fade-in bg-dark/50 backdrop-blur-sm"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            className="fixed inset-x-4 top-[15vh] z-[80] mx-auto max-w-lg animate-scale-in rounded-3xl border border-border bg-surface shadow-lifted"
          >
            <div className="flex items-center gap-3 border-b border-border px-5">
              <Search className="size-4 shrink-0 text-muted" aria-hidden />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") onOpenChange(false);
                }}
                placeholder="Search doctors, departments, pages…"
                aria-label="Search"
                className="h-14 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted/70"
              />
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {results.length > 0 ? (
                <ul>
                  {results.map((item) => {
                    const Icon = kindIcon[item.kind];
                    return (
                      <li key={`${item.kind}-${item.href}`}>
                        <Link
                          href={item.href}
                          onClick={() => onOpenChange(false)}
                          className="flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors hover:bg-muted-soft"
                        >
                          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-muted-soft text-muted">
                            <Icon className="size-4" aria-hidden />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium text-foreground">
                              {item.label}
                            </span>
                            <span className="block text-xs text-muted">
                              {kindLabel[item.kind]}
                            </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="px-4 py-8 text-center text-sm text-muted">
                  {`No results for “${query}”`}
                </p>
              )}
            </div>

            <div className="border-t border-border px-5 py-3 text-xs text-muted">
              Type to filter · Esc to close
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
