import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import { corePages, servicePages, contactDetails, mapSearchUrl } from './content.mjs';

const prisma = new PrismaClient();
const email = process.env.ADMIN_EMAIL?.toLowerCase().trim();
const password = process.env.ADMIN_PASSWORD;
if (!email || !password || password.length < 12 || password.includes('CHANGE_ME')) {
  console.error('Set a real ADMIN_EMAIL and ADMIN_PASSWORD (at least 12 characters) in your selected .env file.');
  process.exit(1);
}

const pages = [...corePages,...servicePages.map(s=>({...s,status:'published',showInNav:false,seoTitle:s.title+' | Monoline',seoDesc:s.excerpt}))];
const demoPosts = [
  {slug:'the-value-of-organised-bookkeeping',title:'Why organised bookkeeping matters',category:'Accounting Basics',excerpt:'A practical introduction to the everyday value of clear financial records.',content:'<h2>Why it matters</h2><p>Well-organised bookkeeping gives business owners a reliable picture of income, expenses and cash flow. Periodic reconciliations can identify mistakes earlier and make reporting easier.</p><h2>Useful habits</h2><ul><li>Keep business and personal records separate.</li><li>Reconcile bank transactions regularly.</li><li>Maintain copies of invoices and receipts.</li><li>Review a simple monthly financial summary.</li></ul>'},
  {slug:'planning-for-recurring-compliance',title:'A simple approach to compliance planning',category:'Tax & Compliance',excerpt:'How a clear calendar helps you prepare for recurring filings and records.',content:'<h2>Plan ahead</h2><p>Recurring financial and tax obligations become easier to manage when required documents, review dates and responsibilities are recorded in a shared schedule.</p><p>Exact obligations depend on the business structure and applicable law. Check current requirements with a qualified professional.</p>'},
  {slug:'cash-flow-visibility-for-small-businesses',title:'Cash-flow visibility for small businesses',category:'Business Advisory',excerpt:'Why a basic forecast can improve routine financial decisions.',content:'<h2>See the months ahead</h2><p>A simple cash-flow forecast compares expected receipts and payments over a chosen period. Updating it regularly can help spot possible shortfalls and plan expenditure.</p>'}
];

async function main(){
  const existing=await prisma.adminUser.findUnique({where:{email}});
  if(!existing){await prisma.adminUser.create({data:{email,name:'Administrator',passwordHash:await hash(password,12)}});console.log('Created admin user:',email);}
  else console.log('Admin exists; existing password preserved.');
  const existingSettings=await prisma.siteSettings.findUnique({where:{id:1}});
  if(!existingSettings)await prisma.siteSettings.create({data:{id:1,brandName:'Monoline',tagline:'Accounting · Compliance · Advisory',logoUrl:'/images/monoline-logo.png',faviconUrl:'/images/monoline-logo.png',copyrightText:`© ${new Date().getFullYear()} Monoline. All rights reserved.`,developedBy:'SheStrong Technology Services',developedByUrl:'https://shestrong.in',blogLayout:'grid',...contactDetails,mapsLink:mapSearchUrl}});
  else await prisma.siteSettings.update({where:{id:1},data:{address:existingSettings.address||contactDetails.address,email:existingSettings.email||contactDetails.email,phone:existingSettings.phone||contactDetails.phone,phoneSecondary:existingSettings.phoneSecondary||contactDetails.phoneSecondary,mapsLink:existingSettings.mapsLink||mapSearchUrl}});
  for(const item of pages){const exists=await prisma.page.findUnique({where:{slug:item.slug}});if(!exists)await prisma.page.create({data:item});}
  for(const item of demoPosts){const exists=await prisma.post.findUnique({where:{slug:item.slug}});if(!exists)await prisma.post.create({data:{...item,status:'draft'}});}
  const existingBanner=await prisma.banner.findFirst();
  if(!existingBanner)await prisma.banner.create({data:{headline:'More clarity.\nLess complexity.',subheading:'From everyday bookkeeping to tax, compliance and business advisory, we help you stay organised and make better financial decisions.',imageUrl:'/images/hero-accountants.png',buttonText:'Explore Our Services',buttonHref:'/services',isActive:true,sortOrder:0}});
  for(const [fileName,url] of [['Monoline logo','/images/monoline-logo.png'],['Homepage team photo','/images/hero-accountants.png'],['Financial advisor photo','/images/financial-advisor.png']]){
    if(!await prisma.media.findFirst({where:{url}}))await prisma.media.create({data:{fileName,url,mimeType:'image/png',size:0,altText:fileName}});
  }
  console.log('Seed complete: core pages, eight service detail pages, contact details, blog drafts, banner and media references.');
}
main().catch(e=>{console.error(e);process.exitCode=1;}).finally(async()=>{await prisma.$disconnect();});
