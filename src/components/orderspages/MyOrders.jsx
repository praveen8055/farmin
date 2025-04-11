import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/storecontext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const OrderStatus = React.memo(({ status, payment }) => {
  const getStatusColor = useCallback((status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'bg-green-500';
      case 'processing': return 'bg-yellow-500';
      case 'order placed': return 'bg-blue-500';
      case 'pending': return 'bg-orange-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  }, []);

  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${getStatusColor(status)}`} />
      <span className="font-medium text-white">
        {status} {payment ? '(Paid)' : '(Pending)'}
      </span>
    </div>
  );
});

OrderStatus.displayName = 'OrderStatus';

const OrderCard = React.memo(({ order, currency }) => {
  const formattedDate = useMemo(() => {
    return new Date(order.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, [order.createdAt]);

  const formatAddress = useCallback((address) => {
    if (!address) return '';
    return `${address.street}, ${address.city}, ${address.state} ${address.zipCode}`;
  }, []);

  return (
    <div className="bg-zinc-900 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl 
                  border border-zinc-800 hover:border-zinc-700">
      <div className="flex items-start gap-6 flex-wrap md:flex-nowrap">
        <div className="w-16 h-16 bg-zinc-800 rounded-xl flex-shrink-0 flex items-center justify-center">
          <svg className="w-8 h-8 text-lime-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>

        <div className="flex-grow space-y-4">
          <div className="text-white text-sm md:text-base space-y-2">
            {order.items?.map((item, idx) => (
              <div key={`${order._id}-item-${idx}`} 
                   className="flex justify-between items-center py-2 border-b border-zinc-700">
                <span className="flex-grow text-white font-medium">
                  {item.productName || `Product #${item.productId.slice(-6)}`}
                </span>
                <span className="text-lime-400 font-medium ml-4">× {item.quantity}</span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm items-center">
            <p className="font-medium text-lime-400">
              {currency}{order.amount?.toFixed(2)}
            </p>
            <span className="text-zinc-500">•</span>
            <p className="font-mono text-white">#{order._id.slice(-8)}</p>
            <span className="text-zinc-500">•</span>
            <OrderStatus status={order.status} payment={order.payment} />
          </div>

          {order.address && (
            <div className="text-sm">
              <p className="font-medium text-white mb-1">Delivery Address:</p>
              <p className="text-zinc-300">{formatAddress(order.address)}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-4 items-center text-sm">
            <span className="text-zinc-300">{formattedDate}</span>
            {order.paymentDetails && (
              <>
                <span className="text-zinc-500">•</span>
                <span className="text-zinc-300">
                  Payment ID: {order.paymentDetails.paymentId}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

OrderCard.displayName = 'OrderCard';

const LoadingSpinner = () => (
  <div className="min-h-screen bg-black flex justify-center items-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-500"></div>
  </div>
);

const MyOrders = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { url, token, currency, setShowLogin } = useContext(StoreContext);
  const navigate = useNavigate();

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!token) {
        setShowLogin(true);
        return;
      }

      const response = await axios.get(
        `${url}/api/order/userorders`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          timeout: 5000
        }
      );

      if (!response.data) {
        throw new Error('No data received from server');
      }

      if (response.data.success) {
        const sortedOrders = response.data.data.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setData(sortedOrders);
        setError(null);
      } else {
        throw new Error(response.data.message || 'Failed to fetch orders');
      }
    } catch (error) {
      console.error('Order fetch error:', error);
      
      if (error.response) {
        switch (error.response.status) {
          case 401:
            toast.error('Please login to continue');
            setShowLogin(true);
            break;
          case 403:
            toast.error('Access denied');
            break;
          case 404:
            toast.error('Order service not available');
            break;
          default:
            toast.error('Failed to load orders');
        }
        setError(error.response.data?.message || 'Server error');
      } else if (error.request) {
        toast.error('Unable to reach server');
        setError('Network error - Please check your connection');
      } else {
        toast.error(error.message || 'Failed to fetch orders');
        setError('Failed to load orders');
      }
    } finally {
      setIsLoading(false);
    }
  }, [url, token, setShowLogin]);

  useEffect(() => {
    let mounted = true;

    if (!token) {
      toast.error('Please login to view orders');
      setShowLogin(true);
      return;
    }

    const loadOrders = async () => {
      if (mounted) {
        await fetchOrders();
      }
    };

    loadOrders();

    return () => {
      mounted = false;
    };
  }, [token, fetchOrders, setShowLogin]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-medium text-white">My Orders</h2>
          <button
            onClick={fetchOrders}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg
                     transition-colors duration-300 text-sm flex items-center gap-2 text-white"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>

        {error ? (
          <div className="text-center py-16">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={fetchOrders}
              className="px-6 py-2 bg-lime-500 text-black rounded-full 
                       hover:bg-lime-600 transition-all duration-300 font-medium"
            >
              Try Again
            </button>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-300 text-lg">No orders found</p>
            <button 
              onClick={() => navigate('/')}
              className="mt-6 px-8 py-3 bg-lime-500 text-black rounded-full 
                       hover:bg-lime-600 transition-all duration-300 font-medium"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {data.map((order) => (
              <OrderCard 
                key={order._id} 
                order={order} 
                currency={currency}
                className="text-white"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(MyOrders);