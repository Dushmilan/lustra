import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  session: Session | null;
  children: ReactNode;
}

export default function AuthLayout({ session, children }: AuthLayoutProps) {
  const router = useRouter();

  // Redirect to home if already authenticated
  if (session && router.pathname.startsWith('/auth/')) {
    router.push('/');
  }

  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}
