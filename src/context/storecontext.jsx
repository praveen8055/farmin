import React, { createContext, useState, useEffect, useMemo } from 'react';
import { products } from '../constants'
import axios from 'axios';
import { toast } from 'react-hot-toast';
const StoreContext = createContext();

// Access the environment variable
const apiUrl = import.meta.env.VITE_API_URL;

const StoreProvider = ({ children }) => {
  // Use the variable from import.meta.env
  const url = apiUrl; 
  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);
  const currency = "₹";
  const deliveryCharge = 5;

  // Calculate store items count using useMemo
  const storeItemsCount = useMemo(() => 
    Object.values(cartItems).reduce((sum, quantity) => sum + quantity, 0),
    [cartItems]
  );

  const addToCart = async (productId) => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      throw new Error('Please login to add items');
    }
    try {
      const response = await axios.post(
        `${url}/api/cart/add`, // url is now using the env variable
        { itemId: productId },
        {
          headers: {
            'Authorization': `Bearer ${storedToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      if (response.data.success) {
        // Update local cart state
        await loadCartData();
        return response.data;
      } else {
        throw new Error(response.data.message || 'Failed to add item');
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      throw error;
    }
  };

  const removeFromCart = async (itemId) => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      throw new Error('Please login to remove items');
    }
  
    try {
      // First update local state optimistically
      setCartItems((prev) => {
        const updatedItems = { ...prev };
        if (updatedItems[itemId] <= 1) {
          delete updatedItems[itemId];
        } else {
          updatedItems[itemId] = updatedItems[itemId] - 1;
        }
        return updatedItems;
      });
  
      // Then make API call
      const response = await axios.post(
        `${url}/api/cart/remove`, // url is now using the env variable
        { itemId }, 
        { 
          headers: { 
            'Authorization': `Bearer ${storedToken}`,
            'Content-Type': 'application/json'
          } 
        }
      );
  
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to remove item');
      }
  
      // Refresh cart data to ensure sync with server
      await loadCartData();
    } catch (error) {
      console.error('Error removing from cart:', error);
      // Revert local state on error
      await loadCartData();
      throw error;
    }
  };

  const getTotalCartAmount = () => {
    try {
      return Object.entries(cartItems).reduce((total, [productId, quantity]) => {
        const product = products.find(p => p.id === parseInt(productId));
        if (!product) {
          console.warn(`Product not found for ID: ${productId}`);
          return total;
        }
        return total + (product.price * quantity);
      }, 0);
    } catch (error) {
      console.error('Error calculating total:', error);
      return 0;
    }
  };

  const fetchProductList = async () => {
    try {
      const response = await axios.get(`${url}/api/products/list`); // url is now using the env variable
      if (response.data.success) {
        // Transform products data to include full image URLs
        const productsWithUrls = response.data.data.map(product => ({
          ...product,
          image: `${url}/uploads/${product.image}` // url is now using the env variable
        }));
        setFoodList(productsWithUrls); // Keep using foodList state for compatibility
      } else {
        throw new Error(response.data.message || 'Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    }
  };


  const loadCartData = async () => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) return;
  
    try {
      const response = await axios.post(
        `${url}/api/cart/get`, // url is now using the env variable
        {},
        { 
          headers: { 
            'Authorization': `Bearer ${storedToken}`,
            'Content-Type': 'application/json'
          } 
        }
      );
      setCartItems(response.data.cartData || {});
    } catch (error) {
      console.error('Error loading cart:', error);
      if (error.response?.status === 401) {
        // Token might be invalid or expired
        localStorage.removeItem("token");
        setToken("");
      }
    }
  };

// Handling of contact me form

const submitContactForm = async (formData) => {
  try {
    console.log('Form data:', formData);
    const response = await axios.post(
      `${url}/api/contact/submit`, // url is now using the env variable
      formData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      return true;
    } else {
      throw new Error(response.data.message || 'Failed to submit form');
    }
  } catch (error) {
    console.error('Contact submission error:', error);
    toast.error(error.response?.data?.message || 'Failed to submit form');
    return false;
  }
};

const getCartItemsWithDetails = () => {
  try {
    return Object.entries(cartItems).map(([productId, quantity]) => {
      const product = food_list.find(p => p._id === productId);

      if (product) {
        return {
          productId,
          productName: product.name,
          quantity: parseInt(quantity) // Ensure quantity is an integer
        };
      }

      const localProduct = products.find(p => p.id === parseInt(productId));
      if (localProduct) {
        return {
          productId,
          productName: localProduct.name,
          quantity: parseInt(quantity)
        };
      }

      return {
        productId,
        productName: "Unknown Product",
        quantity: parseInt(quantity)
      };
    });
  } catch (error) {
    console.error('Error getting cart details:', error);
    return [];
  }
};

useEffect(() => {
  const initializeApp = async () => {
    await fetchProductList(); // Changed from fetchFoodList
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      await loadCartData();
    }
  };
  
  initializeApp();
}, []);

  const contextValue = {
    url, // Pass the url (which now comes from env) to the context
    food_list,
    cartItems,
    storeItemsCount,
    isVisible,
    setIsVisible,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
    loadCartData,
    setCartItems,
    currency,
    deliveryCharge,
    showLogin,
    setShowLogin,
    submitContactForm,
    fetchProductList,
    getCartItemsWithDetails // Ensure this is included
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };

