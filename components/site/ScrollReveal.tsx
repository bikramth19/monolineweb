'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** Progressive enhancement: cards remain visible when JS or reduced-motion preference is active. */
export function ScrollReveal() {
  const pathname = usePathname();
  useEffect(() => {
    const selector = '.service-card, .step-card, .industry, .blog-card, .about-card';
    const cards = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (!cards.length || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px 45px 0px' });

    cards.forEach((card, index) => {
      card.classList.add('reveal-item');
      card.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 80}ms`);
      observer.observe(card);
    });
    document.documentElement.classList.add('has-scroll-reveal');
    return () => {
      observer.disconnect();
      cards.forEach(card => {
        card.classList.remove('reveal-item', 'is-visible');
        card.style.removeProperty('--reveal-delay');
      });
      document.documentElement.classList.remove('has-scroll-reveal');
    };
  }, [pathname]);
  return null;
}
