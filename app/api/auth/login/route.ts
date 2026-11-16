import { NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { issueSession, SESSION_COOKIE, sessionCookieOptions } from '@/lib/auth';

export const runtime = 'nodejs';
const attempts = new Map<string, { count: number; reset: number }>();
export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  const now = Date.now();
  const attempt = attempts.get(ip);
  if (attempt && attempt.reset > now && attempt.count >= 8) return NextResponse.json({ error: 'Too many login attempts. Try again later.' }, { status: 429 });
  if (!attempt || attempt.reset <= now) attempts.set(ip, { count: 0, reset: now + 15 * 60 * 1000 });
  try {
    const body = await req.json();
    const email = typeof body.email === 'string' ? body.email.toLowerCase().trim() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    if (email.length > 190 || password.length > 256) return NextResponse.json({ error: 'Invalid login.' }, { status: 401 });
    const admin = await prisma.adminUser.findUnique({ where: { email } });
    const valid = admin && await compare(password, admin.passwordHash);
    if (!valid) {
      const entry = attempts.get(ip)!; entry.count++;
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }
    attempts.delete(ip);
    const token = await issueSession(admin.id);
    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions);
    return res;
  } catch { return NextResponse.json({ error: 'Unable to sign in.' }, { status: 400 }); }
}
