import { NextResponse } from 'next/server';
import { getAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { pageSchema, postSchema, bannerSchema, reservedSlugs } from '@/lib/validation';
import { cleanHtml } from '@/lib/sanitize';
import { handleApiError, unauthorized } from '@/lib/api';

export const runtime = 'nodejs';
type Context = { params: Promise<{ resource: string; id: string }> };

export async function GET(_req: Request, { params }: Context) {
  if (!await getAdmin()) return unauthorized();
  const { resource, id } = await params;
  if (resource === 'pages') return NextResponse.json(await prisma.page.findUnique({ where:{id} }));
  if (resource === 'posts') return NextResponse.json(await prisma.post.findUnique({ where:{id} }));
  if (resource === 'banners') return NextResponse.json(await prisma.banner.findUnique({ where:{id} }));
  return NextResponse.json({error:'Not found'},{status:404});
}

export async function PATCH(req: Request, { params }: Context) {
  if (!await getAdmin()) return unauthorized();
  const { resource,id } = await params;
  try {
    const body = await req.json();
    if (resource === 'pages') {
      const input = pageSchema.parse(body);
      if (reservedSlugs.has(input.slug)) return NextResponse.json({error:'Reserved URL.'},{status:422});
      return NextResponse.json(await prisma.page.update({ where:{id},data:{...input,content:cleanHtml(input.content)} }));
    }
    if (resource === 'posts') {
      const input = postSchema.parse(body);
      if (reservedSlugs.has(input.slug)) return NextResponse.json({error:'Reserved URL.'},{status:422});
      const old = await prisma.post.findUniqueOrThrow({where:{id}});
      return NextResponse.json(await prisma.post.update({ where:{id},data:{...input,content:cleanHtml(input.content),publishedAt:input.status==='published'?(old.publishedAt??new Date()):null} }));
    }
    if (resource === 'banners') return NextResponse.json(await prisma.banner.update({where:{id},data:bannerSchema.parse(body)}));
    return NextResponse.json({error:'Not found'},{status:404});
  } catch(e) { return handleApiError(e); }
}

export async function DELETE(_req: Request, { params }: Context) {
  if (!await getAdmin()) return unauthorized();
  const { resource,id } = await params;
  try {
    if (resource === 'pages') {
      const row = await prisma.page.findUniqueOrThrow({where:{id}});
      if (row.slug === 'home') return NextResponse.json({error:'Home page cannot be deleted.'},{status:403});
      await prisma.page.delete({where:{id}});
    } else if (resource === 'posts') await prisma.post.delete({where:{id}});
    else if (resource === 'banners') await prisma.banner.delete({where:{id}});
    else return NextResponse.json({error:'Not found'},{status:404});
    return NextResponse.json({ok:true});
  } catch(e) { return handleApiError(e); }
}
