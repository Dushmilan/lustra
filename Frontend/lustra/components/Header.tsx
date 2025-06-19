import React from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

const Header: React.FC = () => {
  const { data: session } = useSession();

  return (
    <header className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-800">Lustra</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              href="/products"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Products
            </Link>
            <Link 
              href="/about"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              About
            </Link>
            <Link 
              href="/contact"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link 
              href="/cart"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>
            {session ? (
              <button
                onClick={() => signOut()}
                className="bg-gray-100 text-gray-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
              >
                Sign out
              </button>
            ) : (
              <Link
                href="/auth/login"
                className="bg-pastel-blue text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-pastel-mint transition-colors duration-200"
              >
                Login/Signup
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;