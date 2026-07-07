import {
  Archive,
  Binary,
  Braces,
  BriefcaseBusiness,
  Code2,
  Contact,
  Cpu,
  FileCode2,
  FileJson,
  FileText,
  Folder,
  FolderOpen,
  ExternalLink,
  GitBranch,
  Mail,
  Moon,
  PanelLeft,
  Search,
  Sparkles,
  UserRound,
  Wrench,
} from "lucide-react";
import type { Command, FileId, FileTreeNode, PortfolioFile, Project } from "../types";

export const portfolioFiles: PortfolioFile[] = [
  {
    id: "about",
    name: "about.ts",
    path: "src/about.ts",
    kind: "ts",
    icon: FileCode2,
    description: "Profile, focus, and preferred product surface.",
  },
  {
    id: "projects",
    name: "index.tsx",
    path: "src/projects/index.tsx",
    kind: "tsx",
    icon: Code2,
    description: "Selected project case studies with implementation notes.",
  },
  {
    id: "experience",
    name: "experience.md",
    path: "docs/experience.md",
    kind: "md",
    icon: FileText,
    description: "Frontend engineering roles and shipped outcomes.",
  },
  {
    id: "skills",
    name: "skills.ts",
    path: "src/skills.ts",
    kind: "ts",
    icon: Braces,
    description: "A dependency tree of technical strengths.",
  },
  {
    id: "thinking",
    name: "how-i-think.ts",
    path: "src/how-i-think.ts",
    kind: "ts",
    icon: Sparkles,
    description: "A compact debugging case study.",
  },
  {
    id: "inspect",
    name: "profile.json",
    path: "devtools/profile.json",
    kind: "json",
    icon: FileJson,
    description: "Structured developer metadata.",
  },
  {
    id: "contact",
    name: "contact.ts",
    path: "src/contact.ts",
    kind: "ts",
    icon: Contact,
    description: "Direct actions for email, resume, and social links.",
  },
];

export const fileTree: FileTreeNode[] = [
  {
    id: "src",
    name: "src",
    icon: FolderOpen,
    children: [
      { id: "about-node", name: "about.ts", fileId: "about", icon: FileCode2 },
      {
        id: "projects-folder",
        name: "projects",
        icon: Folder,
        children: [{ id: "projects-node", name: "index.tsx", fileId: "projects", icon: Code2 }],
      },
      { id: "skills-node", name: "skills.ts", fileId: "skills", icon: Braces },
      { id: "thinking-node", name: "how-i-think.ts", fileId: "thinking", icon: Sparkles },
      { id: "contact-node", name: "contact.ts", fileId: "contact", icon: Contact },
    ],
  },
  {
    id: "docs",
    name: "docs",
    icon: FolderOpen,
    children: [{ id: "experience-node", name: "experience.md", fileId: "experience", icon: FileText }],
  },
  {
    id: "devtools",
    name: "devtools",
    icon: FolderOpen,
    children: [{ id: "inspect-node", name: "profile.json", fileId: "inspect", icon: FileJson }],
  },
];

export const projects: Project[] = [
  {
    id: "portfolio",
    name: "Developer Portfolio IDE",
    summary: "A personal workspace portfolio shaped like a focused editor.",
    overview: "A portfolio system that replaces a generic landing page with an interactive IDE metaphor.",
    problem: "Traditional portfolios flatten engineering work into cards and slogans.",
    architecture: "Single Next.js route, data-driven panels, keyboard commands, and responsive editor shells.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    challenges: "Keeping the interface rich without making it noisy or dependent on heavy animation.",
    solution: "Use purposeful tabs, explorer navigation, command actions, and progressive reveal states.",
    result: "A portfolio that communicates craft through interaction, structure, and restraint.",
  },
  {
    id: "ai-dashboard",
    name: "AI Operations Dashboard",
    summary: "A command-center interface for reviewing model activity and product signals.",
    overview: "A dashboard for triaging AI workflow health, user requests, and operational metrics.",
    problem: "Teams needed dense insight without dashboard fatigue.",
    architecture: "Composable widgets, server-derived status, optimistic filters, and accessible charts.",
    technologies: ["React", "TypeScript", "React Query", "MUI"],
    challenges: "Balancing density, hierarchy, and loading behavior across real-time data.",
    solution: "Prioritized scanning patterns, resilient skeletons, and query-driven refresh logic.",
    result: "Faster diagnosis and a calmer operational workflow.",
  },
  {
    id: "crm",
    name: "CRM Workflow System",
    summary: "A practical workspace for sales, support, and customer lifecycle tasks.",
    overview: "A CRM frontend focused on repeatable daily workflows and confident handoffs.",
    problem: "Users were losing context between lists, details, and action panels.",
    architecture: "Route-aware layout, normalized UI state, and reusable task surfaces.",
    technologies: ["Next.js", "Zustand", "Tailwind CSS", "REST APIs"],
    challenges: "Preventing layout jumps and keeping high-frequency actions discoverable.",
    solution: "Stable panels, compact metadata, and keyboard-friendly navigation.",
    result: "Reduced friction for repeated customer operations.",
  },
  {
    id: "design-system",
    name: "Design System Foundation",
    summary: "A reusable component language for product teams.",
    overview: "A design system that turns product patterns into documented, reliable components.",
    problem: "Inconsistent UI primitives slowed delivery and weakened user trust.",
    architecture: "Tokenized theme, typed variants, shared accessibility rules, and usage examples.",
    technologies: ["React", "TypeScript", "Storybook", "CSS Variables"],
    challenges: "Creating enough flexibility without making every component arbitrary.",
    solution: "Strict primitives, documented escape hatches, and predictable visual states.",
    result: "More consistent product delivery with less design drift.",
  },
];

export const skillGroups = [
  {
    group: "Frontend",
    icon: Cpu,
    children: [
      ["React", "5+ yrs", "Component systems, state boundaries, and interaction design."],
      ["Next.js", "4+ yrs", "App routing, rendering strategy, and production performance."],
      ["TypeScript", "5+ yrs", "Readable contracts, safer refactors, and product-scale typing."],
      ["Tailwind", "3+ yrs", "Token-minded implementation with fast iteration."],
      ["React Query", "3+ yrs", "Server state, cache invalidation, and async UX."],
      ["Zustand", "2+ yrs", "Small focused stores for local product state."],
    ],
  },
  {
    group: "Craft",
    icon: Wrench,
    children: [
      ["Accessibility", "3+ yrs", "Keyboard paths, semantics, contrast, and reduced motion."],
      ["Design Systems", "4+ yrs", "Reusable primitives and consistent product language."],
      ["Performance", "4+ yrs", "Layout stability, lazy loading, and render discipline."],
      ["UX Debugging", "5+ yrs", "Tracing user symptoms back to state and data flow."],
    ],
  },
];

export const experience = [
  {
    company: "Product Engineering",
    role: "Senior Frontend Engineer",
    duration: "2022 - Present",
    achievements: [
      "Built production interfaces for complex assistant, chat, CRM, and dashboard workflows.",
      "Refactored fragile UI state into predictable hooks and server-state contracts.",
      "Partnered across product and design to turn ambiguous requirements into shippable UX.",
    ],
    technologies: ["React", "Next.js", "TypeScript", "React Query", "MUI"],
  },
  {
    company: "Frontend Systems",
    role: "UI Engineer",
    duration: "2019 - 2022",
    achievements: [
      "Created reusable component foundations for faster product delivery.",
      "Improved loading, empty, error, and keyboard states across core user journeys.",
      "Reduced visual inconsistency by aligning implementation with design tokens.",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Storybook"],
  },
];

export const initLines = [
  "Initialize Portfolio...",
  "Loading Developer Profile...",
  "Loading Projects...",
  "Loading Experience...",
  "Loading Skills...",
  "Ready",
];

export const commands: Command[] = [
  { label: "Open About", action: "open:about", hint: "src/about.ts", icon: UserRound },
  { label: "Open Projects", action: "open:projects", hint: "src/projects/index.tsx", icon: Code2 },
  { label: "Open Skills", action: "open:skills", hint: "src/skills.ts", icon: Braces },
  { label: "Open Experience", action: "open:experience", hint: "docs/experience.md", icon: BriefcaseBusiness },
  { label: "Open Contact", action: "open:contact", hint: "src/contact.ts", icon: Mail },
  { label: "Open Devtools Profile", action: "open:inspect", hint: "devtools/profile.json", icon: Binary },
  { label: "Toggle Theme", action: "theme", hint: "Dark / Light", icon: Moon },
  { label: "Focus Explorer", action: "explorer", hint: "Reveal file tree", icon: PanelLeft },
  { label: "Search Files", action: "search", hint: "Filter workspace files", icon: Search },
  { label: "Open GitHub", action: "github", hint: "External profile", icon: GitBranch },
  { label: "Open LinkedIn", action: "linkedin", hint: "External profile", icon: ExternalLink },
  { label: "Download Resume", action: "resume", hint: "Contact actions", icon: Archive },
];

export const mobileFileOrder: FileId[] = ["about", "projects", "experience", "skills", "contact"];

export function getFile(fileId: FileId) {
  return portfolioFiles.find((file) => file.id === fileId) ?? portfolioFiles[0];
}
