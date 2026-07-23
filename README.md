# Hospital360 — Premium Hospital Website

A production-ready, frontend-only hospital website built like a premium SaaS product.
Every section renders from a typed data layer, so backend, Firebase, WhatsApp AI,
appointments and dashboards can be plugged in **without changing the frontend architecture**.

## Stack

- **Next.js 15.5** (App Router, RSC-first) · **React 19** · **TypeScript strict**
- **Tailwind CSS v4** (CSS-first config — all tokens live in `src/app/globals.css`)
- **Framer Motion 12** (isolated in small client wrappers) · **lucide-react**
- **shadcn-style primitives** (cva + Radix) in `src/components/ui`
- **react-hook-form** (forms are UI placeholders) · **@tanstack/react-query** (provider ready)

## Commands

```bash
npm run dev    # local dev
npm run build  # production build
npm run start  # serve production build
```

## Architecture

```
src/
├── app/                  # Routes (RSC). layout.tsx wires Navbar/Footer/FloatingActions/
│                         # ScrollProgress/OrganizationJsonLd + fonts + metadata + theme script.
├── components/
│   ├── ui/               # Design-system primitives: Button, Card, Badge, Input, Textarea,
│   │                     # Label, Select, Accordion, Sheet.
│   ├── shared/           # Container, Section, SectionHeading, Reveal, Counter, Magnetic,
│   │                     # PlaceholderImage, InitialsAvatar, Logo, PageHeader, ThemeToggle.
│   ├── cards/            # DoctorCard, DepartmentCard, ServiceCard, BlogCard, TestimonialCard.
│   ├── layout/           # Navbar (+ MegaMenu, MobileDrawer, SearchDialog), Footer,
│   │                     # FloatingActions (WhatsApp + back-to-top), ScrollProgress.
│   ├── home/             # 15 home sections, composed by app/page.tsx.
│   ├── doctors|gallery|appointment|contact/   # Page-specific client components.
│   └── seo/              # JsonLd + schema builders (physician, department, FAQ, article, breadcrumb).
├── data/                 # ★ CONTENT LAYER — typed modules (doctors, departments, services,
│                         # testimonials, faqs, blog, gallery, stats, facilities, technologies,
│                         # journey, insurance, navigation). This is the swap point for APIs.
├── lib/                  # site.ts (brand/contact config), seo.ts (metadata factory), utils.ts.
├── providers/            # QueryClientProvider + ThemeProvider (add AuthProvider etc. here).
└── types/                # The single domain contract between data and UI.
```

## Plug-in points for future agents

- **Data → API**: replace the exported arrays in `src/data/*` with fetchers that return the
  same types from `src/types`. UI needs zero changes. React Query is already provided.
- **Booking logic**: `src/components/appointment/appointment-wizard.tsx` currently ends in a
  local success state — call your mutation inside `onSubmit`.
- **WhatsApp AI / chat**: the floating button is `src/components/layout/floating-actions.tsx`
  (`site.whatsappHref` in `src/lib/site.ts`). Replace the `<a>` with your widget.
- **Auth/dashboards**: add routes under `src/app/(auth)` / `src/app/(dashboard)` and providers
  in `src/providers/providers.tsx`; public chrome (Navbar/Footer) can be opted out via route groups.
- **Real photography**: replace `PlaceholderImage` / `InitialsAvatar` usages with `next/image`;
  surrounding markup can stay untouched.

## Design system rules

- Semantic tokens only: `bg-background`, `bg-surface`, `text-foreground`, `text-muted`,
  `bg-muted-soft`, `border-border`, `bg-primary`, `bg-emerald`. Dark mode = `.dark` class on
  `<html>` (tokens swap automatically; toggle in navbar).
- Brand palette: primary `#0F6FFF`, emerald `#10B981`, background `#F8FAFC`, dark `#0B1220`.
- Cards `rounded-3xl border shadow-soft`; pill buttons; `font-display` (Geist) headings,
  Inter body; utilities: `glass`, `text-gradient`, `bg-grid`, `bg-dots`, `no-scrollbar`,
  `pb-safe`, `animate-marquee/float/pulse-ring`.
- Animations: `<Reveal>` for scroll reveal; transform/opacity only (60fps);
  `prefers-reduced-motion` respected.
