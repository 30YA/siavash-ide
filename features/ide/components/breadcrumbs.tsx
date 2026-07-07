"use client";

import { ChevronRight, Home } from "lucide-react";
import { getFile } from "../data/workspace";
import type { FileId } from "../types";

export function Breadcrumbs({ activeFile }: { activeFile: FileId }) {
  const file = getFile(activeFile);
  const parts = file.path.split("/");

  return (
    <nav
      className="flex min-w-0 items-center gap-1.5 overflow-hidden whitespace-nowrap border-b border-border bg-editor px-3.5 py-2 font-mono text-xs text-muted-foreground max-sm:px-2.5"
      aria-label="Breadcrumb"
    >
      <Home className="size-3.5" />
      <span>portfolio</span>
      {parts.map((part) => (
        <span className="inline-flex min-w-0 items-center gap-1.5" key={part}>
          <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />
          <span className="truncate">{part}</span>
        </span>
      ))}
    </nav>
  );
}
