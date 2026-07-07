"use client";

import type { ReactNode } from "react";
import { BriefcaseBusiness, ExternalLink, Files, GitBranch, Moon, PanelLeft, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { profile } from "../data/profile";

type ActivityBarProps = {
  activeView: "explorer" | "search";
  onOpenExplorer: () => void;
  onOpenPalette: () => void;
  onOpenProjects: () => void;
  onToggleExplorer: () => void;
};

export function ActivityBar({
  activeView,
  onOpenExplorer,
  onOpenPalette,
  onOpenProjects,
  onToggleExplorer,
}: ActivityBarProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  return (
    <aside
      className="hidden min-w-0 flex-col items-center gap-3 border-r border-border bg-activity px-0 py-2 sm:flex"
      aria-label="Activity bar"
    >
      <div className="grid gap-1 pb-2 pt-0.5" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-[#e06c75]" />
        <span className="size-2.5 rounded-full bg-[#e5c07b]" />
        <span className="size-2.5 rounded-full bg-[#98c379]" />
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
        <ActivityButton label="Toggle sidebar" onClick={onToggleExplorer} icon={<PanelLeft />} />
      </nav>

      <nav className="flex flex-col items-center gap-1.5">
        <ActivityButton label="GitHub" onClick={() => window.open(profile.githubUrl, "_blank")} icon={<GitBranch />} />
        <ActivityButton label="LinkedIn" onClick={() => window.open(profile.linkedinUrl, "_blank")} icon={<ExternalLink />} />
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
