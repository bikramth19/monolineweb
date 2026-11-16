import { NextResponse } from 'next/server';
import { getAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { pageSchema, postSchema, bannerSchema, reservedSlugs } from '@/lib/validation';
import { cleanHtml } from '@/lib/sanitize';
import { handleApiError, unauthorized } from '@/lib/api';

export const runtime = 'nodejs';
type Context = { params: Promise<{ resource: string }> };

export async function GET(_req: Request, { params }: Context) {
  if (!await getAdmin()) return unauthorized();
  const { resource } = await params;
  if (resource === 'pages') return NextResponse.json(await prisma.page.findMany({ orderBy: [{ sortOrder:'asc' },{ updatedAt:'desc' }] }));
  if (resource === 'posts') return NextResponse.json(await prisma.post.findMany({ orderBy: { updatedAt: 'desc' } }));
  if (resource === 'banners') return NextResponse.json(await prisma.banner.findMany({ orderBy: [{sortOrder:'asc'},{createdAt:'desc'}] }));
  return NextResponse.json({ error: 'Not found' }, { status:404 });
}

export async function POST(req: Request, { params }: Context) {
  if (!await getAdmin()) return unauthorized();
  const { resource } = await params;
  try {
    const body = await req.json();
    if (resource === 'pages') {
      const input = pageSchema.parse(body);
      if (reservedSlugs.has(input.slug)) return NextResponse.json({ error: 'This URL is reserved.' }, { status:422 });
      return NextResponse.json(await prisma.page.create({ data: { ...input, content: cleanHtml(input.content) } }), { status:201 });
    }
    if (resource === 'posts') {
      const input = postSchema.parse(body);
      if (reservedSlugs.has(input.slug)) return NextResponse.json({ error: 'This URL is reserved.' }, { status:422 });
      return NextResponse.json(await prisma.post.create({ data: { ...input, content: cleanHtml(input.content), publishedAt: input.status==='published' ? new Date() : null } }), { status:201 });
    }
    if (resource === 'banners') return NextResponse.json(await prisma.banner.create({ data: bannerSchema.parse(body) }), { status:201 });
    return NextResponse.json({ error:'Not found' }, { status:404 });
  } catch(e) { return handleApiError(e); }
}
