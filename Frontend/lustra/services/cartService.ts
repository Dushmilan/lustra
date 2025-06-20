import api from './apiService';

export interface CartItem {
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

export interface Cart {
    id: string;
    items: CartItem[];
    total: number;
}

export const cartService = {
    // Get cart
    getCart: async (): Promise<Cart> => {
        const response = await api.get('/cart');
        return response.data;
    },

    // Add item to cart
    addItem: async (productId: string, quantity: number): Promise<Cart> => {
        const response = await api.post('/cart', { productId, quantity });
        return response.data;
    },

    // Update item quantity
    updateItem: async (productId: string, quantity: number): Promise<Cart> => {
        const response = await api.put('/cart', { productId, quantity });
        return response.data;
    },

    // Remove item from cart
    removeItem: async (productId: string): Promise<Cart> => {
        const response = await api.delete('/cart', { data: { productId } });
        return response.data;
    }
};
