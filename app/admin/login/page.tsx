import {redirect} from 'next/navigation';
import {getAdmin} from '@/lib/auth';
import {LoginForm} from '@/components/admin/LoginForm';
export const dynamic='force-dynamic';
export const metadata={title:'CMS Login | Monoline'};
export default async function Login(){if(await getAdmin())redirect('/admin');return <LoginForm/>;}
