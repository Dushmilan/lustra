import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Navigation() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow">
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
              <Link href="/products" className="inline-flex items-center px-1 pt-1 text-gray-500">
                Products
              </Link>
              <Link href="/about" className="inline-flex items-center px-1 pt-1 text-gray-500">
                About
              </Link>
              <Link href="/contact" className="inline-flex items-center px-1 pt-1 text-gray-500">
                Contact
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {session ? (
              <div className="ml-3 relative">
                <button
                  onClick={() => signOut()}
                  className="bg-white p-1 rounded-full text-sm text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="ml-3 space-x-4">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
