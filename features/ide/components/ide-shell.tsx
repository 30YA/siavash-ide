"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { ActivityBar } from "./activity-bar";
import { Breadcrumbs } from "./breadcrumbs";
import { CommandPalette } from "./command-palette";
import { EditorTabs } from "./editor-tabs";
import { Explorer } from "./explorer";
import { MobileNav } from "./mobile-nav";
import { StatusBar } from "./status-bar";
import { useIdeWorkspace } from "../hooks/use-ide-workspace";
import { cn } from "@/lib/utils";

const EditorPanel = dynamic(
  () => import("./editor-panels").then((mod) => mod.EditorPanel),
  {
    loading: () => (
      <div className="grid min-h-80 place-items-center text-muted-foreground">
        <Loader2 className="size-5 animate-spin" />
      </div>
    ),
  },
);

export function IdeShell() {
  const workspace = useIdeWorkspace();

  return (
    <main
      className={cn(
        "grid h-dvh min-h-dvh overflow-hidden bg-editor text-foreground transition-[grid-template-columns,background-color,color] duration-200",
        "grid-cols-1 sm:grid-cols-[3rem_minmax(0,1fr)]",
        workspace.desktopExplorerOpen
          ? "lg:grid-cols-[3rem_minmax(14rem,17rem)_minmax(0,1fr)] xl:grid-cols-[3rem_minmax(15rem,18rem)_minmax(0,1fr)]"
          : "lg:grid-cols-[3rem_0_minmax(0,1fr)]",
      )}
    >
      <CommandPalette
        commands={workspace.filteredCommands}
        inputRef={workspace.paletteInputRef}
        onKeyDown={workspace.onPaletteKeyDown}
        onOpenChange={workspace.setPaletteOpen}
        onQuery={workspace.setCommandQuery}
        onRun={workspace.runCommand}
        open={workspace.paletteOpen}
        query={workspace.commandQuery}
        selectedCommand={workspace.selectedCommand}
      />

      <ActivityBar
        activeView="explorer"
        onOpenExplorer={workspace.openExplorer}
        onOpenPalette={workspace.openPalette}
        onOpenProjects={() => workspace.openFile("projects")}
        onToggleExplorer={workspace.toggleExplorer}
      />

      <Explorer
        activeFile={workspace.activeFile}
        isDesktopOpen={workspace.desktopExplorerOpen}
        fileSearch={workspace.fileSearch}
        isMobileOpen={workspace.mobileExplorerOpen}
        onCloseMobile={workspace.closeMobileExplorer}
        onFileSearch={workspace.setFileSearch}
        onOpenFile={workspace.openFile}
        onOpenPalette={workspace.openPalette}
      />

      <section
        className="grid min-h-0 min-w-0 grid-rows-[auto_auto_minmax(0,1fr)_auto] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--editor)_96%,var(--primary)),var(--editor)_18rem),var(--editor)] max-sm:min-h-dvh sm:col-start-2 lg:col-start-3"
        aria-label="Editor workspace"
      >
        <EditorTabs
          activeFile={workspace.activeFile}
          onActivate={workspace.setActiveFile}
          onClose={workspace.closeTab}
          onCloseOthers={workspace.closeOtherTabs}
          onCloseRight={workspace.closeTabsToRight}
          openTabs={workspace.openTabs}
        />
        <Breadcrumbs activeFile={workspace.activeFile} />
        <div className="min-h-0 overflow-auto p-[clamp(0.85rem,1.3vw,1.25rem)] pb-22 max-sm:p-3 max-sm:pb-24">
          <EditorPanel
            activeFile={workspace.activeFile}
            activeProject={workspace.activeProject}
            expandedCommit={workspace.expandedCommit}
            onExpandCommit={workspace.setExpandedCommit}
            onOpenFile={workspace.openFile}
            onSelectProject={workspace.setActiveProject}
            readyStep={workspace.readyStep}
          />
        </div>
        <MobileNav
          activeFile={workspace.activeFile}
          onOpenExplorer={workspace.openExplorer}
          onOpenFile={workspace.openFile}
          onOpenPalette={workspace.openPalette}
        />
        <StatusBar
          activeFile={workspace.activeFile}
          openCount={workspace.openTabs.length}
        />
      </section>
    </main>
  );
}
