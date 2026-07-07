"use client";

import { Bell, CheckCircle2, GitBranch, Radio, Type } from "lucide-react";
import { getFile } from "../data/workspace";
import type { FileId } from "../types";

export function StatusBar({ activeFile, openCount }: { activeFile: FileId; openCount: number }) {
  const file = getFile(activeFile);

  return (
    <footer
      className="flex min-h-6 min-w-0 items-center justify-between gap-4 overflow-x-auto whitespace-nowrap bg-status px-2 font-mono text-[0.68rem] text-status-foreground max-sm:min-h-7 max-sm:justify-start"
      aria-label="Status bar"
    >
      <div className="flex min-w-max items-center gap-3">
        <span className="inline-flex items-center gap-1.5">
          <GitBranch className="size-3.5" />
          main
        </span>
        <span className="inline-flex items-center gap-1.5">
          <CheckCircle2 className="size-3.5" />
          build passing
        </span>
        <span>{openCount} tabs</span>
      </div>
      <div className="flex min-w-max items-center gap-3">
        <span>{file.kind.toUpperCase()}</span>
        <span className="inline-flex items-center gap-1.5">
          <Type className="size-3.5" />
          UTF-8
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Radio className="size-3.5" />
          Portfolio Live
        </span>
        <Bell className="size-3.5" />
      </div>
    </footer>
  );
}
