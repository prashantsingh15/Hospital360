"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";

function NewsletterForm() {
  const [subscribed, setSubscribed] = React.useState(false);

  if (subscribed) {
    return (
      <p
        role="status"
        className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 text-emerald-soft"
      >
        <CheckCircle2 className="size-5" aria-hidden />
        You’re subscribed — welcome!
      </p>
    );
  }

  return (
    <form
      className="mx-auto mt-8 flex max-w-md gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        setSubscribed(true);
      }}
    >
      <Input
        type="email"
        required
        aria-label="Email address"
        placeholder="you@example.com"
        className="border-white/25 bg-white/10 text-white placeholder:text-white/60"
      />
      <Button variant="white" type="submit">
        Subscribe
      </Button>
    </form>
  );
}

export function NewsletterCta() {
  return (
    <Section aria-label="Newsletter signup">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary via-primary-hover to-primary-active px-6 py-14 text-center text-white sm:p-16">
          <div aria-hidden className="absolute inset-0 bg-dots opacity-20" />
          <div
            aria-hidden
            className="absolute -right-20 -bottom-20 size-72 rounded-full bg-emerald/30 blur-3xl"
          />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Stay ahead of your health
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Monthly health tips, screening reminders and hospital updates. No
              spam.
            </p>
            <NewsletterForm />
            <p className="mt-4 text-xs text-white/60">
              Unsubscribe anytime. Read our{" "}
              <Link
                href="/privacy-policy"
                className="underline underline-offset-2 hover:text-white"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
