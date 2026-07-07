import { skillGroups } from "../../data/workspace";
import { cardClass } from "./panel-ui";

export function SkillsPanel() {
  return (
    <section className="grid gap-4 xl:grid-cols-2">
      {skillGroups.map((branch) => {
        const Icon = branch.icon;

        return (
          <article className={`${cardClass} p-4`} key={branch.group}>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <Icon className="size-4 text-primary" />
              {branch.group}
            </h2>
            <div className="grid gap-1">
              {branch.children.map(([name, years, description], index) => (
                <div
                  className="grid grid-cols-[1.8rem_2rem_minmax(0,1fr)] items-start gap-3 rounded-md p-2 transition hover:translate-x-0.5 hover:bg-muted"
                  key={name}
                >
                  <span className="font-mono text-xs text-primary">
                    {index === branch.children.length - 1 ? "`--" : "|--"}
                  </span>
                  <span className="grid size-8 place-items-center rounded border border-border bg-muted font-mono text-xs text-foreground">
                    {name.slice(0, 2)}
                  </span>
                  <span className="min-w-0">
                    <strong className="block text-sm text-foreground">
                      {name}
                    </strong>
                    <small className="block text-pretty text-xs leading-5 text-muted-foreground">
                      {years} / {description}
                    </small>
                  </span>
                </div>
              ))}
            </div>
          </article>
        );
      })}
    </section>
  );
}
