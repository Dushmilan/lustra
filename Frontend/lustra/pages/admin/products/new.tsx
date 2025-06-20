import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { productService } from '../../../services/productService';

const CreateProduct: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    imageFile: null as File | null,
    previewUrl: '' as string,
  });
  const [error, setError] = useState<string | null>(null);

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Product name is required');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return false;
    }
    if (!formData.price.trim()) {
      setError('Price is required');
      return false;
    }
    if (!formData.category.trim()) {
      setError('Category is required');
      return false;
    }
    if (!formData.stock.trim()) {
      setError('Stock quantity is required');
      return false;
    }
    if (isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
      setError('Stock must be a positive number');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!formData.imageFile) {
      setError('Please select an image');
      return;
    }

    try {
      // Validate form before submission
      if (!validateForm()) {
        return;
      }

      // Create FormData for multipart/form-data
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('stock', formData.stock);
      formDataToSend.append('image', formData.imageFile);

      try {
        await productService.create(formDataToSend);
        router.push('/admin/products');
      } catch (error: any) {
        setError(error.response?.data?.msg || 'Failed to create product');
      }
    } catch (err) {
      setError('An error occurred while creating the product');
      console.error('Error:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        imageFile: file,
        previewUrl: URL.createObjectURL(file),
      }));
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      imageFile: null,
      previewUrl: '',
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                <span className="sr-only">Back to</span> Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Create New Product</h2>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Image</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                {formData.previewUrl ? (
                  <div className="flex flex-col items-center">
                    <img 
                      src={formData.previewUrl} 
                      alt="Preview" 
                      className="w-48 h-48 object-cover rounded-lg mb-2"
                    />
                    <button 
                      type="button" 
                      onClick={removeImage}
                      className="text-red-500 hover:text-red-600 transition-colors duration-200"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <div className="mt-1 text-sm text-gray-600">
                      <label htmlFor="image-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>Upload a file</span>
                        <input 
                          id="image-upload" 
                          name="imageFile" 
                          type="file" 
                          accept="image/*"
                          onChange={handleImageChange}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="price" className="sr-only">Price</label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pastel-blue focus:border-pastel-blue focus:z-10 sm:text-sm"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="category" className="sr-only">Category</label>
                <input
                  id="category"
                  name="category"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pastel-blue focus:border-pastel-blue focus:z-10 sm:text-sm"
                  placeholder="Category"
                  value={formData.category}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="stock" className="sr-only">Stock Quantity</label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pastel-blue focus:border-pastel-blue focus:z-10 sm:text-sm"
                  placeholder="Stock Quantity"
                  value={formData.stock}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pastel-blue hover:bg-pastel-mint focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pastel-blue"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateProduct;
