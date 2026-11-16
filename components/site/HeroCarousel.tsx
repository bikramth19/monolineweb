'use client';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRight,faCheck} from '@fortawesome/free-solid-svg-icons';

export type BannerSlide={id:string;headline:string;subheading:string|null;imageUrl:string;buttonText:string|null;buttonHref:string|null};
export function HeroCarousel({banners}:{banners:BannerSlide[]}){
  const [index,setIndex]=useState(0);
  useEffect(()=>{if(banners.length<2)return;const timer=setInterval(()=>setIndex(i=>(i+1)%banners.length),6500);return()=>clearInterval(timer);},[banners.length]);
  if(!banners.length)return null;
  const slide=banners[index];
  return <section className="hero-section"><div className="site-container hero-grid"><div className="hero-copy"><span className="section-kicker">YOUR DEPENDABLE FINANCE PARTNER</span><h1>{slide.headline.split(/\n/).map((line,i)=><span key={i} className={i>0?'green-line':''}>{line}<br/></span>)}</h1><p>{slide.subheading||'Reliable accounting, tax and advisory guidance for your next business decision.'}</p><div className="d-flex flex-wrap gap-2 mt-4"><Link href={slide.buttonHref||'/services'} className="site-btn">{slide.buttonText||'Explore Our Services'} <FontAwesomeIcon icon={faArrowRight}/></Link><Link href="/contact" className="site-btn site-btn-outline">Talk to an Advisor</Link></div><div className="hero-checks"><span><FontAwesomeIcon icon={faCheck}/> Personalised assistance</span><span><FontAwesomeIcon icon={faCheck}/> Clear, timely communication</span></div>{banners.length>1&&<div className="hero-dots" aria-label="Choose a banner">{banners.map((s,i)=><button key={s.id} type="button" onClick={()=>setIndex(i)} aria-label={`Banner ${i+1}`} className={i===index?'active':''}/>)}</div>}</div><div className="hero-image"><img src={slide.imageUrl} alt={slide.headline.replace(/\n/g,' ')}/><div className="hero-image-note"><b>Focus on what matters.</b><small>We take care of the numbers.</small></div></div></div></section>;
}
