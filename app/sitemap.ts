import type {MetadataRoute} from 'next';
import {prisma} from '@/lib/prisma';
export const dynamic='force-dynamic';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{
  const root=(process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000').replace(/\/$/,'');
  const [pages,posts]=await Promise.all([
    prisma.page.findMany({where:{status:'published',NOT:{slug:'home'}},select:{slug:true,updatedAt:true}}),
    prisma.post.findMany({where:{status:'published'},select:{slug:true,updatedAt:true}})
  ]);
  return [{url:root,lastModified:new Date()},
    ...pages.map(p=>({url:root+'/'+p.slug,lastModified:p.updatedAt})),
    {url:root+'/blog',lastModified:new Date()},
    ...posts.map(p=>({url:root+'/blog/'+p.slug,lastModified:p.updatedAt}))];
}
