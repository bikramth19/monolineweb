import Link from 'next/link';
import { services } from '@/lib/services';

type Settings = {
  brandName: string; tagline: string; logoUrl: string | null; address: string | null;
  email: string | null; phone: string | null; phoneSecondary: string | null;
  mapsLink: string | null; copyrightText: string; developedBy: string | null;
  developedByUrl: string | null;
};

function phoneHref(phone: string) {
  const digits = phone.replace(/[^+\d]/g, '');
  return digits.length === 10 ? `tel:+91${digits}` : `tel:${digits}`;
}

export function SiteFooter({ settings, pages }: { settings: Settings; pages: { title: string; slug: string }[] }) {
  const navPages = pages.filter(p => ['about-us', 'services', 'contact'].includes(p.slug));
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-grid">
          <div>
            <Link href="/"><img className="footer-logo" src={settings.logoUrl || '/images/monoline-logo.png'} alt={settings.brandName} /></Link>
            <p className="mt-3">Accounting, compliance and financial guidance to keep your business informed and organised.</p>
            <small>{settings.tagline}</small>
          </div>
          <div>
            <h4>Quick Links</h4>
            <Link href="/">Home</Link>
            {navPages.map(page => <Link key={page.slug} href={`/${page.slug}`}>{page.title}</Link>)}
            <Link href="/blog">Blog & Insights</Link>
          </div>
          <div>
            <h4>Our Services</h4>
            {services.map(service => <Link key={service.slug} href={`/${service.slug}`}>{service.title}</Link>)}
          </div>
          <div>
            <h4>Get in Touch</h4>
            {settings.address && <p>{settings.address}</p>}
            {settings.email && <a href={`mailto:${settings.email}`}>{settings.email}</a>}
            {settings.phone && <a href={phoneHref(settings.phone)}>{settings.phone}</a>}
            {settings.phoneSecondary && <a href={phoneHref(settings.phoneSecondary)}>{settings.phoneSecondary}</a>}
            {settings.mapsLink && <a target="_blank" rel="noopener noreferrer" href={settings.mapsLink}>Find us on Google Maps ↗</a>}
            <Link className="footer-contact" href="/contact">Enquire Now →</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{settings.copyrightText}</span>
          <span>{settings.developedBy ? <>Developed by {settings.developedByUrl ? <a target="_blank" rel="noopener noreferrer" href={settings.developedByUrl}>{settings.developedBy}</a> : settings.developedBy}</> : settings.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
