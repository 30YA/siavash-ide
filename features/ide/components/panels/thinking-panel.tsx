"use client";

import { motion } from "framer-motion";
import { cardClass, eyebrowClass } from "./panel-ui";

const steps = [
  [
    "Problem",
    "A large product codebase had legacy MUI surfaces that were hard to maintain and slow to extend.",
  ],
  [
    "Investigation",
    "Mapped repeated UI behavior, unstable component boundaries, and places where product forms were tightly coupled.",
  ],
  [
    "Root Cause",
    "Too much behavior lived inside page-level code, so visual changes and workflow changes affected each other.",
  ],
  [
    "Solution",
    "Moved repeated behavior into UI-Kit components and refactored complex areas with Factory and Compound Component patterns.",
  ],
  [
    "Result",
    "Improved maintainability by about 40% and made future product work easier to debug and scale.",
  ],
];

export function ThinkingPanel() {
  return (
    <section className="grid max-w-4xl gap-3">
      <div className="mb-1">
        <p className={eyebrowClass}>case study</p>
        <h2 className="mt-1 text-2xl font-semibold">How I Think</h2>
      </div>
      {steps.map(([title, body], index) => (
        <motion.article
          className={`${cardClass} grid gap-3 p-4 sm:grid-cols-[3rem_minmax(0,1fr)]`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          key={title}
        >
          <span className="grid size-10 place-items-center rounded border border-border bg-muted font-mono text-xs text-primary">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="font-semibold text-foreground">{title}</h3>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {body}
            </p>
          </div>
        </motion.article>
      ))}
    </section>
  );
}
