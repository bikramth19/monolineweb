import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {prisma} from '@/lib/prisma';
import {cleanHtml} from '@/lib/sanitize';
export const dynamic='force-dynamic';
type Context={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Context):Promise<Metadata>{const {slug}=await params;const post=await prisma.post.findUnique({where:{slug}});return {title:post?.title||'Article',description:post?.excerpt||undefined};}
export default async function BlogDetail({params}:Context){
  const {slug}=await params;const post=await prisma.post.findUnique({where:{slug}});
  if(!post||post.status!=='published')notFound();
  return <><section className="inner-hero"><div className="site-container"><Link href="/blog" className="section-kicker">← BACK TO INSIGHTS</Link><h1>{post.title}</h1><p>{post.category} {post.publishedAt?' · '+post.publishedAt.toLocaleDateString('en-IN',{dateStyle:'long'}):''}</p></div></section><section className="site-section"><div className="site-container article-wrap">{post.coverImage&&<img className="article-cover" src={post.coverImage} alt={post.title}/>}<article className="rich-content" dangerouslySetInnerHTML={{__html:cleanHtml(post.content)}}/></div></section></>;
}
