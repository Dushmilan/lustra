import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { authService, User } from '../services/authService';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const router = useRouter();
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = async () => {
    try {
      await authService.logout();
      setUser(null);
      router.push('/auth/login');
    } catch (err) {
      console.error('Logout error:', err);
      setError('Failed to log out');
    }
  };
  const isAuthPage = pathname.includes('/auth');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const initializeUser = async () => {
      try {
        setIsLoading(true);
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        setError(null);
      } catch (err) {
        console.error('Error initializing user:', err);
        setError('Failed to load user data');
      } finally {
        setIsLoading(false);
      }
    };

    initializeUser();
  }, []);

  if (isLoading) {
    return (
      <header className={`bg-white dark:bg-gray-800 shadow-lg ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 dark:border-gray-100"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  if (error) {
    return (
      <header className={`bg-white dark:bg-gray-800 shadow-lg ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <p className="text-red-500">{error}</p>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-xl font-bold text-gray-800">
                  Lustra
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/" className="inline-flex items-center px-1 pt-1 text-gray-900">
                  Home
                </Link>
                <Link href="/products" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-900">
                  Products
                </Link>
                <Link href="/about" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-900">
                  About
                </Link>
                <Link href="/contact" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-900">
                  Contact
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <svg className="h-5 w-5 text-yellow-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 1.536l-.105-.105A5.5 5.5 0 0018 10.5H12V6a5.5 5.5 0 00-1.536-.105l-.105-.105A6.5 6.5 0 0112 3.5v1m6.834 1.333S17 9 15 9m0 0a3 3 0 10-4 0 3 3 0 004 0z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
              {user ? (
                <div className="ml-3 relative">
                  <button
                    onClick={handleSignOut}
                    className="bg-white p-1 rounded-full text-sm text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign out
                  </button>
                </div>
              ) : !isAuthPage ? (
                <div className="ml-3">
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                  >
                    login/signup
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
