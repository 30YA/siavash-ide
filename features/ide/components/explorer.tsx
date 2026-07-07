"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronRight, FileSearch, MoreHorizontal, PanelLeftClose, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { cn } from "@/lib/utils";
import { fileTree, getFile, portfolioFiles } from "../data/workspace";
import type { FileId, FileTreeNode } from "../types";

type ExplorerProps = {
  activeFile: FileId;
  fileSearch: string;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  onFileSearch: (value: string) => void;
  onOpenFile: (file: FileId) => void;
  onOpenPalette: () => void;
};

export function Explorer({
  activeFile,
  fileSearch,
  isMobileOpen,
  onCloseMobile,
  onFileSearch,
  onOpenFile,
  onOpenPalette,
}: ExplorerProps) {
  const filteredFiles = useMemo(() => {
    const query = fileSearch.trim().toLowerCase();
    if (!query) return portfolioFiles;
    return portfolioFiles.filter((file) => [file.name, file.path, file.description].some((item) => item.toLowerCase().includes(query)));
  }, [fileSearch]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-30 bg-black/45 opacity-0 pointer-events-none transition-opacity lg:hidden",
          isMobileOpen && "pointer-events-auto opacity-100",
        )}
        onClick={onCloseMobile}
        aria-hidden="true"
      />
      <aside
        className={cn(
          "ide-explorer",
          "max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:z-40 max-lg:w-[min(21rem,86vw)] max-lg:-translate-x-full max-lg:shadow-2xl",
          isMobileOpen && "max-lg:translate-x-0",
        )}
        aria-label="Explorer"
      >
        <header className="flex h-10 items-center justify-between border-b border-border px-3">
          <span className="text-[0.68rem] font-semibold uppercase tracking-normal text-muted-foreground">Explorer</span>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="compactIcon" aria-label="New file" title="New file">
              <Plus />
            </Button>
            <Button variant="ghost" size="compactIcon" aria-label="More actions" title="More actions" onClick={onOpenPalette}>
              <MoreHorizontal />
            </Button>
            <Button
              variant="ghost"
              size="compactIcon"
              aria-label="Close explorer"
              title="Close explorer"
              className="lg:hidden"
              onClick={onCloseMobile}
            >
              <PanelLeftClose />
            </Button>
          </div>
        </header>

        <div className="border-b border-border p-2">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={fileSearch}
              onChange={(event) => onFileSearch(event.target.value)}
              placeholder="Search portfolio files"
              className="h-8 w-full rounded border border-border bg-input pl-7 pr-2 font-mono text-xs text-foreground outline-none transition focus:border-ring"
            />
          </label>
        </div>

        <div className="min-h-0 flex-1 overflow-auto py-2">
          <div className="mb-1 flex h-7 items-center gap-1 px-3 font-mono text-[0.72rem] font-semibold uppercase text-foreground">
            <ChevronDown className="size-3.5" />
            SIAVASH_WORKSPACE
          </div>
          {fileSearch ? (
            <div className="grid gap-0.5 px-2">
              {filteredFiles.map((file) => (
                <FileResult key={file.id} active={activeFile === file.id} fileId={file.id} onOpen={onOpenFile} />
              ))}
              {!filteredFiles.length && (
                <div className="grid place-items-center gap-2 px-4 py-10 text-center text-xs text-muted-foreground">
                  <FileSearch className="size-5" />
                  No files found.
                </div>
              )}
            </div>
          ) : (
            <nav className="grid gap-0.5 px-2" aria-label="Portfolio files">
              {fileTree.map((node) => (
                <TreeNode key={node.id} node={node} activeFile={activeFile} onOpenFile={onOpenFile} />
              ))}
            </nav>
          )}
        </div>

        <div className="border-t border-border p-3 text-xs text-muted-foreground">
          <div className="rounded border border-border bg-card p-3">
            <span className="mb-1 block font-mono text-[0.68rem] uppercase">Current Status</span>
            <strong className="block text-foreground">Available for focused frontend work</strong>
          </div>
        </div>
      </aside>
    </>
  );
}

function TreeNode({
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

  if (isFolder) {
    return (
      <div>
        <button
          className="ide-tree-row"
          style={{ paddingLeft: `${0.35 + depth * 0.85}rem` }}
          onClick={() => setExpanded((open) => !open)}
          aria-expanded={expanded}
        >
          {expanded ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
          <Icon className="size-4 text-folder" />
          <span className="truncate">{node.name}</span>
        </button>
        {expanded && (
          <div>
            {node.children?.map((child) => (
              <TreeNode key={child.id} node={child} depth={depth + 1} activeFile={activeFile} onOpenFile={onOpenFile} />
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
          className={cn("ide-tree-row", isActive && "is-active")}
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
        <ContextMenuItem onSelect={() => node.fileId && onOpenFile(node.fileId)}>Open</ContextMenuItem>
        <ContextMenuItem onSelect={() => navigator.clipboard?.writeText(node.fileId ? getFile(node.fileId).path : node.name)}>
          Copy path
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem disabled>Reveal in Finder</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

function FileResult({ active, fileId, onOpen }: { active: boolean; fileId: FileId; onOpen: (file: FileId) => void }) {
  const file = getFile(fileId);
  const Icon = file.icon;

  return (
    <button className={cn("ide-search-result", active && "is-active")} onClick={() => onOpen(file.id)}>
      <Icon className={cn("size-4", fileColor(file.kind))} />
      <span className="min-w-0">
        <span className="block truncate text-foreground">{file.name}</span>
        <span className="block truncate text-[0.68rem] text-muted-foreground">{file.path}</span>
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
