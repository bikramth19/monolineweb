import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { monolinePrisma?: PrismaClient };
export const prisma = globalForPrisma.monolinePrisma ?? new PrismaClient({ log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'] });
if (process.env.NODE_ENV !== 'production') globalForPrisma.monolinePrisma = prisma;
