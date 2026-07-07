"use client";

import { ArrowUpRight, GitBranch, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { projects } from "../../data/workspace";
import { createMailto, profile } from "../../data/profile";
import type { Project } from "../../types";
import { DefinitionList, TechRow, cardClass, eyebrowClass } from "./panel-ui";

export function ProjectsPanel({
  activeProject,
  onSelectProject,
}: {
  activeProject: Project;
  onSelectProject: (project: Project) => void;
}) {
  return (
    <section className="grid grid-cols-1 items-stretch gap-4 xl:grid-cols-[minmax(16rem,0.72fr)_minmax(0,1.28fr)]">
      <div className={cn(cardClass, "overflow-hidden")}>
        <div className="border-b border-border px-4 py-3 font-mono text-xs uppercase text-muted-foreground">
          Git History
        </div>
        <div className="relative grid gap-1 p-3 before:absolute before:bottom-6 before:left-7 before:top-6 before:w-px before:bg-border">
          {projects.map((project) => (
            <button
              key={project.id}
              className={cn(
                "relative z-[1] grid min-h-[4.5rem] grid-cols-[1.8rem_minmax(0,1fr)] items-start gap-2 rounded-md border border-transparent bg-transparent p-3 text-left transition hover:translate-x-0.5 hover:border-border hover:bg-primary/10",
                activeProject.id === project.id && "border-border bg-primary/10",
              )}
              onClick={() => onSelectProject(project)}
            >
              <span className="z-[1] mx-auto mt-1 size-3.5 rounded-full border-2 border-card bg-primary shadow-[0_0_0_1px_var(--border),0_0_20px_color-mix(in_srgb,var(--primary)_45%,transparent)]" />
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

      <article className={cn(cardClass, "grid gap-5 p-4 sm:p-5")}>
        <div>
          <p className={eyebrowClass}>opened file</p>
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
            <a href={activeProject.sourceUrl ?? profile.githubUrl} target="_blank" rel="noreferrer">
              <GitBranch />
              GitHub
            </a>
          </Button>
          <Button variant="secondary" asChild>
            <a
              href={activeProject.liveUrl ?? createMailto()}
              target={activeProject.liveUrl ? "_blank" : undefined}
              rel={activeProject.liveUrl ? "noreferrer" : undefined}
            >
              {activeProject.liveUrl ? <ArrowUpRight /> : <Mail />}
              {activeProject.liveUrl ? "Live Demo" : "Discuss Project"}
            </a>
          </Button>
        </div>
      </article>
    </section>
  );
}
