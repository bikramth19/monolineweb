/** Editable seed content for Monoline. No invented team names, awards or credentials. */
export const contactDetails = {
  address: '1028, 2nd Floor, 27th A Main, 100 Feet Ring Road, Jayanagara 9th Block, Jayanagar, Bengaluru, Karnataka 560041',
  phone: '9113899211',
  phoneSecondary: '8088779211',
  email: 'info@monoline.in'
};
export const mapSearchUrl='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(contactDetails.address);

const bullets=(items)=>'<ul>'+items.map(i=>`<li>${i}</li>`).join('')+'</ul>';
const section=(title,body)=>`<h2>${title}</h2>${body}`;
const contactCta='<p><strong>Ready to discuss your requirements?</strong> <a href="/contact">Contact Monoline</a> to explore a suitable scope of support.</p>';
function serviceContent({intro,scope,outcomes,process,clients,note}){
  return '<p>'+intro+'</p>'+
    section('What this service covers',bullets(scope))+
    section('How it helps your business','<p>'+outcomes+'</p>')+
    section('Our working approach',bullets(process))+
    section('Who this service is for','<p>'+clients+'</p>')+
    (note?'<p><em>'+note+'</em></p>':'')+contactCta;
}

export const servicePages=[
  {
    slug:'accounting-bookkeeping',title:'Accounting & Bookkeeping',sortOrder:31,
    excerpt:'Reliable books, organised records and clear financial information for everyday decisions.',
    content:serviceContent({
      intro:'Well-maintained accounts are the foundation of confident business decisions. Monoline helps you organise transactions, reconcile records and maintain a clear picture of the financial activity behind your business.',
      scope:['Recording day-to-day sales, purchases, receipts and payments.','Maintaining ledgers, journals, vouchers and supporting documents.','Bank, vendor and customer account reconciliations.','Accounts payable, receivable and expense categorisation.','Periodic trial balance and management-ready accounting summaries.'],
      outcomes:'Consistent bookkeeping gives you dependable information for cash planning, tax preparation and management review. It can also reduce the time spent gathering documents when reporting deadlines arrive.',
      process:['Review existing books, accounting software and source documents.','Agree on the reporting frequency and information required.','Maintain and reconcile records against available documentation.','Share queries, exceptions and periodic financial summaries.'],
      clients:'Suitable for startups, traders, service providers, professionals and growing businesses that need ongoing bookkeeping or help bringing accounts up to date.'
    })
  },
  {
    slug:'gst-registration-returns',title:'GST Registration & Returns',sortOrder:32,
    excerpt:'GST registration, return preparation and reconciliation support for smoother compliance.',
    content:serviceContent({
      intro:'GST compliance involves accurate transaction records, timely return preparation and careful reconciliation. Monoline supports businesses in organising the information needed for registration and recurring GST requirements.',
      scope:['GST registration application and supporting document preparation.','Review of outward supplies and purchase records for return preparation.','GST return filing support based on the registrations and filing obligations that apply.','Input tax credit reconciliation and exception identification.','Assistance organising information for GST queries and notices.'],
      outcomes:'Structured processes help identify missing invoices and mismatches earlier, make filing cycles more predictable and support better visibility over tax-related cash obligations.',
      process:['Understand business activities, registration status and applicable filing frequency.','Collect invoice and accounting records for the relevant period.','Prepare reconciliations and communicate missing information.','Support review, submission and record retention.'],
      clients:'Useful for eligible businesses registering for GST, active GST registrants and organisations seeking periodic reconciliation support.',
      note:'GST registration thresholds, filing requirements and due dates depend on current law and the specific business. Confirm applicable obligations before acting.'
    })
  },
  {
    slug:'income-tax-tds',title:'Income Tax & TDS',sortOrder:33,
    excerpt:'Income tax return preparation, TDS support and practical tax documentation assistance.',
    content:serviceContent({
      intro:'Tax work becomes more manageable when records are collected throughout the year. Monoline helps individuals and businesses organise their information for income tax return preparation, TDS compliance and related reporting.',
      scope:['Income tax return information gathering and preparation support.','TDS deduction records, returns and reconciliation support.','Review of available income, expense and deduction documents.','Assistance identifying discrepancies across tax records and statements.','Support in organising documents and responses for tax-related correspondence.'],
      outcomes:'A well-planned approach reduces last-minute information gaps, supports accurate reporting and makes tax-related decisions easier to discuss.',
      process:['Understand the taxpayer profile and applicable requirements.','Review statements, ledgers and source documents.','Prepare and reconcile tax schedules for review.','Support timely filing and maintain an organised document trail.'],
      clients:'Relevant to salaried individuals, professionals, proprietors, partnerships and companies requiring return or TDS-related assistance.',
      note:'Tax treatment and filing obligations vary by circumstances and current rules. Specialist representation, where legally required, is handled by appropriately authorised professionals.'
    })
  },
  {
    slug:'audit-readiness-support',title:'Audit Readiness & Support',sortOrder:34,
    excerpt:'Prepare accounting records, schedules and internal documentation for a smoother audit process.',
    content:serviceContent({
      intro:'An audit is easier to manage when accounting records and supporting documents are complete and readily available. Monoline helps organisations organise the information their appointed auditors and reviewers may need.',
      scope:['Preparation of account reconciliations and balance schedules.','Organisation of invoices, bank statements, contracts and supporting records.','Review of accounting documentation and common control gaps.','Compilation of reporting schedules and responses to information requests.','Coordination support between management and the appointed auditor.'],
      outcomes:'Audit readiness can reduce disruption to day-to-day operations, help management resolve information gaps and support clearer communication during reviews.',
      process:['Agree on the documentation and timeline required.','Assess records for missing items and reconcile key balances.','Prepare supporting schedules and an organised evidence list.','Help track open queries until required information is delivered.'],
      clients:'Suitable for businesses preparing for statutory audits, lender reviews, internal assessments or financial due diligence.',
      note:'This service covers audit preparation and support. Statutory audit opinions or attestations, where applicable, must be issued by appropriately qualified and authorised professionals.'
    })
  },
  {
    slug:'company-llp-compliance',title:'Company & LLP Compliance',sortOrder:35,
    excerpt:'Registration documentation and recurring compliance coordination for businesses and LLPs.',
    content:serviceContent({
      intro:'Entity formation is only the first step. Companies and LLPs also need organised statutory records, accurate filings and a clear view of recurring responsibilities. Monoline provides practical coordination and documentation support.',
      scope:['Assistance preparing documentation for company, LLP and business registrations.','Organisation of incorporation and post-registration records.','Tracking of recurring statutory filing and recordkeeping requirements.','Support preparing financial information for required filings.','Coordination of supporting documents with legal or professional advisors where necessary.'],
      outcomes:'A structured compliance calendar and orderly records help reduce missed documentation, improve visibility and make it easier to respond to information requests.',
      process:['Understand the entity type and applicable requirements.','Review existing statutory and financial records.','Prepare a practical compliance checklist and document requests.','Coordinate filings and keep an updated record trail.'],
      clients:'Founders forming an entity, newly incorporated companies and LLPs, and growing organisations requiring administrative compliance support.',
      note:'Specific company law procedures and professional certifications are carried out by appropriately qualified persons where required.'
    })
  },
  {
    slug:'payroll-employee-compliance',title:'Payroll & Employee Compliance',sortOrder:36,
    excerpt:'Timely payroll processing, payslips, deductions and organised employee records.',
    content:serviceContent({
      intro:'Payroll is a recurring responsibility that needs consistency, confidentiality and dependable calculations. Monoline can help organise monthly payroll inputs, employee records and related accounting entries.',
      scope:['Monthly salary processing using approved attendance and payroll inputs.','Preparation of payslips and employee-wise payroll summaries.','Support for relevant statutory deductions and reporting records.','Payroll journal entries and reconciliation with accounting books.','Employee reimbursement and salary component tracking.'],
      outcomes:'A defined payroll workflow helps employees receive clear salary information while giving management an organised view of workforce-related costs.',
      process:['Review salary structures, payroll policies and employee details.','Collect and verify approved monthly payroll inputs.','Prepare calculations and summaries for management approval.','Support disbursement records and accounting reconciliation.'],
      clients:'Businesses employing staff and looking for dependable recurring payroll administration and supporting records.',
      note:'Applicability of labour-law filings, employee benefit requirements and deductions depends on the organisation and prevailing rules.'
    })
  },
  {
    slug:'financial-reporting-mis',title:'Financial Reporting & MIS',sortOrder:37,
    excerpt:'Financial statements and management reports that turn accounting data into useful insights.',
    content:serviceContent({
      intro:'Accounting records become more valuable when they are translated into clear, timely information. Monoline helps organise regular financial reporting and management information suited to the way your business operates.',
      scope:['Preparation and review support for profit and loss statements and balance sheets.','Cash-flow visibility and periodic financial summaries.','Department, product or cost-centre reporting where data is available.','Budget-versus-actual comparisons and variance notes.','Management dashboards and recurring MIS packs.'],
      outcomes:'Good reports highlight trends, make performance easier to discuss and help business owners identify the questions that deserve attention.',
      process:['Identify the decisions and measures important to management.','Confirm available accounting data and reporting frequency.','Design practical report formats and reconciliation checks.','Review key movements and explain notable variances.'],
      clients:'Growing SMEs, trading and service companies, and managers seeking a clearer picture of performance and working capital.'
    })
  },
  {
    slug:'virtual-cfo-advisory',title:'Virtual CFO & Advisory',sortOrder:38,
    excerpt:'Budgeting, forecasting and financial decision support as your business evolves.',
    content:serviceContent({
      intro:'Growing businesses often need financial perspective before they are ready for a full-time senior finance function. Monoline offers practical financial planning and advisory support to help management evaluate priorities.',
      scope:['Budget preparation, monitoring and scenario planning.','Cash-flow forecasting and working-capital review.','Profitability, cost and pricing analysis using available data.','Monthly or periodic financial review discussions.','Support organising financial information for lenders or investment conversations.'],
      outcomes:'Regular planning and review help turn raw financial data into a forward-looking discussion about cash needs, costs, risks and opportunities.',
      process:['Clarify business goals and immediate financial questions.','Review available accounts and establish key metrics.','Build practical budgets and forecasts aligned with management priorities.','Discuss results periodically and refresh plans as conditions change.'],
      clients:'Startups, owner-managed businesses and SMEs seeking financial planning support alongside regular bookkeeping and reporting.',
      note:'Advisory support is tailored to the agreed scope and does not replace regulated financial, legal or investment advice where specific authorisation is required.'
    })
  }
];

const aboutHtml=`
<h2>Accounting clarity for every stage of business</h2>
<p>Monoline supports businesses and individuals with the accounting information, compliance processes and practical financial guidance they need to move forward. We believe that clear records and timely information should make business decisions easier—not more complicated.</p>
<p>From day-to-day bookkeeping and tax documentation to reporting and advisory discussions, we focus on understanding your requirements and building a dependable working relationship. Our aim is to make financial tasks more organised, transparent and useful.</p>
<h2>Our purpose</h2><p>To make accounting and compliance support approachable while helping clients build confidence in the numbers behind their decisions.</p>
<h2>What guides our work</h2>${bullets(['<strong>Clarity:</strong> We explain information and next steps in straightforward language.','<strong>Care:</strong> We pay attention to records, deadlines and the details behind them.','<strong>Consistency:</strong> We value organised workflows, regular communication and dependable follow-through.','<strong>Partnership:</strong> We adapt the scope of support to your business stage and priorities.'])}
<h2>Who we work with</h2><p>Our proposed services are designed for startups, small and medium businesses, growing enterprises, independent professionals and individuals seeking reliable accounting and taxation assistance.</p>
<h2>How we begin</h2>${bullets(['We listen to your goals and understand your existing accounting process.','We discuss the services and responsibilities that fit your situation.','We agree on a practical plan for records, reporting and recurring obligations.','We work with you to maintain visibility and address new requirements as they arise.'])}
<p>Have questions about your accounts or compliance needs? <a href="/contact">Get in touch with Monoline</a>.</p>`;

const servicesHtml=`
<h2>Complete accounting and business support</h2>
<p>Whether you are setting up a business, managing recurring compliance, preparing reports or planning your next stage of growth, Monoline offers a coordinated range of accounting and advisory services. Choose a service below to explore its scope.</p>
<p>Our services span routine financial operations, tax and regulatory support, management reports and forward-looking planning. Every engagement begins with a discussion of what your organisation needs.</p>`;

const contactHtml=`
<h2>Let's talk about your accounting needs</h2>
<p>Whether you need regular bookkeeping, GST or income tax assistance, payroll and reporting, or support with a business decision, we would be happy to hear from you.</p>
<h2>Visit our Bengaluru office</h2>
<p><strong>Monoline</strong><br>1028, 2nd Floor, 27th A Main,<br>100 Feet Ring Road, Jayanagara 9th Block,<br>Jayanagar, Bengaluru, Karnataka 560041.</p>
<p><a href="${mapSearchUrl}" target="_blank" rel="noopener noreferrer">View directions on Google Maps →</a></p>
<h2>Call or email us</h2>
<p><strong>Phone:</strong> <a href="tel:+919113899211">+91 91138 99211</a> | <a href="tel:+918088779211">+91 80887 79211</a><br><strong>Email:</strong> <a href="mailto:info@monoline.in">info@monoline.in</a></p>
<h2>What to include in your enquiry</h2>
<p>A short description of your business, the service you need and your preferred way to be contacted will help us understand your requirements.</p>`;

export const corePages=[
  {slug:'home',title:'Home',excerpt:'Good accounting is about more than completing returns. It gives you confidence to plan, grow and face every deadline prepared.',content:'<p>Monoline combines organised records, clear communication and practical accounting and business guidance to support everyday decisions.</p>',sortOrder:0,showInNav:false,status:'published'},
  {slug:'about-us',title:'About Us',excerpt:'Practical financial guidance, clear communication and a dependable approach to accounting.',content:aboutHtml,sortOrder:10,showInNav:true,status:'published'},
  {slug:'services',title:'Our Services',excerpt:'Explore bookkeeping, GST, taxation, audit readiness, compliance, payroll, reporting and advisory.',content:servicesHtml,sortOrder:20,showInNav:true,status:'published'},
  {slug:'contact',title:'Contact Us',excerpt:'Contact Monoline in Jayanagar, Bengaluru, for accounting and advisory assistance.',content:contactHtml,sortOrder:90,showInNav:true,status:'published'},
  {slug:'privacy-policy',title:'Privacy Policy',excerpt:'Information about how website data is handled.',content:'<h2>Privacy Policy</h2><p>This is a draft placeholder. Replace it with a privacy notice reviewed for your actual data collection, hosting, analytics and applicable laws before publication.</p>',sortOrder:99,showInNav:false,status:'draft'}
];
