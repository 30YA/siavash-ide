"use client";

import { useCallback, useState } from "react";

export function useSidebarState() {
  const [desktopExplorerOpen, setDesktopExplorerOpen] = useState(true);
  const [mobileExplorerOpen, setMobileExplorerOpen] = useState(false);

  const openExplorer = useCallback(() => {
    setDesktopExplorerOpen(true);
    setMobileExplorerOpen(true);
  }, []);

  const closeMobileExplorer = useCallback(() => {
    setMobileExplorerOpen(false);
  }, []);

  const toggleExplorer = useCallback(() => {
    setDesktopExplorerOpen((open) => !open);
    setMobileExplorerOpen((open) => !open);
  }, []);

  return {
    closeMobileExplorer,
    desktopExplorerOpen,
    mobileExplorerOpen,
    openExplorer,
    toggleExplorer,
  };
}
