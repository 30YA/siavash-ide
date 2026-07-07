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
    <div className="ide-tab-bar" role="tablist" aria-label="Open files">
      {openTabs.map((tab) => {
        const file = getFile(tab);
        const Icon = file.icon;

        return (
          <ContextMenu key={tab}>
            <ContextMenuTrigger asChild>
              <button
                className={cn("ide-tab", activeFile === tab && "is-active")}
                onClick={() => onActivate(tab)}
                role="tab"
                aria-selected={activeFile === tab}
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
              </button>
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
