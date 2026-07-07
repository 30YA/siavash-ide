"use client";

import type { ReactNode } from "react";
import { BriefcaseBusiness, ExternalLink, Files, GitBranch, Moon, PanelLeft, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ActivityBarProps = {
  activeView: "explorer" | "search";
  onOpenExplorer: () => void;
  onOpenPalette: () => void;
  onOpenProjects: () => void;
};

export function ActivityBar({ activeView, onOpenExplorer, onOpenPalette, onOpenProjects }: ActivityBarProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  return (
    <aside className="ide-activity-bar" aria-label="Activity bar">
      <div className="ide-traffic" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <nav className="flex flex-1 flex-col items-center gap-1.5">
        <ActivityButton
          label="Explorer"
          active={activeView === "explorer"}
          onClick={onOpenExplorer}
          icon={<Files />}
        />
        <ActivityButton label="Search files" active={activeView === "search"} onClick={onOpenPalette} icon={<Search />} />
        <ActivityButton label="Projects" onClick={onOpenProjects} icon={<BriefcaseBusiness />} />
        <ActivityButton label="Toggle sidebar" onClick={onOpenExplorer} icon={<PanelLeft />} />
      </nav>

      <nav className="flex flex-col items-center gap-1.5">
        <ActivityButton label="GitHub" onClick={() => window.open("https://github.com", "_blank")} icon={<GitBranch />} />
        <ActivityButton label="LinkedIn" onClick={() => window.open("https://linkedin.com", "_blank")} icon={<ExternalLink />} />
        <ActivityButton
          label="Toggle theme"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          icon={isDark ? <Moon /> : <Sun />}
        />
      </nav>
    </aside>
  );
}

function ActivityButton({
  active,
  icon,
  label,
  onClick,
}: {
  active?: boolean;
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <Button
      aria-label={label}
      title={label}
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={cn(
        "relative size-11 rounded-none text-muted-foreground hover:bg-transparent hover:text-foreground",
        active &&
          "text-foreground before:absolute before:left-0 before:top-1/2 before:h-6 before:w-0.5 before:-translate-y-1/2 before:rounded-r before:bg-foreground",
      )}
    >
      {icon}
    </Button>
  );
}
