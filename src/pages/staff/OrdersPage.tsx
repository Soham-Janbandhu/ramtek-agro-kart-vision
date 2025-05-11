
import React, { useState } from 'react';
import StaffLayout from '@/components/layout/StaffLayout';
import { useOrderStore } from '@/store/order-store';
import OrderItem from '@/components/staff/OrderItem';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const OrdersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { getAllOrders } = useOrderStore();
  const orders = getAllOrders();
  
  const pendingOrders = orders.filter(order => order.status === 'pending');
  const processingOrders = orders.filter(order => order.status === 'processing');
  const shippedOrders = orders.filter(order => order.status === 'shipped');
  const deliveredOrders = orders.filter(order => order.status === 'delivered');
  const cancelledOrders = orders.filter(order => order.status === 'cancelled');
  
  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerPhone.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <StaffLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-xl font-semibold">Orders Management</h2>
          
          <div className="relative">
            <Input
              type="text"
              placeholder="Search orders..."
              className="pl-9 w-full md:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm">
          <Tabs defaultValue="all">
            <TabsList className="border-b w-full justify-start rounded-none p-0 h-auto">
              <TabsTrigger 
                value="all" 
                className="rounded-none px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-agro-primary data-[state=active]:shadow-none"
              >
                All ({orders.length})
              </TabsTrigger>
              <TabsTrigger 
                value="pending" 
                className="rounded-none px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-agro-primary data-[state=active]:shadow-none"
              >
                Pending ({pendingOrders.length})
              </TabsTrigger>
              <TabsTrigger 
                value="processing" 
                className="rounded-none px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-agro-primary data-[state=active]:shadow-none"
              >
                Processing ({processingOrders.length})
              </TabsTrigger>
              <TabsTrigger 
                value="shipped" 
                className="rounded-none px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-agro-primary data-[state=active]:shadow-none"
              >
                Shipped ({shippedOrders.length})
              </TabsTrigger>
              <TabsTrigger 
                value="delivered" 
                className="rounded-none px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-agro-primary data-[state=active]:shadow-none"
              >
                Delivered ({deliveredOrders.length})
              </TabsTrigger>
              <TabsTrigger 
                value="cancelled" 
                className="rounded-none px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-agro-primary data-[state=active]:shadow-none"
              >
                Cancelled ({cancelledOrders.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="p-6">
              {searchQuery ? (
                filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <OrderItem key={order.id} order={order} />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No orders found matching "{searchQuery}"</p>
                  </div>
                )
              ) : orders.length > 0 ? (
                orders.map((order) => (
                  <OrderItem key={order.id} order={order} />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No orders yet</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="pending" className="p-6">
              {pendingOrders.length > 0 ? (
                pendingOrders.map((order) => (
                  <OrderItem key={order.id} order={order} />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No pending orders</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="processing" className="p-6">
              {processingOrders.length > 0 ? (
                processingOrders.map((order) => (
                  <OrderItem key={order.id} order={order} />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No processing orders</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="shipped" className="p-6">
              {shippedOrders.length > 0 ? (
                shippedOrders.map((order) => (
                  <OrderItem key={order.id} order={order} />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No shipped orders</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="delivered" className="p-6">
              {deliveredOrders.length > 0 ? (
                deliveredOrders.map((order) => (
                  <OrderItem key={order.id} order={order} />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No delivered orders</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="cancelled" className="p-6">
              {cancelledOrders.length > 0 ? (
                cancelledOrders.map((order) => (
                  <OrderItem key={order.id} order={order} />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No cancelled orders</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </StaffLayout>
  );
};

export default OrdersPage;
