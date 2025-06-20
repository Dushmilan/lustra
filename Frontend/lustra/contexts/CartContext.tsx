import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/Product';
import { cartService } from '../services/cartService';

interface CartItem {
    id: string;
    product: {
        id: string;
        name: string;
        price: number;
        imageUrl: string;
        category: string;
    };
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    total: number;
    addToCart: (productId: string, quantity: number) => Promise<void>;
    updateQuantity: (productId: string, quantity: number) => Promise<void>;
    removeFromCart: (productId: string) => Promise<void>;
    fetchCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [total, setTotal] = useState(0);

    const addToCart = async (productId: string, quantity: number) => {
        try {
            const updatedCart = await cartService.addItem(productId, quantity);
            setCart(updatedCart.items);
            setTotal(updatedCart.total);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const updateQuantity = async (productId: string, quantity: number) => {
        try {
            const updatedCart = await cartService.updateItem(productId, quantity);
            setCart(updatedCart.items);
            setTotal(updatedCart.total);
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const removeFromCart = async (productId: string) => {
        try {
            const updatedCart = await cartService.removeItem(productId);
            setCart(updatedCart.items);
            setTotal(updatedCart.total);
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    const fetchCart = async () => {
        try {
            const cartData = await cartService.getCart();
            setCart(cartData.items);
            setTotal(cartData.total);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <CartContext.Provider value={{
            cart,
            total,
            addToCart,
            updateQuantity,
            removeFromCart,
            fetchCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
