import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/storecontext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { products } from '../constants';

const Cart = () => {
  const { 
    url,
    cartItems, 
    removeFromCart,
    addToCart, 
    getTotalCartAmount, 
    currency,
    deliveryCharge,
    token,
    setShowLogin 
  } = useContext(StoreContext);
  
  const navigate = useNavigate();
  const [savedAddress, setSavedAddress] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) {
      fetchSavedAddress();
    }
  }, [token]);

  const fetchSavedAddress = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${url}/api/user/saved-address`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data.success) {
        setSavedAddress(response.data.address);
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      toast.error('Failed to load saved address');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckout = () => {
    if (!token) {
      toast.error('Please login to continue');
      setShowLogin(true);
      return;
    }
    
    if (savedAddress) {
      setShowAddressModal(true);
    } else {
      navigate('/checkout');
    }
  };

  const handleQuantityChange = async (productId, action) => {
    try {
      setIsLoading(true);
      if (action === 'increase') {
        await addToCart(productId);
        toast.success('Quantity increased');
      } else {
        await removeFromCart(productId);
        if (cartItems[productId] === 1) {
          toast.success('Item removed from cart');
        } else {
          toast.success('Quantity decreased');
        }
      }
    } catch (error) {
      toast.error('Failed to update quantity');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const AddressModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold text-black mb-4">Delivery Address</h3>
        <p className="text-gray-600 mb-4">
          We found a saved delivery address. Would you like to use it?
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-black">
            {savedAddress?.firstName} {savedAddress?.lastName}<br />
            {savedAddress?.street}<br />
            {savedAddress?.city}, {savedAddress?.state} {savedAddress?.zipCode}<br />
            {savedAddress?.phone}
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => {
              navigate('/checkout', { 
                state: { 
                  useExistingAddress: true,
                  savedAddress 
                } 
              });
            }}
            className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-gray-800 
                     transition-colors duration-300"
          >
            Use this address
          </button>
          <button
            onClick={() => {
              navigate('/checkout', { 
                state: { 
                  useExistingAddress: false 
                } 
              });
            }}
            className="flex-1 border border-black text-black py-2 rounded-lg 
                     hover:bg-gray-100 transition-colors duration-300"
          >
            Enter new address
          </button>
        </div>
      </div>
    </div>
  );

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h2 className="text-2xl font-semibold mb-4 text-black">Please login to view your cart</h2>
        <button
          onClick={() => {
            setShowLogin(true);
          }}
          className="bg-black text-white px-6 py-2 rounded-lg 
                   hover:bg-gray-800 transition-colors duration-300"
        >
          Login
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (Object.keys(cartItems).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-80 bg-black">
        <h2 className="text-2xl font-semibold mb-4 text-white">Add products and spice up </h2>
        <button
          onClick={() => navigate('/chilli-powder')}
          className="text-lime-500 hover:text-blue transition-colors"
        >
          Continue Shopping
        </button>
        <button
          onClick={() => navigate('/orders')}
          className=" btn text-black transition-colors"
        >
          Go to my Orders
        </button>
      </div>
    );
  }

  return (
    <div className="screen-max-width">
      <div className="bg-gray-50 rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-semibold mb-8 text-black">Your Bag</h1>
        
        <div className="space-y-8">
          {products.map((product) => (
            cartItems[product.id] > 0 && (
              <div key={product.id} 
                   className="flex items-center gap-6 border-b pb-6 group">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-32 h-32 object-contain rounded-lg bg-gray-50 p-4"
                />
                
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-black mb-2">
                    {product.name} ({product.quantity})
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => handleQuantityChange(product.id, 'decrease')}
                        className="text-black hover:text-red-500 transition-colors text-xl"
                        disabled={isLoading}
                      >
                        -
                      </button>
                      <span className="text-black w-8 text-center font-medium">
                        {cartItems[product.id]}
                      </span>
                      <button 
                        onClick={() => handleQuantityChange(product.id, 'increase')}
                        className="text-black hover:text-green-500 transition-colors text-xl"
                        disabled={isLoading}
                      >
                        +
                      </button>
                      <button 
                        onClick={() => handleQuantityChange(product.id, 'decrease')}
                        className="text-red-500 hover:text-red-600 transition-colors ml-4"
                        disabled={isLoading}
                      >
                        Remove
                      </button>
                    </div>
                    <p className="text-xl font-medium text-black sm:text-right pt-5">
                      {currency}{product.price * cartItems[product.id]}
                    </p>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="max-w-md ml-auto space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between text-lg">
                <span className="text-black">Subtotal</span>
                <span className="font-medium text-black">
                  {currency}{getTotalCartAmount()}
                </span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="text-black">Delivery</span>
                <span className="font-medium text-black">
                  {currency}{getTotalCartAmount() === 0 ? 0 : deliveryCharge}
                </span>
              </div>
            </div>

            <div className="flex justify-between text-xl font-semibold pt-4 border-t">
              <span className="text-black">Total</span>
              <span className="text-black">
                {currency}
                {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryCharge}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-black text-white py-4 rounded-full 
                       hover:bg-white hover:bg-transparent border border-transparent 
                       hover:border-black hover:text-black transition-colors 
                       text-lg font-medium disabled:opacity-50 
                       disabled:cursor-not-allowed"
              disabled={getTotalCartAmount() === 0 || isLoading}
            >
              {isLoading ? 'Processing...' : 'Proceed to Checkout'}
            </button>
          </div>
        </div>
      </div>
      {showAddressModal && <AddressModal />}
    </div>
  );
};

export default Cart;
