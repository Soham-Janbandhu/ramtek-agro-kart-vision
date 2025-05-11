
import React from 'react';
import StaffLayout from '@/components/layout/StaffLayout';
import { useOrderStore } from '@/store/order-store';
import { useProductStore } from '@/store/product-store';
import { useAuthStore } from '@/store/auth-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Chart as ChartComponent,
  Line,
  Pie,
  defaults
} from 'react-chartjs-2';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const { getAllOrders } = useOrderStore();
  const { products } = useProductStore();
  
  const orders = getAllOrders();
  const pendingOrders = orders.filter(order => order.status === 'pending');
  const processingOrders = orders.filter(order => order.status === 'processing');
  
  const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  
  // Order status distribution data for pie chart
  const orderStatusData = {
    labels: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    datasets: [
      {
        data: [
          orders.filter(order => order.status === 'pending').length,
          orders.filter(order => order.status === 'processing').length,
          orders.filter(order => order.status === 'shipped').length,
          orders.filter(order => order.status === 'delivered').length,
          orders.filter(order => order.status === 'cancelled').length,
        ],
        backgroundColor: [
          '#FBBF24', // amber-400 for pending
          '#60A5FA', // blue-400 for processing
          '#A78BFA', // violet-400 for shipped
          '#34D399', // emerald-400 for delivered
          '#F87171', // red-400 for cancelled
        ],
        borderWidth: 0,
      },
    ],
  };
  
  // Recent orders for quick view
  const recentOrders = orders
    .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
    .slice(0, 5);
  
  return (
    <StaffLayout>
      <div className="space-y-6">
        {/* Welcome Message */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-2">
            Welcome back, {user?.name}
          </h2>
          <p className="text-gray-600">
            Here's what's happening with your store today
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
              <p className="text-xs text-gray-500 mt-1">
                All time orders
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Pending Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingOrders.length}</div>
              <p className="text-xs text-gray-500 mt-1">
                Need attention
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-gray-500 mt-1">
                In your inventory
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalSales.toFixed(2)}</div>
              <p className="text-xs text-gray-500 mt-1">
                All time sales
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts & Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Status Chart */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-64">
                <Pie
                  data={orderStatusData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          boxWidth: 12,
                          padding: 15,
                        }
                      }
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Orders */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Recent Orders</CardTitle>
              <Link to="/staff/orders" className="text-sm text-agro-primary hover:underline">
                View All
              </Link>
            </CardHeader>
            <CardContent className="pt-2">
              {recentOrders.length === 0 ? (
                <p className="text-center py-6 text-gray-500">No orders yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-xs text-gray-500 text-left">
                        <th className="pb-2 font-medium">Order ID</th>
                        <th className="pb-2 font-medium">Customer</th>
                        <th className="pb-2 font-medium">Status</th>
                        <th className="pb-2 font-medium text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b last:border-0">
                          <td className="py-3 text-sm font-medium">
                            {order.id.substring(0, 6)}...
                          </td>
                          <td className="py-3 text-sm">
                            {order.customerName}
                          </td>
                          <td className="py-3">
                            <span 
                              className={`text-xs px-2 py-1 rounded-full ${
                                order.status === 'pending' 
                                  ? 'bg-yellow-100 text-yellow-800' 
                                  : order.status === 'processing'
                                  ? 'bg-blue-100 text-blue-800'
                                  : order.status === 'shipped'
                                  ? 'bg-purple-100 text-purple-800'
                                  : order.status === 'delivered'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 text-sm text-right">
                            ₹{order.totalAmount.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              
              {recentOrders.length === 0 && (
                <div className="text-center mt-4">
                  <Link to="/staff/orders" className="text-sm text-agro-primary hover:underline">
                    Manage Orders
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Manage Orders</h3>
              <p className="text-gray-500 text-sm mb-4">
                View and update the status of customer orders
              </p>
              <Link 
                to="/staff/orders" 
                className="text-agro-primary hover:underline text-sm font-medium"
              >
                Go to Orders →
              </Link>
            </div>
          </Card>
          
          <Card>
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Manage Products</h3>
              <p className="text-gray-500 text-sm mb-4">
                Add, edit or remove products from your store
              </p>
              <Link 
                to="/staff/products" 
                className="text-agro-primary hover:underline text-sm font-medium"
              >
                Go to Products →
              </Link>
            </div>
          </Card>
          
          <Card>
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
              </div>
              <h3 className="font-semibold mb-2">View Store</h3>
              <p className="text-gray-500 text-sm mb-4">
                Check how your store looks to customers
              </p>
              <Link 
                to="/" 
                className="text-agro-primary hover:underline text-sm font-medium"
              >
                Go to Store →
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </StaffLayout>
  );
};

export default DashboardPage;
