import Link from 'next/link';
import { redirect } from 'next/navigation';
import { DeleteSubmission } from '@/components/admin/DeleteSubmission';
import { getAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
const pageSize = 20;

export default async function ContactSubmissions({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  if (!await getAdmin()) redirect('/admin/login');
  const { page: pageParam } = await searchParams;
  const requestedPage = Number(pageParam);
  const page = Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const total = await prisma.contactSubmission.count();
  const pages = Math.max(1, Math.ceil(total / pageSize));
  if (page > pages) redirect(`/admin/contact-submissions?page=${pages}`);
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  return <>
    <div className="admin-page-head"><div><h2>Contact Submissions</h2><p>Messages sent through the website contact form.</p></div></div>
    <section className="admin-card">
      <div className="admin-card-title">{total} {total === 1 ? 'submission' : 'submissions'}</div>
      {submissions.length ? submissions.map(item => <article className="submission" key={item.id}>
        <div className="submission-heading"><div><h3>{item.subject}</h3><span>{item.name} · <a href={`mailto:${item.email}`}>{item.email}</a>{item.phone && <> · {item.phone}</>}</span></div><time dateTime={item.createdAt.toISOString()}>{item.createdAt.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</time></div>
        <p>{item.message}</p>
        <DeleteSubmission id={item.id} />
      </article>) : <p className="text-muted p-4 mb-0">No contact submissions yet.</p>}
      {pages > 1 && <nav className="submission-pagination" aria-label="Submission pages">
        {page > 1 && <Link className="admin-outline" href={`/admin/contact-submissions?page=${page - 1}`}>Previous</Link>}
        <span>Page {page} of {pages}</span>
        {page < pages && <Link className="admin-outline" href={`/admin/contact-submissions?page=${page + 1}`}>Next</Link>}
      </nav>}
    </section>
  </>;
}
