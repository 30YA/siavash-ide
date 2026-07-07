"use client";

import type { KeyboardEvent, RefObject } from "react";
import { Command as CommandIcon, CornerDownLeft, Search } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { Command } from "../types";

type CommandPaletteProps = {
  commands: Command[];
  inputRef: RefObject<HTMLInputElement | null>;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onOpenChange: (open: boolean) => void;
  onQuery: (value: string) => void;
  onRun: (action: string) => void;
  open: boolean;
  query: string;
  selectedCommand: number;
};

export function CommandPalette({
  commands,
  inputRef,
  onKeyDown,
  onOpenChange,
  onQuery,
  onRun,
  open,
  query,
  selectedCommand,
}: CommandPaletteProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-[10vh] max-w-[42rem] border-command-border bg-command text-command-foreground" showClose={false}>
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <CommandIcon className="size-4 text-primary" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => onQuery(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search files, commands, and actions..."
            aria-label="Search commands"
            className="h-9 min-w-0 flex-1 bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.68rem] text-muted-foreground sm:inline-flex">
            Esc
          </kbd>
        </div>

        <div className="max-h-[min(24rem,62vh)] overflow-auto p-1.5" role="listbox" aria-label="Command results">
          {commands.map((command, index) => {
            const Icon = command.icon;
            return (
              <button
                key={command.label}
                className={cn(
                  "grid w-full grid-cols-[1.5rem_minmax(0,1fr)_auto] items-center gap-3 rounded px-2.5 py-2 text-left text-sm text-muted-foreground transition-colors",
                  selectedCommand === index && "bg-accent text-accent-foreground",
                )}
                onClick={() => onRun(command.action)}
                role="option"
                aria-selected={selectedCommand === index}
              >
                <Icon className="size-4" />
                <span className="min-w-0">
                  <span className="block truncate text-foreground">{command.label}</span>
                  <span className="block truncate font-mono text-xs opacity-75">{command.hint}</span>
                </span>
                <CornerDownLeft className="size-4 opacity-60" />
              </button>
            );
          })}

          {!commands.length && (
            <div className="grid place-items-center gap-2 px-4 py-10 text-center text-sm text-muted-foreground">
              <Search className="size-5" />
              No commands found.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
