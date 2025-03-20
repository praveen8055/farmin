import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useRef,Suspense ,useContext } from 'react';
import * as Sentry from '@sentry/react';
import CartIcon from './components/CartIcon';
import React,{useState} from 'react';
import LoginForm from './components/LoginForm';
import { Toaster } from 'react-hot-toast';
import { StoreContext } from './context/storecontext';
const Home=React.lazy(()=>import('./components/HomePage'))
const Cart=React.lazy(()=>import('./components/Cart'))
const MyOrders=React.lazy(()=>import('./components/orderspages/MyOrders'))
const Products=React.lazy(()=>import('./components/Products'))
const Checkout=React.lazy(()=>import('./components/orderspages/CheckOut'))
const App = () => {
  const sectionsRef = useRef([]);
  const { showLogin,setShowLogin } = useContext(StoreContext);
  return (<>

    <main className="bg-black">
      
     
      <Suspense fallback={<div>Loading...</div>}>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            style: {
              background: '#84cc16',
              color: '#000',
            },
          },
          error: {
            style: {
              background: '#ef4444',
              color: '#fff',
            },
          },
        }}
      />
      {showLogin && <LoginForm setShowLogin={setShowLogin} />}
      <div>
      <Navbar setShowLogin={setShowLogin} />
      <CartIcon/>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart/>}/>   
      <Route path="/orders" element={<MyOrders/>}/> 
      <Route path="/chilli-powder" element={<Products  ref={(el) => (sectionsRef.current[0] = el)}/>} />
      <Route path="/checkout" element={<Checkout/>} /> 
       

      </Routes>
      <Footer />
      </div>
      </Suspense>
     
    </main>
    </>
  )
}

export default Sentry.withProfiler(App);
