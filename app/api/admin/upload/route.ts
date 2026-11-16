import { NextResponse } from 'next/server';
import { mkdir,writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import sharp from 'sharp';
import { put } from '@vercel/blob';
import { getAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { unauthorized } from '@/lib/api';

export const runtime = 'nodejs';
const MAX = 8 * 1024 * 1024;
const allowed = new Set(['image/png','image/jpeg','image/webp','image/gif','image/avif']);
export async function POST(req:Request) {
  if (!await getAdmin()) return unauthorized();
  try {
    const form = await req.formData();
    const file = form.get('file');
    if (!(file instanceof File)) return NextResponse.json({error:'Choose an image file.'},{status:400});
    if (!allowed.has(file.type)) return NextResponse.json({error:'Only PNG, JPG, WebP, GIF or AVIF images are accepted.'},{status:415});
    if (file.size === 0 || file.size > MAX) return NextResponse.json({error:'Images must be below 8 MB.'},{status:413});
    const input = Buffer.from(await file.arrayBuffer());
    // Decode, normalise and re-encode image bytes: no executable/SVG content is served.
    const output = await sharp(input,{limitInputPixels:36_000_000}).rotate().resize({width:2400,height:2400,fit:'inside',withoutEnlargement:true}).webp({quality:85}).toBuffer();
    const filename = randomUUID() + '.webp';
    let url:string;
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob=await put('monoline/'+filename,output,{access:'public',contentType:'image/webp',token:process.env.BLOB_READ_WRITE_TOKEN});
      url=blob.url;
    } else if (process.env.VERCEL) {
      return NextResponse.json({error:'Configure BLOB_READ_WRITE_TOKEN for persistent uploads on Vercel.'},{status:503});
    } else {
      const uploadsPath = path.join(process.cwd(),'public','uploads');
      await mkdir(uploadsPath,{recursive:true});
      await writeFile(path.join(uploadsPath,filename),output,{flag:'wx'});
      url='/uploads/'+filename;
    }
    const name = file.name.split(/[/\\]/).pop()?.slice(0,255) || 'image';
    const media=await prisma.media.create({data:{fileName:name,url,mimeType:'image/webp',size:output.length,altText:typeof form.get('altText')==='string'?String(form.get('altText')).slice(0,255):null}});
    return NextResponse.json({id:media.id,url:media.url,default:media.url,media},{status:201});
  } catch(e) {
    console.error('Image upload failed',e);
    return NextResponse.json({error:'The image could not be processed or saved.'},{status:400});
  }
}
