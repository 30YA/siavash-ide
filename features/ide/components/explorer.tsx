"use client";

import { useMemo } from "react";
import { ChevronDown, FileSearch, MoreHorizontal, PanelLeftClose, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fileTree, portfolioFiles } from "../data/workspace";
import { FileResult, TreeNode } from "./explorer-tree";
import type { FileId } from "../types";

type ExplorerProps = {
  activeFile: FileId;
  fileSearch: string;
  isDesktopOpen: boolean;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  onFileSearch: (value: string) => void;
  onOpenFile: (file: FileId) => void;
  onOpenPalette: () => void;
};

export function Explorer({
  activeFile,
  fileSearch,
  isDesktopOpen,
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
          "pointer-events-none fixed inset-0 z-30 bg-black/45 opacity-0 transition-opacity lg:hidden",
          isMobileOpen && "pointer-events-auto opacity-100",
        )}
        onClick={onCloseMobile}
        aria-hidden="true"
      />
      <aside
        className={cn(
          "flex min-h-0 min-w-0 flex-col border-r border-border bg-explorer transition-[width,transform,border-color,background-color] duration-200",
          "max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:z-40 max-lg:w-[min(21rem,86vw)] max-lg:-translate-x-full max-lg:shadow-2xl",
          isDesktopOpen ? "lg:w-auto" : "lg:w-0 lg:overflow-hidden lg:border-r-0",
          isMobileOpen && "max-lg:translate-x-0",
        )}
        aria-label="Explorer"
      >
        <header className="flex h-10 items-center justify-between border-b border-border px-3">
          <span className="text-[0.68rem] font-semibold uppercase tracking-normal text-muted-foreground">Explorer</span>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="compactIcon"
              aria-label="Create contact draft"
              title="Create contact draft"
              onClick={() => onOpenFile("contact")}
            >
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
          <button
            className="w-full rounded border border-border bg-card p-3 text-left transition hover:border-primary hover:bg-accent"
            onClick={() => onOpenFile("contact")}
          >
            <span className="mb-1 block font-mono text-[0.68rem] uppercase">Current Status</span>
            <strong className="block text-foreground">Available for focused frontend work</strong>
          </button>
        </div>
      </aside>
    </>
  );
}
