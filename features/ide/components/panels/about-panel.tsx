"use client";

import { motion } from "framer-motion";
import { ExternalLink, GitBranch, Mail, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { initLines } from "../../data/workspace";
import { createMailto, profile } from "../../data/profile";
import type { FileId } from "../../types";
import { CodeWindow, cardClass, eyebrowClass } from "./panel-ui";

export function AboutPanel({
  readyStep,
  onOpen,
}: {
  readyStep: number;
  onOpen: (file: FileId) => void;
}) {
  const isReady = readyStep >= initLines.length;

  return (
    <section className="flex flex-col gap-5 md:flex-row">
      <motion.article
        className={cn(
          cardClass,
          "grid w-full content-center gap-5 p-6 transition-opacity sm:p-8 md:w-2/3",
          isReady ? "opacity-100" : "opacity-45",
        )}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isReady ? 1 : 0.45, y: 0 }}
      >
        <div className="space-y-3">
          <p className={eyebrowClass}>{profile.role}</p>
          <h1 className="max-w-3xl text-balance text-[clamp(2.2rem,3.5vw,5rem)] font-semibold leading-none">
            {profile.headline}
          </h1>
          <p className="max-w-2xl text-pretty text-base leading-7 text-muted-foreground">
            {profile.summary}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <a href={createMailto()}>
              <Mail />
              Contact
            </a>
          </Button>
          <Button variant="secondary" onClick={() => onOpen("projects")}>
            <Rocket />
            Projects
          </Button>
          <Button variant="command" asChild>
            <a href={profile.githubUrl} target="_blank" rel="noreferrer">
              <GitBranch />
              GitHub
            </a>
          </Button>
          <Button variant="command" asChild>
            <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">
              <ExternalLink />
              LinkedIn
            </a>
          </Button>
        </div>
      </motion.article>

      <CodeWindow title="terminal" className="min-h-[22rem] w-full md:w-1/3">
        <div className="grid gap-3 p-4 font-mono text-sm text-muted-foreground">
          {initLines.slice(0, Math.min(readyStep, initLines.length)).map((line) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className={line === "Ready" ? "text-success" : ""}
            >
              <span className="text-primary">{line === "Ready" ? "ok" : "$"}</span>{" "}
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
