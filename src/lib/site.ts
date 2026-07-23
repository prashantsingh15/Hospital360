/**
 * Global site configuration.
 * Contact numbers, URLs and branding live here — never hardcode them
 * inside components.
 */
export const site = {
  name: "Hospital360",
  legalName: "Hospital360 Multispeciality Hospital",
  tagline: "Care Beyond Compare",
  description:
    "Hospital360 is a next-generation multispeciality hospital combining world-class doctors, advanced robotic technology and compassionate care across 40+ specialities.",
  url: "https://hospital360.com",

  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  emergency: "+91 98765 00000",
  emergencyHref: "tel:+919876500000",
  whatsapp: "+91 98765 43210",
  whatsappHref: "https://wa.me/919876543210",
  email: "care@hospital360.com",

  address: {
    line1: "Hospital360 Tower, Ring Road",
    city: "New Delhi",
    state: "Delhi",
    pin: "110001",
  },
  hours: "Open 24 × 7, every day",
  established: 2009,

  socials: [
    { label: "Twitter", href: "https://twitter.com/hospital360" },
    { label: "Facebook", href: "https://facebook.com/hospital360" },
    { label: "Instagram", href: "https://instagram.com/hospital360" },
    { label: "LinkedIn", href: "https://linkedin.com/company/hospital360" },
    { label: "YouTube", href: "https://youtube.com/@hospital360" },
  ],
} as const;

export type Site = typeof site;
