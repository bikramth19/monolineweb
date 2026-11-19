import { z } from 'zod';

const text = (max: number) => z.string().trim().max(max);
const required = (max: number) => text(max).min(1);
const nullable = (max: number) => text(max).optional().nullable();
const slug = z.string().trim().toLowerCase().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase letters, numbers and hyphens.').max(190);
const status = z.enum(['draft', 'published']);
const urlOrPath = (max = 500) => text(max).refine(v => !v || /^\/(?!\/)/.test(v) || /^https:\/\//.test(v), 'Use /path or https://...');

export const pageSchema = z.object({
  title: required(190), slug, excerpt: nullable(5000), content: z.string().max(300000),
  seoTitle: nullable(190), seoDesc: nullable(1000), coverImage: urlOrPath().optional().nullable(),
  status, showInNav: z.boolean(), sortOrder: z.number().int().min(0).max(9999)
});
export const postSchema = z.object({
  title: required(190), slug, category: required(100), excerpt: nullable(5000),
  content: z.string().max(300000), coverImage: urlOrPath().optional().nullable(), status
});
export const bannerSchema = z.object({
  headline: required(255), subheading: nullable(2000), imageUrl: urlOrPath().min(1),
  buttonText: nullable(90), buttonHref: urlOrPath(255).optional().nullable(),
  isActive: z.boolean(), sortOrder: z.number().int().min(0).max(9999)
});
export const settingsSchema = z.object({
  brandName: required(190), tagline: text(255), logoUrl: urlOrPath().optional().nullable(),
  faviconUrl: urlOrPath().optional().nullable(), email: nullable(190), phone: nullable(90), phoneSecondary: nullable(90),
  address: nullable(5000), mapsEmbedUrl: nullable(1000).refine(v => !v || /^https:\/\/(www\.)?google\.com\/maps\/embed\?/.test(v), 'Paste a Google Maps embed URL.'),
  mapsLink: nullable(1000).refine(v => !v || /^https:\/\//.test(v), 'Use an https:// link.'),
  copyrightText: required(255), developedBy: nullable(190), developedByUrl: nullable(500).refine(v => !v || /^https:\/\//.test(v), 'Use an https:// link.'),
  blogLayout: z.enum(['grid','list'])
});
export const mediaUpdateSchema = z.object({ altText: nullable(255) });
export const contactSubmissionSchema = z.object({
  name: required(190),
  email: required(190).email('Enter a valid email address.'),
  phone: text(40).optional(),
  subject: required(190),
  message: required(5000)
});
export const reservedSlugs = new Set(['admin','api','blog','_next','images','uploads','favicon.ico','robots.txt','sitemap.xml']);
