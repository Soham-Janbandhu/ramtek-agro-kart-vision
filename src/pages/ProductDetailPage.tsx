
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { useProductStore } from '@/store/product-store';
import { useCartStore } from '@/store/cart-store';
import { Heart, Share, ShoppingCart } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const products = useProductStore(state => state.products);
  const { addItem } = useCartStore();
  
  // Get product details - safely handle undefined id
  const productId = id || '';
  const product = products.find(product => product.id === productId);
  
  // Handle 404 if product not found
  if (!product) {
    return (
      <MainLayout>
        <div className="container mx-auto py-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-8">The product you are looking for does not exist.</p>
          <Link 
            to="/products" 
            className="btn-primary inline-block"
          >
            Back to Products
          </Link>
        </div>
      </MainLayout>
    );
  }
  
  // Get related products
  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);
  
  // Handle add to cart
  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };
  
  // Handle buy now
  const handleBuyNow = () => {
    addItem(product);
    navigate('/cart');
  };
  
  // Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      toast({
        title: "Share",
        description: "Sharing is not supported on this browser.",
        duration: 3000,
      });
    }
  };
  
  return (
    <MainLayout>
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto">
          {/* Breadcrumb */}
          <div className="text-sm mb-8">
            <Link to="/" className="text-agro-light-text hover:text-agro-primary">Home</Link>
            <span className="mx-2 text-agro-light-text">/</span>
            <Link to="/products" className="text-agro-light-text hover:text-agro-primary">Products</Link>
            <span className="mx-2 text-agro-light-text">/</span>
            <span className="text-agro-primary">{product.name}</span>
          </div>
          
          {/* Product Detail */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Product Image */}
              <div className="p-6 flex items-center justify-center bg-gray-100">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="max-w-full max-h-[400px] object-contain"
                />
              </div>
              
              {/* Product Info */}
              <div className="p-6 md:p-8">
                <h1 className="text-2xl md:text-3xl font-semibold text-agro-text mb-2">
                  {product.name}
                </h1>
                
                <div className="text-sm text-agro-accent mb-4">
                  {product.category}
                </div>
                
                <div className="text-2xl font-semibold text-agro-text mb-6">
                  ₹{product.price.toFixed(2)}
                </div>
                
                <p className="text-agro-light-text mb-6">
                  {product.description}
                </p>
                
                {/* Stock Status */}
                <div className="mb-6">
                  {product.stock > 0 ? (
                    <div className="text-green-600 flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span>In Stock ({product.stock} available)</span>
                    </div>
                  ) : (
                    <div className="text-red-600 flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <span>Out of Stock</span>
                    </div>
                  )}
                </div>
                
                {/* Actions */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-6">
                  <Button
                    onClick={handleAddToCart}
                    className="bg-agro-primary hover:bg-agro-primary/90 flex-1"
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart size={18} className="mr-2" />
                    Add to Cart
                  </Button>
                  
                  <Button
                    onClick={handleBuyNow}
                    className="bg-agro-accent hover:bg-agro-accent/90 flex-1"
                    disabled={product.stock === 0}
                  >
                    Buy Now
                  </Button>
                </div>
                
                {/* Additional Actions */}
                <div className="flex space-x-4 border-t pt-6">
                  <button
                    onClick={() => toast({ title: "Added to wishlist" })}
                    className="flex items-center text-agro-light-text hover:text-agro-primary transition-colors"
                  >
                    <Heart size={18} className="mr-2" />
                    Add to Wishlist
                  </button>
                  
                  <button
                    onClick={handleShare}
                    className="flex items-center text-agro-light-text hover:text-agro-primary transition-colors"
                  >
                    <Share size={18} className="mr-2" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-6">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetailPage;
