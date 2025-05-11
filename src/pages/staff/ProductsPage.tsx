import React, { useState } from 'react';
import StaffLayout from '@/components/layout/StaffLayout';
import { useProductStore } from '@/store/product-store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import ProductForm from '@/components/staff/ProductForm';
import { Edit, Search, Trash } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ProductsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  
  const { products, deleteProduct } = useProductStore();
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const selectedProduct = selectedProductId 
    ? products.find(p => p.id === selectedProductId)
    : null;
  
  const handleEdit = (productId: string) => {
    setSelectedProductId(productId);
    setIsEditDialogOpen(true);
  };
  
  const handleDelete = (productId: string) => {
    setSelectedProductId(productId);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (selectedProductId) {
      deleteProduct(selectedProductId);
      toast({
        title: "Product deleted",
        description: "The product has been removed from your store."
      });
      setIsDeleteDialogOpen(false);
    }
  };
  
  return (
    <StaffLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-xl font-semibold">Products Management</h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                className="pl-9 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search 
                className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              />
            </div>
            
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-agro-primary hover:bg-agro-primary/90"
            >
              Add Product
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-xs text-gray-500">
                <tr className="border-b">
                  <th className="px-6 py-3 text-left font-medium">Product</th>
                  <th className="px-6 py-3 text-left font-medium">Category</th>
                  <th className="px-6 py-3 text-left font-medium">Price</th>
                  <th className="px-6 py-3 text-left font-medium">Stock</th>
                  <th className="px-6 py-3 text-left font-medium">Featured</th>
                  <th className="px-6 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 flex-shrink-0">
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900 max-w-xs truncate">
                              {product.name}
                            </div>
                            <div className="text-gray-500 text-xs max-w-xs truncate">
                              {product.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">{product.category}</td>
                      <td className="px-6 py-4">₹{product.price.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`${
                          product.stock <= 5 
                            ? 'text-red-600' 
                            : product.stock <= 10 
                            ? 'text-yellow-600' 
                            : 'text-gray-900'
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {product.featured ? (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            Featured
                          </span>
                        ) : (
                          <span className="text-gray-500 text-xs">No</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(product.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      {searchQuery 
                        ? `No products found matching "${searchQuery}"` 
                        : "No products added yet"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <ProductForm onComplete={() => setIsAddDialogOpen(false)} />
        </DialogContent>
      </Dialog>
      
      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <ProductForm 
              product={selectedProduct}
              onComplete={() => setIsEditDialogOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </StaffLayout>
  );
};

export default ProductsPage;
