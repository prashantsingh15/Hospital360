import type { NavEntry, NavLink } from "@/types";
import { getDepartmentBySlug } from "./departments";
import { services } from "./services";

function departmentLink(slug: string): NavLink {
  const department = getDepartmentBySlug(slug);
  if (!department) {
    throw new Error(`Unknown department slug in navigation: ${slug}`);
  }
  return {
    label: department.name,
    href: `/departments/${department.slug}`,
    description: department.tagline,
  };
}

function serviceLink(slug: string): NavLink {
  const service = services.find((item) => item.slug === slug);
  if (!service) {
    throw new Error(`Unknown service slug in navigation: ${slug}`);
  }
  return {
    label: service.title,
    href: "/services",
    description: service.description,
  };
}

export const navEntries: NavEntry[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Departments",
    href: "/departments",
    mega: [
      {
        heading: "Heart & Brain",
        links: [departmentLink("cardiology"), departmentLink("neurology")],
      },
      {
        heading: "Bones & Body",
        links: [
          departmentLink("orthopedics"),
          departmentLink("oncology"),
          departmentLink("gastroenterology"),
          departmentLink("dermatology-aesthetics"),
        ],
      },
      {
        heading: "Mother, Child & Senses",
        links: [
          departmentLink("gynecology-obstetrics"),
          departmentLink("pediatrics"),
          departmentLink("ophthalmology"),
          departmentLink("ent"),
        ],
      },
    ],
  },
  { label: "Doctors", href: "/doctors" },
  {
    label: "Services",
    href: "/services",
    mega: [
      {
        heading: "Critical & Emergency",
        links: [
          serviceLink("emergency-trauma-care"),
          serviceLink("critical-care-icu"),
          serviceLink("ambulance-patient-transfer"),
          serviceLink("blood-bank"),
        ],
      },
      {
        heading: "Diagnostics & Support",
        links: [
          serviceLink("diagnostics-pathology"),
          serviceLink("radiology-imaging"),
          serviceLink("pharmacy"),
          serviceLink("telemedicine-home-care"),
        ],
      },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: {
  heading: string;
  links: { label: string; href: string }[];
}[] = [
  {
    heading: "Quick Links",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Doctors", href: "/doctors" },
      { label: "Departments", href: "/departments" },
      { label: "Services", href: "/services" },
      { label: "Book Appointment", href: "/appointment" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    heading: "Departments",
    links: [
      { label: "Cardiology", href: "/departments/cardiology" },
      { label: "Neurology", href: "/departments/neurology" },
      {
        label: "Orthopedics & Joint Replacement",
        href: "/departments/orthopedics",
      },
      { label: "Oncology", href: "/departments/oncology" },
      { label: "Pediatrics & Neonatology", href: "/departments/pediatrics" },
      {
        label: "Gynecology & Obstetrics",
        href: "/departments/gynecology-obstetrics",
      },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQs", href: "/faq" },
      { label: "Patient Testimonials", href: "/testimonials" },
      { label: "Health Blog", href: "/blog" },
      { label: "Insurance Partners", href: "/#insurance" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];
