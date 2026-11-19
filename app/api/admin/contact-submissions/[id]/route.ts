import { NextResponse } from 'next/server';
import { getAdmin } from '@/lib/auth';
import { handleApiError, unauthorized } from '@/lib/api';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await getAdmin()) return unauthorized();
  try {
    const { id } = await params;
    await prisma.contactSubmission.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
