# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server on localhost:3000
npm run build    # Production build
npm run start    # Run production server
npm run lint     # Run ESLint
```

No test framework is configured.

## Architecture

**Next.js 14 App Router** marketing website for a commercial loan brokerage (Aus Trade Fin / ATF).

### Key Directories

- `app/` — Pages using App Router. Root `layout.tsx` wraps all pages with `Header` and `Footer`.
- `components/` — Shared UI components (no subdirectories).
- `data/` — Static TypeScript data files (`team.ts`, `caseStudies.ts`) with exported interfaces and arrays.

### Component Patterns

- **`Section.tsx`** — Reusable section wrapper accepting optional `eyebrow`, `title`, `subtitle` props plus `dark` variant. Used across all pages for consistent structure.
- **`MotionInView.tsx`** — Scroll-triggered animation wrapper (Framer Motion: opacity 0→1, translateY 24→0). Wrap elements to add reveal animations.
- **`ConcentricPattern.tsx`** — Decorative SVG pattern used in page headers and section backgrounds. Accepts `dark`/`light` and position props.
- **`PageHeader.tsx`** — Consistent navy-background header for secondary pages (uses `ConcentricPattern`).

### Styling

Tailwind CSS with a custom navy brand palette defined in `tailwind.config.ts`:
- Primary brand: `navy-900` (`#0A1628`)
- Accent: `navy-400` (`#3B7DD8`)

Reusable CSS classes in `globals.css`:
- `.btn-primary`, `.btn-outline`, `.btn-light` — button variants
- `.container-main` — max-width 1200px centered container
- `.section-padding` — consistent vertical padding

Fonts: **Libre Franklin** (sans/body) and **Libre Baskerville** (serif/headings) — loaded via `next/font/google`.

### Adding Content

- **New case studies**: Add entries to `data/caseStudies.ts` following the `CaseStudy` interface.
- **New team members**: Add entries to `data/team.ts` following the `TeamMember` interface. Avatars use initials fallback (no images).
- **New pages**: Add `page.tsx` in a new `app/` subdirectory; use `PageHeader` for consistent secondary page header.

<!-- convex-ai-start -->
This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read `convex/_generated/ai/guidelines.md` first** for important guidelines on how to correctly use Convex APIs and patterns. The file contains rules that override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running `npx convex ai-files install`.
<!-- convex-ai-end -->
