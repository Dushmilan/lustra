import api from './apiService';

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials extends LoginCredentials {
    name: string;
}

export const authService = {
    login: async (credentials: LoginCredentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            const { token, user } = response.data;
            
            if (!token || !user) {
                throw new Error('Invalid login response');
            }
            
            // Store token and user in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            
            return { success: true, user };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'Invalid credentials' };
        }
    },
    
    register: async (credentials: RegisterCredentials) => {
        try {
            const response = await api.post('/auth/register', credentials);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            return response.data.user;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    },
    
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
    
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },
    
    getCurrentUser: (): User | null => {
        const userStr = localStorage.getItem('user');
        if (!userStr) return null;
        
        try {
            const parsedUser = JSON.parse(userStr);
            // Check if parsedUser matches our User interface
            if (typeof parsedUser.id !== 'string' ||
                typeof parsedUser.name !== 'string' ||
                typeof parsedUser.email !== 'string' ||
                typeof parsedUser.role !== 'string' ||
                !['user', 'admin'].includes(parsedUser.role)) {
                console.error('Invalid user data format');
                localStorage.removeItem('user');
                return null;
            }
            return parsedUser as User;
        } catch (error) {
            console.error('Error parsing user data:', error);
            localStorage.removeItem('user');
            return null;
        }
    }
};