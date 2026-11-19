import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faEnvelope, faLocationDot, faPhone, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { prisma } from '@/lib/prisma';
import { cleanHtml } from '@/lib/sanitize';
import { siteSettings } from '@/lib/settings';
import { services } from '@/lib/services';
import { ContactForm } from '@/components/site/ContactForm';

export const dynamic = 'force-dynamic';
type Context = { params: Promise<{ slug: string }> };

function phoneHref(phone: string) {
  const digits = phone.replace(/[^+\d]/g, '');
  return digits.length === 10 ? `tel:+91${digits}` : `tel:${digits}`;
}

export async function generateMetadata({ params }: Context): Promise<Metadata> {
  const { slug } = await params;
  const page = await prisma.page.findUnique({ where: { slug } });
  return { title: page?.seoTitle || page?.title || 'Not found', description: page?.seoDesc || page?.excerpt || undefined };
}

export default async function ContentPage({ params }: Context) {
  const { slug } = await params;
  const [page, settings] = await Promise.all([
    prisma.page.findUnique({ where: { slug } }),
    siteSettings()
  ]);
  if (!page || page.status !== 'published' || slug === 'home') notFound();

  const isContact = slug === 'contact';
  const isServices = slug === 'services';
  const isAbout = slug === 'about-us';
  const currentService = services.find(service => service.slug === slug);

  return (
    <>
      <section className="inner-hero">
        <div className="site-container">
          <span className="section-kicker">MONOLINE / {currentService ? 'OUR SERVICES' : page.title.toUpperCase()}</span>
          <h1>{page.title}</h1>
          {page.excerpt && <p>{page.excerpt}</p>}
          {currentService && <Link href="/services" className="hero-back-link">← View all services</Link>}
        </div>
      </section>

      {isServices ? (
        <section className="site-section service-catalog-section">
          <div className="site-container">
            <div className="catalog-intro">
              <article className="rich-content" dangerouslySetInnerHTML={{ __html: cleanHtml(page.content) }} />
              <aside className="content-support-panel catalog-support-panel">
                <img src={page.coverImage || '/images/financial-advisor.png'} alt="" />
                <div className="support-panel-body">
                  <span className="section-kicker">SUPPORT FOR YOUR BUSINESS</span>
                  <h3>Financial clarity at every step.</h3>
                  <p>From organised accounts to compliance and planning, explore practical support tailored to your business.</p>
                  <ul><li><FontAwesomeIcon icon={faCheckCircle} /> Accounting and bookkeeping</li><li><FontAwesomeIcon icon={faCheckCircle} /> Tax and compliance support</li><li><FontAwesomeIcon icon={faCheckCircle} /> Reporting and advisory</li></ul>
                </div>
              </aside>
            </div>
            <div className="service-catalog-grid">
              {services.map((service, index) => (
                <Link className="service-card catalog-card" href={`/${service.slug}`} key={service.slug}>
                  <span className="catalog-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="icon-chip"><FontAwesomeIcon icon={service.icon} /></span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <span className="card-link">EXPLORE SERVICE <FontAwesomeIcon icon={faArrowRight} /></span>
                </Link>
              ))}
            </div>
            <div className="catalog-contact-cta">
              <div><span className="section-kicker">PERSONALISED SUPPORT</span><h2>Not sure which service fits your business?</h2><p>Tell us what you need and we can discuss the next steps.</p></div>
              <Link className="site-btn site-btn-light" href="/contact">Discuss your requirements →</Link>
            </div>
          </div>
        </section>
      ) : (
        <section className="site-section">
          <div className={`site-container content-layout${isAbout ? ' about-content-layout' : ''}`}>
            <article className="rich-content">
              {currentService && <img className="service-cover" src={page.coverImage || (services.findIndex(service => service.slug === slug) % 2 === 0 ? '/images/hero-accountants.png' : '/images/financial-advisor.png')} alt={`Illustrative image for ${page.title}`} />}
              <div dangerouslySetInnerHTML={{ __html: cleanHtml(page.content) }} />
              {isContact && <ContactForm />}
            </article>

            {isAbout && (
              <aside className="content-support-panel about-support-panel">
                <img src="/images/financial-advisor.png" alt="Illustration of professional accounting and financial guidance" loading="lazy" />
                <div className="support-panel-body">
                  <span className="section-kicker">WHY MONOLINE</span>
                  <h3>Clarity. Consistency. Confidence.</h3>
                  <p>Organised records, attentive communication and financial reporting tailored to your needs.</p>
                  <ul><li><FontAwesomeIcon icon={faCheckCircle} /> Practical guidance</li><li><FontAwesomeIcon icon={faCheckCircle} /> Clear reporting</li><li><FontAwesomeIcon icon={faCheckCircle} /> Ongoing compliance support</li></ul>
                </div>
              </aside>
            )}

            {currentService && (
              <aside className="content-support-panel service-aside">
                <span className="section-kicker">HOW WE CAN HELP</span>
                <h3>Other services</h3>
                <nav aria-label="Other Monoline services">
                  {services.filter(service => service.slug !== slug).map(service => <Link key={service.slug} href={`/${service.slug}`}><FontAwesomeIcon icon={service.icon} /> {service.title} <FontAwesomeIcon className="aside-arrow" icon={faArrowRight} /></Link>)}
                </nav>
                <div className="aside-cta"><h4>Let's discuss your requirements.</h4><p>We're available to help you understand a suitable next step.</p><Link className="site-btn" href="/contact">Contact Monoline →</Link></div>
              </aside>
            )}

            {isContact && (
              <aside className="content-support-panel contact-aside">
                <h3>Contact Monoline</h3>
                <div className="contact-info-row"><FontAwesomeIcon icon={faLocationDot} /><div><b>Office address</b><p>{settings.address}</p></div></div>
                <div className="contact-info-row"><FontAwesomeIcon icon={faPhone} /><div><b>Call us</b>{settings.phone && <a href={phoneHref(settings.phone)}>{settings.phone}</a>}{settings.phoneSecondary && <a href={phoneHref(settings.phoneSecondary)}>{settings.phoneSecondary}</a>}</div></div>
                <div className="contact-info-row"><FontAwesomeIcon icon={faEnvelope} /><div><b>Email us</b>{settings.email && <a href={`mailto:${settings.email}`}>{settings.email}</a>}</div></div>
                {settings.mapsEmbedUrl && <iframe title="Monoline office in Jayanagar, Bengaluru" src={settings.mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />}
                {settings.mapsLink && <a className="map-directions" href={settings.mapsLink} target="_blank" rel="noopener noreferrer">Get directions on Google Maps ↗</a>}
              </aside>
            )}
          </div>
        </section>
      )}

      {!isContact && !isServices && <section className="inner-bottom-cta"><div className="site-container d-flex flex-wrap align-items-center justify-content-between gap-3"><h2>{currentService ? 'Ready to talk about this service?' : 'Looking for dependable accounting support?'}</h2><Link href="/contact" className="site-btn">Talk to Monoline →</Link></div></section>}
    </>
  );
}
