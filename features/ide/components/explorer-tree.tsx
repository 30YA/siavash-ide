"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { cn } from "@/lib/utils";
import { getFile } from "../data/workspace";
import type { FileId, FileTreeNode } from "../types";

export function TreeNode({
  activeFile,
  depth = 0,
  node,
  onOpenFile,
}: {
  activeFile: FileId;
  depth?: number;
  node: FileTreeNode;
  onOpenFile: (file: FileId) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const Icon = node.icon;
  const isFolder = Boolean(node.children?.length);
  const isActive = node.fileId === activeFile;
  const rowClass =
    "flex h-7 w-full min-w-0 items-center gap-1.5 rounded bg-transparent pr-2 text-left text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground";

  if (isFolder) {
    return (
      <div>
        <button
          className={rowClass}
          style={{ paddingLeft: `${0.35 + depth * 0.85}rem` }}
          onClick={() => setExpanded((open) => !open)}
          aria-expanded={expanded}
        >
          {expanded ? (
            <ChevronDown className="size-3.5" />
          ) : (
            <ChevronRight className="size-3.5" />
          )}
          <Icon className="size-4 text-folder" />
          <span className="truncate">{node.name}</span>
        </button>
        {expanded && (
          <div>
            {node.children?.map((child) => (
              <TreeNode
                key={child.id}
                node={child}
                depth={depth + 1}
                activeFile={activeFile}
                onOpenFile={onOpenFile}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <button
          className={cn(rowClass, isActive && "bg-accent text-accent-foreground")}
          style={{ paddingLeft: `${0.35 + depth * 0.85}rem` }}
          onClick={() => node.fileId && onOpenFile(node.fileId)}
          aria-current={isActive ? "page" : undefined}
        >
          <span className="w-3.5" aria-hidden="true" />
          <Icon className={cn("size-4", node.fileId && fileColor(getFile(node.fileId).kind))} />
          <span className="truncate">{node.name}</span>
        </button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onSelect={() => node.fileId && onOpenFile(node.fileId)}>
          Open
        </ContextMenuItem>
        <ContextMenuItem
          onSelect={() =>
            navigator.clipboard?.writeText(
              node.fileId ? getFile(node.fileId).path : node.name,
            )
          }
        >
          Copy path
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onSelect={() => node.fileId && onOpenFile(node.fileId)}>
          Reveal in editor
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export function FileResult({
  active,
  fileId,
  onOpen,
}: {
  active: boolean;
  fileId: FileId;
  onOpen: (file: FileId) => void;
}) {
  const file = getFile(fileId);
  const Icon = file.icon;

  return (
    <button
      className={cn(
        "grid w-full grid-cols-[1rem_minmax(0,1fr)] items-center gap-2 rounded bg-transparent px-2 py-1.5 text-left transition-colors hover:bg-accent",
        active && "bg-accent",
      )}
      onClick={() => onOpen(file.id)}
    >
      <Icon className={cn("size-4", fileColor(file.kind))} />
      <span className="min-w-0">
        <span className="block truncate text-foreground">{file.name}</span>
        <span className="block truncate text-[0.68rem] text-muted-foreground">
          {file.path}
        </span>
      </span>
    </button>
  );
}

function fileColor(kind: string) {
  if (kind === "md") return "text-markdown";
  if (kind === "json") return "text-json";
  if (kind === "tsx") return "text-tsx";
  return "text-typescript";
}
