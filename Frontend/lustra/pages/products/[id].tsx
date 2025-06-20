import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { productService, Product } from '../../services/productService';
import Link from 'next/link';
import Header from '../../components/Header';
import { useCart } from '../../contexts/CartContext';

const ProductDetail = () => {
  const router = useRouter();
  
  // Wait for router to be ready
  if (!router.isReady) {
    return <div className="text-center py-20">Loading...</div>;
  }

  const id = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;
  if (!id || typeof id !== 'string') {
    return <div className="text-center py-20 text-gray-400">Invalid product ID.</div>;
  }

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchProduct = async () => {
      try {
        if (!isMounted) return;
        setLoading(true);
        setError(null);

        // Validate ID format
        if (!/^[0-9a-fA-F]{24}$/.test(id)) {
          throw new Error('Invalid product ID format');
        }

        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        try {
          const data = await productService.getById(id);
          clearTimeout(timeoutId);

          if (!data) {
            throw new Error('Product not found');
          }

          // Validate product data
          if (!data.id || !data.name || !data.price || !data.imageUrl) {
            throw new Error('Invalid product data');
          }

          // Set default values for optional fields
          const completeProduct: Product = {
            ...data,
            images: Array.isArray(data.images) ? data.images : [],
            createdAt: data.createdAt || new Date().toISOString(),
            stock: typeof data.stock === 'number' ? data.stock : 0,
            category: typeof data.category === 'string' ? data.category : 'Uncategorized',
            description: typeof data.description === 'string' ? data.description : ''
          };

          if (isMounted) {
            setProduct(completeProduct);
          }
        } catch (timeoutError: unknown) {
          if (timeoutError instanceof Error && timeoutError.name === 'AbortError') {
            throw new Error('Request timed out');
          }
          throw timeoutError;
        }
      } catch (err: any) {
        // Handle API errors properly
        const errorMessage = err instanceof Error 
          ? err.message 
          : typeof err === 'object' && err !== null && 'message' in err 
            ? err.message 
            : 'Failed to fetch product';
        
        console.error('Product fetch error:', {
          error: err,
          message: errorMessage,
          response: err?.response?.data
        });
        
        if (isMounted) {
          setError(errorMessage);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    // Cleanup function
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!product) return <div className="text-center py-20 text-gray-400">Product not found.</div>;
  const handleAddToCart = async () => {
    try {
      if (!product) {
        setError('Product not found');
        return;
      }
      await addToCart(product.id, quantity);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setError('Failed to add product to cart');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pastel-blue via-white to-pastel-mint">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="relative">
              <img
                src={product?.imageUrl || '/placeholder-image.jpg'}
                alt={product?.name || 'Product Image'}
                className="w-full h-full object-cover rounded-2xl bg-gray-100 shadow-md"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src = '/placeholder-image.jpg';
                }}
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-2">{product?.name || 'Product Name'}</h2>
                <div className="flex items-center space-x-2">
                  <span className="inline-block text-xs uppercase tracking-widest text-pastel-black bg-pastel-mint px-3 py-1 rounded-full">{product?.category || 'Category'}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500">{product?.stock || 0} in stock</span>
                </div>
                <p className="mt-4 text-gray-500">{product?.description || 'No description available'}</p>
              </div>

              {/* Price and Rating */}
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-gray-800">${product?.price?.toFixed(2) || 0}</div>
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-400">
                    {Array(5).fill('★').map((star, index) => (
                      <span key={index} className={index < 4.5 ? 'text-yellow-400' : 'text-gray-400'}>
                        ★
                      </span>
                    ))}
                  </span>
                  <span className="text-gray-500 text-sm">(4.5)</span>
                </div>
              </div>

              {/* Product Options */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-blue"
                  >
                    <option value="">Select size</option>
                    <option value="S">Small</option>
                    <option value="M">Medium</option>
                    <option value="L">Large</option>
                    <option value="XL">X-Large</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedColor('Black')}
                      className="w-8 h-8 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-pastel-blue"
                      style={{ backgroundColor: '#000000' }}
                    />
                    <button
                      onClick={() => setSelectedColor('White')}
                      className="w-8 h-8 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-pastel-blue"
                      style={{ backgroundColor: '#FFFFFF' }}
                    />
                    <button
                      onClick={() => setSelectedColor('Gray')}
                      className="w-8 h-8 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-pastel-blue"
                      style={{ backgroundColor: '#808080' }}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize || !selectedColor}
                  className={`w-full bg-pastel-blue text-black py-4 px-6 rounded-xl text-lg font-medium hover:bg-pastel-mint transition-colors duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-pastel-blue ${
                    !selectedSize || !selectedColor ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Add to Cart
                </button>
                <button
                  onClick={async () => {
                    try {
                      if (!product?.id) {
                        setError('Product ID not found');
                        return;
                      }
                      await addToCart(product.id, quantity);
                      router.push('/cart');
                    } catch (error) {
                      console.error('Error adding to cart:', error);
                      setError('Failed to add product to cart');
                    }
                  }}
                  className="w-full bg-white text-pastel-black py-4 px-6 rounded-xl text-lg font-medium border-2 border-pastel-blue hover:bg-pastel-mint hover:text-black transition-colors duration-200 shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue"
                  disabled={!selectedSize || !selectedColor}
                >
                  Buy Now
                </button>
              </div>

              {/* Additional Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4 border-b pb-4">
                  <span className="text-gray-500">Shipping:</span>
                  <span className="text-green-600">Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center space-x-4 border-b pb-4">
                  <span className="text-gray-500">Returns:</span>
                  <span className="text-gray-600">30-day free returns</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-500">Guarantee:</span>
                  <span className="text-gray-600">1-year warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;