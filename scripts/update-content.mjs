import { PrismaClient } from '@prisma/client';
import { corePages, servicePages, contactDetails, mapSearchUrl } from './content.mjs';

const prisma = new PrismaClient();
const managedPages=[...corePages.filter(p=>['about-us','services','contact'].includes(p.slug)),...servicePages.map(p=>({...p,showInNav:false,status:'published'}))];
async function main(){
  console.log('Updating Monoline About Us, Services, eight service pages and Contact Us content.');
  for(const item of managedPages){
    const data={...item,seoTitle:item.title+' | Monoline',seoDesc:item.excerpt};
    const {content,excerpt,title,seoTitle,seoDesc}=data;
    await prisma.page.upsert({where:{slug:item.slug},create:data,update:{title,content,excerpt,seoTitle,seoDesc}});
    console.log('Updated',item.slug);
  }
  await prisma.siteSettings.upsert({where:{id:1},create:{id:1,brandName:'Monoline',...contactDetails,mapsLink:mapSearchUrl},update:{...contactDetails,mapsLink:mapSearchUrl}});
  console.log('Contact details updated. Existing users, posts, banners and unrelated pages were not touched.');
}
main().catch(e=>{console.error(e);process.exitCode=1;}).finally(async()=>prisma.$disconnect());
