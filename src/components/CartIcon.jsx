import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../context/storecontext';
import {  bagImg,whatsappImg  } from '../utils';
const CartIcon = () => {
  const { storeItemsCount, isVisible } = useContext(StoreContext);

  return (
    <div className="fixed bottom-4 right-4 w-16 h-100 shadow-sm shadow-white rounded-3xl z-50">
    <div className="flex flex-col items-center justify-center">
      <div className='mb-3 mt-3 rounded-lg '>
        <a href="https://wa.me/+15084109422" className="cursor-pointer rounded-md relative mt-3 mb-3">
          <img src={whatsappImg} alt="whatsapp" width={40} height={40} className=" bg-transparent rounded-md transition-all hover:scale-125  duration-300" />
        </a>
      </div>
      {isVisible && (
        <Link to='/cart' >
        <div className="flex items-center bg-zinc-100 rounded-full p-2 shadow-md mb-4 hover:scale-125">
         <img src={bagImg} className="w-8 h-8 text-zinc-500 -mt-1" />
          <span className="absolute top-60% left-1/2 -translate-x-1/2 text-zinc-500 text-lime-500">{storeItemsCount}</span>
        </div></Link>
      )}
     
    </div>
  </div>
 
  );
};

export default CartIcon;