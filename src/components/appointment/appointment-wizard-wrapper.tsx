"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { AppointmentWizard } from "./appointment-wizard";

export function AppointmentWizardWrapper() {
  const searchParams = useSearchParams();
  const doctor = searchParams.get("doctor") || undefined;

  return <AppointmentWizard initialDoctor={doctor} />;
}
