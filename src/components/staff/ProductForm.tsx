import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Product } from '@/types';
import { useProductStore } from '@/store/product-store';
import { toast } from '@/components/ui/use-toast';
import { Switch } from '@/components/ui/switch';

interface ProductFormProps {
  product?: Product;
  onComplete: () => void;
}

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  category: string;
  stock: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onComplete }) => {
  const [featured, setFeatured] = useState(product?.featured || false);
  const { register, handleSubmit, formState: { errors } } = useForm<ProductFormData>({
    defaultValues: product
      ? {
          name: product.name,
          description: product.description,
          price: product.price.toString(),
          category: product.category,
          stock: product.stock.toString(),
        }
      : undefined,
  });
  
  const { addProduct, updateProduct } = useProductStore();
  
  const onSubmit = (data: ProductFormData) => {
    const productData = {
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      category: data.category,
      imageUrl: product?.imageUrl || '/placeholder.svg',
      stock: parseInt(data.stock),
      featured,
    };
    
    if (product) {
      // Update existing product
      updateProduct({
        ...productData,
        id: product.id,
      });
      toast({
        title: 'Product updated',
        description: `${data.name} has been updated successfully.`,
      });
    } else {
      // Add new product
      addProduct(productData);
      toast({
        title: 'Product added',
        description: `${data.name} has been added successfully.`,
      });
    }
    
    onComplete();
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Product Name
        </label>
        <input
          id="name"
          type="text"
          {...register('name', { required: 'Product name is required' })}
          className={`w-full p-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Natural Sugarcane Jaggery"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          {...register('description', { required: 'Description is required' })}
          className={`w-full p-2 border rounded-md ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Enter product description..."
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price (₹)
          </label>
          <input
            id="price"
            type="text"
            {...register('price', { 
              required: 'Price is required',
              pattern: {
                value: /^[0-9]+(\.[0-9]{1,2})?$/,
                message: 'Please enter a valid price'
              }
            })}
            className={`w-full p-2 border rounded-md ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="199.00"
          />
          {errors.price && (
            <p className="mt-1 text-xs text-red-500">{errors.price.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
            Stock Quantity
          </label>
          <input
            id="stock"
            type="number"
            {...register('stock', { 
              required: 'Stock quantity is required',
              min: {
                value: 0,
                message: 'Stock cannot be negative'
              }
            })}
            className={`w-full p-2 border rounded-md ${errors.stock ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="50"
          />
          {errors.stock && (
            <p className="mt-1 text-xs text-red-500">{errors.stock.message}</p>
          )}
        </div>
      </div>
      
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          id="category"
          {...register('category', { required: 'Category is required' })}
          className={`w-full p-2 border rounded-md ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
        >
          <option value="">Select a category</option>
          <option value="Jaggery">Jaggery</option>
          <option value="Flavored Jaggery">Flavored Jaggery</option>
          <option value="Gift Sets">Gift Sets</option>
        </select>
        {errors.category && (
          <p className="mt-1 text-xs text-red-500">{errors.category.message}</p>
        )}
      </div>
      
      <div className="flex items-center space-x-3">
        <Switch 
          id="featured"
          checked={featured}
          onCheckedChange={setFeatured}
        />
        <label htmlFor="featured" className="text-sm font-medium text-gray-700">
          Featured Product
        </label>
      </div>
      
      <div className="flex justify-end space-x-3 pt-3">
        <button
          type="button"
          onClick={onComplete}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-agro-primary text-white rounded-md hover:bg-agro-primary/90 transition-colors"
        >
          {product ? 'Update Product' : 'Add Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
