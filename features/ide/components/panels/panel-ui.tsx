import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const cardClass =
  "rounded-lg border border-border bg-card/95 shadow-[var(--shadow-soft)]";

export const eyebrowClass =
  "font-mono text-xs font-bold uppercase text-primary";

export function CodeWindow({
  children,
  className,
  title,
}: {
  children: ReactNode;
  className?: string;
  title: string;
}) {
  return (
    <article className={cn(cardClass, "overflow-hidden", className)}>
      <div className="flex h-10 items-center gap-2 border-b border-border bg-muted/50 px-3">
        <span className="size-3 rounded-full bg-[#e06c75]" />
        <span className="size-3 rounded-full bg-[#e5c07b]" />
        <span className="size-3 rounded-full bg-[#98c379]" />
        <span className="ml-2 font-mono text-xs text-muted-foreground">
          {title}
        </span>
      </div>
      {children}
    </article>
  );
}

export function DefinitionList({ items }: { items: Array<[string, string]> }) {
  return (
    <dl className="grid gap-3">
      {items.map(([label, value]) => (
        <div className="border-l-2 border-border pl-3" key={label}>
          <dt className="font-mono text-xs text-foreground">{label}</dt>
          <dd className="mt-1 text-sm leading-6 text-muted-foreground">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function TechRow({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((tech) => (
        <span
          className="rounded-full border border-border bg-muted px-2.5 py-1 text-xs text-muted-foreground"
          key={tech}
        >
          {tech}
        </span>
      ))}
    </div>
  );
}
