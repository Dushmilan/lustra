import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '../../types/Product';
import { useRouter } from 'next/router';

export default function AdminDashboard() {
  const router = useRouter();
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProductsData(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProductsData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      const updatedProducts = productsData.filter(p => p.id !== id);
      setProductsData(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/products/new"
                className="bg-pastel-blue hover:bg-pastel-mint text-gray-800 font-medium px-4 py-2 rounded-2xl transition-colors duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-pastel-blue"
              >
                Add New Product
              </Link>
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <span className="sr-only">Back to</span> Store
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">Product Management</h2>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => router.push('/admin/products/new')}
                className="bg-pastel-blue hover:bg-pastel-mint text-gray-800 font-medium px-4 py-2 rounded-2xl transition-colors duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-pastel-blue"
              >
                Add Product
              </button>
              <button className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {productsData && productsData.length > 0 ? (
                productsData.map((product) => (
                  <div key={product.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col">
                        <img 
                          src={product.imageUrl || '/placeholder-image.jpg'} 
                          alt={product.name || 'Product'} 
                          className="w-32 h-32 object-cover rounded-xl mb-3"
                        />
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{product.name || 'Unnamed Product'}</h3>
                        <p className="text-sm text-gray-500 mb-1">{product.category || 'No category'}</p>
                        <p className="text-sm font-medium text-gray-900">${(product.price || 0).toFixed(2)}</p>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Link
                          href={`/products/${product.id}`}
                          className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
                        >
                          View Details
                        </Link>
                        <Link
                          href={`/admin/products/edit/${product.id}`}
                          className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-500 hover:text-red-600 transition-colors duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-8">
                  <p className="text-gray-600">No products found</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
