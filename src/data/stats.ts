import type { Stat } from "@/types";
import { Award, Building2, Stethoscope, ThumbsUp } from "lucide-react";

export const stats: Stat[] = [
  {
    id: "stat-01",
    value: 15,
    suffix: "+",
    label: "Years of Excellence",
    description:
      "Serving Delhi NCR with trusted, ethical healthcare since 2009.",
    icon: Award,
  },
  {
    id: "stat-02",
    value: 250,
    suffix: "+",
    label: "Specialist Doctors",
    description:
      "A full-time team of senior consultants, surgeons and super-specialists.",
    icon: Stethoscope,
  },
  {
    id: "stat-03",
    value: 98,
    suffix: "%",
    label: "Patient Satisfaction",
    description:
      "Measured through independent post-discharge surveys every quarter.",
    icon: ThumbsUp,
  },
  {
    id: "stat-04",
    value: 40,
    suffix: "+",
    label: "Medical Specialities",
    description:
      "Comprehensive care from routine check-ups to complex robotic surgery.",
    icon: Building2,
  },
];
