import type { Service } from "@/types";
import {
  Activity,
  Ambulance,
  Droplets,
  Microscope,
  Pill,
  ScanLine,
  Siren,
  Video,
} from "lucide-react";

export const services: Service[] = [
  {
    id: "svc-01",
    slug: "emergency-trauma-care",
    title: "24×7 Emergency & Trauma Care",
    description:
      "Our emergency department is staffed around the clock by trauma-trained physicians and nurses, with dedicated resuscitation bays and rapid-response protocols for heart attack, stroke and accidents.",
    icon: Siren,
    features: [
      "Trauma-trained emergency physicians on duty 24×7",
      "Dedicated resuscitation, triage and observation bays",
      "Rapid cardiac, stroke and polytrauma protocols",
      "Direct access to ICU, cath lab and operation theatres",
    ],
  },
  {
    id: "svc-02",
    slug: "critical-care-icu",
    title: "Critical Care (ICU)",
    description:
      "A 60-bed critical care unit spanning medical, surgical, cardiac and neuro ICUs, with 1:1 nursing and intensivists on site day and night.",
    icon: Activity,
    features: [
      "Medical, surgical, cardiac and neuro ICUs",
      "Intensivists present on site 24×7",
      "Advanced ventilators, dialysis (CRRT) and ECMO support",
      "Strict infection-control and isolation protocols",
    ],
  },
  {
    id: "svc-03",
    slug: "diagnostics-pathology",
    title: "Advanced Diagnostics & Pathology Lab",
    description:
      "Our NABL-accredited central laboratory delivers accurate biochemistry, haematology, microbiology and molecular pathology reports — most routine results the same day.",
    icon: Microscope,
    features: [
      "NABL-accredited central laboratory",
      "Same-day reports for most routine tests",
      "Home sample collection across Delhi NCR",
      "Molecular diagnostics and genetic testing panels",
    ],
  },
  {
    id: "svc-04",
    slug: "radiology-imaging",
    title: "Radiology & Imaging",
    description:
      "A complete imaging suite — from digital X-ray and 4D ultrasound to 3 Tesla MRI and PET-CT — reported by senior radiologists, often within hours.",
    icon: ScanLine,
    features: [
      "3 Tesla MRI, 128-slice CT and PET-CT",
      "Digital X-ray, 4D ultrasound and mammography",
      "Image-guided biopsies and interventions",
      "PACS-enabled digital reports and image sharing",
    ],
  },
  {
    id: "svc-05",
    slug: "pharmacy",
    title: "24×7 Pharmacy",
    description:
      "Our in-house pharmacy stocks genuine, temperature-controlled medicines and surgical supplies, open day and night for inpatients, attendants and walk-in customers.",
    icon: Pill,
    features: [
      "Open 24×7, including Sundays and holidays",
      "Genuine medicines with cold-chain storage",
      "Chronic-care refills and home delivery in Delhi NCR",
      "Pharmacist counselling on dosage and interactions",
    ],
  },
  {
    id: "svc-06",
    slug: "blood-bank",
    title: "Blood Bank",
    description:
      "A licensed blood bank providing safe, screened blood and components for surgeries, emergencies, cancer care and chronic transfusion needs.",
    icon: Droplets,
    features: [
      "24×7 availability of blood and components",
      "NAT-screened units for the highest safety standard",
      "Component separation: packed cells, platelets, plasma",
      "Voluntary donation camps and donor counselling",
    ],
  },
  {
    id: "svc-07",
    slug: "ambulance-patient-transfer",
    title: "Ambulance & Patient Transfer",
    description:
      "GPS-tracked, ACLS-equipped ambulances with trained paramedics provide safe bed-to-bed transfers to and from Hospital360, anywhere in Delhi NCR.",
    icon: Ambulance,
    features: [
      "ACLS-equipped ambulances with trained paramedics",
      "Bed-to-bed transfer coordination with referring hospitals",
      "Dedicated cardiac and neonatal transport ambulances",
      "One-call emergency dispatch across Delhi NCR",
    ],
  },
  {
    id: "svc-08",
    slug: "telemedicine-home-care",
    title: "Telemedicine & Home Care",
    description:
      "Consult our specialists over secure video from home, or book home visits for nursing care, physiotherapy, vaccinations and sample collection.",
    icon: Video,
    features: [
      "Secure video consultations with Hospital360 specialists",
      "E-prescriptions and digital reports after every consult",
      "Home nursing, physiotherapy and sample collection",
      "Structured remote follow-ups for post-surgery patients",
    ],
  },
];
