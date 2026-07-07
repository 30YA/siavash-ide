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
    <nav className="ide-mobile-nav" aria-label="Mobile IDE navigation">
      <Button variant="ghost" size="icon" aria-label="Open explorer" onClick={onOpenExplorer}>
        <Files />
      </Button>
      {mobileFileOrder.map((fileId) => {
        const file = getFile(fileId);
        const Icon = file.icon;
        return (
          <button
            key={fileId}
            className={cn("ide-mobile-nav-item", activeFile === fileId && "is-active")}
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
