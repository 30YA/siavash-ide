import { profile } from "./profile";
import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "dgshahr",
    name: "DGShahr Lending Platform",
    summary: "Large-scale lending and e-commerce frontend for millions of users.",
    overview:
      "Frontend work across seller onboarding, warehousing, UI-Kit, document upload, and the Vazin Loan online application flow for Bank Shahr.",
    problem:
      "High-traffic lending and commerce workflows needed clearer UX, lower operational friction, and more maintainable frontend code.",
    architecture:
      "React and Next.js interfaces backed by reusable UI-Kit components, API-integrated multi-step flows, and modular code patterns.",
    technologies: ["React", "Next.js", "TypeScript", "MUI", "DGShahr UI-Kit"],
    challenges:
      "Migrating legacy MUI code, supporting warehouse operations, and keeping complex lending forms usable at scale.",
    solution:
      "Redesigned seller onboarding, built warehousing screens, extended UI-Kit components such as TimePicker and Menu, and delivered the Vazin Loan frontend.",
    result:
      "Improved maintainability by about 40%, reduced manual workflow errors, and made online loan requests easier to apply for, verify, and track.",
    sourceUrl: profile.githubUrl,
  },
  {
    id: "witro",
    name: "Witro Social Commerce",
    summary: "E-commerce platform features that supported growth to 2,000+ active vendors.",
    overview:
      "Frontend development for vendor dashboards, product sync, Instagram integration, SEO-friendly pages, and dynamic product and collection forms.",
    problem:
      "Vendors needed reliable commerce workflows, faster pages, and integrations that reduced day-to-day manual work.",
    architecture:
      "Next.js 13+ pages with SSR, ISR, and SSG, state and auth with Redux Toolkit, RTK Query, Zustand, and NextAuth.",
    technologies: ["Next.js", "React", "TypeScript", "Redux Toolkit", "Zustand"],
    challenges:
      "Combining performance, SEO, multi-step forms, and social commerce integrations in one production platform.",
    solution:
      "Built vendor-facing features, optimized frontend delivery with CDNs, lazy loading, and caching, and implemented SEO-friendly rendering strategies.",
    result:
      "Contributed to 9-month growth to 2,000+ active vendors and improved performance by about 25%.",
    sourceUrl: profile.githubUrl,
  },
  {
    id: "naharekari",
    name: "NahareKari Food Delivery",
    summary: "Map-heavy food delivery frontend with accurate geolocation features.",
    overview:
      "Freelance frontend work for a food delivery platform, focused on interactive maps and location-aware product behavior.",
    problem:
      "The product needed accurate geolocation and smooth rendering for large geospatial datasets.",
    architecture:
      "Frontend map features with Leaflet.js, Neshan API integration, and rendering optimizations for location data.",
    technologies: ["React", "Leaflet.js", "Neshan API", "JavaScript", "CSS"],
    challenges:
      "Keeping map interactions responsive while handling larger geospatial datasets.",
    solution:
      "Built interactive map features and optimized rendering paths around geolocation data.",
    result:
      "Improved accuracy and responsiveness for location-based food delivery workflows.",
    sourceUrl: profile.githubUrl,
  },
  {
    id: "portfolio",
    name: "Siavash IDE Portfolio",
    summary: "A personal developer portfolio shaped like a focused editor.",
    overview:
      "A Next.js portfolio that turns resume data into an interactive IDE workspace.",
    problem:
      "A conventional portfolio would hide the engineering systems, UI craft, and debugging mindset behind static cards.",
    architecture:
      "Data-driven panels, modular feature components, command palette actions, responsive sidebars, and Tailwind-based presentation.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    challenges:
      "Keeping the interface rich, fast, readable, and easy to debug while preserving the editor metaphor.",
    solution:
      "Use purposeful tabs, explorer navigation, command actions, small panel modules, and progressive reveal states.",
    result:
      "A portfolio that communicates frontend craft through interaction, structure, and restraint.",
    sourceUrl: profile.githubUrl,
  },
];
