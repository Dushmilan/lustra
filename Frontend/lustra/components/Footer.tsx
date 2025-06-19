import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Lustra</h3>
            <p className="text-gray-600 text-sm">
              Modern, minimal, and elegant fashion for every season.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-500 hover:text-gray-900">Home</a>
              </li>
              <li>
                <a href="/products" className="text-gray-500 hover:text-gray-900">Products</a>
              </li>
              <li>
                <a href="/about" className="text-gray-500 hover:text-gray-900">About Us</a>
              </li>
              <li>
                <a href="/contact" className="text-gray-500 hover:text-gray-900">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="/shipping" className="text-gray-500 hover:text-gray-900">Shipping</a>
              </li>
              <li>
                <a href="/returns" className="text-gray-500 hover:text-gray-900">Returns</a>
              </li>
              <li>
                <a href="/faq" className="text-gray-500 hover:text-gray-900">FAQ</a>
              </li>
              <li>
                <a href="/terms" className="text-gray-500 hover:text-gray-900">Terms & Conditions</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-blue-600 transition-colors duration-200">
                <FaFacebookF className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-pink-600 transition-colors duration-200">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <FaTwitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Lustra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;