"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CalendarCheck, CheckCircle2 } from "lucide-react";
import { departments, doctors } from "@/data";
import { site } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";

const highlights = [
  "No queues — confirmed slots",
  "250+ specialists across 40+ departments",
  "Free rescheduling up to 2 hrs before",
];

const timeSlots = ["Morning", "Afternoon", "Evening"];

const fieldClass = "flex flex-col gap-1.5";

function QuickAppointmentForm() {
  const router = useRouter();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/appointment");
  }

  return (
    <form
      onSubmit={onSubmit}
      aria-label="Quick appointment request"
      className="grid gap-4 sm:grid-cols-2"
    >
      <div className={fieldClass}>
        <Label htmlFor="qa-department">Department</Label>
        <Select id="qa-department" name="department" defaultValue="">
          <option value="" disabled>
            Select department
          </option>
          {departments.map((department) => (
            <option key={department.id} value={department.slug}>
              {department.name}
            </option>
          ))}
        </Select>
      </div>

      <div className={fieldClass}>
        <Label htmlFor="qa-doctor">Doctor</Label>
        <Select id="qa-doctor" name="doctor" defaultValue="">
          <option value="" disabled>
            Select doctor
          </option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.slug}>
              {doctor.name}
            </option>
          ))}
        </Select>
      </div>

      <div className={fieldClass}>
        <Label htmlFor="qa-name">Full name</Label>
        <Input
          id="qa-name"
          name="name"
          required
          autoComplete="name"
          placeholder="Your full name"
        />
      </div>

      <div className={fieldClass}>
        <Label htmlFor="qa-phone">Phone</Label>
        <Input
          id="qa-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="+91 98765 43210"
        />
      </div>

      <div className={fieldClass}>
        <Label htmlFor="qa-date">Preferred date</Label>
        <Input id="qa-date" name="date" type="date" />
      </div>

      <div className={fieldClass}>
        <Label htmlFor="qa-time">Time</Label>
        <Select id="qa-time" name="time" defaultValue="">
          <option value="" disabled>
            Select slot
          </option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot.toLowerCase()}>
              {slot}
            </option>
          ))}
        </Select>
      </div>

      <Button type="submit" size="lg" className="w-full sm:col-span-2">
        <CalendarCheck aria-hidden />
        Request Appointment
      </Button>
    </form>
  );
}

export function QuickAppointment() {
  return (
    <Section id="quick-appointment" aria-label="Quick appointment">
      <Reveal>
        <Card className="grid overflow-hidden lg:grid-cols-2">
          <div className="relative bg-gradient-to-br from-primary to-primary-active p-8 text-white sm:p-12">
            <div aria-hidden className="absolute inset-0 bg-dots opacity-20" />
            <div className="relative flex h-full flex-col gap-5">
              <Badge variant="glass" className="border-white/25 text-white">
                Quick Appointment
              </Badge>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Book in under 60 seconds.
              </h2>
              <ul className="flex flex-col gap-3">
                {highlights.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm sm:text-base"
                  >
                    <CheckCircle2
                      className="mt-0.5 size-5 shrink-0 text-emerald-soft"
                      aria-hidden
                    />
                    {point}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-4 text-sm text-white/70">
                Prefer talking? Call{" "}
                <a
                  href={site.phoneHref}
                  className="font-semibold text-white underline-offset-4 hover:underline"
                >
                  {site.phone}
                </a>
              </p>
            </div>
          </div>
          <div className="p-6 sm:p-10">
            <QuickAppointmentForm />
          </div>
        </Card>
      </Reveal>
    </Section>
  );
}
