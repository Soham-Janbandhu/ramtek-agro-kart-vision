
import React from 'react';
import { Link } from 'react-router-dom';
import { Order } from '@/types';
import { useOrderStore } from '@/store/order-store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface OrderItemProps {
  order: Order;
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const { updateOrderStatus, updatePaymentStatus } = useOrderStore();
  
  const handleStatusChange = (value: string) => {
    updateOrderStatus(order.id, value as Order['status']);
  };
  
  const handlePaymentStatusChange = (value: string) => {
    updatePaymentStatus(order.id, value as Order['paymentStatus']);
  };
  
  const getOrderStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getPaymentStatusColor = (status: Order['paymentStatus']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="bg-white shadow-sm rounded-lg p-6 mb-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <span className="text-sm text-gray-500">Order ID:</span>
          <span className="ml-2 font-medium">{order.id.substring(0, 8)}</span>
        </div>
        
        <div className="mt-2 md:mt-0">
          <span className="text-sm text-gray-500">Date:</span>
          <span className="ml-2 font-medium">
            {format(new Date(order.orderDate), 'dd MMM yyyy, h:mm a')}
          </span>
        </div>
      </div>
      
      <div className="border-t border-b py-4 my-4">
        <div className="flex flex-col space-y-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center">
              <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden mr-4">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <Link 
                  to={`/product/${item.id}`} 
                  className="font-medium text-agro-text hover:text-agro-primary transition-colors"
                >
                  {item.name}
                </Link>
                <div className="flex justify-between mt-1">
                  <span className="text-sm text-gray-500">
                    ₹{item.price.toFixed(2)} x {item.quantity}
                  </span>
                  <span className="font-medium">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="font-medium mb-2">Customer Details</h4>
          <p className="text-sm">{order.customerName}</p>
          <p className="text-sm">{order.customerEmail}</p>
          <p className="text-sm">{order.customerPhone}</p>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Shipping Address</h4>
          <p className="text-sm">{order.shippingAddress.street}</p>
          <p className="text-sm">
            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
          </p>
          <p className="text-sm">{order.shippingAddress.country}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <div className="text-sm text-gray-500 mb-1">Order Status</div>
          <Select defaultValue={order.status} onValueChange={handleStatusChange}>
            <SelectTrigger className={`w-full ${getOrderStatusColor(order.status)}`}>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <div className="text-sm text-gray-500 mb-1">Payment Method</div>
          <div className="font-medium capitalize">{order.paymentMethod.replace('_', ' ')}</div>
        </div>
        
        <div>
          <div className="text-sm text-gray-500 mb-1">Payment Status</div>
          <Select defaultValue={order.paymentStatus} onValueChange={handlePaymentStatusChange}>
            <SelectTrigger className={`w-full ${getPaymentStatusColor(order.paymentStatus)}`}>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="mt-4 flex justify-between items-center border-t pt-4">
        <div>
          <span className="text-sm text-gray-500">Total Amount:</span>
          <span className="ml-2 font-medium text-lg">₹{order.totalAmount.toFixed(2)}</span>
        </div>
        
        <Link 
          to={`#`} 
          className="text-agro-primary hover:text-agro-secondary font-medium text-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default OrderItem;
