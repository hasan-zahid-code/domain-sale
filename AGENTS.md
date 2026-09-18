# AGENTS.md

This document provides an overview of the project structure for developers and AI agents working on this codebase.

## Project Overview

A single-page domain-for-sale offer form for `transprint.com.pk`. Built with TanStack Start and deployed on Netlify.
There is no backend beyond Netlify Forms — no database, no auth, no server functions.

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| Form handling | Netlify Forms (honeypot spam protection) |
| Language | TypeScript 5.9 (strict mode) |
| Deployment | Netlify |

## Directory Structure

```
├── public
│   ├── favicon.ico
│   └── form-domain-offer.html  # Hidden static form so Netlify's build bot can register the form and its fields.
├── src
│   ├── components
│   │   └── DomainOfferForm.tsx  # The offer form: fields, client-side email-match check, AJAX submit to Netlify Forms.
│   ├── routes
│   │   ├── __root.tsx  # Root layout: HTML shell, HeadContent, styles, child route outlet.
│   │   └── index.tsx  # Landing route: renders DomainOfferForm.
│   ├── router.tsx  # TanStack Router setup.
│   └── styles.css  # Tailwind import plus base font styling.
├── netlify.toml  # Build command (vite build), publish directory (dist/client), dev server settings.
├── package.json
└── vite.config.ts
```

## Netlify Forms — why `public/form-domain-offer.html` exists

TanStack Start renders the form client-side with React, so Netlify's build-time HTML scanner never sees it
directly. `public/form-domain-offer.html` is a hidden, unused static copy of the same form (same `name` and
field `name` attributes) that exists purely so Netlify registers the form and its fields during the build. The
real form in `DomainOfferForm.tsx` submits via `fetch('/form-domain-offer.html', ...)` with
`application/x-www-form-urlencoded` body, which is what actually reaches Netlify's form-processing middleware.

If a field is added to the React form, add the same field name to the static HTML file, or Netlify will reject
the submission.

**Form name:** `domain-offer`
**Spam protection:** `netlify-honeypot="bot-field"` with a hidden `bot-field` input. No reCAPTCHA — removed
because Netlify's automatic widget injection doesn't work on this server-rendered route, and honeypot alone is
considered sufficient for now.

## Conventions

- Components: PascalCase
- Routes: kebab-case files under `src/routes/`
- Tailwind utility classes for styling; no CSS-in-JS
- TypeScript strict mode

## Development Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
```
