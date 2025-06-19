import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import products from '../products_item/products.json';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as { [key: string]: any[] });

  // Filter products based on selected category
  useEffect(() => {
    if (selectedCategory) {
      setFilteredProducts(products.filter(product => product.category.toLowerCase() === selectedCategory.toLowerCase()));
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Our Products</h1>
        
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handleCategorySelect('')}
              className={`px-4 py-2 rounded-full text-gray-700 hover:bg-gray-50 transition-colors duration-200 ${
                !selectedCategory ? 'bg-pastel-blue text-gray-800' : 'bg-white border border-gray-200'
              }`}
            >
              All Products
            </button>
            {Object.keys(groupedProducts).map((category) => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`px-4 py-2 rounded-full text-gray-700 hover:bg-gray-50 transition-colors duration-200 ${
                  selectedCategory === category ? 'bg-pastel-blue text-gray-800' : 'bg-white border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
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
      </main>
      <Footer />
    </div>
  );
};

export default Products;
