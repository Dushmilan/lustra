import React from 'react';
import Link from 'next/link';
import { useCart } from '../contexts/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, addToCart } = useCart();
  const cartItems = cart || []; 
  
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-500 mb-8">Start adding some items to your cart.</p>
            <Link
              href="/products"
              className="inline-block bg-pastel-blue hover:bg-pastel-mint text-gray-800 px-8 py-3 rounded-2xl text-lg font-medium transition-colors duration-200 shadow focus:outline-none focus:ring-2 focus:ring-pastel-blue"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>
            
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center space-x-6">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">{item.product.name}</h3>
                      <p className="text-gray-500">Category: {item.product.category}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="text-xl font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xl font-semibold">${(item.product.price * item.quantity).toFixed(2)}</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">Free</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold">${cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0).toFixed(2)}</span>
              </div>
              <button
                onClick={() => cartItems.forEach(item => removeFromCart(item.id))}
                className="w-full text-red-600 hover:text-red-700 text-center py-2"
              >
                Clear Cart
              </button>
              <Link
                href="/checkout"
                className="w-full bg-pastel-blue hover:bg-pastel-mint text-gray-800 py-4 rounded-2xl text-lg font-medium transition-colors duration-200 shadow focus:outline-none focus:ring-2 focus:ring-pastel-blue mt-4"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
