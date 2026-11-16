import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { prisma } from './prisma';

export const SESSION_COOKIE = 'monoline_admin_session';
const secret = () => {
  const key = process.env.JWT_SECRET;
  if (!key || key.length < 32 || key.includes('CHANGE_ME')) throw new Error('Set a strong JWT_SECRET (minimum 32 characters).');
  return new TextEncoder().encode(key);
};

export async function issueSession(userId: string) {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(userId)
    .setIssuer('monoline-cms')
    .setAudience('monoline-admin')
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret());
}

export async function getAdmin() {
  try {
    const token = (await cookies()).get(SESSION_COOKIE)?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, secret(), { issuer: 'monoline-cms', audience: 'monoline-admin' });
    if (!payload.sub || payload.role !== 'admin') return null;
    return prisma.adminUser.findUnique({ where: { id: payload.sub }, select: { id: true, email: true, name: true } });
  } catch { return null; }
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: 'strict' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: 60 * 60 * 24 * 7,
};
