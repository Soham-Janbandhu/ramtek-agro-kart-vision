
import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { useOrderStore } from '@/store/order-store';
import { CheckCheck } from 'lucide-react';

const OrderSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id');
  const { getOrderById } = useOrderStore();
  
  const order = orderId ? getOrderById(orderId) : null;
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <MainLayout>
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCheck size={32} className="text-green-600" />
            </div>
            
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">Order Placed Successfully!</h1>
            
            {order ? (
              <>
                <p className="text-agro-light-text mb-6">
                  Thank you for your order. We've received your request and will process it shortly.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                    <div>
                      <p className="text-sm text-agro-light-text">Order ID</p>
                      <p className="font-medium">{orderId?.substring(0, 8)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-agro-light-text">Order Date</p>
                      <p className="font-medium">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-agro-light-text">Total Amount</p>
                      <p className="font-medium">₹{order.totalAmount.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-agro-light-text">Payment Method</p>
                      <p className="font-medium capitalize">
                        {order.paymentMethod.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="font-semibold mb-3 text-left">Order Items</h3>
                  <div className="max-h-60 overflow-y-auto">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center py-3 border-b border-gray-100 last:border-0 text-left">
                        <div className="w-12 h-12 mr-4 flex-shrink-0">
                          <img 
                            src={item.imageUrl} 
                            alt={item.name} 
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                          <div className="flex justify-between mt-1 text-sm text-agro-light-text">
                            <span>₹{item.price.toFixed(2)} x {item.quantity}</span>
                            <span className="font-medium text-agro-text">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <p className="text-agro-light-text mb-6">
                Thank you for your order. You will receive an email confirmation shortly.
              </p>
            )}
            
            <div className="space-y-3 sm:space-y-0 sm:space-x-3 flex flex-col sm:flex-row justify-center">
              <Link 
                to="/" 
                className="btn-primary"
              >
                Continue Shopping
              </Link>
              
              <Link 
                to="/contact" 
                className="border border-agro-primary text-agro-primary hover:bg-agro-primary hover:text-white px-4 py-2 rounded-md transition-colors duration-200"
              >
                Need Help?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderSuccessPage;
