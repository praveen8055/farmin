import React, { forwardRef,useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderImg,bagImg ,logoutImg} from '../utils';
const Dropdown = forwardRef(({ isDropdownOpen, setIsDropdownOpen, logout, accountImg },ref) => {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsDropdownOpen]);

  return (
    <div  className="relative" ref={dropdownRef}>
      <img 
        className="cursor-pointer rounded-full hover:scale-125 transition-all"  
        width={28} 
        height={28} 
        src={accountImg} 
        alt="account" 
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      />
      {isDropdownOpen && (
        <ul className="absolute right-0 mt-3 w-48 py-2 bg-[#1d1d1f] rounded-lg shadow-xl border border-gray-700">
          <li 
            onClick={() => navigate('/orders')}
            className="px-4 py-2 text-gray-200 hover:bg-gray-700 flex items-center gap-2 cursor-pointer"
          > 
            <img src={bagImg} alt="v" className="w-4 h-4" /> 
            <p>Orders</p>
          </li>
          <div className="border-t border-gray-700 my-1"></div>
          <li 
            onClick={logout}
            className="px-4 py-2 text-gray-200 hover:bg-gray-700 flex items-center gap-2 cursor-pointer"
          > 
            <img src={logoutImg} alt="x" className="w-4 h-4 " /> 
            <p>Logout</p>
          </li>
        </ul>
      )}
    </div>
  );
});

export default Dropdown;