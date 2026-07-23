import type { JourneyStep } from "@/types";
import {
  CalendarCheck,
  FileSearch,
  HeartHandshake,
  Stethoscope,
  Syringe,
} from "lucide-react";

export const journeySteps: JourneyStep[] = [
  {
    id: "jrn-01",
    step: 1,
    title: "Book Appointment",
    description:
      "Book online, on WhatsApp or with one phone call — our care team confirms your slot within minutes and sends gentle reminders so you never miss a visit.",
    icon: CalendarCheck,
  },
  {
    id: "jrn-02",
    step: 2,
    title: "Consultation",
    description:
      "Meet your specialist in an unhurried consultation where your history is truly heard, your reports are reviewed and every question finds an answer.",
    icon: Stethoscope,
  },
  {
    id: "jrn-03",
    step: 3,
    title: "Diagnosis",
    description:
      "Advanced imaging, NABL-accredited labs and expert review come together to pinpoint the exact cause — with most reports in your hands the same day.",
    icon: FileSearch,
  },
  {
    id: "jrn-04",
    step: 4,
    title: "Treatment",
    description:
      "Your doctor walks you through every option — from medicines to robotic surgery — and designs a plan around your condition, your lifestyle and your budget.",
    icon: Syringe,
  },
  {
    id: "jrn-05",
    step: 5,
    title: "Recovery & Follow-up",
    description:
      "Structured rehabilitation, scheduled follow-ups and 24×7 tele-support keep your recovery on track long after you walk out of our doors.",
    icon: HeartHandshake,
  },
];
