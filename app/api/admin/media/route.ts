import { NextResponse } from 'next/server';
import { getAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { unauthorized } from '@/lib/api';

export const runtime='nodejs';
export async function GET() {
  if (!await getAdmin()) return unauthorized();
  return NextResponse.json(await prisma.media.findMany({orderBy:{createdAt:'desc'},take:300}));
}
