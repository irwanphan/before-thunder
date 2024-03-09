import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import SessionProvider from '@/components/providers/SessionProvider';
import { authOptions } from '@/lib/auth-options';

export default async function UserPanelLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect('api/auth/signin');
  }

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
