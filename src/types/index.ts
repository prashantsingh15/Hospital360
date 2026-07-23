import type { LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Domain types — the single contract between the data layer and UI.   */
/* Future agents: swap `src/data/*` for API calls returning these.     */
/* ------------------------------------------------------------------ */

export interface Doctor {
  id: string;
  slug: string;
  name: string;
  /** e.g. "MBBS, MD (Cardiology)" */
  qualifications: string;
  designation: string;
  /** Department slug this doctor belongs to */
  department: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  consultationFee: number;
  availableToday: boolean;
  languages: string[];
  about: string;
  specializations: string[];
  education: string[];
  timings: string;
}

export interface Department {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string[];
  icon: LucideIcon;
  doctorsCount: number;
  services: string[];
  highlights: string[];
  featured: boolean;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  rating: number;
  treatment: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Article body as plain paragraphs */
  content: string[];
  category: string;
  author: string;
  authorRole: string;
  /** ISO date string */
  publishedAt: string;
  readingTime: number;
  tags: string[];
  featured: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  /** Drives the generated placeholder artwork */
  seed: number;
  span: "normal" | "wide" | "tall";
}

export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

export interface Facility {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Technology {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  stat: string;
}

export interface JourneyStep {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface InsurancePartner {
  id: string;
  name: string;
}

/* ------------------------------ Navigation ------------------------------ */

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
}

export interface MegaMenuColumn {
  heading: string;
  links: NavLink[];
}

export interface NavEntry {
  label: string;
  href: string;
  /** When present, the navbar renders a mega menu on hover/focus */
  mega?: MegaMenuColumn[];
}
