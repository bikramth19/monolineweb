import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

export function handleApiError(error: unknown) {
  if (error instanceof ZodError) return NextResponse.json({ error: error.issues.map(i=>`${i.path.join('.')}: ${i.message}`).join('; ') }, { status: 422 });
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') return NextResponse.json({ error: 'This URL slug already exists. Please choose another.' }, { status: 409 });
    if (error.code === 'P2025') return NextResponse.json({ error: 'Record not found.' }, { status: 404 });
  }
  console.error('CMS API error:', error);
  return NextResponse.json({ error: 'Unable to complete the request.' }, { status: 500 });
}
export const unauthorized = () => NextResponse.json({ error: 'Please sign in.' }, { status: 401 });
