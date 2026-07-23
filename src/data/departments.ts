import type { Department } from "@/types";
import {
  Baby,
  Bone,
  Brain,
  Ear,
  Eye,
  HeartPulse,
  Ribbon,
  Sparkles,
  Stethoscope,
  Venus,
} from "lucide-react";

export const departments: Department[] = [
  {
    id: "dept-01",
    slug: "cardiology",
    name: "Cardiology",
    tagline: "Advanced heart care, from prevention to complex intervention",
    description:
      "From preventive heart check-ups to complex bypass surgery, our cardiology team combines two advanced cath labs with decades of experience to keep your heart healthy.",
    longDescription: [
      "The Department of Cardiology at Hospital360 offers the complete spectrum of heart care under one roof — from preventive screening and cardiac risk assessment to complex angioplasties, bypass surgery and device implantation. Our team of interventional cardiologists, cardiac surgeons and electrophysiologists works as one unit, so every patient gets a treatment plan that is right for their condition, not just the nearest procedure.",
      "Our two advanced cardiac catheterisation labs run round the clock, equipped with IVUS, OCT and FFR guidance that let our cardiologists see inside coronary arteries in real time. The 24×7 primary angioplasty programme keeps our door-to-balloon time under 60 minutes — well within international benchmarks — because in a heart attack, every minute of delay costs heart muscle.",
      "Recovery is supported by a dedicated 22-bed Cardiac ICU with 1:1 nursing, cardiac rehabilitation specialists and structured follow-up clinics. Whether you come for a routine lipid check-up or a complex valve replacement, you leave with a clear, personalised plan for a stronger heart.",
    ],
    icon: HeartPulse,
    doctorsCount: 18,
    services: [
      "Preventive Cardiology & Heart Check-ups",
      "Angiography & Angioplasty",
      "Cardiac Bypass Surgery (CABG)",
      "Valve Repair & Replacement",
      "Electrophysiology & Pacemakers",
      "Paediatric Cardiology",
    ],
    highlights: [
      "24×7 primary angioplasty with door-to-balloon time under 60 minutes",
      "Two advanced cath labs with IVUS, OCT and FFR guidance",
      "Dedicated 22-bed Cardiac ICU with 1:1 nursing care",
    ],
    featured: true,
  },
  {
    id: "dept-02",
    slug: "neurology",
    name: "Neurology",
    tagline: "Comprehensive brain, spine and nerve care",
    description:
      "Our neurologists and neurosurgeons treat stroke, epilepsy, Parkinson's disease and complex brain and spine conditions with 24×7 emergency support.",
    longDescription: [
      "The Department of Neurology at Hospital360 brings together neurologists, neurosurgeons, neuro-intensivists and rehabilitation specialists to treat the full range of brain, spine and nerve disorders. From headaches and epilepsy to stroke, Parkinson's disease and brain tumours, every patient is evaluated by a multidisciplinary team that plans care around long-term quality of life.",
      "Our comprehensive stroke unit operates 24×7 with immediate CT imaging, intravenous thrombolysis and catheter-based mechanical thrombectomy — because in stroke care, nearly two million neurons are lost every minute treatment is delayed. Advanced neuro-diagnostics including 128-channel EEG, EMG, nerve conduction studies and 3 Tesla MRI help us pinpoint conditions that are often missed elsewhere.",
      "A dedicated neuro ICU with continuous brain monitoring supports patients through critical illness, while our neuro-rehabilitation programme — physiotherapy, speech therapy and occupational therapy — helps survivors rebuild independence, one milestone at a time.",
    ],
    icon: Brain,
    doctorsCount: 14,
    services: [
      "Stroke Care & Thrombolysis",
      "Epilepsy & Seizure Clinic",
      "Movement Disorders & Parkinson's Care",
      "Brain & Spine Surgery",
      "Neuro-rehabilitation",
      "Sleep Medicine",
    ],
    highlights: [
      "Comprehensive stroke unit with 24×7 thrombolysis and thrombectomy",
      "128-channel EEG, EMG and nerve conduction studies",
      "Dedicated neuro ICU with continuous brain monitoring",
    ],
    featured: true,
  },
  {
    id: "dept-03",
    slug: "orthopedics",
    name: "Orthopedics & Joint Replacement",
    tagline: "Restoring movement with precision and compassion",
    description:
      "Robotic joint replacement, sports medicine, spine surgery and trauma care — delivered by surgeons who perform over 1,200 joint replacements every year.",
    longDescription: [
      "The Department of Orthopedics & Joint Replacement at Hospital360 helps patients return to pain-free movement — whether that means walking to the market without a limp or returning to competitive sport. Our surgeons specialise in knee and hip replacement, arthroscopic sports surgery, spine procedures and complex trauma care, supported by dedicated orthopaedic operation theatres.",
      "We offer robotic-arm assisted joint replacement, which allows our surgeons to plan each implant to the patient's exact anatomy and place it with sub-millimetre accuracy. The result is less soft-tissue damage, less pain after surgery and a faster return to daily life — most knee replacement patients stand the same day and walk with support within 24 hours.",
      "Recovery does not end at discharge. Our in-house physiotherapy and rehabilitation centre designs a week-by-week programme for every patient, with clear milestones for walking, stair-climbing and returning to work. Over 1,200 joint replacements a year means our team has refined every step of that journey.",
    ],
    icon: Bone,
    doctorsCount: 16,
    services: [
      "Knee & Hip Replacement",
      "Robotic Joint Surgery",
      "Sports Medicine & Arthroscopy",
      "Spine Surgery",
      "Trauma & Fracture Care",
      "Paediatric Orthopaedics",
    ],
    highlights: [
      "Robotic-arm assisted knee and hip replacement for sub-millimetre accuracy",
      "Over 1,200 successful joint replacements every year",
      "Dedicated sports injury clinic with on-site physiotherapy",
    ],
    featured: true,
  },
  {
    id: "dept-04",
    slug: "oncology",
    name: "Oncology",
    tagline: "Personalised cancer care at every stage",
    description:
      "Medical, surgical and radiation oncology under one roof, with tumour-board planning, day-care chemotherapy suites and compassionate palliative support.",
    longDescription: [
      "A cancer diagnosis changes everything — which is why the Department of Oncology at Hospital360 is built around one principle: no patient fights alone. Our medical oncologists, surgical oncologists and radiation specialists review every case together in a multidisciplinary tumour board, so the treatment plan you receive reflects the combined judgement of the entire team, not a single opinion.",
      "Diagnosis and staging are powered by PET-CT, 3 Tesla MRI and image-guided biopsy, allowing us to match patients with the most effective therapy — chemotherapy, targeted therapy, immunotherapy, precision radiation (IMRT/IGRT) or surgery. Our day-care chemotherapy suites are designed for dignity and comfort, with private recliners, natural light and trained oncology nurses at hand.",
      "Care continues beyond active treatment. Pain management, nutrition counselling, psychological support and palliative care services help patients and families through every stage, while structured survivorship clinics watch for recurrence and manage long-term health after cancer.",
    ],
    icon: Ribbon,
    doctorsCount: 12,
    services: [
      "Medical Oncology & Chemotherapy",
      "Radiation Therapy (IMRT / IGRT)",
      "Surgical Oncology",
      "Bone Marrow Transplant",
      "Palliative & Pain Care",
    ],
    highlights: [
      "Multidisciplinary tumour board reviews every treatment plan",
      "PET-CT guided diagnosis, staging and response assessment",
      "Day-care chemotherapy suites designed around patient comfort",
    ],
    featured: true,
  },
  {
    id: "dept-05",
    slug: "pediatrics",
    name: "Pediatrics & Neonatology",
    tagline: "Gentle, expert care for your little ones",
    description:
      "From a Level III NICU for premature babies to vaccination clinics and paediatric surgery, our child specialists care for your family at every stage of growing up.",
    longDescription: [
      "Children are not small adults — they need specialists who understand growing bodies and anxious parents in equal measure. The Department of Pediatrics & Neonatology at Hospital360 cares for children from the first minutes of life through adolescence, covering everything from routine vaccination and nutrition advice to complex paediatric surgery.",
      "Our 18-bed Level III Neonatal Intensive Care Unit cares for premature and critically ill newborns with advanced ventilators, incubators and round-the-clock neonatologists. A dedicated neonatal transport team brings fragile babies safely to us from across Delhi NCR, and private nesting spaces let parents stay close to their little ones through recovery.",
      "For older children, we run growth and development clinics, asthma and allergy services, and child-friendly vaccination suites designed to make every visit tear-free. A 24×7 paediatric emergency team means expert help is always minutes away when your child needs it most.",
    ],
    icon: Baby,
    doctorsCount: 15,
    services: [
      "Level III NICU",
      "Childhood Vaccination",
      "Paediatric Surgery",
      "Growth & Development Clinics",
      "Paediatric Emergency Care",
    ],
    highlights: [
      "18-bed Level III NICU with advanced neonatal ventilators",
      "24×7 paediatric emergency and neonatal transport team",
      "Child-friendly consultation, vaccination and play areas",
    ],
    featured: true,
  },
  {
    id: "dept-06",
    slug: "gynecology-obstetrics",
    name: "Gynecology & Obstetrics",
    tagline: "Complete care for every stage of womanhood",
    description:
      "From adolescence to motherhood and menopause — high-risk pregnancy care, painless delivery, laparoscopic surgery and fertility support in private, comfortable surroundings.",
    longDescription: [
      "The Department of Gynecology & Obstetrics at Hospital360 walks with women through every stage of life — first periods, family planning, pregnancy, childbirth and menopause. Our obstetricians manage both routine and high-risk pregnancies, with a foetal medicine unit offering 3D/4D ultrasound, anomaly scans and specialised monitoring for conditions like gestational diabetes and hypertension.",
      "Childbirth at Hospital360 happens in private birthing suites with the option of painless (epidural) delivery, supported by 24×7 obstetric anaesthesia and an on-site Level III NICU — so both mother and baby have expert care within seconds if it is ever needed. Our caesarean rates and safety outcomes are audited regularly against national benchmarks.",
      "Beyond maternity, our gynaecologists treat fibroids, endometriosis, PCOS and menstrual disorders, favouring minimally invasive laparoscopic surgery that gets you home within a day or two. Fertility evaluation, menopause clinics and preventive screening including Pap smears and mammography complete a lifetime of care.",
    ],
    icon: Venus,
    doctorsCount: 13,
    services: [
      "Normal & High-Risk Pregnancy Care",
      "Painless (Epidural) Delivery",
      "Laparoscopic Gynae Surgery",
      "Fertility Evaluation & Support",
      "Menopause & Wellness Clinics",
    ],
    highlights: [
      "Private birthing suites with a dedicated obstetric team",
      "3D/4D ultrasound and foetal medicine unit",
      "24×7 obstetric anaesthesia and neonatal support",
    ],
    featured: true,
  },
  {
    id: "dept-07",
    slug: "gastroenterology",
    name: "Gastroenterology",
    tagline: "Advanced digestive and liver care",
    description:
      "Expert care for acidity, IBS, hepatitis and complex digestive disorders, with same-day endoscopy, ERCP and a dedicated liver clinic.",
    longDescription: [
      "Digestive problems are among the most common — and most ignored — health issues in India. The Department of Gastroenterology at Hospital360 treats the full range of conditions affecting the food pipe, stomach, intestines, liver, gallbladder and pancreas, from persistent acidity and irritable bowel syndrome to hepatitis, fatty liver and inflammatory bowel disease.",
      "Our advanced endoscopy suite performs diagnostic and therapeutic procedures including gastroscopy, colonoscopy, ERCP and endoscopic ultrasound, with most reports delivered the same day through our digital records system. Early detection is a particular focus: screening colonoscopy and polyp removal remain among the most effective ways to prevent colorectal cancer.",
      "The dedicated liver clinic manages hepatitis B and C, fatty liver disease and cirrhosis with structured long-term follow-up, while our bariatric and metabolic surgery programme offers carefully evaluated surgical options for severe obesity and its complications.",
    ],
    icon: Stethoscope,
    doctorsCount: 10,
    services: [
      "Endoscopy & Colonoscopy",
      "Liver & Hepatitis Care",
      "ERCP & Biliary Procedures",
      "IBD & IBS Clinics",
      "Bariatric & Metabolic Surgery",
    ],
    highlights: [
      "Advanced endoscopy suite with ERCP and endoscopic ultrasound",
      "Dedicated liver clinic for hepatitis and fatty liver disease",
      "Same-day endoscopy with digital reports",
    ],
    featured: false,
  },
  {
    id: "dept-08",
    slug: "ophthalmology",
    name: "Ophthalmology",
    tagline: "Sharper vision through advanced eye care",
    description:
      "Cataract surgery, blade-free LASIK, glaucoma and diabetic eye care — precise diagnostics and micro-incision surgery for every age.",
    longDescription: [
      "The Department of Ophthalmology at Hospital360 protects and restores sight across every age group — from a child's first eye check-up to a grandparent's cataract surgery. Our consultants manage refractive errors, cataract, glaucoma, diabetic retinopathy and squint with digital diagnostics including OCT, corneal topography and retinal imaging.",
      "Cataract surgery is performed by micro-incision phacoemulsification, usually as a day-care procedure, with a choice of premium intraocular lenses that can reduce dependence on glasses. For those wanting freedom from spectacles, our blade-free femto-LASIK suite corrects refractive errors in a procedure measured in minutes.",
      "With diabetes rising sharply across Delhi NCR, our retina clinic emphasises annual diabetic eye screening — catching retinopathy at the stage when treatment is simplest and sight can still be fully preserved.",
    ],
    icon: Eye,
    doctorsCount: 8,
    services: [
      "Cataract Surgery (Phacoemulsification)",
      "LASIK & Refractive Surgery",
      "Glaucoma Screening & Care",
      "Retina & Diabetic Eye Care",
      "Paediatric Ophthalmology",
    ],
    highlights: [
      "Blade-free femto-LASIK suite",
      "Premium intraocular lens options for cataract surgery",
      "Digital retinal imaging and OCT diagnostics",
    ],
    featured: false,
  },
  {
    id: "dept-09",
    slug: "ent",
    name: "ENT",
    tagline: "Expert care for ear, nose, throat and hearing",
    description:
      "From sinus surgery and tonsil care to hearing assessment and vertigo treatment, our ENT specialists combine microsurgery with a full audiology lab.",
    longDescription: [
      "Ear, nose and throat problems quietly erode quality of life — blocked noses that ruin sleep, tonsils that flare every winter, hearing that fades so gradually families notice it first. The Department of ENT at Hospital360 treats these everyday burdens alongside complex head-and-neck conditions, for children and adults alike.",
      "Our surgeons specialise in endoscopic sinus surgery, microscopic ear surgery, tonsil and adenoid procedures and voice-preserving throat surgery, using minimally invasive techniques that shorten recovery to days rather than weeks. A dedicated vertigo and balance clinic evaluates dizziness with videonystagmography and repositioning manoeuvres that often bring immediate relief.",
      "The in-house audiology lab offers pure-tone and impedance audiometry, newborn hearing screening and hearing-aid fitting with trial programmes — because better hearing should never be guesswork.",
    ],
    icon: Ear,
    doctorsCount: 9,
    services: [
      "Endoscopic Sinus Surgery",
      "Hearing Assessment & Audiology",
      "Voice & Throat Disorders",
      "Tonsil & Adenoid Surgery",
      "Vertigo & Balance Clinic",
    ],
    highlights: [
      "Microscopic and endoscopic ear surgery",
      "Full audiology lab with hearing-aid fitting services",
      "Allergy testing and immunotherapy clinic",
    ],
    featured: false,
  },
  {
    id: "dept-10",
    slug: "dermatology-aesthetics",
    name: "Dermatology & Aesthetics",
    tagline: "Healthy skin, confident you",
    description:
      "Medical dermatology and dermatologist-led aesthetic care — acne, pigmentation, hair loss, laser treatments and anti-ageing, all medically supervised.",
    longDescription: [
      "Skin is the body's largest organ, and its problems are never merely cosmetic — acne scars affect confidence, unexplained rashes signal allergy or illness, and changing moles occasionally warn of something serious. The Department of Dermatology & Aesthetics at Hospital360 treats medical skin, hair and nail conditions with the same rigour as any other specialty.",
      "Our clinical dermatologists manage acne, eczema, psoriasis, vitiligo, fungal infections and hair loss with evidence-based protocols, supported by dermoscopy and comprehensive allergy and patch testing. Every treatment plan starts with an accurate diagnosis, not a product catalogue.",
      "For aesthetic concerns, all procedures — laser hair reduction, chemical peels, anti-ageing treatments, scar revision and PRP hair restoration — are performed or directly supervised by qualified dermatologists on US-FDA approved platforms. In an industry crowded with unregulated salons, medical supervision is the difference between treatment and risk.",
    ],
    icon: Sparkles,
    doctorsCount: 8,
    services: [
      "Clinical Dermatology",
      "Laser Hair Reduction",
      "Acne & Scar Treatment",
      "Anti-Ageing & Skin Rejuvenation",
      "Hair Restoration & PRP",
    ],
    highlights: [
      "US-FDA approved laser and energy-based platforms",
      "Dermatologist-led, medically supervised aesthetic treatments",
      "Comprehensive allergy and patch testing",
    ],
    featured: false,
  },
];

export function getDepartmentBySlug(slug: string): Department | undefined {
  return departments.find((department) => department.slug === slug);
}
