"use client";

import { KeyboardEvent, RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { commands, getFile, initLines, portfolioFiles, projects } from "../data/workspace";
import { createMailto, profile } from "../data/profile";
import { useEditorTabs } from "./use-editor-tabs";
import { useReadyStep } from "./use-ready-step";
import { useSidebarState } from "./use-sidebar-state";
import type { Command, FileId, Project } from "../types";

type UseIdeWorkspace = {
  activeFile: FileId;
  activeProject: Project;
  expandedCommit: number;
  desktopExplorerOpen: boolean;
  fileSearch: string;
  filteredCommands: Command[];
  commandQuery: string;
  mobileExplorerOpen: boolean;
  openTabs: FileId[];
  paletteInputRef: RefObject<HTMLInputElement | null>;
  paletteOpen: boolean;
  readyStep: number;
  selectedCommand: number;
  setActiveFile: (file: FileId) => void;
  setActiveProject: (project: Project) => void;
  setExpandedCommit: (index: number) => void;
  closeMobileExplorer: () => void;
  setFileSearch: (value: string) => void;
  setCommandQuery: (value: string) => void;
  setPaletteOpen: (open: boolean) => void;
  setSelectedCommand: (index: number) => void;
  closeTab: (file: FileId) => void;
  closeOtherTabs: (file: FileId) => void;
  closeTabsToRight: (file: FileId) => void;
  onPaletteKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  openFile: (file: FileId) => void;
  openExplorer: () => void;
  openPalette: () => void;
  runCommand: (action: string) => void;
  toggleExplorer: () => void;
};

export function useIdeWorkspace(): UseIdeWorkspace {
  const tabs = useEditorTabs("about");
  const sidebar = useSidebarState();
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [expandedCommit, setExpandedCommit] = useState(0);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState("");
  const [fileSearch, setFileSearch] = useState("");
  const [selectedCommand, setSelectedCommand] = useState(0);
  const readyStep = useReadyStep(initLines.length);
  const paletteInputRef = useRef<HTMLInputElement>(null);
  const { setTheme, theme } = useTheme();

  const filteredCommands = useMemo(() => {
    const query = commandQuery.trim().toLowerCase();
    if (!query) return commands;

    return commands.filter((command) =>
      [command.label, command.hint].some((field) => field.toLowerCase().includes(query)),
    );
  }, [commandQuery]);

  useEffect(() => {
    if (!paletteOpen) return;
    requestAnimationFrame(() => paletteInputRef.current?.focus());
  }, [paletteOpen]);

  const openPalette = useCallback(() => {
    setCommandQuery("");
    setSelectedCommand(0);
    setPaletteOpen(true);
  }, []);

  const openFile = useCallback((fileId: FileId) => {
    tabs.openTab(fileId);
    sidebar.closeMobileExplorer();
  }, [sidebar, tabs]);

  const runCommand = useCallback(
    (action: string) => {
      if (action.startsWith("open:")) {
        openFile(action.replace("open:", "") as FileId);
      }

      if (action === "theme") {
        setTheme(theme === "dark" ? "light" : "dark");
      }

      if (action === "github") {
        window.open(profile.githubUrl, "_blank", "noopener,noreferrer");
      }

      if (action === "linkedin") {
        window.open(profile.linkedinUrl, "_blank", "noopener,noreferrer");
      }

      if (action === "email") {
        window.location.href = createMailto();
      }

      if (action === "resume") {
        window.location.href = createMailto({
          subject: profile.resumeRequestSubject,
          body: "Hi Siavash,\n\nPlease send me your latest resume.\n\nThanks,",
        });
      }

      if (action === "explorer") {
        sidebar.openExplorer();
      }

      if (action === "search") {
        sidebar.openExplorer();
      }

      setPaletteOpen(false);
    },
    [openFile, setTheme, sidebar, theme],
  );

  const onPaletteKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedCommand((index) => Math.min(index + 1, filteredCommands.length - 1));
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedCommand((index) => Math.max(index - 1, 0));
      }

      if (event.key === "Enter" && filteredCommands[selectedCommand]) {
        runCommand(filteredCommands[selectedCommand].action);
      }
    },
    [filteredCommands, runCommand, selectedCommand],
  );

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openPalette();
      }

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "p") {
        event.preventDefault();
        openPalette();
      }

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "b") {
        event.preventDefault();
        sidebar.toggleExplorer();
      }

      if (event.key === "Escape") {
        setPaletteOpen(false);
        sidebar.closeMobileExplorer();
      }

      if ((event.altKey || event.metaKey) && /^[1-7]$/.test(event.key)) {
        const file = portfolioFiles[Number(event.key) - 1];
        if (file) openFile(file.id);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openFile, openPalette, sidebar]);

  return {
    activeFile: tabs.activeFile,
    activeProject,
    commandQuery,
    expandedCommit,
    desktopExplorerOpen: sidebar.desktopExplorerOpen,
    fileSearch,
    filteredCommands,
    mobileExplorerOpen: sidebar.mobileExplorerOpen,
    openTabs: tabs.openTabs,
    paletteInputRef,
    paletteOpen,
    readyStep,
    selectedCommand,
    setActiveFile: tabs.setActiveFile,
    setActiveProject,
    setExpandedCommit,
    closeMobileExplorer: sidebar.closeMobileExplorer,
    setFileSearch,
    setCommandQuery,
    setPaletteOpen,
    setSelectedCommand,
    closeTab: tabs.closeTab,
    closeOtherTabs: tabs.closeOtherTabs,
    closeTabsToRight: tabs.closeTabsToRight,
    onPaletteKeyDown,
    openFile: (fileId) => openFile(getFile(fileId).id),
    openExplorer: sidebar.openExplorer,
    openPalette,
    runCommand,
    toggleExplorer: sidebar.toggleExplorer,
  };
}
