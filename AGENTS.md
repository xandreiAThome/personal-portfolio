# AGENTS.md

## Commands

- `npm run dev` — Start dev server on localhost:3000
- `npm run build` — Production build (outputs `standalone` mode for Docker)
- `npm run lint` — ESLint (next/core-web-vitals + typescript preset)
- `npm run start` — Run production build locally

No test framework configured. No `typecheck` script — use `npx tsc --noEmit` to verify types.

## Stack

- **Next.js 16** with App Router, React 19
- **Tailwind CSS v4** — imported via `@import "tailwindcss"` in `app/globals.css` (no `tailwind.config.js`)
- **shadcn/ui** (New York style) with Radix UI primitives
- **Fonts**: Inter (sans), Fira Code (mono) via `next/font/google`
- **Dark theme primary** — colors defined with oklch in globals.css

## Structure

- `app/` — Next.js App Router pages, layouts, API routes
- `components/atoms|molecules|organisms/` — atomic design components
- `components/ui/` — shadcn/ui primitives (add new ones here)
- `lib/utils.ts` — `cn()` helper for className merging (use this everywhere)
- `data/*.json` — content sources (projects, about, social links) — no database
- `@/*` → root directory (see tsconfig.json paths)

## Key Quirks

- **Standalone output**: `next.config.ts` sets `output: "standalone"` for Docker deployment (see Dockerfile)
- **Contact form** (`app/api/contact/route.ts`): requires SMTP env vars + optional Cloudflare Turnstile. See `.env.example`.
- **No `.env.local` in repo** — copy `.env.example` and fill values for local dev
- **Vercel Analytics** loaded in root layout
- **AI tool configs**: OpenSpec workflows in `.opencode/`, `.github/`, `.claude/` (sync these if editing workflow)
