import React from 'react';
import Hero from './Hero';
import Highlights from './Highlights';
import { useEffect } from 'react';
import Features from './Features';
import Products from './Products';
import { useRef } from 'react';
// import * as Sentry from '@sentry/react';
import About from './About';
import Contactus from './Contactus';
import { useLocation,useNavigate } from 'react-router-dom';
import { scrollToSection } from '../utils/helpers';

const HomePage = () => {
    const sectionsRef = useRef([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Check if we have a section to scroll to
        if (location.state?.scrollTo) {
          scrollToSection(location.state.scrollTo);
          // Clear the state after scrolling
          window.history.replaceState({}, document.title);
        }
      }, [location]);
    return (
        <>
     
       <Hero />
      <Highlights />
      <Products  ref={(el) => (sectionsRef.current[0] = el)}/>
      {/* <CartIcon/> */}
      {/* <Model /> */}
      <Features />
      {/* <HowItWorks /> */}
      <div id="about"><About/></div>
      <div id="support"> <Contactus/></div>
     
     
        </>
    );
};

export default HomePage;