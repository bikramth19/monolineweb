import {redirect} from 'next/navigation';
import {getAdmin} from '@/lib/auth';
import {AdminShell} from '@/components/admin/AdminShell';
export const dynamic='force-dynamic';
export default async function ProtectedLayout({children}:{children:React.ReactNode}){
  const admin=await getAdmin();if(!admin)redirect('/admin/login');
  return <AdminShell user={{name:admin.name,email:admin.email}}>{children}</AdminShell>;
}
