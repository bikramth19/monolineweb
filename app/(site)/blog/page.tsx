import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { siteSettings } from '@/lib/settings';
export const dynamic='force-dynamic';
export const metadata={title:'Blog & Insights'};
export default async function BlogIndex(){
  const [posts,settings]=await Promise.all([prisma.post.findMany({where:{status:'published'},orderBy:{publishedAt:'desc'}}),siteSettings()]);
  return <><section className="inner-hero"><div className="site-container"><span className="section-kicker">MONOLINE JOURNAL</span><h1>Blog & Insights</h1><p>Accounting ideas, business tips and practical financial guidance.</p></div></section><section className="site-section"><div className="site-container">{!posts.length?<p className="body-muted">Articles are coming soon. Please check back shortly.</p>:<div className={settings.blogLayout==='list'?'blog-list':'blog-grid'}>{posts.map(p=><Link className="blog-card" href={'/blog/'+p.slug} key={p.id}><img src={p.coverImage||'/images/hero-accountants.png'} alt=""/><div className="blog-card-body"><small>{p.category} · {p.publishedAt?.toLocaleDateString('en-IN',{dateStyle:'medium'})}</small><h3>{p.title}</h3><p>{p.excerpt}</p><b>READ ARTICLE →</b></div></Link>)}</div>}</div></section></>;
}
