"use client";

import { Files, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getFile, mobileFileOrder } from "../data/workspace";
import type { FileId } from "../types";

type MobileNavProps = {
  activeFile: FileId;
  onOpenExplorer: () => void;
  onOpenFile: (file: FileId) => void;
  onOpenPalette: () => void;
};

export function MobileNav({ activeFile, onOpenExplorer, onOpenFile, onOpenPalette }: MobileNavProps) {
  return (
    <nav
      className="fixed inset-x-2.5 bottom-8 z-[25] hidden grid-cols-[2.5rem_repeat(5,minmax(0,1fr))_2.5rem] gap-1 rounded-lg border border-border bg-explorer/90 p-1 shadow-[var(--shadow-soft)] backdrop-blur-md max-sm:grid"
      aria-label="Mobile IDE navigation"
    >
      <Button variant="ghost" size="icon" aria-label="Open explorer" onClick={onOpenExplorer}>
        <Files />
      </Button>
      {mobileFileOrder.map((fileId) => {
        const file = getFile(fileId);
        const Icon = file.icon;
        return (
          <button
            key={fileId}
            className={cn(
              "grid h-10 min-w-0 place-items-center gap-0.5 rounded-md bg-transparent text-[0.62rem] text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
              activeFile === fileId && "bg-accent text-accent-foreground",
            )}
            onClick={() => onOpenFile(fileId)}
            aria-label={`Open ${file.name}`}
          >
            <Icon className="size-4" />
            <span>{file.name.split(".")[0].slice(0, 7)}</span>
          </button>
        );
      })}
      <Button variant="ghost" size="icon" aria-label="Open command palette" onClick={onOpenPalette}>
        <Search />
      </Button>
    </nav>
  );
}
