"use client";

import { FormEvent, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ExternalLink, Mail, Send, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactActions } from "../../data/workspace";
import { createMailto, profile } from "../../data/profile";
import { cardClass, eyebrowClass } from "./panel-ui";

type ContactForm = {
  message: string;
  name: string;
  subject: string;
};

const initialForm: ContactForm = {
  message: "",
  name: "",
  subject: "Frontend project inquiry",
};

export function ContactPanel() {
  const [form, setForm] = useState(initialForm);
  const [sentHint, setSentHint] = useState(false);

  const mailto = useMemo(() => {
    const signature = form.name ? `\n\nFrom: ${form.name}` : "";
    return createMailto({
      subject: form.subject || initialForm.subject,
      body: `${form.message || "Hi Siavash,\n\nI would like to talk about a frontend project."}${signature}`,
    });
  }, [form]);

  const canSend = form.message.trim().length > 8;

  function updateField(field: keyof ContactForm, value: string) {
    setSentHint(false);
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSend) return;
    setSentHint(true);
    window.location.href = mailto;
  }

  return (
    <section className={`${cardClass} grid max-w-6xl gap-5 p-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(19rem,1.15fr)]`}>
      <div>
        <p className={eyebrowClass}>contact.ts</p>
        <h2 className="mt-1 text-2xl font-semibold">Run a direct action.</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Send a prepared email, open social profiles, or request the latest
          resume without hunting for the right link.
        </p>

        <div className="mt-5 grid content-start gap-2">
          {contactActions.map((action) => {
            const Icon = action.icon;

            return (
              <ActionLink href={action.href} icon={<Icon />} key={action.label}>
                {action.label}
              </ActionLink>
            );
          })}
        </div>
      </div>

      <form className="grid gap-3" onSubmit={submitForm}>
        <label className="grid gap-1.5 text-sm">
          <span className="font-mono text-xs text-muted-foreground">name</span>
          <input
            className="h-10 rounded-md border border-border bg-input px-3 text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/25"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Your name"
          />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="font-mono text-xs text-muted-foreground">subject</span>
          <input
            className="h-10 rounded-md border border-border bg-input px-3 text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/25"
            value={form.subject}
            onChange={(event) => updateField("subject", event.target.value)}
            placeholder="Frontend project inquiry"
          />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="font-mono text-xs text-muted-foreground">message</span>
          <textarea
            className="min-h-36 resize-y rounded-md border border-border bg-input px-3 py-2 text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/25"
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder="Hi Siavash, I want to talk about..."
            required
          />
        </label>

        <div className="flex flex-wrap items-center gap-2">
          <Button disabled={!canSend} type="submit">
            <Send />
            Send email
          </Button>
          <Button variant="secondary" asChild>
            <a href={mailto}>
              <Mail />
              Open email draft
            </a>
          </Button>
        </div>

        <p className="min-h-5 text-xs text-muted-foreground">
          {sentHint
            ? "Your email app should open with the message ready to send."
            : `Messages are prepared for ${profile.email}.`}
        </p>
      </form>
    </section>
  );
}

function ActionLink({
  children,
  href,
  icon,
}: {
  children: ReactNode;
  href: string;
  icon: ReactNode;
}) {
  return (
    <Button variant="command" asChild className="justify-start font-mono">
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
      >
        {icon}
        <span className="truncate">{children}</span>
        {href.startsWith("http") ? (
          <ExternalLink className="ml-auto size-3.5 opacity-60" />
        ) : (
          <Terminal className="ml-auto size-3.5 opacity-60" />
        )}
      </a>
    </Button>
  );
}
