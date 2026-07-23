import type { Metadata } from "next";
import Link from "next/link";
import { House } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";

export const metadata: Metadata = { title: "Page Not Found" };

const popularLinks = [
  { label: "Doctors", href: "/doctors" },
  { label: "Departments", href: "/departments" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-[80svh] items-center">
      <Container className="py-24 text-center">
        <Badge className="mx-auto">Page Not Found</Badge>
        <p className="text-gradient font-display text-[7rem] leading-none font-bold sm:text-[10rem]">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl">
          This page took a sick day
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/">
              <House aria-hidden />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/appointment">Book Appointment</Link>
          </Button>
        </div>

        <p className="mt-12 text-sm text-muted">
          Popular:{" "}
          {popularLinks.map((link, index) => (
            <span key={link.href}>
              {index > 0 ? <span aria-hidden> · </span> : null}
              <Link
                href={link.href}
                className="underline-offset-4 hover:text-primary hover:underline"
              >
                {link.label}
              </Link>
            </span>
          ))}
        </p>
      </Container>
    </div>
  );
}
