import { useRouter } from 'next/router';
import Header from './Header';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const isAuthPage = router.pathname.startsWith('/auth/');

  return (
    <div className="min-h-screen bg-white">
      {isAuthPage ? null : <Navigation />}
      <Header />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
