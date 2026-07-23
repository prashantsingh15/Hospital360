"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { navEntries } from "@/data/navigation";
import {
  Sheet,
  SheetClose,
  SheetCloseButton,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";

interface MobileDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileDrawer({ open, onOpenChange }: MobileDrawerProps) {
  const pathname = usePathname();
  const [openSection, setOpenSection] = React.useState<string | null>(null);

  /* Close the drawer on route change (e.g. browser back/forward) */
  React.useEffect(() => {
    onOpenChange(false);
  }, [pathname, onOpenChange]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent aria-label="Menu">
        <SheetHeader className="border-b border-border">
          <Logo />
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetCloseButton />
        </SheetHeader>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5">
          {navEntries.map((entry) =>
            entry.mega ? (
              <div key={entry.label} className="border-b border-border">
                <button
                  type="button"
                  aria-expanded={openSection === entry.label}
                  onClick={() =>
                    setOpenSection((current) =>
                      current === entry.label ? null : entry.label
                    )
                  }
                  className="flex h-12 w-full cursor-pointer items-center justify-between text-base font-medium text-foreground"
                >
                  {entry.label}
                  <ChevronDown
                    aria-hidden
                    className={cn(
                      "size-4 text-muted transition-transform duration-200",
                      openSection === entry.label && "rotate-180"
                    )}
                  />
                </button>
                {openSection === entry.label ? (
                  <div className="pb-3 pl-4">
                    {entry.mega.map((column) => (
                      <div key={column.heading}>
                        <p className="pt-2 text-xs font-semibold uppercase tracking-wider text-muted">
                          {column.heading}
                        </p>
                        {column.links.map((link) => (
                          <SheetClose asChild key={link.label}>
                            <Link
                              href={link.href}
                              className="flex h-11 items-center text-sm text-muted transition-colors hover:text-primary"
                            >
                              {link.label}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              <SheetClose asChild key={entry.label}>
                <Link
                  href={entry.href}
                  className={cn(
                    "flex h-12 items-center border-b border-border text-base font-medium",
                    pathname === entry.href
                      ? "text-primary"
                      : "text-foreground"
                  )}
                >
                  {entry.label}
                </Link>
              </SheetClose>
            )
          )}
        </nav>

        <div className="flex flex-col gap-3 border-t border-border p-5 pb-safe">
          <Button variant="emerald" asChild>
            <a href={site.emergencyHref}>
              <Phone aria-hidden />
              {`Emergency: ${site.emergency}`}
            </a>
          </Button>
          <SheetClose asChild>
            <Button asChild>
              <Link href="/appointment">Book Appointment</Link>
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
