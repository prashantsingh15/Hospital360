"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm() {
  const [subscribed, setSubscribed] = React.useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "");
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubscribed(true);
    }
  }

  if (subscribed) {
    return (
      <p className="flex items-center gap-2 text-emerald lg:justify-end">
        <CheckCircle2 className="size-5 shrink-0" aria-hidden />
        <span className="text-sm font-medium">You&apos;re on the list!</span>
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-3">
      <Input
        name="email"
        type="email"
        required
        aria-label="Email address"
        placeholder="Your email address"
        className="flex-1 border-white/15 bg-white/10 text-white placeholder:text-white/50 focus-visible:border-primary"
      />
      <Button type="submit">Subscribe</Button>
    </form>
  );
}
