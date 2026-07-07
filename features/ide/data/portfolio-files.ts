import {
  Braces,
  Code2,
  Contact,
  FileCode2,
  FileJson,
  FileText,
  Folder,
  FolderOpen,
  Sparkles,
} from "lucide-react";
import type { FileId, FileTreeNode, PortfolioFile } from "../types";

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
        children: [
          { id: "projects-node", name: "index.tsx", fileId: "projects", icon: Code2 },
        ],
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
    children: [
      { id: "experience-node", name: "experience.md", fileId: "experience", icon: FileText },
    ],
  },
  {
    id: "devtools",
    name: "devtools",
    icon: FolderOpen,
    children: [
      { id: "inspect-node", name: "profile.json", fileId: "inspect", icon: FileJson },
    ],
  },
];

export const mobileFileOrder: FileId[] = [
  "about",
  "projects",
  "experience",
  "skills",
  "contact",
];

export function getFile(fileId: FileId) {
  return portfolioFiles.find((file) => file.id === fileId) ?? portfolioFiles[0];
}
