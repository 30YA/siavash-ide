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

const EditorPanel = dynamic(() => import("./editor-panels").then((mod) => mod.EditorPanel), {
  loading: () => (
    <div className="grid min-h-[20rem] place-items-center text-muted-foreground">
      <Loader2 className="size-5 animate-spin" />
    </div>
  ),
});

export function IdeShell() {
  const workspace = useIdeWorkspace();

  return (
    <main className="ide-shell">
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
        onOpenExplorer={() => workspace.setExplorerOpen(true)}
        onOpenPalette={workspace.openPalette}
        onOpenProjects={() => workspace.openFile("projects")}
      />

      <Explorer
        activeFile={workspace.activeFile}
        fileSearch={workspace.fileSearch}
        isMobileOpen={workspace.explorerOpen}
        onCloseMobile={() => workspace.setExplorerOpen(false)}
        onFileSearch={workspace.setFileSearch}
        onOpenFile={workspace.openFile}
        onOpenPalette={workspace.openPalette}
      />

      <section className="ide-editor" aria-label="Editor workspace">
        <EditorTabs
          activeFile={workspace.activeFile}
          onActivate={workspace.setActiveFile}
          onClose={workspace.closeTab}
          onCloseOthers={workspace.closeOtherTabs}
          onCloseRight={workspace.closeTabsToRight}
          openTabs={workspace.openTabs}
        />
        <Breadcrumbs activeFile={workspace.activeFile} />
        <div className="ide-editor-body">
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
          onOpenExplorer={() => workspace.setExplorerOpen(true)}
          onOpenFile={workspace.openFile}
          onOpenPalette={workspace.openPalette}
        />
        <StatusBar activeFile={workspace.activeFile} openCount={workspace.openTabs.length} />
      </section>
    </main>
  );
}
