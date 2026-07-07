# Siavash IDE Portfolio

An interactive developer portfolio for **Siavash Aghazadeh**, designed like a focused IDE instead of a generic landing page.

The project presents resume-backed profile, projects, experience, skills, engineering thinking, and contact actions through editor tabs, an explorer tree, a command palette, and responsive mobile navigation.

## Highlights

- IDE-inspired portfolio experience with tabs, breadcrumbs, explorer, status bar, and command palette.
- Modular feature structure built with small React components and data-driven panels.
- Tailwind CSS 4 theme tokens with a very small global stylesheet.
- Light and dark themes powered by `next-themes`.
- Lightweight UI animations with `framer-motion`.
- Responsive sidebar behavior: desktop sidebar toggles, mobile drawer opens and closes independently.
- Contact form that creates a ready-to-send email draft for `siavash.aghazadeh@gmail.com`.
- Portfolio data is based on Siavash's resume: DGShahr, Witro, NahareKari, frontend skills, education, and contact details.
- Real social actions for LinkedIn and GitHub:
  - LinkedIn: https://www.linkedin.com/in/siavash-aghazadeh/
  - GitHub: https://github.com/30YA

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide React
- Radix UI primitives
- next-themes

## Project Structure

```txt
app/
  globals.css              Theme tokens, Tailwind import, and small app reset
  layout.tsx               Root layout and theme provider
  page.tsx                 Portfolio entry route

components/
  ui/                      Shared UI primitives
  theme-provider.tsx       Theme wiring

features/ide/
  components/              IDE shell, navigation, tabs, explorer, status UI
  components/panels/       Small editor panel modules
  data/                    Portfolio/profile/contact/project data
  hooks/                   Workspace state and command behavior
  types.ts                 Feature contracts
```

## Core UX

- `Cmd/Ctrl + K` opens the command palette.
- `Cmd/Ctrl + P` also opens command search.
- `Cmd/Ctrl + B` toggles the sidebar.
- `Alt/Meta + 1..7` opens portfolio files directly.
- Explorer search filters portfolio files.
- Contact actions open email, GitHub, LinkedIn, or a resume request email draft.

## Getting Started

```bash
npm install
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Scripts

```bash
npm run dev      # Start local development server
npm run build    # Create production build
npm run start    # Serve production build
npm run lint     # Run ESLint
```

## Contact Form

The contact form uses a `mailto:` workflow so it works without a backend or third-party email service. When a visitor submits the form, their email client opens with:

- recipient set to `siavash.aghazadeh@gmail.com`
- subject from the form
- message body from the form
- optional sender name appended to the draft

For production-grade server delivery, the next step would be adding a route handler with an email provider such as Resend, Postmark, or SendGrid.

## Development Notes

- Keep portfolio content in `features/ide/data`.
- Keep visual panel work inside `features/ide/components/panels`.
- Prefer small, named components over growing a central file.
- Keep `app/globals.css` limited to tokens and reset-level concerns.
- Use Tailwind utilities for component layout and interaction states.

## Quality Check

The current refactor has been verified with:

```bash
npm run build
```
