"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock,
  Phone,
  Stethoscope,
  User,
} from "lucide-react";
import { departments, doctors } from "@/data";
import { cn, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface AppointmentWizardProps {
  initialDoctor?: string;
}

interface AppointmentFormValues {
  fullName: string;
  phone: string;
  email: string;
  gender: string;
  department: string;
  doctor: string;
  date: string;
  timeSlot: string;
  notes: string;
}

const STEPS = ["Details", "Schedule", "Confirm"] as const;

const STEP_FIELDS: Record<number, (keyof AppointmentFormValues)[]> = {
  1: ["fullName", "phone", "email", "gender"],
  2: ["department", "doctor", "date", "timeSlot"],
};

const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

const todayISO = new Date().toISOString().split("T")[0];

const stepMotion = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
  transition: { duration: 0.25 },
};

export function AppointmentWizard({ initialDoctor }: AppointmentWizardProps) {
  const matchedDoctor = doctors.find((d) => d.slug === initialDoctor);

  const [step, setStep] = React.useState(1);
  const [success, setSuccess] = React.useState(false);
  const [refId, setRefId] = React.useState("");
  const [confirmed, setConfirmed] =
    React.useState<AppointmentFormValues | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AppointmentFormValues>({
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      gender: "",
      department: matchedDoctor?.department ?? "",
      doctor: matchedDoctor?.slug ?? "",
      date: "",
      timeSlot: "",
      notes: "",
    },
  });

  const watchedDepartment = watch("department");
  const watchedDoctor = watch("doctor");
  const watchedTimeSlot = watch("timeSlot");

  const departmentDoctors = doctors.filter(
    (d) => d.department === watchedDepartment
  );

  // Reset the doctor when the department changes (but not on first render,
  // where an initialDoctor deep-link may have pre-filled both).
  const isFirstRender = React.useRef(true);
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setValue("doctor", "");
  }, [watchedDepartment, setValue]);

  async function goNext() {
    const valid = await trigger(STEP_FIELDS[step]);
    if (valid) setStep((s) => Math.min(s + 1, 3));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 1));
  }

  function onValid(values: AppointmentFormValues) {
    setConfirmed(values);
    setRefId(`H360-${Math.random().toString(36).slice(2, 7).toUpperCase()}`);
    setSuccess(true);
  }

  function bookAnother() {
    reset();
    setConfirmed(null);
    setRefId("");
    setSuccess(false);
    setStep(1);
  }

  const confirmedDoctor = confirmed
    ? doctors.find((d) => d.slug === confirmed.doctor)
    : undefined;
  const confirmedDepartment = confirmed
    ? departments.find((d) => d.slug === confirmed.department)
    : undefined;

  const summaryDoctor = doctors.find((d) => d.slug === watchedDoctor);
  const summaryDepartment = departments.find(
    (d) => d.slug === watchedDepartment
  );
  const watchedDate = watch("date");

  return (
    <Card className="p-6 sm:p-10">
      <AnimatePresence mode="wait">
        {success && confirmed ? (
          <motion.div
            key="success"
            className="animate-scale-in py-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mx-auto grid size-20 place-items-center rounded-full bg-emerald/10">
              <CheckCircle2 className="size-10 text-emerald" aria-hidden />
            </div>
            <h2 className="mt-6 font-display text-3xl font-bold tracking-tight">
              Appointment Confirmed!
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted">
              Our care team will call {confirmed.phone} within 15 minutes to
              confirm.
            </p>
            <Badge variant="emerald" className="mx-auto mt-5">
              Reference: {refId}
            </Badge>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <Badge variant="outline">
                {confirmedDoctor?.name ?? "Any available doctor"}
              </Badge>
              <Badge variant="outline">{formatDate(confirmed.date)}</Badge>
              <Badge variant="outline">{confirmed.timeSlot}</Badge>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild>
                <Link href="/">Back to Home</Link>
              </Button>
              <Button variant="outline" onClick={bookAnother}>
                Book Another
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Progress header */}
            <div className="mb-10 flex items-start" aria-label="Progress">
              {STEPS.map((label, index) => {
                const number = index + 1;
                const isCompleted = number < step;
                const isCurrent = number === step;
                return (
                  <React.Fragment key={label}>
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={cn(
                          "grid size-10 place-items-center rounded-full text-sm font-semibold",
                          isCompleted && "bg-emerald text-white",
                          isCurrent && "bg-primary text-white shadow-glow",
                          !isCompleted &&
                            !isCurrent &&
                            "bg-muted-soft text-muted"
                        )}
                      >
                        {isCompleted ? (
                          <Check className="size-4" aria-hidden />
                        ) : (
                          number
                        )}
                      </div>
                      <span
                        className={cn(
                          "text-xs font-medium sm:text-sm",
                          isCurrent
                            ? "text-foreground"
                            : "hidden text-muted sm:block"
                        )}
                      >
                        {label}
                      </span>
                    </div>
                    {number < STEPS.length ? (
                      <div
                        aria-hidden
                        className={cn(
                          "mx-2 mt-5 h-0.5 flex-1 sm:mx-4",
                          step > number ? "bg-emerald" : "bg-border"
                        )}
                      />
                    ) : null}
                  </React.Fragment>
                );
              })}
            </div>

            <form onSubmit={handleSubmit(onValid)} noValidate>
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div key="step-1" {...stepMotion}>
                    <h2 className="mb-6 font-display text-xl font-bold tracking-tight">
                      Your details
                    </h2>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="fullName">Full name</Label>
                        <Input
                          id="fullName"
                          placeholder="e.g. Rahul Verma"
                          autoComplete="name"
                          aria-invalid={!!errors.fullName}
                          {...register("fullName", {
                            required: "Please enter your full name",
                            minLength: {
                              value: 3,
                              message: "Name must be at least 3 characters",
                            },
                          })}
                        />
                        {errors.fullName ? (
                          <p role="alert" className="text-xs text-red-500">
                            {errors.fullName.message}
                          </p>
                        ) : null}
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="phone">Mobile number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          inputMode="numeric"
                          placeholder="10-digit mobile number"
                          autoComplete="tel"
                          aria-invalid={!!errors.phone}
                          {...register("phone", {
                            required: "Please enter your mobile number",
                            pattern: {
                              value: /^[6-9]\d{9}$/,
                              message:
                                "Enter a valid 10-digit mobile number",
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
                        <Label htmlFor="email">Email address</Label>
                        <Input
                          id="email"
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
                        <Label htmlFor="gender">Gender</Label>
                        <Select id="gender" {...register("gender")}>
                          <option value="">Select gender</option>
                          <option value="female">Female</option>
                          <option value="male">Male</option>
                          <option value="other">Other</option>
                        </Select>
                      </div>
                    </div>
                  </motion.div>
                ) : null}

                {step === 2 ? (
                  <motion.div key="step-2" {...stepMotion}>
                    <h2 className="mb-6 font-display text-xl font-bold tracking-tight">
                      Schedule
                    </h2>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="department">Department</Label>
                        <Select
                          id="department"
                          aria-invalid={!!errors.department}
                          {...register("department", {
                            required: "Please select a department",
                          })}
                        >
                          <option value="">Select department</option>
                          {departments.map((d) => (
                            <option key={d.slug} value={d.slug}>
                              {d.name}
                            </option>
                          ))}
                        </Select>
                        {errors.department ? (
                          <p role="alert" className="text-xs text-red-500">
                            {errors.department.message}
                          </p>
                        ) : null}
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="doctor">Doctor</Label>
                        <Select id="doctor" {...register("doctor")}>
                          <option value="">Any available doctor</option>
                          {departmentDoctors.map((d) => (
                            <option key={d.slug} value={d.slug}>
                              {d.name}
                            </option>
                          ))}
                        </Select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="date">Preferred date</Label>
                        <Input
                          id="date"
                          type="date"
                          min={todayISO}
                          aria-invalid={!!errors.date}
                          {...register("date", {
                            required: "Please pick a date",
                          })}
                        />
                        {errors.date ? (
                          <p role="alert" className="text-xs text-red-500">
                            {errors.date.message}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="mt-5 flex flex-col gap-2">
                      <Label id="timeSlot-label">Preferred time</Label>
                      <input
                        type="hidden"
                        {...register("timeSlot", {
                          required: "Please pick a time slot",
                        })}
                      />
                      <div
                        role="radiogroup"
                        aria-labelledby="timeSlot-label"
                        className="grid grid-cols-3 gap-2 sm:grid-cols-6"
                      >
                        {TIME_SLOTS.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            role="radio"
                            aria-checked={watchedTimeSlot === slot}
                            onClick={() =>
                              setValue("timeSlot", slot, {
                                shouldValidate: true,
                                shouldTouch: true,
                              })
                            }
                            className={cn(
                              "min-h-11 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors",
                              watchedTimeSlot === slot
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border text-muted hover:border-primary/40 hover:text-primary"
                            )}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                      {errors.timeSlot ? (
                        <p role="alert" className="text-xs text-red-500">
                          {errors.timeSlot.message}
                        </p>
                      ) : null}
                    </div>
                  </motion.div>
                ) : null}

                {step === 3 ? (
                  <motion.div key="step-3" {...stepMotion}>
                    <h2 className="mb-6 font-display text-xl font-bold tracking-tight">
                      Confirm your appointment
                    </h2>

                    <Card className="border-0 bg-muted-soft p-6">
                      <dl className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                          <User
                            className="size-4 shrink-0 text-primary"
                            aria-hidden
                          />
                          <dt className="w-20 shrink-0 text-sm text-muted">
                            Patient
                          </dt>
                          <dd className="text-sm font-medium">
                            {watch("fullName")}
                          </dd>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone
                            className="size-4 shrink-0 text-primary"
                            aria-hidden
                          />
                          <dt className="w-20 shrink-0 text-sm text-muted">
                            Contact
                          </dt>
                          <dd className="text-sm font-medium">
                            {watch("phone")} · {watch("email")}
                          </dd>
                        </div>
                        <div className="flex items-center gap-3">
                          <Stethoscope
                            className="size-4 shrink-0 text-primary"
                            aria-hidden
                          />
                          <dt className="w-20 shrink-0 text-sm text-muted">
                            Doctor
                          </dt>
                          <dd className="text-sm font-medium">
                            {summaryDoctor?.name ?? "Any available doctor"}
                            {summaryDepartment
                              ? ` · ${summaryDepartment.name}`
                              : ""}
                          </dd>
                        </div>
                        <div className="flex items-center gap-3">
                          <CalendarDays
                            className="size-4 shrink-0 text-primary"
                            aria-hidden
                          />
                          <dt className="w-20 shrink-0 text-sm text-muted">
                            Date
                          </dt>
                          <dd className="text-sm font-medium">
                            {watchedDate ? formatDate(watchedDate) : "—"}
                          </dd>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock
                            className="size-4 shrink-0 text-primary"
                            aria-hidden
                          />
                          <dt className="w-20 shrink-0 text-sm text-muted">
                            Time
                          </dt>
                          <dd className="text-sm font-medium">
                            {watchedTimeSlot}
                          </dd>
                        </div>
                      </dl>
                    </Card>

                    <div className="mt-5 flex flex-col gap-2">
                      <Label htmlFor="notes">
                        Notes for the doctor (optional)
                      </Label>
                      <Textarea
                        id="notes"
                        placeholder="Symptoms, reports to carry, anything we should know…"
                        {...register("notes")}
                      />
                    </div>

                    <p className="mt-4 text-xs text-muted">
                      By confirming, you agree to be contacted by our care team
                      on the number provided. Rescheduling is free up to 2
                      hours before your slot.
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {/* Navigation */}
              <div className="mt-10 flex justify-between border-t border-border pt-6">
                {step > 1 ? (
                  <Button type="button" variant="ghost" onClick={goBack}>
                    Back
                  </Button>
                ) : (
                  <span aria-hidden />
                )}

                {step < 3 ? (
                  <Button type="button" onClick={goNext}>
                    Continue
                    <ArrowRight aria-hidden />
                  </Button>
                ) : (
                  <Button type="submit">
                    Confirm Appointment
                    <Check aria-hidden />
                  </Button>
                )}
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
