import type { Technology } from "@/types";
import { Bot, BrainCircuit, HeartPulse, Magnet, ScanLine } from "lucide-react";

export const technologies: Technology[] = [
  {
    id: "tech-01",
    name: "Da Vinci Xi Robotic Surgery",
    description:
      "The Da Vinci Xi system translates the surgeon's hand movements into micro-precise actions through incisions smaller than a centimetre, reducing pain, blood loss and hospital stay.",
    icon: Bot,
    stat: "0.5 mm surgical precision",
  },
  {
    id: "tech-02",
    name: "3 Tesla MRI",
    description:
      "Twice the magnetic strength of conventional scanners, our 3T MRI captures exquisitely detailed brain, spine and joint images in significantly shorter scan times.",
    icon: Magnet,
    stat: "50% faster scan times",
  },
  {
    id: "tech-03",
    name: "128-Slice CT & PET-CT",
    description:
      "Sub-second cardiac and whole-body imaging at ultra-low radiation dose, with PET-CT for precise cancer detection, staging and response assessment.",
    icon: ScanLine,
    stat: "0.28 s gantry rotation",
  },
  {
    id: "tech-04",
    name: "Advanced Cath Lab",
    description:
      "Flat-panel digital cath labs with IVUS, OCT and FFR give our cardiologists a real-time view inside the coronary arteries during every angioplasty.",
    icon: HeartPulse,
    stat: "Door-to-balloon under 60 min",
  },
  {
    id: "tech-05",
    name: "AI-Assisted Diagnostics",
    description:
      "AI algorithms second-read every chest X-ray, CT and mammogram, flagging subtle findings early so our radiologists miss less and patients hear sooner.",
    icon: BrainCircuit,
    stat: "100% scans double-checked by AI",
  },
];
