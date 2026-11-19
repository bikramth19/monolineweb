import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { servicePages } from './content.mjs';

const prisma = new PrismaClient();

async function main() {
  for (const [index, page] of servicePages.entries()) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {},
      create: {
        ...page,
        coverImage: index % 2 === 0 ? '/images/hero-accountants.png' : '/images/financial-advisor.png',
        status: 'published',
        showInNav: false,
        seoTitle: page.title + ' | Monoline',
        seoDesc: page.excerpt
      }
    });
    console.log(`Service page ready: ${page.slug}`);
  }
}

main().catch(error => {
  console.error('Unable to create service pages:', error);
  process.exitCode = 1;
}).finally(async () => prisma.$disconnect());
