import { NextResponse } from 'next/server';
import { getAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { unauthorized } from '@/lib/api';

export const runtime='nodejs';
export async function GET(){
  if(!await getAdmin())return unauthorized();
  const [pages,posts,publishedPosts,banners,media,recent]=await Promise.all([
    prisma.page.count(),prisma.post.count(),prisma.post.count({where:{status:'published'}}),
    prisma.banner.count(),prisma.media.count(),prisma.post.findMany({orderBy:{updatedAt:'desc'},take:5,select:{id:true,title:true,status:true,updatedAt:true}})
  ]);
  return NextResponse.json({pages,posts,publishedPosts,banners,media,recent});
}
