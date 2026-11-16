import { prisma } from './prisma';

export async function siteSettings() {
  const row = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  return row ?? {
    id: 1, brandName: 'Monoline', tagline: 'Accounting · Compliance · Advisory',
    logoUrl: '/images/monoline-logo.png', faviconUrl: null, email: 'info@monoline.in', phone: '9113899211', phoneSecondary: '8088779211',
    address: '1028, 2nd Floor, 27th A Main, 100 Feet Ring Road, Jayanagara 9th Block, Jayanagar, Bengaluru, Karnataka 560041', mapsEmbedUrl: null, mapsLink: 'https://www.google.com/maps/search/?api=1&query=1028%202nd%20Floor%2027th%20A%20Main%20Jayanagar%20Bengaluru%20560041', copyrightText: `© ${new Date().getFullYear()} Monoline. All rights reserved.`,
    developedBy: null, developedByUrl: null, blogLayout: 'grid', updatedAt: new Date()
  };
}
