import { Braces, Cpu, Gauge, Wrench } from "lucide-react";
import type { SkillGroup } from "../types";

export const skillGroups: SkillGroup[] = [
  {
    group: "Frontend",
    icon: Cpu,
    children: [
      ["React", "5+ yrs", "Component systems, state boundaries, and interaction design."],
      ["Next.js", "4+ yrs", "SSR, ISR, SSG, SEO-friendly pages, and app architecture."],
      ["TypeScript", "5+ yrs", "Readable contracts, safer refactors, and product-scale typing."],
      ["Vue/Nuxt", "basic", "Working familiarity from resume-listed framework exposure."],
    ],
  },
  {
    group: "State & UI",
    icon: Wrench,
    children: [
      ["Redux Toolkit", "production", "State management for e-commerce workflows."],
      ["RTK Query", "production", "API state, caching, and data fetching."],
      ["Zustand", "production", "Focused state stores for product interfaces."],
      ["MUI", "production", "Complex forms, migrations, and UI delivery."],
      ["TailwindCSS", "production", "Utility-first styling and responsive interfaces."],
      ["Ant Design", "production", "Component-driven enterprise UI work."],
    ],
  },
  {
    group: "Performance & SEO",
    icon: Gauge,
    children: [
      ["SSR/ISR/SSG", "production", "SEO-friendly rendering strategies in Next.js."],
      ["CDN", "production", "Frontend delivery optimization."],
      ["Lazy Loading", "production", "Reduced load cost and faster perceived performance."],
      ["PWA", "resume-listed", "Progressive web app capability."],
      ["LCP/TTI", "focus", "Performance metrics awareness and optimization mindset."],
    ],
  },
  {
    group: "Code Quality",
    icon: Braces,
    children: [
      ["Factory Pattern", "production", "Refactoring legacy code into scalable patterns."],
      ["Compound Components", "production", "Composable UI APIs for long-term maintainability."],
      ["Cross-browser", "production", "Compatibility across 4+ major browsers."],
      ["Accessibility", "production", "Improved accessibility compliance in product flows."],
      ["Git/GitHub", "daily", "Version control and collaborative development workflow."],
    ],
  },
];
