import axios, { AxiosError } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 10000, // 10 second timeout
    validateStatus: (status) => {
        // Consider any status between 200-299 as success
        return status >= 200 && status < 300;
    }
});

// Add request interceptor for development mode
if (process.env.NODE_ENV === 'development') {
  api.interceptors.request.use(
    (config) => {
      console.log('API Request:', {
        url: config.url,
        method: config.method,
        data: config.data
      });
      return config;
    },
    (error) => {
      console.error('API Request Error:', error);
      return Promise.reject(error);
    }
  );
}

// Add response interceptor for development mode
if (process.env.NODE_ENV === 'development') {
  api.interceptors.response.use(
    (response) => {
      console.log('API Response:', {
        url: response.config.url,
        status: response.status,
        data: response.data
      });
      return response;
    },
    (error) => {
      console.error('API Error:', {
        url: error.config?.url,
        status: error.response?.status,
        message: error.message,
        data: error.response?.data
      });
      return Promise.reject(error);
    }
  );
}

// Add request timeout
api.interceptors.request.use(
    (config) => {
        config.timeout = 10000; // Set timeout
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Add enhanced response interceptor
api.interceptors.response.use(
    (response) => {
        if (!response.data) {
            throw new Error('No data received from server');
        }
        return response;
    },
    (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response error:', error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Request error:', error.message);
        }
        
        // Handle errors
        const handleError = (error: unknown) => {
          // Type guard for AxiosError
          const isAxiosError = (err: unknown): err is AxiosError => {
            return err instanceof Error && (err as AxiosError).isAxiosError === true;
          };

          // Log error details
          console.error('API Error Details:', {
            url: isAxiosError(error) ? error.config?.url : undefined,
            status: isAxiosError(error) ? error.response?.status : undefined,
            message: isAxiosError(error) ? error.message : String(error),
            data: isAxiosError(error) ? error.response?.data : undefined
          });

          // Define error response types
          interface ErrorResponse {
            message?: string;
            error?: string;
          }

          // Handle response errors
          if (isAxiosError(error) && error.response) {
            const status = error.response.status;
            const data = error.response.data as ErrorResponse || {};
            
            // Helper function to safely extract error message
            const getErrorMessage = (data: ErrorResponse): string => {
              if (data.message) return data.message;
              if (data.error) return data.error;
              return 'An error occurred. Please try again later.';
            };

            if (status === 401) {
                // Handle unauthorized access
                const errorPromise = Promise.reject(new Error(getErrorMessage(data)));
                
                // Handle the async redirect after the error is rejected
                errorPromise.catch(() => {
                  if (typeof window !== 'undefined') {
                    try {
                      localStorage.removeItem('token');
                      localStorage.removeItem('user');
                      // Use setTimeout to avoid sync redirect issues
                      setTimeout(() => {
                        window.location.href = '/auth/login';
                      }, 0);
                    } catch (e: unknown) {
                      console.error('Error handling unauthorized access:', 
                        e instanceof Error ? e.message : String(e));
                    }
                  }
                });

                return errorPromise;
            }

            return Promise.reject(new Error(getErrorMessage(data)));
          }

          // Handle network errors
          const errorMessage = isAxiosError(error)
            ? error.message || 'Network error occurred'
            : 'An unexpected error occurred';
          
          // Log network errors for debugging
          console.error('Network Error:', {
            message: isAxiosError(error) ? error.message : String(error),
            config: isAxiosError(error) ? error.config : undefined,
            response: isAxiosError(error) ? error.response : undefined
          });

          return Promise.reject(new Error(errorMessage));
        };

        // Execute error handling
        return handleError(error);
    }
);

// Add a request interceptor to add token to requests
api.interceptors.request.use(
    (config) => {
        // Only add token for non-public routes
        if (!config.url?.includes('/products')) {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers['x-auth-token'] = token;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            localStorage.removeItem('token');
            window.location.href = '/auth/login';
        }
        return Promise.reject(error);
    }
);

export default api;
