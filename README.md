# Jenzabar Redesign

A concept redesign of jenzabar.com's homepage — Vite + React + TypeScript + Tailwind.

## Design direction
- **Palette:** deep ink navy (`#0C2233`) and harbor blue (`#12384F`) as the base, a brighter "wing" blue (`#1C8FB0`) as the accent, and a warm dawn gold (`#E7A33E`) reserved for the one moment it matters (CTA button, one wing stroke).
- **Type:** Fraunces (serif, display) for headlines paired with Inter (sans) for body/UI — an institutional, trustworthy pairing rather than a generic SaaS sans.
- **Motif:** the butterfly wing from Jenzabar's own logo, used sparingly — once in the hero, once as the hub of the "one system, every department" diagram.
- **Layout idea:** instead of a features card grid, the "why Jenzabar" section is a radial diagram — six campus departments connected to one hub — because the product's real pitch is unification, not a feature list.

## Run it
```bash
npm install
npm run dev
```

## Structure
```
src/
  App.tsx        — all sections (Header, Hero, StatBand, Unify, Proof, CTA, Footer)
  index.css       — Tailwind entry
  main.tsx        — React root
```
