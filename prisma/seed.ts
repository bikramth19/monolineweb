import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting Monoline CMS database seeding...");

  // ==========================================
  // 1. CREATE ADMINISTRATOR
  // ==========================================

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD must be configured in .env"
    );
  }

  if (adminPassword.length < 12) {
    throw new Error(
      "ADMIN_PASSWORD must contain at least 12 characters."
    );
  }

  const passwordHash = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.adminUser.upsert({
    where: {
      email: adminEmail,
    },

    update: {},

    create: {
      email: adminEmail,
      passwordHash,
      name: "Administrator",
    },
  });

  console.log(`Admin account ready: ${admin.email}`);

  // ==========================================
  // 2. WEBSITE SETTINGS
  // ==========================================

  await prisma.siteSettings.upsert({
    where: {
      id: 1,
    },

    update: {},

    create: {
      id: 1,

      brandName: "Monoline",

      tagline: "Accounting · Compliance · Advisory",

      copyrightText:
        "© Monoline. All rights reserved.",

      developedBy: "SheStrong Technology Services",

      developedByUrl: "https://shestrong.in",

      blogLayout: "grid",
    },
  });

  console.log("Website settings initialized.");

  // ==========================================
  // 3. ABOUT US PAGE
  // ==========================================

  await prisma.page.upsert({
    where: {
      slug: "about-us",
    },

    update: {},

    create: {
      title: "About Us",

      slug: "about-us",

      excerpt:
        "Learn about Monoline and our professional accounting services.",

      content: `
        <h2>Welcome to Monoline</h2>

        <p>
          Monoline provides professional accounting,
          taxation, compliance and business advisory
          services.
        </p>

        <p>
          Our focus is to help businesses maintain
          accurate financial records, understand their
          compliance responsibilities and make informed
          financial decisions.
        </p>

        <h3>Our Mission</h3>

        <p>
          To deliver reliable, efficient and transparent
          financial and accounting services.
        </p>

        <h3>Our Vision</h3>

        <p>
          To become a trusted partner for businesses
          seeking accounting and financial guidance.
        </p>
      `,

      seoTitle: "About Us | Monoline",

      seoDesc:
        "Learn about Monoline accounting, taxation and business advisory services.",

      status: "published",

      showInNav: true,

      sortOrder: 1,
    },
  });

  console.log("About Us page initialized.");

  // ==========================================
  // 4. SERVICES PAGE
  // ==========================================

  await prisma.page.upsert({
    where: {
      slug: "services",
    },

    update: {},

    create: {
      title: "Our Services",

      slug: "services",

      excerpt:
        "Explore our accounting, taxation and compliance services.",

      content: `
        <h2>Our Professional Services</h2>

        <p>
          Monoline offers accounting and business
          support services to individuals,
          entrepreneurs and organizations.
        </p>

        <h3>Accounting and Bookkeeping</h3>

        <p>
          Assistance with financial records,
          bookkeeping and account reconciliation.
        </p>

        <h3>Taxation Services</h3>

        <p>
          Support for tax compliance, documentation
          and filing requirements.
        </p>

        <h3>GST Compliance</h3>

        <p>
          Assistance with GST registration,
          returns and compliance documentation.
        </p>

        <h3>Payroll Management</h3>

        <p>
          Payroll processing and associated
          statutory compliance support.
        </p>

        <h3>Business Advisory</h3>

        <p>
          Financial and operational guidance
          to support business decision-making.
        </p>
      `,

      seoTitle: "Our Services | Monoline",

      seoDesc:
        "Explore accounting, taxation, GST, payroll and business advisory services.",

      status: "published",

      showInNav: true,

      sortOrder: 2,
    },
  });

  console.log("Services page initialized.");

  // ==========================================
  // 5. CONTACT PAGE
  // ==========================================

  await prisma.page.upsert({
    where: {
      slug: "contact",
    },

    update: {},

    create: {
      title: "Contact Us",

      slug: "contact",

      excerpt:
        "Get in touch with Monoline.",

      content: `
        <h2>Contact Monoline</h2>

        <p>
          Have a question about our accounting
          or business advisory services?
        </p>

        <p>
          Please contact our team to discuss
          your requirements.
        </p>
      `,

      seoTitle: "Contact Us | Monoline",

      seoDesc:
        "Contact Monoline for accounting, taxation and business advisory enquiries.",

      status: "published",

      showInNav: true,

      sortOrder: 3,
    },
  });

  console.log("Contact page initialized.");

  // ==========================================
  // 6. SAMPLE BLOG POST
  // ==========================================

  await prisma.post.upsert({
    where: {
      slug: "welcome-to-monoline",
    },

    update: {},

    create: {
      title: "Welcome to Monoline Insights",

      slug: "welcome-to-monoline",

      category: "Insights",

      excerpt:
        "Welcome to our collection of accounting, taxation and business insights.",

      content: `
        <h2>Welcome to Monoline Insights</h2>

        <p>
          Welcome to our Insights section,
          where we share information about
          accounting, taxation, compliance
          and business management.
        </p>

        <p>
          Our objective is to provide useful
          information to help individuals
          and businesses better understand
          financial matters.
        </p>
      `,

      status: "published",

      publishedAt: new Date(),
    },
  });

  console.log("Sample blog post initialized.");

  // ==========================================
  // 7. VERIFY RECORD COUNTS
  // ==========================================

  const adminCount = await prisma.adminUser.count();
  const pageCount = await prisma.page.count();
  const postCount = await prisma.post.count();
  const settingsCount = await prisma.siteSettings.count();

  console.log("\nDatabase seeding completed successfully.");

  console.log({
    administrators: adminCount,
    pages: pageCount,
    posts: postCount,
    siteSettings: settingsCount,
  });
}

main()
  .catch((error) => {
    console.error("Database seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });