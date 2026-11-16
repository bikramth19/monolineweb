import { NextResponse } from 'next/server';
import { getAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { handleApiError, unauthorized } from '@/lib/api';
import { mediaUpdateSchema } from '@/lib/validation';

export const runtime='nodejs';
type Context={params:Promise<{id:string}>};
export async function PATCH(req:Request,{params}:Context) {
  if (!await getAdmin()) return unauthorized();
  try {
    const {id}=await params;
    const data=mediaUpdateSchema.parse(await req.json());
    return NextResponse.json(await prisma.media.update({where:{id},data}));
  } catch(e){return handleApiError(e);}
}
export async function DELETE(_req:Request,{params}:Context) {
  if (!await getAdmin()) return unauthorized();
  try {
    const {id}=await params;
    await prisma.media.delete({where:{id}});
    // Deliberately retain the physical file: published pages may reference it.
    return NextResponse.json({ok:true,notice:'Removed from library; existing page images remain available.'});
  } catch(e){return handleApiError(e);}
}
