import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCheckCircle,
  faClock,
  faComments,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { prisma } from "@/lib/prisma";
import { services } from "@/lib/services";
import { HeroCarousel } from "@/components/site/HeroCarousel";
import { cleanHtml } from "@/lib/sanitize";

export const dynamic = "force-dynamic";
export default async function Home() {
  const [banners, home, posts] = await Promise.all([
    prisma.banner.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.page.findUnique({ where: { slug: "home" } }),
    prisma.post.findMany({
      where: { status: "published" },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
  ]);
  const slides = banners.length
    ? banners
    : [
        {
          id: "fallback",
          headline: "More clarity.\nLess complexity.",
          subheading:
            "From everyday bookkeeping to tax, compliance and business advisory, we help you stay organised and make better financial decisions.",
          imageUrl: "/images/hero-accountants.png",
          buttonText: "Explore Our Services",
          buttonHref: "/services",
        },
      ];
  return (
    <>
      <HeroCarousel banners={slides} />
      <div className="trust-strip">
        <div className="site-container trust-grid">
          {[
            [faCheckCircle, "Organised Accounts", "Reliable recordkeeping"],
            [faClock, "Timely Compliance", "Consistent filing support"],
            [faComments, "Practical Guidance", "Advice you can use"],
            [faChartLine, "Growing Together", "Support at every stage"],
          ].map(([icon, title, description], i) => (
            <div className="trust-item" key={i}>
              <span className="icon-chip">
                <FontAwesomeIcon icon={icon as typeof faCheckCircle} />
              </span>
              <div>
                <b>{title as string}</b>
                <small>{description as string}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
      <section className="site-section site-services" id="services">
        <div className="site-container">
          <div className="section-header">
            <div>
              <span className="section-kicker">WHAT WE DO</span>
              <h2>
                Complete accounting
                <br />& advisory services.
              </h2>
            </div>
            <p>
              Essential financial and compliance services brought together under
              one supportive partner.
            </p>
          </div>
          <div className="service-grid">
            {services.map((s, i) => (
              <Link href={"/" + s.slug} className="service-card" key={s.title}>
                <span className="icon-chip">
                  <FontAwesomeIcon icon={s.icon} />
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <span className="card-link">
                  LEARN MORE <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="site-section">
        <div className="site-container about-grid">
          <div className="about-image">
            <img
              src="/images/financial-advisor.png"
              alt="Financial advisor at the office"
            />
          </div>
          <div>
            <span className="section-kicker">WHY MONOLINE</span>
            <h2 className="section-title">
              We care about your business beyond the balance sheet.
            </h2>
            <p className="body-muted">
              {home?.excerpt ||
                "Good accounting is about more than completing returns. It gives you the confidence to plan, grow and face every deadline prepared."}
            </p>
            {home?.content && (
              <div
                className="rich-content home-rich"
                dangerouslySetInnerHTML={{ __html: cleanHtml(home.content) }}
              />
            )}
            <div className="benefit-list">
              {[
                [
                  "A relationship-led approach",
                  "Solutions shaped around your business and goals.",
                ],
                [
                  "Clear communication",
                  "Understand where you stand and what happens next.",
                ],
                [
                  "Dependable compliance support",
                  "Stay organised across recurring tax obligations.",
                ],
                [
                  "Insight for better decisions",
                  "Use financial information to plan confidently.",
                ],
              ].map((x) => (
                <div className="benefit" key={x[0]}>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <div>
                    <b>{x[0]}</b>
                    <small>{x[1]}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="site-section site-steps">
        <div className="site-container">
          <div className="section-header">
            <div>
              <span className="section-kicker">HOW WE WORK</span>
              <h2>Simple steps. Clear outcomes.</h2>
            </div>
            <p>
              A straightforward process to get the right accounting and advisory
              support.
            </p>
          </div>
          <div className="steps-grid">
            {[
              ["Understand", "We listen to your goals and current needs."],
              ["Plan", "We define practical next steps and scope."],
              [
                "Organise",
                "We bring financial records and obligations into order.",
              ],
              ["Support", "We provide ongoing reporting and updates."],
            ].map((s, i) => (
              <div className="step-card" key={i}>
                <span>0{i + 1} — THE PROCESS</span>
                <h3>{s[0]}</h3>
                <p>{s[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="site-section">
        <div className="site-container">
          <span className="section-kicker">WHO WE SUPPORT</span>
          <h2 className="section-title">Built for the way you work.</h2>
          <div className="industries-grid">
            {[
              ["Startups & Founders", "From incorporation to reporting"],
              ["Small & Medium Businesses", "Reliable ongoing finance support"],
              ["Professionals & Freelancers", "Tax and accounting made easier"],
              ["Growing Enterprises", "Planning, controls and insights"],
            ].map((s) => (
              <div className="industry" key={s[0]}>
                <b>{s[0]}</b>
                <small>{s[1]}</small>
              </div>
            ))}
          </div>
        </div>
      </section>
      {posts.length > 0 && (
        <section className="site-section site-services">
          <div className="site-container">
            <div className="section-header">
              <div>
                <span className="section-kicker">INSIGHTS</span>
                <h2>Helpful articles & updates.</h2>
              </div>
              <Link href="/blog" className="card-link">
                VIEW ALL POSTS <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
            <div className="blog-grid">
              {posts.map((p) => (
                <Link className="blog-card" href={"/blog/" + p.slug} key={p.id}>
                  <img
                    src={p.coverImage || "/images/hero-accountants.png"}
                    alt=""
                  />
                  <div className="blog-card-body">
                    <small>{p.category}</small>
                    <h3>{p.title}</h3>
                    <p>{p.excerpt}</p>
                    <b>READ ARTICLE →</b>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="site-cta">
        <div className="site-container d-flex flex-wrap align-items-center justify-content-between gap-4">
          <div>
            <span>LET'S GET STARTED</span>
            <h2>Ready for simpler accounts and stronger decisions?</h2>
          </div>
          <Link href="/contact" className="site-btn site-btn-light">
            Schedule a Consultation <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      </section>
    </>
  );
}
