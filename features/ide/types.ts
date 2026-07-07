import type { LucideIcon } from "lucide-react";

export type FileId = "about" | "projects" | "experience" | "skills" | "thinking" | "inspect" | "contact";

export type PortfolioFile = {
  id: FileId;
  name: string;
  path: string;
  kind: "ts" | "tsx" | "md" | "json";
  icon: LucideIcon;
  description: string;
};

export type FileTreeNode = {
  id: string;
  name: string;
  icon: LucideIcon;
  children?: FileTreeNode[];
  fileId?: FileId;
};

export type Project = {
  id: string;
  name: string;
  summary: string;
  overview: string;
  problem: string;
  architecture: string;
  technologies: string[];
  challenges: string;
  solution: string;
  result: string;
};

export type Command = {
  label: string;
  action: string;
  hint: string;
  icon: LucideIcon;
};
