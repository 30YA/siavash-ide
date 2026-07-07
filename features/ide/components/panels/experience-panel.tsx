"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { experience } from "../../data/workspace";
import { TechRow, cardClass } from "./panel-ui";

export function ExperiencePanel({
  expandedCommit,
  onExpand,
}: {
  expandedCommit: number;
  onExpand: (index: number) => void;
}) {
  return (
    <section className="grid max-w-5xl gap-3">
      {experience.map((item, index) => (
        <article className={`${cardClass} overflow-hidden`} key={item.company}>
          <button
            className="grid w-full grid-cols-1 gap-2 px-4 py-3 text-left transition hover:bg-muted md:grid-cols-[7rem_minmax(0,1fr)_minmax(0,1fr)_auto]"
            onClick={() => onExpand(index)}
            aria-expanded={expandedCommit === index}
          >
            <span className="font-mono text-xs text-primary">
              commit {String(index + 1).padStart(2, "0")}
            </span>
            <strong className="text-foreground">{item.role}</strong>
            <span className="text-muted-foreground">{item.company}</span>
            <small className="text-muted-foreground">{item.duration}</small>
          </button>
          {expandedCommit === index && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="overflow-hidden"
            >
              <div className="grid gap-3 border-t border-border px-4 py-4 md:pl-32">
                <ul className="grid gap-2 text-sm leading-6 text-muted-foreground">
                  {item.achievements.map((achievement) => (
                    <li className="flex gap-2" key={achievement}>
                      <CheckCircle2 className="mt-1 size-4 shrink-0 text-success" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
                <TechRow items={item.technologies} />
              </div>
            </motion.div>
          )}
        </article>
      ))}
    </section>
  );
}
