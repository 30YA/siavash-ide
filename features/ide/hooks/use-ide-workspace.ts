"use client";

import { KeyboardEvent, RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { commands, getFile, portfolioFiles, projects } from "../data/workspace";
import type { Command, FileId, Project } from "../types";

type UseIdeWorkspace = {
  activeFile: FileId;
  activeProject: Project;
  expandedCommit: number;
  explorerOpen: boolean;
  fileSearch: string;
  filteredCommands: Command[];
  commandQuery: string;
  openTabs: FileId[];
  paletteInputRef: RefObject<HTMLInputElement | null>;
  paletteOpen: boolean;
  readyStep: number;
  selectedCommand: number;
  setActiveFile: (file: FileId) => void;
  setActiveProject: (project: Project) => void;
  setExpandedCommit: (index: number) => void;
  setExplorerOpen: (open: boolean) => void;
  setFileSearch: (value: string) => void;
  setCommandQuery: (value: string) => void;
  setPaletteOpen: (open: boolean) => void;
  setSelectedCommand: (index: number) => void;
  closeTab: (file: FileId) => void;
  closeOtherTabs: (file: FileId) => void;
  closeTabsToRight: (file: FileId) => void;
  onPaletteKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  openFile: (file: FileId) => void;
  openPalette: () => void;
  runCommand: (action: string) => void;
};

const githubUrl = "https://github.com";
const linkedinUrl = "https://linkedin.com";

export function useIdeWorkspace(): UseIdeWorkspace {
  const [openTabs, setOpenTabs] = useState<FileId[]>(["about"]);
  const [activeFile, setActiveFile] = useState<FileId>("about");
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [expandedCommit, setExpandedCommit] = useState(0);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState("");
  const [fileSearch, setFileSearch] = useState("");
  const [selectedCommand, setSelectedCommand] = useState(0);
  const [readyStep, setReadyStep] = useState(0);
  const [explorerOpen, setExplorerOpen] = useState(false);
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
    if (readyStep >= 6) return;
    const timer = window.setTimeout(() => setReadyStep((step) => step + 1), 360);
    return () => window.clearTimeout(timer);
  }, [readyStep]);

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
    setOpenTabs((tabs) => (tabs.includes(fileId) ? tabs : [...tabs, fileId]));
    setActiveFile(fileId);
    setExplorerOpen(false);
  }, []);

  const closeTab = useCallback(
    (fileId: FileId) => {
      setOpenTabs((tabs) => {
        const nextTabs = tabs.filter((tab) => tab !== fileId);
        if (activeFile === fileId) {
          setActiveFile(nextTabs.at(-1) ?? "about");
        }
        return nextTabs.length ? nextTabs : ["about"];
      });
    },
    [activeFile],
  );

  const closeOtherTabs = useCallback((fileId: FileId) => {
    setOpenTabs([fileId]);
    setActiveFile(fileId);
  }, []);

  const closeTabsToRight = useCallback((fileId: FileId) => {
    setOpenTabs((tabs) => {
      const index = tabs.indexOf(fileId);
      if (index < 0) return tabs;
      return tabs.slice(0, index + 1);
    });
    setActiveFile(fileId);
  }, []);

  const runCommand = useCallback(
    (action: string) => {
      if (action.startsWith("open:")) {
        openFile(action.replace("open:", "") as FileId);
      }

      if (action === "theme") {
        setTheme(theme === "dark" ? "light" : "dark");
      }

      if (action === "github") {
        window.open(githubUrl, "_blank", "noopener,noreferrer");
      }

      if (action === "linkedin") {
        window.open(linkedinUrl, "_blank", "noopener,noreferrer");
      }

      if (action === "resume") {
        openFile("contact");
      }

      if (action === "explorer") {
        setExplorerOpen(true);
      }

      if (action === "search") {
        setExplorerOpen(true);
      }

      setPaletteOpen(false);
    },
    [openFile, setTheme, theme],
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
        setExplorerOpen((open) => !open);
      }

      if (event.key === "Escape") {
        setPaletteOpen(false);
        setExplorerOpen(false);
      }

      if ((event.altKey || event.metaKey) && /^[1-7]$/.test(event.key)) {
        const file = portfolioFiles[Number(event.key) - 1];
        if (file) openFile(file.id);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openFile, openPalette]);

  return {
    activeFile,
    activeProject,
    commandQuery,
    expandedCommit,
    explorerOpen,
    fileSearch,
    filteredCommands,
    openTabs,
    paletteInputRef,
    paletteOpen,
    readyStep,
    selectedCommand,
    setActiveFile,
    setActiveProject,
    setExpandedCommit,
    setExplorerOpen,
    setFileSearch,
    setCommandQuery,
    setPaletteOpen,
    setSelectedCommand,
    closeTab,
    closeOtherTabs,
    closeTabsToRight,
    onPaletteKeyDown,
    openFile: (fileId) => openFile(getFile(fileId).id),
    openPalette,
    runCommand,
  };
}
