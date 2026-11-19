import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { contactSubmissionSchema } from '@/lib/validation';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Please provide valid form data.' }, { status: 400 });
  }
  const parsed = contactSubmissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Please check the form fields and try again.' }, { status: 422 });
  }
  try {
    await prisma.contactSubmission.create({
      data: { ...parsed.data, phone: parsed.data.phone || null }
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error('Contact submission failed:', error);
    return NextResponse.json({ error: 'Your message could not be sent. Please try again.' }, { status: 500 });
  }
}
