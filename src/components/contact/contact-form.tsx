"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const subjects = [
  "General Enquiry",
  "Appointment Help",
  "Insurance",
  "Feedback",
  "Careers",
];

export function ContactForm() {
  const [success, setSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "General Enquiry",
      message: "",
    },
  });

  function onValid() {
    setSuccess(true);
  }

  function sendAnother() {
    reset();
    setSuccess(false);
  }

  if (success) {
    return (
      <div className="animate-scale-in py-10 text-center">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald/10">
          <CheckCircle2 className="size-8 text-emerald" aria-hidden />
        </div>
        <h3 className="mt-5 font-display text-xl font-bold">Message sent!</h3>
        <p className="mt-2 text-sm text-muted">
          We&apos;ll respond within 24 hours.
        </p>
        <Button variant="ghost" className="mt-6" onClick={sendAnother}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onValid)} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-name">Full name</Label>
          <Input
            id="contact-name"
            placeholder="e.g. Rahul Verma"
            autoComplete="name"
            aria-invalid={!!errors.name}
            {...register("name", {
              required: "Please enter your name",
            })}
          />
          {errors.name ? (
            <p role="alert" className="text-xs text-red-500">
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-email">Email address</Label>
          <Input
            id="contact-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email", {
              required: "Please enter your email address",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email ? (
            <p role="alert" className="text-xs text-red-500">
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-phone">Phone (optional)</Label>
          <Input
            id="contact-phone"
            type="tel"
            inputMode="numeric"
            placeholder="10-digit mobile number"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            {...register("phone", {
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: "Enter a valid 10-digit mobile number",
              },
            })}
          />
          {errors.phone ? (
            <p role="alert" className="text-xs text-red-500">
              {errors.phone.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-subject">Subject</Label>
          <Select id="contact-subject" {...register("subject")}>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <Label htmlFor="contact-message">Message</Label>
          <Textarea
            id="contact-message"
            placeholder="How can we help you?"
            aria-invalid={!!errors.message}
            {...register("message", {
              required: "Please write your message",
              minLength: {
                value: 10,
                message: "Message must be at least 10 characters",
              },
            })}
          />
          {errors.message ? (
            <p role="alert" className="text-xs text-red-500">
              {errors.message.message}
            </p>
          ) : null}
        </div>
      </div>

      <Button type="submit" className="mt-6">
        Send Message
        <Send aria-hidden />
      </Button>
    </form>
  );
}
