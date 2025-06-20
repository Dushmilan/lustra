import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '../types/Product';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps extends Product {}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, imageUrl }) => {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    const handleAddToCart = async () => {
        try {
            await addToCart(id, quantity);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col items-center space-y-4
                        border border-gray-100
                        max-w-xs w-full
                        mx-auto">
            <img
                src={imageUrl}
                alt={name}
                className="w-full h-64 object-cover rounded-2xl mb-2 bg-gray-100"
                style={{ backgroundColor: '#f3f4f6' }}
            />
            <h2 className="text-lg font-semibold text-gray-800 tracking-tight text-center">{name}</h2>
            <p className="text-md text-gray-500 font-medium">${typeof price === 'number' ? price.toFixed(2) : 'N/A'}</p>
            
            <div className="flex flex-col w-full">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Quantity:</span>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                            className="p-1 text-gray-600 hover:text-gray-800"
                        >
                            -
                        </button>
                        <span className="px-2 py-1 bg-gray-100 rounded text-gray-700">
                            {quantity}
                        </span>
                        <button
                            onClick={() => setQuantity(prev => prev + 1)}
                            className="p-1 text-gray-600 hover:text-gray-800"
                        >
                            +
                        </button>
                    </div>
                </div>
                
                <button
                    onClick={handleAddToCart}
                    className="w-full text-center bg-blue-100 hover:bg-blue-200 text-gray-800 font-medium py-3 rounded-2xl transition-colors duration-200 shadow
                                focus:outline-none focus:ring-2 focus:ring-blue-300"
                    style={{ backgroundColor: '#e0e7ef' }}
                >
                    Add to Cart
                </button>

                <Link
                    href={`/products/${id}`}
                    className="mt-2 w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 rounded-2xl transition-colors duration-200 shadow
                                focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;