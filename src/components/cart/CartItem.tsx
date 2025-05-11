
import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { useCartStore } from '@/store/cart-store';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore();
  
  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };
  
  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };
  
  const handleRemove = () => {
    removeItem(item.id);
  };
  
  return (
    <div className="flex items-center py-5 border-b border-gray-200 last:border-0">
      {/* Product Image */}
      <div className="w-20 h-20 mr-4 flex-shrink-0">
        <Link to={`/product/${item.id}`}>
          <img 
            src={item.imageUrl} 
            alt={item.name} 
            className="w-full h-full object-cover rounded-md"
          />
        </Link>
      </div>
      
      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <Link 
          to={`/product/${item.id}`} 
          className="text-base font-medium text-agro-text hover:text-agro-primary transition-colors line-clamp-1"
        >
          {item.name}
        </Link>
        <p className="text-sm text-agro-light-text mt-1">{item.category}</p>
        <p className="text-sm text-agro-light-text mt-1 line-clamp-1">{item.description}</p>
      </div>
      
      {/* Quantity Controls */}
      <div className="flex items-center mx-4">
        <button
          onClick={handleDecrease}
          className="p-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
          aria-label="Decrease quantity"
          disabled={item.quantity <= 1}
        >
          <Minus size={16} className={item.quantity <= 1 ? 'text-gray-300' : 'text-agro-text'} />
        </button>
        
        <span className="mx-3 w-8 text-center">
          {item.quantity}
        </span>
        
        <button
          onClick={handleIncrease}
          className="p-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
          aria-label="Increase quantity"
        >
          <Plus size={16} className="text-agro-text" />
        </button>
      </div>
      
      {/* Price */}
      <div className="text-right min-w-[90px]">
        <p className="font-semibold text-agro-text">₹{(item.price * item.quantity).toFixed(2)}</p>
        <p className="text-xs text-agro-light-text mt-1">₹{item.price.toFixed(2)} each</p>
      </div>
      
      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className="ml-4 p-2 text-red-500 hover:text-red-700 transition-colors"
        aria-label="Remove item"
      >
        <Trash size={18} />
      </button>
    </div>
  );
};

export default CartItem;
