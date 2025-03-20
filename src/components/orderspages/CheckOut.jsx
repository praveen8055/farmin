import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/storecontext';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const Checkout = () => {
  const location = useLocation();
  const { savedAddress, useExistingAddress } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [saveAddress, setSaveAddress] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });

  const { 
    getTotalCartAmount, 
    token, 
    cartItems, 
    url, 
    setCartItems,
    currency,
    deliveryCharge,
    setShowLogin 
  } = useContext(StoreContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error('Please login to checkout');
      setShowLogin(true);
      navigate('/cart');
      return;
    }

    if (Object.keys(cartItems).length === 0) {
      toast.error('Your cart is empty');
      navigate('/cart');
      return;
    }

    // Populate form with saved address if using existing
    if (useExistingAddress && savedAddress) {
      setFormData(savedAddress);
    }
  }, [token, cartItems, useExistingAddress, savedAddress]);

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRazorpayPayment = async (orderData) => {
    try {
      const response = await axios.post(
        `${url}/api/order/create-razorpay-order`,
        orderData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to create order');
      }

      const options = {
        key: response.data.key,
        amount: response.data.order.amount,
        currency: "INR",
        name: "Granny's Authentic Spices",
        description: "Purchase of Authentic Spices",
        order_id: response.data.order.id,
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone
        },
        handler: async function(razorpayResponse) {
          try {
            const verifyResponse = await axios.post(
              `${url}/api/order/verify-razorpay-payment`,
              {
                orderCreationId: response.data.order.id,
                razorpayPaymentId: razorpayResponse.razorpay_payment_id,
                razorpayOrderId: razorpayResponse.razorpay_order_id,
                razorpaySignature: razorpayResponse.razorpay_signature,
                orderId: response.data.orderId
              },
              {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                }
              }
            );

            if (verifyResponse.data.success) {
              toast.success('Payment successful!');
              setCartItems({});
              navigate('/orders');
            } else {
              throw new Error(verifyResponse.data.message);
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error('Payment verification failed');
          }
        },
        modal: {
          ondismiss: function() {
            toast.error('Payment cancelled');
          }
        },
        theme: {
          color: "#84cc16"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function(response) {
        console.error('Payment failed:', response.error);
        toast.error('Payment failed: ' + response.error.description);
      });

      rzp.open();
    } catch (error) {
      console.error('Razorpay error:', error);
      toast.error(error.response?.data?.message || 'Payment initialization failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (saveAddress) {
        await axios.post(`${url}/api/user/save-address`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }

      const orderItems = Object.entries(cartItems).map(([id, quantity]) => ({
        productId: id,
        quantity: quantity
      }));

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getTotalCartAmount() + deliveryCharge,
        paymentMethod
      };

      if (paymentMethod === 'cod') {
        const response = await axios.post(
          `${url}/api/order/placecod`,
          orderData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data.success) {
          toast.success('Order placed successfully');
          setCartItems({});
          navigate('/orders');
        }
      } else if (paymentMethod === 'razorpay') {
        await handleRazorpayPayment(orderData);
      }
    } catch (error) {
      console.error('Order error:', error);
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Section - Delivery Information */}
        <div className="bg-zinc-900 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-8">Delivery Information</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              required
              className="bg-slate-100 text-black px-4 py-3 rounded-lg focus:ring-2 focus:ring-lime-500 outline-none"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              required
              className="bg-slate-100 text-black px-4 py-3 rounded-lg focus:ring-2 focus:ring-lime-500 outline-none"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="w-full bg-slate-100 text-black px-4 py-3 rounded-lg mb-6 focus:ring-2 focus:ring-lime-500 outline-none"
            value={formData.email}
            onChange={handleInputChange}
          />

          <input
            type="text"
            name="street"
            placeholder="Street Address"
            required
            className="w-full bg-slate-100 text-black px-4 py-3 rounded-lg mb-6 focus:ring-2 focus:ring-lime-500 outline-none"
            value={formData.street}
            onChange={handleInputChange}
          />

          <div className="grid grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              name="city"
              placeholder="City"
              required
              className="bg-slate-100 text-black px-4 py-3 rounded-lg focus:ring-2 focus:ring-lime-500 outline-none"
              value={formData.city}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              required
              className="bg-slate-100 text-black px-4 py-3 rounded-lg focus:ring-2 focus:ring-lime-500 outline-none"
              value={formData.state}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              name="zipCode"
              placeholder="ZIP Code"
              required
              className="bg-slate-100 text-black px-4 py-3 rounded-lg focus:ring-2 focus:ring-lime-500 outline-none"
              value={formData.zipCode}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              required
              className="bg-slate-100 text-black px-4 py-3 rounded-lg focus:ring-2 focus:ring-lime-500 outline-none"
              value={formData.country}
              onChange={handleInputChange}
            />
          </div>

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            className="w-full bg-slate-100 text-black px-4 py-3 rounded-lg mb-6 focus:ring-2 focus:ring-lime-500 outline-none"
            value={formData.phone}
            onChange={handleInputChange}
          />

          {!useExistingAddress && (
            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                id="saveAddress"
                checked={saveAddress}
                onChange={(e) => setSaveAddress(e.checked)}
                className="rounded text-lime-500 focus:ring-lime-500"
              />
              <label htmlFor="saveAddress" className="text-white text-sm">
                Save this address for future orders
              </label>
            </div>
          )}
        </div>

        {/* Right Section - Order Summary and Payment */}
        <div className="space-y-8">
          <div className="bg-zinc-900 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-white">
                <span>Subtotal</span>
                <span>{currency}{getTotalCartAmount()}</span>
              </div>
              <div className="flex justify-between text-white">
                <span>Delivery Fee</span>
                <span>{currency}{deliveryCharge}</span>
              </div>
              <div className="border-t border-gray-700 pt-4">
                <div className="flex justify-between text-white font-bold">
                  <span>Total</span>
                  <span>{currency}{getTotalCartAmount() + deliveryCharge}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Payment Method</h2>
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg border ${
                  paymentMethod === 'cod'
                    ? 'border-lime-500 bg-lime-500/10'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 ${
                  paymentMethod === 'cod'
                    ? 'border-lime-500 bg-lime-500'
                    : 'border-gray-500'
                }`} />
                <span className="text-white">Cash on Delivery</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('razorpay')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg border ${
                  paymentMethod === 'razorpay'
                    ? 'border-lime-500 bg-lime-500/10'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 ${
                  paymentMethod === 'razorpay'
                    ? 'border-lime-500 bg-lime-500'
                    : 'border-gray-500'
                }`} />
                <span className="text-white">Pay with Razorpay</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-lime-500 text-black font-semibold py-4 px-8 rounded-full
                     hover:bg-transparent border hover:border-lime-500 hover:text-lime-500 
                     transition-colors duration-300 text-lg disabled:opacity-50 
                     disabled:cursor-not-allowed"
          >
            {isLoading 
              ? 'Processing...' 
              : paymentMethod === 'cod' 
                ? 'Place Order' 
                : 'Proceed to Payment'
            }
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
// import React, { useContext, useEffect, useState } from 'react';
// import { StoreContext } from '../../context/storecontext';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import axios from 'axios';

// const Checkout = () => {
//   const location = useLocation();
//   const { useExistingAddress } = location.state || {};
//   const [paymentMethod, setPaymentMethod] = useState('cod');
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     street: '',
//     city: '',
//     state: '',
//     zipCode: '',
//     country: '',
//     phone: ''
//   });

//   const { 
//     getTotalCartAmount, 
//     token, 
//     cartItems, 
//     url, 
//     setCartItems,
//     currency,
//     deliveryCharge 
//   } = useContext(StoreContext);

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (useExistingAddress) {
//       fetchSavedAddress();
//     }
//   }, [useExistingAddress]);

//   const fetchSavedAddress = async () => {
//     try {
//       const response = await axios.get(`${url}/api/user/saved-address`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       if (response.data.success) {
//         setFormData(response.data.address);
//       }
//     } catch (error) {
//       console.error('Error fetching address:', error);
//       toast.error('Failed to load saved address');
//     }
//   };
//   const [saveAddress, setSaveAddress] = useState(false);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       // If user wants to save address
//       if (saveAddress) {
//         await axios.post(`${url}/api/user/save-address`, formData, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//       }
  
//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

// //   RazorPay
// const handleRazorpayPayment = async (orderData) => {
//     try {
//       console.log('Initializing Razorpay payment:', orderData);
      
//       const response = await axios.post(
//         `${url}/api/order/create-razorpay-order`,
//         orderData,
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );
  
//       console.log('Server response:', response.data);
  
//       if (!response.data.success) {
//         throw new Error(response.data.message || 'Failed to create order');
//       }
  
//       const options = {
//         key: response.data.key,
//         amount: response.data.order.amount,
//         currency: "INR",
//         name: "Granny's Authentic Spices",
//         description: "Purchase of Authentic Spices",
//         order_id: response.data.order.id,
//         prefill: {
//           name: `${formData.firstName} ${formData.lastName}`,
//           email: formData.email,
//           contact: formData.phone
//         },
//         handler: async function(razorpayResponse) {
//           try {
//             console.log('Payment success:', razorpayResponse);
            
//             const verifyResponse = await axios.post(
//               `${url}/api/order/verify-razorpay-payment`,
//               {
//                 orderCreationId: response.data.order.id,
//                 razorpayPaymentId: razorpayResponse.razorpay_payment_id,
//                 razorpayOrderId: razorpayResponse.razorpay_order_id,
//                 razorpaySignature: razorpayResponse.razorpay_signature,
//                 orderId: response.data.orderId
//               },
//               {
//                 headers: {
//                   'Authorization': `Bearer ${token}`,
//                   'Content-Type': 'application/json'
//                 }
//               }
//             );
  
//             if (verifyResponse.data.success) {
//                 navigate('/orders');
//               setCartItems({});
//               toast.success('Payment successful!');
         
//             } else {
//               throw new Error(verifyResponse.data.message);
//             }
//           } catch (error) {
//             console.error('Payment verification error:', error);
//             toast.error('Payment verification failed');
//           }
//         },
//         modal: {
//           ondismiss: function() {
//             toast.error('Payment cancelled');
//           }
//         },
//         theme: {
//           color: "#84cc16"
//         }
//       };
  
//       const rzp = new window.Razorpay(options);
      
//       rzp.on('payment.failed', function(response) {
//         console.error('Payment failed:', response.error);
//         toast.error('Payment failed: ' + response.error.description);
//       });
  
//       rzp.open();
  
//     } catch (error) {
//       console.error('Razorpay error:', error);
//       toast.error(error.response?.data?.message || 'Payment initialization failed');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const orderItems = Object.entries(cartItems).map(([id, quantity]) => ({
//         productId: id,
//         quantity: quantity
//       }));
  
//       const orderData = {
//         address: formData,
//         items: orderItems,
//         amount: getTotalCartAmount() + deliveryCharge,
//         paymentMethod: paymentMethod  
//     };
  
//       console.log('Sending order data:', orderData);
  
//       if (paymentMethod === 'cod') {
//         const response = await axios.post(
//           `${url}/api/order/placecod`,
//           orderData,
//           {
//             headers: {
//               'Authorization': `Bearer ${token}`,
//               'Content-Type': 'application/json'
//             }
//           }
//         );
  
//         if (response.data.success) {
//           setCartItems({});
//           toast.success('Order placed successfully');
//           navigate('/orders');
//         }
//       } 
//       else if (paymentMethod === 'razorpay') {
//         await handleRazorpayPayment(orderData);
//       }
//     } catch (error) {
//       console.error('Order error:', error);
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };
//   useEffect(() => {
//     if (!token) {
//       toast.error('Please login to checkout');
//       navigate('/cart');
//     }
//     if (getTotalCartAmount() === 0) {
//         navigate('/orders');
//     }
//   }, [token, getTotalCartAmount]);

//   return (
//     <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
//       <form onSubmit={handleSubmit} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
//         {/* Left Section - Delivery Information */}
//         <div className="bg-zinc rounded-2xl p-8">
//           <h2 className="text-2xl font-bold text-white mb-8">Delivery Information</h2>
          
//           <div className="grid grid-cols-2 gap-4 mb-6">
//             <input
//               type="text"
//               name="firstName"
//               placeholder="First Name"
//               required
//               className="bg-slate-100 text-black px-4 py-3 rounded-lg focus:ring-2 focus:ring-lime-500 outline-none"
//               value={formData.firstName}
//               onChange={handleInputChange}
//             />
//             <input
//               type="text"
//               name="lastName"
//               placeholder="Last Name"
//               required
//               className="bg-slate-100 text-black px-4 py-3 rounded-lg focus:ring-2 focus:ring-lime-500 outline-none"
//               value={formData.lastName}
//               onChange={handleInputChange}
//             />
//           </div>

//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             required
//             className="w-full bg-slate-100 text-black px-4 py-3 rounded-lg mb-6 focus:ring-2 focus:ring-lime-500 outline-none"
//             value={formData.email}
//             onChange={handleInputChange}
//           />

//           <input
//             type="text"
//             name="street"
//             placeholder="Street Address"
//             required
//             className="w-full bg-slate-100 text-black px-4 py-3 rounded-lg mb-6 focus:ring-2 focus:ring-lime-500 outline-none"
//             value={formData.street}
//             onChange={handleInputChange}
//           />

//           <div className="grid grid-cols-2 gap-4 mb-6">
//             <input
//               type="text"
//               name="city"
//               placeholder="City"
//               required
//               className= "bg-slate-100 text-black px-4 py-3 rounded-lg focus:ring-2 focus:ring-lime-500 outline-none"
//               value={formData.city}
//               onChange={handleInputChange}
//             />
//             <input
//               type="text"
//               name="state"
//               placeholder="State"
//               required
//               className= "bg-slate-100 text-black px-4 py-3 rounded-lg focus:ring-2 focus:ring-lime-500 outline-none"
//               value={formData.state}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4 mb-6">
//             <input
//               type="text"
//               name="zipCode"
//               placeholder="ZIP Code"
//               required
//               className= "bg-slate-100 text-black px-4 py-3 rounded-lg focus:ring-2 focus:ring-lime-500 outline-none"
//               value={formData.zipCode}
//               onChange={handleInputChange}
//             />
//             <input
//               type="text"
//               name="country"
//               placeholder="Country"
//               required
//               className= "bg-slate-100 text-black px-4 py-3 rounded-lg focus:ring-2 focus:ring-lime-500 outline-none"
//               value={formData.country}
//               onChange={handleInputChange}
//             />
//           </div>

//           <input
//             type="tel"
//             name="phone"
//             placeholder="Phone Number"
//             required
//             className="w-full bg-slate-100 text-black px-4 py-3 rounded-lg mb-6 focus:ring-2 focus:ring-lime-500 outline-none"
//             value={formData.phone}
//             onChange={handleInputChange}
//           />
//         </div>

//         {/* Right Section - Order Summary */}
//         <div className="space-y-8">
//           <div className="bg-zinc rounded-2xl p-8">
//             <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
//             <div className="space-y-4">
//               <div className="flex justify-between text-white">
//                 <span>Subtotal</span>
//                 <span>{currency}{getTotalCartAmount()}</span>
//               </div>
//               <div className="flex justify-between text-white">
//                 <span>Delivery Fee</span>
//                 <span>{currency}{deliveryCharge}</span>
//               </div>
//               <div className="border-t border-gray-700 pt-4">
//                 <div className="flex justify-between text-white font-bold">
//                   <span>Total</span>
//                   <span>{currency}{getTotalCartAmount() + deliveryCharge}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-zinc rounded-2xl p-8">
//             <h2 className="text-2xl font-bold text-white mb-6">Payment Method</h2>
//             <div className="space-y-4">
//               <button
//                 type="button"
//                 onClick={() => setPaymentMethod('cod')}
//                 className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg border ${
//                   paymentMethod === 'cod'
//                     ? 'border-lime-500 bg-lime-500/10'
//                     : 'border-gray-700 hover:border-gray-600'
//                 }`}
//               >
//                 <div className={`w-4 h-4 rounded-full border-2 ${
//                   paymentMethod === 'cod'
//                     ? 'border-lime-500 bg-lime-500'
//                     : 'border-gray-500'
//                 }`} />
//                 <span className="text-white">Cash on Delivery</span>
//               </button>

//               <button
//                 type="button"
//                 onClick={() => setPaymentMethod('razorpay')}
//                 className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg border ${
//                   paymentMethod === 'razorpay'
//                     ? 'border-lime-500 bg-lime-500/10'
//                     : 'border-gray-700 hover:border-gray-600'
//                 }`}
//               >
//                 <div className={`w-4 h-4 rounded-full border-2 ${
//                   paymentMethod === 'razorpay'
//                     ? 'border-lime-500 bg-lime-500'
//                     : 'border-gray-500'
//                 }`} />
//                 <span className="text-white">Pay with Razorpay</span>
//               </button>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-lime-500 text-black font-semibold py-4 px-8 rounded-full
//                      hover:bg-transparent border hover:border-lime-500 hover:text-lime-500 transition-colors duration-300 text-lg"
//           >
//             {paymentMethod === 'cod' ? 'Place Order' : 'Proceed to Payment'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Checkout;