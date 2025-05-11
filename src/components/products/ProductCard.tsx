
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Share, ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cart-store';
import { toast } from '@/components/ui/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };
  
  const handleToggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    
    toast({
      title: isLiked ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isLiked ? "removed from" : "added to"} your wishlist.`,
      duration: 3000,
    });
  };
  
  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Simple share implementation - in a real app, this would use Web Share API
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.origin + '/product/' + product.id,
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
    <Link to={`/product/${product.id}`} className="block">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 card-hover">
        {/* Product Image */}
        <div className="relative h-48 bg-gray-100">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          
          {/* Action Buttons */}
          <div className="absolute top-2 right-2 flex flex-col space-y-2">
            <button
              onClick={handleToggleLike}
              className={`p-2 rounded-full ${
                isLiked 
                  ? 'bg-pink-100 text-pink-500' 
                  : 'bg-white/70 text-gray-600 hover:bg-white'
              } transition-colors`}
              aria-label="Add to wishlist"
            >
              <Heart size={18} fill={isLiked ? "#EC4899" : "none"} />
            </button>
            
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white/70 text-gray-600 hover:bg-white transition-colors"
              aria-label="Share product"
            >
              <Share size={18} />
            </button>
          </div>
          
          {/* Featured Badge */}
          {product.featured && (
            <div className="absolute top-2 left-2 bg-agro-accent text-white text-xs font-semibold px-2 py-1 rounded">
              Featured
            </div>
          )}
          
          {/* Stock Badge */}
          {product.stock <= 5 && (
            <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              Only {product.stock} left
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          <div className="text-xs text-agro-light-text mb-1">
            {product.category}
          </div>
          
          <h3 className="font-semibold text-agro-text mb-1 line-clamp-1">
            {product.name}
          </h3>
          
          <p className="text-sm text-agro-light-text mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="font-semibold text-agro-text">
              ₹{product.price.toFixed(2)}
            </span>
            
            <button
              onClick={handleAddToCart}
              className="flex items-center text-agro-primary hover:text-agro-secondary transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingCart size={18} />
              <span className="ml-1 text-sm">Add</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
