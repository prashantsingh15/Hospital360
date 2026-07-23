import Link from "next/link";
import { Award, Clock, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { footerNav } from "@/data/navigation";
import { Container } from "@/components/shared/container";
import { LogoMark } from "@/components/shared/logo";
import { NewsletterForm } from "./newsletter-form";

/**
 * Brand glyphs are no longer shipped with lucide-react, so the social marks
 * are kept here as feather-style stroke icons (same 24×24 grid as lucide).
 */
const socialGlyphs: Record<string, React.ReactNode> = {
  Twitter: (
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  ),
  Facebook: (
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  ),
  Instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </>
  ),
  LinkedIn: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  YouTube: (
    <>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </>
  ),
};

const accreditations = [
  "NABH Accredited",
  "JCI Certified",
  "ISO 9001:2015",
  "NABL Certified",
];

export function Footer() {
  return (
    <footer className="bg-dark text-white">
      {/* Newsletter band */}
      <Container className="grid items-center gap-8 border-b border-white/10 py-14 lg:grid-cols-2">
        <div>
          <h3 className="font-display text-2xl font-bold sm:text-3xl">
            Health insights, once a month.
          </h3>
          <p className="mt-3 text-white/60">
            Practical health tips from our doctors, hospital updates and
            patient stories — no spam, unsubscribe anytime.
          </p>
        </div>
        <NewsletterForm />
      </Container>

      {/* Main grid */}
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div>
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="inline-flex items-center gap-2.5"
          >
            <LogoMark />
            <span className="font-display text-xl font-bold">
              Hospital<span className="text-primary">360</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60 line-clamp-3">
            {site.description}
          </p>

          <ul className="mt-6 flex flex-col gap-3">
            <li className="flex items-start gap-3 text-sm text-white/70">
              <MapPin
                className="mt-0.5 size-4 shrink-0 text-primary"
                aria-hidden
              />
              <span>
                {site.address.line1}, {site.address.city}, {site.address.state}{" "}
                - {site.address.pin}
              </span>
            </li>
            <li>
              <a
                href={site.phoneHref}
                className="flex items-start gap-3 text-sm text-white/70 transition-colors hover:text-white"
              >
                <Phone
                  className="mt-0.5 size-4 shrink-0 text-primary"
                  aria-hidden
                />
                {site.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex items-start gap-3 text-sm text-white/70 transition-colors hover:text-white"
              >
                <Mail
                  className="mt-0.5 size-4 shrink-0 text-primary"
                  aria-hidden
                />
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-3 text-sm text-white/70">
              <Clock
                className="mt-0.5 size-4 shrink-0 text-primary"
                aria-hidden
              />
              {site.hours}
            </li>
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            {site.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="grid size-10 place-items-center rounded-full border border-white/15 text-white/70 transition-all hover:border-primary hover:bg-primary hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4"
                  aria-hidden
                >
                  {socialGlyphs[social.label]}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {footerNav.map((column) => (
          <nav key={column.heading} aria-label={column.heading}>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/60">
              {column.heading}
            </h4>
            <ul className="mt-4 flex flex-col">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-block py-1 text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      {/* Accreditations */}
      <Container className="flex flex-wrap gap-3 pb-8">
        {accreditations.map((label) => (
          <span
            key={label}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-xs text-white/70"
          >
            <Award className="size-3.5 text-primary" aria-hidden />
            {label}
          </span>
        ))}
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Hospital360. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
          </div>
          <p className="flex items-center gap-2">
            <span className="relative flex size-2" aria-hidden>
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald" />
            </span>
            Emergency 24×7:{" "}
            <a
              href={site.emergencyHref}
              className="text-white/80 transition-colors hover:text-white"
            >
              {site.emergency}
            </a>
          </p>
        </Container>
      </div>
    </footer>
  );
}
