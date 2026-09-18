# transprint.com.pk — Domain Offer Form

A single-page site for selling the domain `transprint.com.pk`. Visitors read a short pitch and submit a purchase
offer through a form; submissions are collected via Netlify Forms with a honeypot field for spam protection.

## Tech stack

- [TanStack Start](https://tanstack.com/start) (React 19 + TanStack Router) for the app shell and routing
- [Vite](https://vitejs.dev) for the dev server and build
- [Tailwind CSS 4](https://tailwindcss.com) for styling
- [Netlify Forms](https://docs.netlify.com/forms/setup/) for serverless form handling, with a honeypot field for
  spam filtering

## Running locally

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`. Note: Netlify Forms submissions only work once the site is deployed —
local dev will not record submissions.

## Form fields

The offer form (`src/components/DomainOfferForm.tsx`) collects:

- Price offer in PKR (required)
- First name (required)
- Second name (required)
- E-mail (required)
- Confirm e-mail (required — must match E-mail)
- Phone (optional, Pakistan number expected)
- Comment (optional)

Submissions land in the Netlify UI under **Project configuration > Forms**, where email notifications can also be
configured.

## Project structure

- `src/routes/index.tsx` — the landing page, renders the offer form
- `src/components/DomainOfferForm.tsx` — the form component and submit logic
- `public/form-domain-offer.html` — a hidden static form used only so Netlify can detect and register the form
  fields at build time (see `AGENTS.md` for why this file exists)
