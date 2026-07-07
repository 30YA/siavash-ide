import type { ExperienceItem } from "../types";

export const experience: ExperienceItem[] = [
  {
    company: "DGShahr",
    role: "Front-end Developer",
    duration: "Mar 2025 - Present",
    achievements: [
      "Helped redesign and optimize seller onboarding for a platform with 2,000,000+ active users.",
      "Owned and developed the Warehousing module for goods entering and leaving the central warehouse.",
      "Led UI-Kit development, adding components such as TimePicker and Menu while fixing bugs and improving performance.",
      "Delivered the Vazin Loan frontend for Bank Shahr and built API-integrated multi-step document upload flows.",
      "Migrated legacy MUI code to DGShahr UI-Kit, improving maintainability by about 40%.",
    ],
    technologies: ["React", "Next.js", "TypeScript", "MUI", "DGShahr UI-Kit"],
  },
  {
    company: "Witro (Naqshava)",
    role: "Front-end Programmer",
    duration: "Nov 2023 - Feb 2025",
    achievements: [
      "Implemented high-impact vendor features including product sync, vendor dashboard, and Instagram integration.",
      "Contributed to 9-month growth to 2,000+ active vendors.",
      "Improved performance by about 25% using CDN, lazy loading, caching, and frontend optimizations.",
      "Implemented SEO-friendly pages with SSR, ISR, and SSG in Next.js 13+.",
      "Built dynamic multi-step collection and product forms with MUI and custom UI libraries.",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Redux Toolkit", "RTK Query"],
  },
  {
    company: "NahareKari (Naqshava)",
    role: "Freelance Front-end Developer",
    duration: "Aug 2023 - Nov 2023",
    achievements: [
      "Built interactive map features using Leaflet.js and Neshan API for accurate geolocation.",
      "Handled large geospatial datasets and optimized rendering performance.",
      "Delivered frontend features for a food delivery platform with location-aware workflows.",
    ],
    technologies: ["React", "Leaflet.js", "Neshan API", "JavaScript", "CSS"],
  },
];
