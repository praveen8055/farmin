import React, { useEffect, useRef, useContext, useState } from "react";
import { farminImg, bagImg, searchImg, accountImg } from '../utils';
import { navLists } from '../constants';
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { StoreContext } from "../context/storecontext";
import { Link, useNavigate } from 'react-router-dom'
import './usefulstyles.css'
import Dropdown from "./Dropdown";




const Navbar = ({ setShowLogin }) => {
  const { 
    storeItemsCount, 
    isVisible, 
    token, 
    setToken,
    loadCartData 
  } = useContext(StoreContext);
  
  const navItemsRef = useRef([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // GSAP animation for nav items
  useEffect(() => {
    gsap.fromTo(navItemsRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: "bounce.in",
    }, {
      y: 0,
      opacity: 1,
      stagger: 0.2,
      ease: "bounce.inOut"
    });
  }, []);

  // Load cart data when token changes
  useEffect(() => {
    if (token) {
      loadCartData({ token });
    }
  }, [token]);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
 
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/');
  };

  return (
    <header className="w-full mb-5 py-4 sm:px-10 px-5 flex justify-between items-center">
      <nav className="flex w-full screen-max-width">
        <Link to="/" className="cursor-pointer">
          <img src={farminImg} alt="farmin" width={160} height={80} />
        </Link>

        {/* Navigation Items */}
        <div className="flex flex-1 justify-center pt-7 max-sm:hidden" id="nav-items">
  {navLists.map((nav, index) => (
    nav === 'Products' ? (
      <Link
        key={nav}
        to="/chilli-powder"
        ref={(el) => (navItemsRef.current[index] = el)}
        className="px-5 text-sm py-3 cursor-pointer text-slate-300 hover:text-white 
                 hover:scale-109 hover:font-semibold transition-all duration-300"
      >
        {nav}
      </Link>
    ) : (
      <a
        key={nav}
        href={`/#${nav.toLowerCase()}`}
        onClick={(e) => {
          e.preventDefault();
          handleScroll(nav.toLowerCase());
        }}
        ref={(el) => (navItemsRef.current[index] = el)}
        className="px-5 text-sm py-3 cursor-pointer text-slate-300 hover:text-white 
                 hover:scale-109 hover:font-semibold transition-all duration-300"
      >
        {nav}
      </a>
    )
  ))}
</div>

        {/* Right Side Icons */}
        <div className="flex items-center justify-center gap-7 max-sm:justify-end max-sm:flex-1">
          <a href="#highlights" className="cursor-pointer">
            <img 
              className="hover:scale-150 transition-all duration-300" 
              src={searchImg} 
              alt="search" 
              width={22} 
              height={22} 
            />
          </a>
          
          <Link to="/cart" className="cursor-pointer relative hover:scale-125">
            <img 
              className="hover:scale-125 transition-all duration-300" 
              src={bagImg} 
              alt="bag" 
              width={23} 
              height={23} 
            />
            {isVisible && storeItemsCount > 0 && (
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 
                           text-lime-500 font-medium">
                {storeItemsCount}
              </span>
            )}
          </Link>
          
          {!token ? (
            <button 
              className="nav-btn hover:scale-110 transition-all duration-300 flex items-center" 
              onClick={() => setShowLogin(true)}
            >
              sign in
            </button>
          ) : (
            <div className="relative z-50">
              <Dropdown 
                isDropdownOpen={isDropdownOpen}
                setIsDropdownOpen={setIsDropdownOpen}
                logout={logout}
                accountImg={accountImg}
                ref={dropdownRef}
              />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

