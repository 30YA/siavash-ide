"use client";

import { KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";

type FileId =
  | "about"
  | "projects"
  | "experience"
  | "skills"
  | "thinking"
  | "inspect"
  | "contact";

type Project = {
  id: string;
  name: string;
  summary: string;
  overview: string;
  problem: string;
  architecture: string;
  technologies: string[];
  challenges: string;
  solution: string;
  result: string;
};

type Command = {
  label: string;
  action: string;
};

const files: Array<{ id: FileId; label: string; path: string; kind: string }> = [
  { id: "about", label: "about.ts", path: "src/about.ts", kind: "ts" },
  { id: "projects", label: "projects/", path: "src/projects", kind: "dir" },
  { id: "experience", label: "experience.md", path: "docs/experience.md", kind: "md" },
  { id: "skills", label: "skills.ts", path: "src/skills.ts", kind: "ts" },
  { id: "thinking", label: "how-i-think.ts", path: "src/how-i-think.ts", kind: "ts" },
  { id: "inspect", label: "inspect.json", path: "devtools/profile.json", kind: "json" },
  { id: "contact", label: "contact.ts", path: "src/contact.ts", kind: "ts" },
];

const projects: Project[] = [
  {
    id: "portfolio",
    name: "Developer Portfolio IDE",
    summary: "A personal workspace portfolio shaped like a focused editor.",
    overview: "A portfolio system that replaces a generic landing page with an interactive IDE metaphor.",
    problem: "Traditional portfolios flatten engineering work into cards and slogans.",
    architecture: "Single Next.js route, data-driven panels, keyboard commands, and responsive editor shells.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    challenges: "Keeping the interface rich without making it noisy or dependent on heavy animation libraries.",
    solution: "Use purposeful tabs, explorer navigation, command actions, and progressive reveal states.",
    result: "A portfolio that communicates craft through interaction, structure, and restraint.",
  },
  {
    id: "ai-dashboard",
    name: "AI Operations Dashboard",
    summary: "A command-center interface for reviewing model activity and product signals.",
    overview: "A dashboard for triaging AI workflow health, user requests, and operational metrics.",
    problem: "Teams needed dense insight without dashboard fatigue.",
    architecture: "Composable widgets, server-derived status, optimistic filters, and accessible charts.",
    technologies: ["React", "TypeScript", "React Query", "MUI"],
    challenges: "Balancing density, hierarchy, and loading behavior across real-time data.",
    solution: "Prioritized scanning patterns, resilient skeletons, and query-driven refresh logic.",
    result: "Faster diagnosis and a calmer operational workflow.",
  },
  {
    id: "crm",
    name: "CRM Workflow System",
    summary: "A practical workspace for sales, support, and customer lifecycle tasks.",
    overview: "A CRM frontend focused on repeatable daily workflows and confident handoffs.",
    problem: "Users were losing context between lists, details, and action panels.",
    architecture: "Route-aware layout, normalized UI state, and reusable task surfaces.",
    technologies: ["Next.js", "Zustand", "Tailwind CSS", "REST APIs"],
    challenges: "Preventing layout jumps and keeping high-frequency actions discoverable.",
    solution: "Stable panels, compact metadata, and keyboard-friendly navigation.",
    result: "Reduced friction for repeated customer operations.",
  },
  {
    id: "design-system",
    name: "Design System Foundation",
    summary: "A reusable component language for product teams.",
    overview: "A design system that turns product patterns into documented, reliable components.",
    problem: "Inconsistent UI primitives slowed delivery and weakened user trust.",
    architecture: "Tokenized theme, typed variants, shared accessibility rules, and usage examples.",
    technologies: ["React", "TypeScript", "Storybook", "CSS Variables"],
    challenges: "Creating enough flexibility without making every component arbitrary.",
    solution: "Strict primitives, documented escape hatches, and predictable visual states.",
    result: "More consistent product delivery with less design drift.",
  },
];

const skills = [
  {
    group: "Frontend",
    children: [
      ["React", "5+ yrs", "Component systems, state boundaries, and interaction design."],
      ["Next.js", "4+ yrs", "App routing, rendering strategy, and production performance."],
      ["TypeScript", "5+ yrs", "Readable contracts, safer refactors, and product-scale typing."],
      ["Tailwind", "3+ yrs", "Token-minded implementation with fast iteration."],
      ["React Query", "3+ yrs", "Server state, cache invalidation, and async UX."],
      ["Zustand", "2+ yrs", "Small focused stores for local product state."],
    ],
  },
  {
    group: "Craft",
    children: [
      ["Accessibility", "3+ yrs", "Keyboard paths, semantics, contrast, and reduced motion."],
      ["Design Systems", "4+ yrs", "Reusable primitives and consistent product language."],
      ["Performance", "4+ yrs", "Layout stability, lazy loading, and render discipline."],
      ["UX Debugging", "5+ yrs", "Tracing user symptoms back to state and data flow."],
    ],
  },
];

const experience = [
  {
    company: "Product Engineering",
    role: "Senior Frontend Engineer",
    duration: "2022 - Present",
    achievements: [
      "Built production interfaces for complex assistant, chat, CRM, and dashboard workflows.",
      "Refactored fragile UI state into predictable hooks and server-state contracts.",
      "Partnered across product and design to turn ambiguous requirements into shippable UX.",
    ],
    technologies: ["React", "Next.js", "TypeScript", "React Query", "MUI"],
  },
  {
    company: "Frontend Systems",
    role: "UI Engineer",
    duration: "2019 - 2022",
    achievements: [
      "Created reusable component foundations for faster product delivery.",
      "Improved loading, empty, error, and keyboard states across core user journeys.",
      "Reduced visual inconsistency by aligning implementation with design tokens.",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Storybook"],
  },
];

const initLines = [
  "Initialize Portfolio...",
  "Loading Developer Profile...",
  "Loading Projects...",
  "Loading Experience...",
  "Loading Skills...",
  "Ready",
];

const commands: Command[] = [
  { label: "Open About", action: "open:about" },
  { label: "Open Projects", action: "open:projects" },
  { label: "Open Skills", action: "open:skills" },
  { label: "Open Experience", action: "open:experience" },
  { label: "Open Contact", action: "open:contact" },
  { label: "Download Resume", action: "resume" },
  { label: "Open GitHub", action: "github" },
  { label: "Open LinkedIn", action: "linkedin" },
  { label: "Toggle Theme", action: "theme" },
  { label: "Search Projects", action: "open:projects" },
  { label: "Focus Explorer", action: "focus" },
];

export default function Home() {
  const [openTabs, setOpenTabs] = useState<FileId[]>(["about"]);
  const [activeFile, setActiveFile] = useState<FileId>("about");
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [expandedCommit, setExpandedCommit] = useState(0);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCommand, setSelectedCommand] = useState(0);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [readyStep, setReadyStep] = useState(0);
  const explorerRef = useRef<HTMLDivElement>(null);
  const paletteInputRef = useRef<HTMLInputElement>(null);

  const filteredCommands = useMemo(
    () =>
      commands.filter((command) =>
        command.label.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [query],
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (readyStep >= initLines.length) {
      return;
    }
    const timer = window.setTimeout(() => setReadyStep((step) => step + 1), 420);
    return () => window.clearTimeout(timer);
  }, [readyStep]);

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openPalette();
      }
      if (event.key === "Escape") {
        setPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (paletteOpen) {
      requestAnimationFrame(() => paletteInputRef.current?.focus());
    }
  }, [paletteOpen]);

  function openPalette() {
    setQuery("");
    setSelectedCommand(0);
    setPaletteOpen(true);
  }

  function openFile(fileId: FileId) {
    setOpenTabs((tabs) => (tabs.includes(fileId) ? tabs : [...tabs, fileId]));
    setActiveFile(fileId);
  }

  function closeTab(fileId: FileId) {
    setOpenTabs((tabs) => {
      const nextTabs = tabs.filter((tab) => tab !== fileId);
      if (activeFile === fileId) {
        setActiveFile(nextTabs.at(-1) ?? "about");
      }
      return nextTabs.length ? nextTabs : ["about"];
    });
  }

  function runCommand(action: string) {
    if (action.startsWith("open:")) {
      openFile(action.replace("open:", "") as FileId);
    }
    if (action === "theme") {
      setTheme((current) => (current === "dark" ? "light" : "dark"));
    }
    if (action === "github") {
      window.open("https://github.com", "_blank", "noopener,noreferrer");
    }
    if (action === "linkedin") {
      window.open("https://linkedin.com", "_blank", "noopener,noreferrer");
    }
    if (action === "resume") {
      openFile("contact");
    }
    if (action === "focus") {
      explorerRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    }
    setPaletteOpen(false);
  }

  function onPaletteKeyDown(event: KeyboardEvent<HTMLInputElement>) {
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
  }

  return (
    <main className="portfolio-shell">
      <CommandPalette
        open={paletteOpen}
        query={query}
        selectedCommand={selectedCommand}
        commands={filteredCommands}
        inputRef={paletteInputRef}
        onQuery={setQuery}
        onKeyDown={onPaletteKeyDown}
        onRun={runCommand}
        onClose={() => setPaletteOpen(false)}
      />

      <aside className="activity-bar" aria-label="Workspace activity">
        <button aria-label="Explorer" className="activity-button is-active">
          EX
        </button>
        <button aria-label="Search commands" className="activity-button" onClick={openPalette}>
          CK
        </button>
        <button aria-label="Toggle theme" className="activity-button" onClick={() => runCommand("theme")}>
          TH
        </button>
      </aside>

      <aside className="explorer" ref={explorerRef} aria-label="Explorer">
        <div className="explorer-header">
          <span>Explorer</span>
          <button onClick={openPalette} aria-label="Open command palette">
            Ctrl K
          </button>
        </div>
        <div className="workspace-title">SIAVASH_WORKSPACE</div>
        <nav className="file-tree" aria-label="Portfolio files">
          {files.map((file) => (
            <button
              key={file.id}
              className={`file-row ${activeFile === file.id ? "is-active" : ""}`}
              onClick={() => openFile(file.id)}
              aria-current={activeFile === file.id ? "page" : undefined}
            >
              <span className={`file-dot ${file.kind}`} />
              <span>{file.label}</span>
            </button>
          ))}
        </nav>
        <div className="explorer-card">
          <span className="muted">Current Status</span>
          <strong>Available for focused frontend work</strong>
        </div>
      </aside>

      <section className="editor" aria-label="Editor workspace">
        <div className="tab-bar" role="tablist" aria-label="Open files">
          {openTabs.map((tab) => {
            const file = files.find((item) => item.id === tab);
            return (
              <button
                key={tab}
                className={`tab ${activeFile === tab ? "is-active" : ""}`}
                onClick={() => setActiveFile(tab)}
                role="tab"
                aria-selected={activeFile === tab}
              >
                <span>{file?.label}</span>
                <span
                  role="button"
                  tabIndex={0}
                  aria-label={`Close ${file?.label}`}
                  className="tab-close"
                  onClick={(event) => {
                    event.stopPropagation();
                    closeTab(tab);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      event.stopPropagation();
                      closeTab(tab);
                    }
                  }}
                >
                  x
                </span>
              </button>
            );
          })}
        </div>

        <div className="editor-body">
          <div className="breadcrumbs">
            <span>portfolio</span>
            <span>/</span>
            <span>{files.find((file) => file.id === activeFile)?.path}</span>
          </div>
          <div className="panel-animate" key={activeFile}>
            {activeFile === "about" && <AboutPanel readyStep={readyStep} onOpen={openFile} />}
            {activeFile === "projects" && (
              <ProjectsPanel activeProject={activeProject} onSelectProject={setActiveProject} />
            )}
            {activeFile === "experience" && (
              <ExperiencePanel expandedCommit={expandedCommit} onExpand={setExpandedCommit} />
            )}
            {activeFile === "skills" && <SkillsPanel />}
            {activeFile === "thinking" && <ThinkingPanel />}
            {activeFile === "inspect" && <InspectPanel />}
            {activeFile === "contact" && <ContactPanel />}
          </div>
        </div>

        <MobileTabs activeFile={activeFile} onOpen={openFile} />
        <footer className="status-bar" aria-label="Build status">
          <span>Build: passing</span>
          <span>v1.0.0</span>
          <span>Last updated: 2026-07-07</span>
          <span>Next.js + React + TypeScript</span>
        </footer>
      </section>
    </main>
  );
}

function AboutPanel({ readyStep, onOpen }: { readyStep: number; onOpen: (file: FileId) => void }) {
  const isReady = readyStep >= initLines.length;

  return (
    <section className="about-grid">
      <div className="terminal-card" aria-label="Initialization sequence">
        <div className="terminal-chrome">
          <span />
          <span />
          <span />
        </div>
        <div className="terminal-lines">
          {initLines.slice(0, Math.min(readyStep, initLines.length)).map((line) => (
            <p key={line} className={line === "Ready" ? "success-line" : ""}>
              {line === "Ready" ? "OK " : "$ "}
              {line}
            </p>
          ))}
          {!isReady && <p className="cursor-line">$ compiling workspace</p>}
        </div>
      </div>

      <div className={`profile-reveal ${isReady ? "is-ready" : ""}`}>
        <p className="eyebrow">Senior Frontend Engineer</p>
        <h1>Siavash builds polished product interfaces with engineering discipline.</h1>
        <p>
          I design and implement modern frontend systems where interaction, accessibility,
          architecture, and product clarity work together.
        </p>
        <div className="hero-actions">
          <button onClick={() => onOpen("contact")}>Contact</button>
          <button onClick={() => onOpen("projects")}>View Projects</button>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectsPanel({
  activeProject,
  onSelectProject,
}: {
  activeProject: Project;
  onSelectProject: (project: Project) => void;
}) {
  return (
    <section className="projects-layout">
      <div className="git-history" aria-label="Project git history">
        {projects.map((project) => (
          <button
            key={project.id}
            className={`commit-node ${activeProject.id === project.id ? "is-active" : ""}`}
            onClick={() => onSelectProject(project)}
          >
            <span className="commit-mark" />
            <span>
              <strong>{project.name}</strong>
              <small>{project.summary}</small>
            </span>
          </button>
        ))}
      </div>

      <article className="project-file">
        <div className="file-heading">
          <p className="eyebrow">opened file</p>
          <h2>{activeProject.name}.tsx</h2>
        </div>
        <DefinitionList
          items={[
            ["Overview", activeProject.overview],
            ["Problem", activeProject.problem],
            ["Architecture", activeProject.architecture],
            ["Challenges", activeProject.challenges],
            ["Solution", activeProject.solution],
            ["Result", activeProject.result],
          ]}
        />
        <div className="tech-row">
          {activeProject.technologies.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <div className="project-actions">
          <a href="https://github.com" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://vercel.com" target="_blank" rel="noreferrer">
            Live Demo
          </a>
        </div>
      </article>
    </section>
  );
}

function SkillsPanel() {
  return (
    <section className="skill-grid">
      {skills.map((branch) => (
        <div className="dependency-tree" key={branch.group}>
          <h2>{branch.group}</h2>
          {branch.children.map(([name, years, description], index) => (
            <div className="dependency-row" key={name}>
              <span className="tree-glyph">{index === branch.children.length - 1 ? "`--" : "|--"}</span>
              <span className="tech-icon">{name.slice(0, 2)}</span>
              <span>
                <strong>{name}</strong>
                <small>
                  {years} / {description}
                </small>
              </span>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}

function ExperiencePanel({
  expandedCommit,
  onExpand,
}: {
  expandedCommit: number;
  onExpand: (index: number) => void;
}) {
  return (
    <section className="experience-list">
      {experience.map((item, index) => (
        <article className={`commit-card ${expandedCommit === index ? "is-expanded" : ""}`} key={item.company}>
          <button onClick={() => onExpand(index)} aria-expanded={expandedCommit === index}>
            <span className="commit-hash">commit {String(index + 1).padStart(2, "0")}</span>
            <strong>{item.role}</strong>
            <span>{item.company}</span>
            <small>{item.duration}</small>
          </button>
          {expandedCommit === index && (
            <div className="commit-details">
              <ul>
                {item.achievements.map((achievement) => (
                  <li key={achievement}>{achievement}</li>
                ))}
              </ul>
              <div className="tech-row">
                {item.technologies.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          )}
        </article>
      ))}
    </section>
  );
}

function ThinkingPanel() {
  const steps = [
    ["Problem", "A chat workflow showed duplicate assistant messages after server refresh."],
    ["Investigation", "Compared optimistic messages, server history, and render keys across states."],
    ["Root Cause", "The UI trusted both local echoes and fetched history without a shared identity rule."],
    ["Solution", "Normalized messages at the boundary and reconciled pending items after refetch."],
    ["Result", "Stable rendering, clearer loading states, and a calmer user experience."],
  ];

  return (
    <section className="thinking-flow">
      <div className="file-heading">
        <p className="eyebrow">case study</p>
        <h2>How I Think</h2>
      </div>
      {steps.map(([title, body], index) => (
        <article className="thinking-step" style={{ "--step-index": index } as React.CSSProperties} key={title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

function InspectPanel() {
  const rows = [
    ["Developer Profile", "Frontend engineer, product-minded UI designer"],
    ["Preferred Stack", "Next.js, React, TypeScript, Tailwind, React Query"],
    ["Architecture Style", "Data-driven components, small hooks, explicit state ownership"],
    ["Favorite Libraries", "React Query, Zustand, MUI, Tailwind CSS"],
    ["Coding Principles", "Readable contracts, accessible defaults, resilient async UX"],
    ["Current Status", "Available for work"],
    ["Open Source", "Interested"],
    ["Learning", "AI product interfaces and interaction systems"],
  ];

  return (
    <section className="devtools">
      <div className="devtools-tabs">
        <span className="is-active">Elements</span>
        <span>Console</span>
        <span>Network</span>
        <span>Profile</span>
      </div>
      <div className="object-inspector">
        <code>const developer = {"{"}</code>
        {rows.map(([key, value]) => (
          <div className="inspect-row" key={key}>
            <span>{key}</span>
            <strong>{value}</strong>
          </div>
        ))}
        <code>{"}"}</code>
      </div>
    </section>
  );
}

function ContactPanel() {
  return (
    <section className="contact-panel">
      <div>
        <p className="eyebrow">contact.ts</p>
        <h2>Run a direct action.</h2>
        <p>Email, GitHub, LinkedIn, and resume actions are presented like developer commands.</p>
      </div>
      <div className="contact-actions">
        <a href="mailto:hello@example.com">sendEmail(&quot;hello@example.com&quot;)</a>
        <a href="https://github.com" target="_blank" rel="noreferrer">
          openGitHub()
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer">
          openLinkedIn()
        </a>
        <a href="/resume.pdf">downloadResume()</a>
      </div>
    </section>
  );
}

function DefinitionList({ items }: { items: Array<[string, string]> }) {
  return (
    <dl className="definition-list">
      {items.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function CommandPalette({
  open,
  query,
  selectedCommand,
  commands,
  inputRef,
  onQuery,
  onKeyDown,
  onRun,
  onClose,
}: {
  open: boolean;
  query: string;
  selectedCommand: number;
  commands: Command[];
  inputRef: React.RefObject<HTMLInputElement | null>;
  onQuery: (value: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onRun: (action: string) => void;
  onClose: () => void;
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="palette-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className="command-palette"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => onQuery(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Type a command..."
          aria-label="Search commands"
        />
        <div className="command-list" role="listbox">
          {commands.map((command, index) => (
            <button
              key={command.label}
              className={selectedCommand === index ? "is-active" : ""}
              onClick={() => onRun(command.action)}
              role="option"
              aria-selected={selectedCommand === index}
            >
              <span>{command.label}</span>
              <kbd>Enter</kbd>
            </button>
          ))}
          {!commands.length && <p>No commands found.</p>}
        </div>
      </div>
    </div>
  );
}

function MobileTabs({ activeFile, onOpen }: { activeFile: FileId; onOpen: (file: FileId) => void }) {
  return (
    <nav className="mobile-tabs" aria-label="Mobile file tabs">
      {files.slice(0, 5).map((file) => (
        <button
          key={file.id}
          className={activeFile === file.id ? "is-active" : ""}
          onClick={() => onOpen(file.id)}
          aria-label={`Open ${file.label}`}
        >
          {file.label.split(".")[0].slice(0, 4)}
        </button>
      ))}
    </nav>
  );
}
