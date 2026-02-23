# Aletheia V2 Landing

Premium bilingual (RU/EN) marketing landing for **ООО «Алетейя»** built with Next.js 15.

## Stack

- Next.js 15 + TypeScript + App Router
- next-intl (RU/EN routing)
- Server-first rendering + client islands
- Tailwind CSS + shadcn/ui primitives
- React Hook Form + Zod (lead forms)
- API routes for lead capture (email + Telegram)
- Strapi-ready content layer with fallback local content

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000` (auto-redirects to `/ru`).

`npm run dev` now starts through a small runner that resets `.next` and blocks accidental second `dev` instance for the same project. This prevents corrupted Next.js chunk artifacts in local development.

## Environment

Copy `.env.example` to `.env.local` and fill delivery channels:

- `SMTP_*`, `SMTP_FROM`, `LEADS_TO_EMAIL`
- `TELEGRAM_WEBHOOK_URL`
- `LEAD_DETAILS_TOKEN_SECRET`
- Optional: `STRAPI_API_URL`, `STRAPI_API_TOKEN`

If channels are not configured, `/api/leads` returns `delivery_not_configured`.

## Quality checks

```bash
npm run lint
npm run test
npm run test:e2e
npm run build
npm run analyze
```

## Structure

- `src/app/[locale]/(marketing)/page.tsx` - landing entry
- `src/features/landing/*` - sections and page composition
- `src/widgets/*` - header, footer, lead form, sticky CTA
- `src/entities/lead/*` - lead schemas, types, delivery
- `src/shared/lib/cms/*` - Strapi client + fallback content
- `src/shared/styles/tokens.css` - design tokens
- `src/shared/ui/*` - shadcn-style UI primitives

## Brandbook assets

- Place production brand assets in `public/brand/*` only (`hero`, `logo`, `textures`, `icons`).
- Keep ZIP/raw design source files outside the repository.
- Import flow and asset mapping: `docs/brand/ASSET_MAP.md`.

## Notes

- Main visual/logo placeholder is loaded from `public/brand/logo/mark-purple-512.png`.
- Replace placeholder brand files with licensed production exports before release.
