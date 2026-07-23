"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavEntry } from "@/types";

interface MegaMenuProps {
  entry: NavEntry;
  active: boolean;
}

export function MegaMenu({ entry, active }: MegaMenuProps) {
  const [open, setOpen] = React.useState(false);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const columns = React.useMemo(() => entry.mega ?? [], [entry.mega]);

  /* Close on route change */
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* Cleanup pending close on unmount */
  React.useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    []
  );

  /* Close on outside click */
  React.useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  function openMenu() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
        onFocus={openMenu}
        className={cn(
          "relative flex cursor-pointer items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
          active ? "text-primary" : "text-muted hover:text-foreground"
        )}
      >
        {entry.label}
        <ChevronDown
          aria-hidden
          className={cn(
            "size-3.5 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
        {active ? (
          <span
            aria-hidden
            className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-primary"
          />
        ) : null}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="glass absolute top-full left-1/2 mt-3 grid w-[46rem] max-w-[92vw] -translate-x-1/2 grid-cols-2 gap-6 rounded-3xl border border-border p-7 shadow-lifted sm:grid-cols-3"
          >
            {columns.map((column) => (
              <div key={column.heading}>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  {column.heading}
                </p>
                <ul className="mt-3 flex flex-col gap-1">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="group flex flex-col rounded-2xl px-3 py-2.5 transition-colors hover:bg-muted-soft"
                      >
                        <span className="text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                          {link.label}
                        </span>
                        {link.description ? (
                          <span className="mt-0.5 text-xs text-muted">
                            {link.description}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
