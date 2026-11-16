# Build & validation report

Date: 14 November 2026

| Check | Result |
| --- | --- |
| TypeScript (`npm run typecheck`) | Passed |
| Prisma MySQL schema (`prisma validate`) | Passed |
| Prisma Neon PostgreSQL schema (`prisma validate`) | Passed |
| Prisma client generation for MySQL | Passed |
| Prisma client generation for Neon | Passed |
| Next.js production build for MySQL (`npm run build:mysql`) | Passed |
| Next.js production build for Neon (`npm run build:neon`) | Passed |
| npm security audit (`npm audit --audit-level=high`) | **0 vulnerabilities reported** at validation time |
| JavaScript syntax (`node --check` for seed, content and update scripts) | Passed |

## Not yet tested end-to-end

This delivery does **not** include a running MySQL/Neon database or live credentials. Database provisioning, `db push`, administrator seeding, live login, actual media uploads and published-page CRUD must be tested against the recipient's chosen database after setup. The accompanying README has the exact commands.

## Scope of the starter project

- The selected Design 1 marketing site, navigation, service overview, responsive layouts, blog, footer and editable settings.
- November 2026 additions: card hover/scroll animations respecting reduced-motion preferences, expanded About Us and Contact Us, a new 8-card services catalog, and eight individually published service detail pages with CMS-editable copy.
- Contact details: Jayanagar Bengaluru office, two telephone numbers, `info@monoline.in`; both phones available in settings and footer.
- Safe content update script for existing installations, with documentation warning about replacement of About Us, Services, Contact and service detail page content.
- A CMS for pages, blog posts, banners and media, with Bootstrap offcanvas add/edit/view actions.
- CKEditor with direct upload and existing Media Library insertion.
- Password-based admin authentication and protected API operations.
- Distinct Prisma schemas and environment files for MySQL and Neon; one active provider at a time.
- Optional Vercel Blob upload storage for serverless deployments.

No live domain, DB credentials, API keys, or production administrator password are included. Generated photos are design illustrations and must not be represented as actual Monoline team photos.
