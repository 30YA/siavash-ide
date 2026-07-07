"use client";

import { motion } from "framer-motion";
import { AboutPanel } from "./panels/about-panel";
import { ContactPanel } from "./panels/contact-panel";
import { ExperiencePanel } from "./panels/experience-panel";
import { InspectPanel } from "./panels/inspect-panel";
import { ProjectsPanel } from "./panels/projects-panel";
import { SkillsPanel } from "./panels/skills-panel";
import { ThinkingPanel } from "./panels/thinking-panel";
import type { FileId, Project } from "../types";

const panelMotion = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
} as const;

type EditorPanelProps = {
  activeFile: FileId;
  activeProject: Project;
  expandedCommit: number;
  onExpandCommit: (index: number) => void;
  onOpenFile: (file: FileId) => void;
  onSelectProject: (project: Project) => void;
  readyStep: number;
};

export function EditorPanel({
  activeFile,
  activeProject,
  expandedCommit,
  onExpandCommit,
  onOpenFile,
  onSelectProject,
  readyStep,
}: EditorPanelProps) {
  return (
    <motion.div key={activeFile} {...panelMotion} className="min-h-full">
      {activeFile === "about" && (
        <AboutPanel readyStep={readyStep} onOpen={onOpenFile} />
      )}
      {activeFile === "projects" && (
        <ProjectsPanel
          activeProject={activeProject}
          onSelectProject={onSelectProject}
        />
      )}
      {activeFile === "experience" && (
        <ExperiencePanel
          expandedCommit={expandedCommit}
          onExpand={onExpandCommit}
        />
      )}
      {activeFile === "skills" && <SkillsPanel />}
      {activeFile === "thinking" && <ThinkingPanel />}
      {activeFile === "inspect" && <InspectPanel />}
      {activeFile === "contact" && <ContactPanel />}
    </motion.div>
  );
}
