"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { cn } from "@/lib/utils";
import { getFile } from "../data/workspace";
import type { FileId } from "../types";

type EditorTabsProps = {
  activeFile: FileId;
  onActivate: (file: FileId) => void;
  onClose: (file: FileId) => void;
  onCloseOthers: (file: FileId) => void;
  onCloseRight: (file: FileId) => void;
  openTabs: FileId[];
};

export function EditorTabs({
  activeFile,
  onActivate,
  onClose,
  onCloseOthers,
  onCloseRight,
  openTabs,
}: EditorTabsProps) {
  return (
    <div
      className="flex min-w-0 overflow-x-auto border-b border-border bg-tab max-sm:h-10"
      role="tablist"
      aria-label="Open files"
    >
      {openTabs.map((tab) => {
        const file = getFile(tab);
        const Icon = file.icon;

        return (
          <ContextMenu key={tab}>
            <ContextMenuTrigger asChild>
              <div
                className={cn(
                  "group relative flex h-9 min-w-[clamp(9rem,15vw,12.5rem)] max-w-60 items-center gap-2 border-r border-border bg-transparent px-2 pl-3 text-left text-muted-foreground transition-colors hover:bg-tab-active/75 hover:text-foreground",
                  "before:absolute before:inset-x-0 before:top-0 before:hidden before:h-0.5 before:bg-primary",
                  activeFile === tab && "bg-tab-active text-foreground before:block",
                )}
                onClick={() => onActivate(tab)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onActivate(tab);
                  }
                }}
                role="tab"
                aria-selected={activeFile === tab}
                tabIndex={0}
              >
                <Icon className="size-4 shrink-0" />
                <span className="truncate">{file.name}</span>
                <Button
                  aria-label={`Close ${file.name}`}
                  variant="ghost"
                  size="compactIcon"
                  className="ml-auto size-5 opacity-0 transition group-hover:opacity-100 data-[active=true]:opacity-100"
                  data-active={activeFile === tab}
                  onClick={(event) => {
                    event.stopPropagation();
                    onClose(tab);
                  }}
                >
                  <X className="size-3.5" />
                </Button>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem onSelect={() => onActivate(tab)}>Open</ContextMenuItem>
              <ContextMenuItem onSelect={() => onClose(tab)}>Close</ContextMenuItem>
              <ContextMenuItem onSelect={() => onCloseOthers(tab)}>Close others</ContextMenuItem>
              <ContextMenuItem onSelect={() => onCloseRight(tab)}>Close to the right</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem onSelect={() => navigator.clipboard?.writeText(file.path)}>Copy relative path</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        );
      })}
    </div>
  );
}
