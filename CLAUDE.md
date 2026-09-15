# Kenzoil Lubricants — Website Revamp Plan

## 1. Goal
Rebuild kenzoillubes.com as a modern, animated, single-codebase site that:
- Preserves all existing content (products, catalogues, about, contact info)
- Fixes the broken contact form so leads actually reach the client
- Uses a Groww-style hero animation, reinterpreted with an oil/industrial theme
- Is built and iterated on entirely with Claude Code

## 2. Reference analysis (Groww.in)
What to borrow, not copy:
- **Hero**: full-bleed dark background, one glowing animated centerpiece (Groww uses a blue swirling orb built from layered radial gradients + a rotating conic-gradient ring, likely CSS/SVG + a bit of JS, not a video file). For Kenzoil: reinterpret as an **amber/gold oil-drop or swirling oil vortex** — same "glowing orb on black" technique, oil-colored palette.
- **Second section**: a horizontal strip of slightly rotated/fanned cards that a user can scroll through (their language cards). For Kenzoil: reuse this pattern for **product category cards** (Automotive, Industrial, Textile, Grease, etc.) fanned out the same way.
- Overall Groww feel: dark hero → white/light content sections → lots of scroll-triggered fades and card tilts, generous whitespace, big confident type.

Do not reuse Groww's colors, logo motion, or exact copy — just the animation *techniques* (gradient orb, fanned card carousel, scroll reveals).

## 3. Fixing the contact form (priority #1 functional fix)
The form currently has no working endpoint. Options, easiest first:
1. **Formspree / Web3Forms** — drop-in hosted form endpoint, zero backend code, free tier, emails land in client's inbox in minutes. Best if client just wants "queries in my email."
2. **Resend (or Nodemailer) via a Next.js API route** — a few lines of serverless code, more control over formatting/auto-reply, still no dedicated server to maintain.
3. **Store to a database (e.g. Supabase) + email notification** — if the client eventually wants a leads dashboard.

Recommendation: start with **option 1 (Formspree/Web3Forms)** to ship fast and guarantee it works day one; swap to option 2 later if the client wants a branded auto-reply.

## 4. Recommended tech stack
- **Next.js (App Router) + TypeScript** — file-based routing maps cleanly to Home/Products/About/Contact, easy to deploy on Vercel, and Claude Code works very well in this stack.
- **Tailwind CSS** — fast styling, pairs well with the frontend-design conventions Claude Code already knows.
- **Framer Motion** — scroll reveals, card fan/tilt animation, hero entrance animation.
- Optional: a light Three.js/canvas layer only if we want a literal 3D oil-drop; otherwise CSS/SVG gradients (like Groww's orb) are lighter and will look just as premium.
- **Vercel** for hosting/preview links (free tier is enough for a company brochure site).
- **Note:** project uses Tailwind CSS v4 — theme colors are defined via `@theme` in `src/app/globals.css`, not `tailwind.config.ts` (v4 has no JS config file by default).

## 5. Site map (mirrors current, restyled)
- `/` — Home: hero (oil animation) → product category fan-cards → "Why Kenzoil" (ISO cert, mission snippet) → CTA → footer
- `/products` — filterable grid (Automotive / Industrial / Textile / Metal Working / Rubber Process / Transformer / White Oil / Grease), each product card → detail with description + catalogue PDF download
- `/about` — company story, Mission, Vision (existing copy, restyled)
- `/contact` — map, address blocks (factory + office), working form

## 6. Animation inventory to build
1. Hero: animated oil-vortex/orb (gradient + slow rotation), headline fade/slide-in, subtle particle drips
2. Scroll-triggered fade-ups for every section
3. Fanned/tilted product-category card strip (Groww "language cards" pattern) with hover-straighten
4. Product grid: hover-lift + shadow on cards
5. Numbers/stats counter animation if we add "years in business / products / clients" stats
6. Sticky/animated navbar that condenses on scroll

## 7. Assets needed from the client
- Higher-res factory/product photography (current slider images are low-res JPGs)
- Vector logo (SVG) if available
- Any brand colors they want kept (currently generic blue/red slider text — worth proposing an amber/oil-gold + charcoal palette)
- Confirmation on all 17 product PDFs — reuse as-is or need to be redesigned too?

## 8. Build phases (how we'll use Claude Code)
- **Phase 0 — Setup**: scaffold Next.js + Tailwind + Framer Motion project, put this file in the repo root as `CLAUDE.md` so Claude Code has full context every session.
- **Phase 1 — Structure & content**: build all 4 pages with real content, no animation yet, get the form working end-to-end first.
- **Phase 2 — Visual design pass**: apply palette, typography, layout polish (this is where frontend-design conventions matter most).
- **Phase 3 — Animation pass**: hero orb, fan-cards, scroll reveals — one at a time, test each in isolation.
- **Phase 4 — Content QA**: side-by-side check against the old site so nothing (products, PDFs, addresses) got dropped.
- **Phase 5 — Deploy & handoff**: Vercel deploy, connect custom domain, confirm form delivers to client's real inbox.

## 9. Decisions (finalized)
- **Form provider**: Web3Forms (free, no submission cap, no backend code). Upgrade path to a custom API route later if client wants branded auto-replies or a leads dashboard — frontend form markup won't need to change when we do.
- **Palette — "industrial neutral with one warm pop"**:
  - Base neutrals: charcoal `#1A1A1A`–`#2A2A2A`, warm off-white `#F7F5F2`
  - Accent (oil-gold): `#D98A3D`–`#E8A855`, used sparingly — CTAs, hero animation, hover states
  - Optional secondary: deep rust/copper for active states
  - Layout: dark hero (oil-vortex animation) → light content sections, Groww-style contrast

## 10. Phase 0 — concrete Claude Code kickoff prompt
Once you've got an empty repo + Claude Code open in it, this file (`CLAUDE.md`) should already be in the repo root. Then give Claude Code a scaffolding prompt like:

> "Read CLAUDE.md for full project context. Scaffold a Next.js 14 (App Router) + TypeScript + Tailwind CSS project. Install framer-motion. Set up the color palette from section 9 as Tailwind theme colors (charcoal, off-white, oil-gold, rust). Create empty page routes for /, /products, /about, /contact per the site map in section 5. Don't build any animation yet — just get the project running with a basic nav and footer on every page."

Verify it runs locally, then move to Phase 1 (real content, no animation) before touching any animation work — this keeps each Claude Code session focused and easy to review.