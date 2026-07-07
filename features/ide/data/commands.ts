import {
  Archive,
  Binary,
  Braces,
  BriefcaseBusiness,
  Code2,
  ExternalLink,
  GitBranch,
  Mail,
  Moon,
  PanelLeft,
  Search,
  UserRound,
} from "lucide-react";
import { profile } from "./profile";
import type { Command } from "../types";

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
  { label: "Open GitHub", action: "github", hint: "@30YA", icon: GitBranch },
  { label: "Open LinkedIn", action: "linkedin", hint: "siavash-aghazadeh", icon: ExternalLink },
  { label: "Email Siavash", action: "email", hint: profile.email, icon: Mail },
  { label: "Request Resume", action: "resume", hint: "Prepared email", icon: Archive },
];
