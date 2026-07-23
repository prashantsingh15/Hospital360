"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { navEntries } from "@/data/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { MegaMenu } from "./mega-menu";
import { MobileDrawer } from "./mobile-drawer";
import { SearchDialog } from "./search-dialog";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "glass border-b border-border shadow-soft"
            : "bg-transparent"
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-4 sm:h-20">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {navEntries.map((entry) =>
              entry.mega ? (
                <MegaMenu
                  key={entry.label}
                  entry={entry}
                  active={isActive(entry.href)}
                />
              ) : (
                <Link
                  key={entry.label}
                  href={entry.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isActive(entry.href)
                      ? "text-primary"
                      : "text-muted hover:text-foreground"
                  )}
                >
                  {entry.label}
                  {isActive(entry.href) ? (
                    <span
                      aria-hidden
                      className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-primary"
                    />
                  ) : null}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="grid size-11 cursor-pointer place-items-center rounded-full border border-border bg-surface text-muted transition-all duration-200 hover:border-primary/50 hover:text-primary"
            >
              <Search className="size-4" aria-hidden />
            </button>
            <ThemeToggle />
            <Button
              variant="emerald"
              size="sm"
              asChild
              className="hidden xl:inline-flex"
            >
              <a href={site.emergencyHref}>
                <Phone aria-hidden />
                {site.emergency}
              </a>
            </Button>
            <Button size="sm" asChild className="hidden md:inline-flex">
              <Link href="/appointment">Book Appointment</Link>
            </Button>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setDrawerOpen(true)}
              className="grid size-11 cursor-pointer place-items-center rounded-full border border-border bg-surface text-foreground transition-all duration-200 hover:border-primary/50 hover:text-primary lg:hidden"
            >
              <Menu className="size-5" aria-hidden />
            </button>
          </div>
        </Container>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <MobileDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </>
  );
}
