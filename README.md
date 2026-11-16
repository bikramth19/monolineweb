# Monoline — Next.js Website + CMS

**Selected visual concept:** Design 1 (Corporate & Professional).  
**Stack:** Next.js 16 App Router · React 19 · Prisma ORM 6 · MySQL **or** Neon PostgreSQL · Bootstrap 5 · FontAwesome 7 · CKEditor 5.

The project includes a visitor-facing Monoline website and a secure administrator dashboard. All key text and media are editable. Seed data creates a starting homepage banner, site pages, eight complete individual service pages, blog drafts and brand settings. The supplied professional office photographs are illustrative AI-generated design assets, not photographs of Monoline staff.

**November 2026 content and animation update:** More expressive card hover animations (lift, shadow, green highlight, animated icon and arrow) and scroll-in reveals, with reduced-motion accessibility support. The home service cards, full `/services` catalog and footer now link directly to each of eight published service detail pages. About Us and Contact Us have expanded content and dedicated supporting layouts.

### Monoline contact details

- **Office:** 1028, 2nd Floor, 27th A Main, 100 Feet Ring Road, Jayanagara 9th Block, Jayanagar, Bengaluru, Karnataka 560041
- **Primary phone:** +91 91138 99211
- **Alternate phone:** +91 80887 79211
- **Email:** info@monoline.in

All contact details, branding and footer fields remain editable in **Admin → Site Settings**. The alternate phone has its own dedicated field.

## Requirements

- Node.js **20.9+** or **22+** (recommended: current Node.js LTS).
- npm and a MySQL 8 server, **or** a Neon PostgreSQL project.
- A strong admin password and random JWT secret.
- Image uploads require a writable `public/uploads/` directory in local/self-hosted Node deployments, or a configured **Vercel Blob** store in Vercel hosting.

**Important:** The example credentials in `.env.mysql` and `.env.neon` are placeholders. Set real values before using the database or seeding an administrator.

## Option A — run with MySQL (localhost port 3000)

1. Install Node dependencies:

   ```bash
   npm install
   ```

2. Create a MySQL database and a dedicated user (run the following statements in MySQL, and choose your own password):

   ```sql
   CREATE DATABASE monoline_cms CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   CREATE USER 'monoline_user'@'localhost' IDENTIFIED BY 'YOUR_STRONG_PASSWORD';
   GRANT ALL PRIVILEGES ON monoline_cms.* TO 'monoline_user'@'localhost';
   ```

3. Open **`.env.mysql`** and set `DATABASE_URL`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`. The user/password in `DATABASE_URL` must match MySQL. URL-encode special characters in the password (`@` becomes `%40`, `#` becomes `%23`).

   Generate a strong JWT secret with:

   ```bash
   node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
   ```

4. Generate the MySQL Prisma client, create tables, and seed sample content:

   ```bash
   npm run db:generate:mysql
   npm run db:push:mysql
   npm run db:seed:mysql
   ```

5. Start the website:

   ```bash
   npm run dev:mysql
   ```

6. Open [http://localhost:3000](http://localhost:3000) and log in to [http://localhost:3000/admin/login](http://localhost:3000/admin/login) using the `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env.mysql`.

## Option B — run with Neon PostgreSQL (localhost port 3000)

1. Create a Neon project at [neon.tech](https://neon.tech) and copy both connection URLs (pooled and direct/unpooled). No database password is provided in this project.
2. Open **`.env.neon`**:
   - `DATABASE_URL` = Neon **pooled** connection URL (`-pooler` hostname), with `sslmode=require`.
   - `DIRECT_URL` = Neon **direct/unpooled** connection URL, with `sslmode=require`.
   - Set your own `JWT_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`.
3. Run:

   ```bash
   npm install
   npm run db:generate:neon
   npm run db:push:neon
   npm run db:seed:neon
   npm run dev:neon
   ```

4. Visit the same URLs: [http://localhost:3000](http://localhost:3000) and [http://localhost:3000/admin/login](http://localhost:3000/admin/login).

**Switching databases:** Stop Next.js first. Run the `db:generate:<target>` command when switching provider, then run `dev:<target>`. Both schemas share the same models, but **the data is not automatically synchronized** between MySQL and Neon. Each target has its own database content and admin login. Run seeding for each new database.

## Administrator features

| Dashboard menu | What you can manage |
| --- | --- |
| Dashboard | Live counts, recent articles, quick links |
| Manage Pages | Add, view, edit and delete pages; title, URL slug, SEO data, featured image, navigation visibility, sort order, draft/publish |
| Blog Posts | Add/edit/view/delete articles; category, CKEditor body, cover image, draft/publish |
| Banners | Add/edit/view/delete homepage slides; upload/select image, text, button URL, active status, sort order |
| Media Library | Upload multiple images; view, edit alt text, copy URL, remove library record |
| Site Settings | Brand name, logo, favicon, phone/email, office address, Google Maps links/embed, blog grid/list style, copyright and developer footer details |

Add, view and edit actions open **Bootstrap offcanvas-style side drawers**. CKEditor includes headings, formatting, links, lists, tables and image uploads. You can upload images directly from the CKEditor toolbar, or click **Insert from Media Library** to choose an existing image.

## Publishing a page

1. Sign in to `/admin`.
2. Open **Manage Pages → Add Page**.
3. Set a title and slug, such as `team` (public URL: `/team`).
4. Add content using CKEditor; optionally insert an uploaded photo.
5. Set **Published**, enable **Show in navigation menu**, and save.
6. Open the public URL to verify. The page will use the Design 1 header, typography and footer.

The **Home** page is a special record: its excerpt and rich-text intro are editable under Manage Pages. The homepage banner is edited under **Banners**. The eight service cards use the Design 1 service list in `lib/services.ts`; titles, brief card descriptions and icon choices can be customised there. The full **About Us**, **Services**, **Contact Us**, and **each of the eight service detail pages** are separate editable records under **Manage Pages → Edit** using CKEditor, including media-library images. The eight detail pages are deliberately hidden from the top-level navigation, but they are discoverable from the service cards and footer.

### Eight service detail pages

| Service | Public URL |
| --- | --- |
| Accounting & Bookkeeping | `/accounting-bookkeeping` |
| GST Registration & Returns | `/gst-registration-returns` |
| Income Tax & TDS | `/income-tax-tds` |
| Audit Readiness & Support | `/audit-readiness-support` |
| Company & LLP Compliance | `/company-llp-compliance` |
| Payroll & Employee Compliance | `/payroll-employee-compliance` |
| Financial Reporting & MIS | `/financial-reporting-mis` |
| Virtual CFO & Advisory | `/virtual-cfo-advisory` |

The service scope and website copy are starting content intended for review by Monoline before publishing. They do not claim certifications, statutory audit authority or specific employee credentials.

### Updating an existing Monoline database

If you have **already installed the previous ZIP and entered data**, do not reinitialize the database or delete files. Back up your database first, then run the appropriate provider commands from the updated project folder:

```bash
# MySQL
npm run db:generate:mysql
npm run db:push:mysql
npm run content:update:mysql

# Or Neon PostgreSQL (do not run both providers unless you use both databases)
npm run db:generate:neon
npm run db:push:neon
npm run content:update:neon
```

`db:push` adds the optional `phoneSecondary` column. `content:update:*` **replaces the stored About Us, Services and Contact Us body text (and the eight service detail pages)** with this version, and sets the provided Monoline contact fields. It preserves your admin users, blog posts, banners, media records and unrelated pages. **If you have manually edited those 11 pages, copy or back up their HTML first.** For a brand-new installation, use `db:seed:*` instead; it inserts missing pages without replacing existing ones.

## Blog design

- Published posts appear automatically at `/blog` and `/blog/[slug]`; recent published posts also appear on the homepage.
- Switch between **grid** and **list** designs under **Site Settings → Blog Appearance**.
- Three sample blog posts are created as **drafts** during seeding; review and publish them when ready.

## Google Maps and footer

The contact page initially includes a Google Maps **directions** link based on the address. If you also want an interactive embedded map, in Google Maps choose **Share → Embed a map**. Copy only the `src` from the iframe into **Settings → Google Maps Embed URL**. The embedded map then appears on the Contact Us page. Footer copyright, developer name and developer website are edited under Site Settings.

## File and code layout

```text
app/
  (site)/                 Public homepage, pages, blog list and article pages
  admin/login/            Admin login
  admin/(protected)/      Dashboard, Pages, Posts, Banners, Media, Settings
  api/auth/               Admin session login/logout
  api/admin/              Protected CMS CRUD, settings, stats and uploads
components/site/          Public header, footer and hero carousel
components/admin/         Bootstrap drawers, CKEditor, media picker, CMS screens
lib/                      Prisma, authentication, validation, sanitisation, services
prisma/mysql/schema.prisma
prisma/neon/schema.prisma
scripts/seed.mjs          Initial admin, pages, posts, banner, brand settings
scripts/content.mjs       Full editable seed copy for About Us, Services and eight services
scripts/update-content.mjs  Controlled existing-database content refresh
public/images/            Logo and illustrative design photographs
public/uploads/           Images uploaded through CMS (runtime local storage)
.env.mysql                MySQL configuration (fill placeholders)
.env.neon                 Neon configuration (fill placeholders)
```

## Useful commands

```bash
npm run typecheck
npm run build
npm run build:neon
npm run db:studio:mysql
npm run db:studio:neon
```

The development server defaults to **port 3000**. If port 3000 is taken, stop the existing process or change the `-p 3000` argument in `package.json`.

For a Neon deployment to Vercel, set the project build command to **`npm run build:neon`** and add real `DATABASE_URL`, `DIRECT_URL`, `JWT_SECRET`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CKEDITOR_LICENSE_KEY`, and `BLOB_READ_WRITE_TOKEN` environment variables in Vercel. The default `npm run build` targets MySQL. For production, use suitable secret management rather than keeping real credentials in `.env.neon` inside the deployed project.

## Security and production notes

- The admin dashboard and all CMS write routes require a signed session stored in an HttpOnly cookie. Admin passwords are hashed using bcrypt. The seed script does **not** overwrite an existing admin password.
- CKEditor content is HTML-sanitised on save and on public rendering. Image uploads require authentication, allow only raster images, enforce an 8 MB limit and are re-encoded to WebP.
- The sample login rate limiter is process-local, appropriate for local testing but **not** sufficient for distributed production hosting. Use a shared rate limiter and consider 2FA for production.
- **Image storage:** local `public/uploads/` is suitable for a traditional VPS or local machine with persistent storage. **It is not durable on Vercel or similar serverless platforms.** This project includes an optional **Vercel Blob** adapter: create a public Blob store and set the server-side `BLOB_READ_WRITE_TOKEN` in Vercel project environment settings. With that token, uploads are saved to Blob automatically. Without it, uploads are intentionally rejected on Vercel to prevent accidental data loss. Other hosting providers can use a persistent disk or implement an S3/R2 adapter.
- **CKEditor license:** recent CKEditor 5 releases require `licenseKey`. The example `GPL` key is valid only if your project satisfies CKEditor's GPL requirements. For a proprietary/commercial deployment, obtain and configure the appropriate CKEditor commercial license key. See [CKEditor licensing](https://ckeditor.com/docs/ckeditor5/latest/getting-started/licensing/license-key-and-activation.html).
- Back up the database and uploaded images separately. The provided templates are a solid CMS starting point, not a full compliance audit. Configure HTTPS, database backups, email delivery and production monitoring before launch.
- `prisma db push` is convenient for initial setup. For ongoing production schema changes, create and review Prisma migrations rather than pushing directly to a live database.

## Implementation process used

1. Retained the selected **Monoline Design 1** palette, layouts, header and footer structure, logo and illustrative visuals.
2. Defined equivalent Prisma models in separate MySQL and Neon schemas.
3. Added administrator authentication, password hashing and protected content APIs.
4. Built page, blog, banner, media and branding management with side drawers.
5. Integrated CKEditor 5 with direct image uploads and a reusable media picker.
6. Connected CMS data to public Next.js pages, carousel, navigation and footer.
7. Added validation, HTML sanitisation, upload constraints and a repeatable seed script.
8. Performed TypeScript/build and schema validation before preparing the ZIP.

**Before launch:** replace draft/sample content with verified Monoline company information and review any professional-service descriptions and legal pages with the firm.
