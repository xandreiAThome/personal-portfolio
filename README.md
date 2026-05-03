# ✦ Digital Cosmos Portfolio

Next.js portfolio with a "Digital Cosmos" aesthetic. Uses Tailwind v4 (OKLCH), Motion, and OpenSpec.

## Features

- **Solar System Hero**: CSS/Motion-driven orbits with tech icon "planets" around a central profile sun.
- **Nebula & Supernova Theme**: OKLCH color system featuring deep blues (Nebula) and radiant magentas (Supernova).
- **Project Showcase**: Glassmorphic 3-column grid with uniform height cards and localized glow effects.
- **Atomic Design**: Structured into Atoms, Molecules, and Organisms.
- **Spec-Driven**: Requirements and architecture managed via the OpenSpec framework.
- **Secure Contact**: Cloudflare Turnstile and honeypot protected form.
- **CV View**: Backdrop-blurred dialog with embedded PDF viewer and download.

## Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Typography**: Inter (Sans) & Fira Code (Mono)

## Structure

```text
src/
├── app/                 # Next.js App Router
├── components/
│   ├── atoms/           # Base primitives
│   ├── molecules/       # Compound components
│   └── organisms/       # Complex sections
├── data/                # JSON content (Projects, About, Socials)
├── lib/                 # Shared utilities
└── openspec/            # OpenSpec artifacts
    ├── specs/           # Main specifications (Source of Truth)
    └── changes/         # Feature delta specs and tasks
```

## Setup

### Prerequisites

- Node.js 20+
- npm / pnpm / bun

### Installation

1. **Clone**:

   ```bash
   git clone https://github.com/your-username/cosmic-portfolio.git
   cd cosmic-portfolio
   ```

2. **Install**:

   ```bash
   npm install
   ```

3. **Configure**:
   Create `.env.local`:

   ```env
   NEXT_PUBLIC_TURNSTILE_SITEKEY=your_site_key
   ```

4. **Run**:
   ```bash
   npm run dev
   ```

## Workflow

Managed via **OpenSpec**. Requirements and architectural decisions live in `openspec/specs/`. Feature development uses delta specs in `openspec/changes/` which are archived and synced upon completion.

---

Built by **Ellexandrei Esponilla**
