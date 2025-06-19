import React from 'react';
import Link from 'next/link';
import products from '../products_item/products.json';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header  />
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {(products as any[]).map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="relative h-64 w-full">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="object-cover w-full h-full rounded-t-2xl"
                  />
                </div>
                <div className="p-6 border-t border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 tracking-tight text-center mb-2">{product.name}</h3>
                  <p className="text-md text-gray-500 font-medium text-center mb-2">${product.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-500 text-center mb-4">{product.category}</p>
                  <Link
                    href={`/products/${product.id}`}
                    className="inline-block w-full text-center bg-pastel-blue hover:bg-pastel-mint text-gray-800 font-medium py-3 rounded-2xl transition-colors duration-200 shadow focus:outline-none focus:ring-2 focus:ring-pastel-blue"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}