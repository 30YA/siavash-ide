"use client";

import { useCallback, useState } from "react";
import type { FileId } from "../types";

export function useEditorTabs(initialFile: FileId) {
  const [openTabs, setOpenTabs] = useState<FileId[]>([initialFile]);
  const [activeFile, setActiveFile] = useState<FileId>(initialFile);

  const openTab = useCallback((fileId: FileId) => {
    setOpenTabs((tabs) => (tabs.includes(fileId) ? tabs : [...tabs, fileId]));
    setActiveFile(fileId);
  }, []);

  const closeTab = useCallback(
    (fileId: FileId) => {
      setOpenTabs((tabs) => {
        const nextTabs = tabs.filter((tab) => tab !== fileId);
        if (activeFile === fileId) {
          setActiveFile(nextTabs.at(-1) ?? initialFile);
        }
        return nextTabs.length ? nextTabs : [initialFile];
      });
    },
    [activeFile, initialFile],
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

  return {
    activeFile,
    closeOtherTabs,
    closeTab,
    closeTabsToRight,
    openTab,
    openTabs,
    setActiveFile,
  };
}
