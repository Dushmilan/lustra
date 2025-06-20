import api from './apiService';

export interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
    description: string;
    stock: number;
    images: string[];
    createdAt: string;
}

export const productService = {
    // Get all products
    getAll: async (): Promise<Product[]> => {
        const response = await api.get('/products');
        return response.data;
    },

    // Get single product
    getById: async (id: string): Promise<Product> => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    // Create product (admin only)
    create: async (formData: FormData): Promise<Product> => {
        const response = await api.post('/products', formData);
        return response.data;
    },

    // Update product (admin only)
    update: async (id: string, productData: Partial<Omit<Product, 'id' | 'createdAt'>>): Promise<Product> => {
        const response = await api.put(`/products/${id}`, productData);
        return response.data;
    },

    // Delete product (admin only)
    delete: async (id: string): Promise<void> => {
        await api.delete(`/products/${id}`);
    }
};
