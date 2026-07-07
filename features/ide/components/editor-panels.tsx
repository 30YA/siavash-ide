"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  GitBranch,
  Mail,
  Rocket,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  experience,
  initLines,
  projects,
  skillGroups,
} from "../data/workspace";
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

function AboutPanel({
  readyStep,
  onOpen,
}: {
  readyStep: number;
  onOpen: (file: FileId) => void;
}) {
  const isReady = readyStep >= initLines.length;

  return (
    <section className="flex gap-5 flex-col md:flex-row">
      <article
        className={cn(
          "ide-card content-center gap-5 p-6 sm:p-8 w-full md:w-2/3",
          isReady ? "opacity-100" : "opacity-45",
        )}
      >
        <div className="space-y-3">
          <p className="ide-eyebrow">Senior Frontend Engineer</p>
          <h1 className="max-w-3xl text-balance text-[clamp(2.2rem,3.5vw,5rem)] font-semibold leading-[0.98]">
            Siavash builds polished product interfaces with engineering
            discipline.
          </h1>
          <p className="max-w-2xl text-pretty text-base leading-7 text-muted-foreground">
            I design and implement modern frontend systems where interaction,
            accessibility, architecture, and product clarity work together.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => onOpen("contact")}>
            <Mail />
            Contact
          </Button>
          <Button variant="secondary" onClick={() => onOpen("projects")}>
            <Rocket />
            Projects
          </Button>
          <Button variant="command" asChild>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <GitBranch />
              GitHub
            </a>
          </Button>
          <Button variant="command" asChild>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <ExternalLink />
              LinkedIn
            </a>
          </Button>
        </div>
      </article>
      <CodeWindow title="terminal" className="min-h-88 w-full md:w-1/3">
        <div className="grid gap-3 p-4 font-mono text-sm text-muted-foreground">
          {initLines
            .slice(0, Math.min(readyStep, initLines.length))
            .map((line) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className={line === "Ready" ? "text-success" : ""}
              >
                <span className="text-primary">
                  {line === "Ready" ? "ok" : "$"}
                </span>{" "}
                {line}
              </motion.p>
            ))}
          {!isReady && (
            <p className="inline-flex items-center gap-2">
              <span className="text-primary">$</span> compiling workspace
              <span className="size-2 animate-pulse rounded-sm bg-primary" />
            </p>
          )}
        </div>
      </CodeWindow>
    </section>
  );
}

function ProjectsPanel({
  activeProject,
  onSelectProject,
}: {
  activeProject: Project;
  onSelectProject: (project: Project) => void;
}) {
  return (
    <section className="editor-grid editor-grid-projects">
      <div className="ide-card overflow-hidden">
        <div className="border-b border-border px-4 py-3 font-mono text-xs uppercase text-muted-foreground">
          Git History
        </div>
        <div className="relative grid gap-1 p-3 before:absolute before:bottom-6 before:left-7 before:top-6 before:w-px before:bg-border">
          {projects.map((project) => (
            <button
              key={project.id}
              className={cn(
                "project-commit",
                activeProject.id === project.id && "is-active",
              )}
              onClick={() => onSelectProject(project)}
            >
              <span className="commit-dot" />
              <span className="min-w-0">
                <strong className="block truncate text-foreground">
                  {project.name}
                </strong>
                <small className="block text-pretty text-muted-foreground">
                  {project.summary}
                </small>
              </span>
            </button>
          ))}
        </div>
      </div>

      <article className="ide-card grid gap-5 p-4 sm:p-5">
        <div>
          <p className="ide-eyebrow">opened file</p>
          <h2 className="mt-1 text-2xl font-semibold">
            {activeProject.name}.tsx
          </h2>
        </div>
        <DefinitionList
          items={[
            ["Overview", activeProject.overview],
            ["Problem", activeProject.problem],
            ["Architecture", activeProject.architecture],
            ["Challenges", activeProject.challenges],
            ["Solution", activeProject.solution],
            ["Result", activeProject.result],
          ]}
        />
        <TechRow items={activeProject.technologies} />
        <div className="flex flex-wrap gap-2">
          <Button variant="command" asChild>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <GitBranch />
              GitHub
            </a>
          </Button>
          <Button variant="secondary" asChild>
            <a href="https://vercel.com" target="_blank" rel="noreferrer">
              <ArrowUpRight />
              Live Demo
            </a>
          </Button>
        </div>
      </article>
    </section>
  );
}

function SkillsPanel() {
  return (
    <section className="grid gap-4 xl:grid-cols-2">
      {skillGroups.map((branch) => {
        const Icon = branch.icon;
        return (
          <article className="ide-card p-4" key={branch.group}>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <Icon className="size-4 text-primary" />
              {branch.group}
            </h2>
            <div className="grid gap-1">
              {branch.children.map(([name, years, description], index) => (
                <div className="dependency-row" key={name}>
                  <span className="font-mono text-xs text-primary">
                    {index === branch.children.length - 1 ? "`--" : "|--"}
                  </span>
                  <span className="grid size-8 place-items-center rounded border border-border bg-muted font-mono text-xs text-foreground">
                    {name.slice(0, 2)}
                  </span>
                  <span className="min-w-0">
                    <strong className="block text-sm text-foreground">
                      {name}
                    </strong>
                    <small className="block text-pretty text-xs leading-5 text-muted-foreground">
                      {years} / {description}
                    </small>
                  </span>
                </div>
              ))}
            </div>
          </article>
        );
      })}
    </section>
  );
}

function ExperiencePanel({
  expandedCommit,
  onExpand,
}: {
  expandedCommit: number;
  onExpand: (index: number) => void;
}) {
  return (
    <section className="grid max-w-5xl gap-3">
      {experience.map((item, index) => (
        <article className="ide-card overflow-hidden" key={item.company}>
          <button
            className="grid w-full grid-cols-1 gap-2 px-4 py-3 text-left transition hover:bg-muted md:grid-cols-[7rem_minmax(0,1fr)_minmax(0,1fr)_auto]"
            onClick={() => onExpand(index)}
            aria-expanded={expandedCommit === index}
          >
            <span className="font-mono text-xs text-primary">
              commit {String(index + 1).padStart(2, "0")}
            </span>
            <strong className="text-foreground">{item.role}</strong>
            <span className="text-muted-foreground">{item.company}</span>
            <small className="text-muted-foreground">{item.duration}</small>
          </button>
          {expandedCommit === index && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              className="overflow-hidden"
            >
              <div className="grid gap-3 border-t border-border px-4 py-4 md:pl-32">
                <ul className="grid gap-2 text-sm leading-6 text-muted-foreground">
                  {item.achievements.map((achievement) => (
                    <li className="flex gap-2" key={achievement}>
                      <CheckCircle2 className="mt-1 size-4 shrink-0 text-success" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
                <TechRow items={item.technologies} />
              </div>
            </motion.div>
          )}
        </article>
      ))}
    </section>
  );
}

function ThinkingPanel() {
  const steps = [
    [
      "Problem",
      "A chat workflow showed duplicate assistant messages after server refresh.",
    ],
    [
      "Investigation",
      "Compared optimistic messages, server history, and render keys across states.",
    ],
    [
      "Root Cause",
      "The UI trusted both local echoes and fetched history without a shared identity rule.",
    ],
    [
      "Solution",
      "Normalized messages at the boundary and reconciled pending items after refetch.",
    ],
    [
      "Result",
      "Stable rendering, clearer loading states, and a calmer user experience.",
    ],
  ];

  return (
    <section className="grid max-w-4xl gap-3">
      <div className="mb-1">
        <p className="ide-eyebrow">case study</p>
        <h2 className="mt-1 text-2xl font-semibold">How I Think</h2>
      </div>
      {steps.map(([title, body], index) => (
        <motion.article
          className="ide-card grid gap-3 p-4 sm:grid-cols-[3rem_minmax(0,1fr)]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          key={title}
        >
          <span className="grid size-10 place-items-center rounded border border-border bg-muted font-mono text-xs text-primary">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="font-semibold text-foreground">{title}</h3>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {body}
            </p>
          </div>
        </motion.article>
      ))}
    </section>
  );
}

function InspectPanel() {
  const rows = [
    ["Developer Profile", "Frontend engineer, product-minded UI designer"],
    ["Preferred Stack", "Next.js, React, TypeScript, Tailwind, React Query"],
    [
      "Architecture Style",
      "Data-driven components, small hooks, explicit state ownership",
    ],
    ["Favorite Libraries", "React Query, Zustand, MUI, Tailwind CSS"],
    [
      "Coding Principles",
      "Readable contracts, accessible defaults, resilient async UX",
    ],
    ["Current Status", "Available for work"],
    ["Open Source", "Interested"],
    ["Learning", "AI product interfaces and interaction systems"],
  ];

  return (
    <section className="ide-card max-w-5xl overflow-hidden">
      <div className="flex gap-4 overflow-x-auto border-b border-border bg-muted/50 px-4 pt-3">
        {["Elements", "Console", "Network", "Profile"].map((tab, index) => (
          <span
            className={cn(
              "whitespace-nowrap border-b-2 border-transparent pb-2 text-sm text-muted-foreground",
              index === 0 && "border-primary text-foreground",
            )}
            key={tab}
          >
            {tab}
          </span>
        ))}
      </div>
      <div className="grid gap-1 p-4 font-mono text-sm">
        <code className="text-muted-foreground">const developer = {"{"}</code>
        {rows.map(([key, value]) => (
          <div className="inspect-row" key={key}>
            <span className="text-primary">&quot;{key}&quot;</span>
            <strong className="font-normal text-muted-foreground">
              &quot;{value}&quot;,
            </strong>
          </div>
        ))}
        <code className="text-muted-foreground">{"}"}</code>
      </div>
    </section>
  );
}

function ContactPanel() {
  return (
    <section className="ide-card grid max-w-5xl gap-5 p-5 md:grid-cols-[minmax(0,0.9fr)_minmax(18rem,1fr)]">
      <div>
        <p className="ide-eyebrow">contact.ts</p>
        <h2 className="mt-1 text-2xl font-semibold">Run a direct action.</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Email, GitHub, LinkedIn, and resume actions are presented like
          developer commands.
        </p>
      </div>
      <div className="grid content-start gap-2">
        <ActionLink href="mailto:hello@example.com" icon={<Mail />}>
          sendEmail(&quot;hello@example.com&quot;)
        </ActionLink>
        <ActionLink href="https://github.com" icon={<GitBranch />}>
          openGitHub()
        </ActionLink>
        <ActionLink href="https://linkedin.com" icon={<ExternalLink />}>
          openLinkedIn()
        </ActionLink>
        <ActionLink href="/resume.pdf" icon={<Terminal />}>
          downloadResume()
        </ActionLink>
      </div>
    </section>
  );
}

function CodeWindow({
  children,
  className,
  title,
}: {
  children: ReactNode;
  className?: string;
  title: string;
}) {
  return (
    <article className={cn("ide-card overflow-hidden", className)}>
      <div className="flex h-10 items-center gap-2 border-b border-border bg-muted/50 px-3">
        <span className="size-3 rounded-full bg-[#e06c75]" />
        <span className="size-3 rounded-full bg-[#e5c07b]" />
        <span className="size-3 rounded-full bg-[#98c379]" />
        <span className="ml-2 font-mono text-xs text-muted-foreground">
          {title}
        </span>
      </div>
      {children}
    </article>
  );
}

function DefinitionList({ items }: { items: Array<[string, string]> }) {
  return (
    <dl className="grid gap-3">
      {items.map(([label, value]) => (
        <div className="border-l-2 border-border pl-3" key={label}>
          <dt className="font-mono text-xs text-foreground">{label}</dt>
          <dd className="mt-1 text-sm leading-6 text-muted-foreground">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function TechRow({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((tech) => (
        <span
          className="rounded-full border border-border bg-muted px-2.5 py-1 text-xs text-muted-foreground"
          key={tech}
        >
          {tech}
        </span>
      ))}
    </div>
  );
}

function ActionLink({
  children,
  href,
  icon,
}: {
  children: ReactNode;
  href: string;
  icon: ReactNode;
}) {
  return (
    <Button variant="command" asChild className="justify-start font-mono">
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
      >
        {icon}
        <span className="truncate">{children}</span>
      </a>
    </Button>
  );
}
