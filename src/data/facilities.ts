import type { Facility } from "@/types";
import {
  Accessibility,
  BedDouble,
  Flower2,
  Pill,
  Scissors,
  Sofa,
  SquareParking,
  UtensilsCrossed,
} from "lucide-react";

export const facilities: Facility[] = [
  {
    id: "fac-01",
    title: "Modular Operation Theatres",
    description:
      "Eight modular OTs with laminar airflow, HEPA filtration and integrated imaging for the safest possible surgery.",
    icon: Scissors,
  },
  {
    id: "fac-02",
    title: "Private Patient Suites",
    description:
      "Spacious single rooms with an attendant bed, smart entertainment, room service and nurse-call at the pillow.",
    icon: BedDouble,
  },
  {
    id: "fac-03",
    title: "24×7 Pharmacy",
    description:
      "An in-house pharmacy stocked with genuine, cold-chain medicines — open day and night, including holidays.",
    icon: Pill,
  },
  {
    id: "fac-04",
    title: "Cafeteria & Nutrition Lounge",
    description:
      "Fresh, hygienic meals for attendants and visitors, with dietitian-designed options for every health need.",
    icon: UtensilsCrossed,
  },
  {
    id: "fac-05",
    title: "Prayer & Meditation Room",
    description:
      "A quiet, inclusive space on the ground floor where families of every faith can pause, pray and reflect.",
    icon: Flower2,
  },
  {
    id: "fac-06",
    title: "Valet Parking",
    description:
      "Complimentary valet service and multi-level parking, so a hospital visit never begins with a parking hunt.",
    icon: SquareParking,
  },
  {
    id: "fac-07",
    title: "Family Waiting Lounges",
    description:
      "Comfortable lounges near every ICU and OT with live procedure updates, charging points and refreshments.",
    icon: Sofa,
  },
  {
    id: "fac-08",
    title: "Rehabilitation & Physiotherapy Centre",
    description:
      "A fully equipped rehab gym where physiotherapists guide recovery after surgery, stroke and sports injuries.",
    icon: Accessibility,
  },
];
