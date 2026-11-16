import { NextResponse } from 'next/server';
import { getAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { settingsSchema } from '@/lib/validation';
import { handleApiError, unauthorized } from '@/lib/api';
import { siteSettings } from '@/lib/settings';

export const runtime = 'nodejs';
export async function GET() {
  if (!await getAdmin()) return unauthorized();
  return NextResponse.json(await siteSettings());
}
export async function PUT(req:Request) {
  if (!await getAdmin()) return unauthorized();
  try {
    const data = settingsSchema.parse(await req.json());
    const row = await prisma.siteSettings.upsert({where:{id:1},update:data,create:{id:1,...data}});
    return NextResponse.json(row);
  } catch(e) {return handleApiError(e);}
}
