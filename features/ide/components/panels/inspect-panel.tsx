import { cn } from "@/lib/utils";
import { inspectRows } from "../../data/profile";
import { cardClass } from "./panel-ui";

export function InspectPanel() {
  return (
    <section className={cn(cardClass, "max-w-5xl overflow-hidden")}>
      <div className="flex gap-4 overflow-x-auto border-b border-border bg-muted/50 px-4 pt-3">
        {["Elements", "Console", "Network", "Profile"].map((tab, index) => (
          <span
            className={cn(
              "whitespace-nowrap border-b-2 border-transparent pb-2 text-sm text-muted-foreground",
              index === 3 && "border-primary text-foreground",
            )}
            key={tab}
          >
            {tab}
          </span>
        ))}
      </div>
      <div className="grid gap-1 p-4 font-mono text-sm">
        <code className="text-muted-foreground">const developer = {"{"}</code>
        {inspectRows.map(([key, value]) => (
          <div
            className="grid gap-1 rounded px-2 py-1.5 transition hover:bg-primary/10 sm:grid-cols-[minmax(9rem,15rem)_minmax(0,1fr)] sm:gap-4"
            key={key}
          >
            <span className="text-primary">&quot;{key}&quot;</span>
            <strong className="break-words font-normal text-muted-foreground">
              &quot;{value}&quot;,
            </strong>
          </div>
        ))}
        <code className="text-muted-foreground">{"}"}</code>
      </div>
    </section>
  );
}
