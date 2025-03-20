import React,{useRef, useState,useEffect} from 'react';
import { useGSAP } from '@gsap/react';
import { animateWithGsap } from '../utils/animations';
import gsap from 'gsap';
import { Instagram, Twitter, Phone, MessageCircle } from "lucide-react";
import { chatImg } from '../utils';
import ContactForm from './ContactForm';
const Contactus = () => {
    
    const buttonsRef = useRef(null); 
    const [showForm, setShowForm] = useState(false); 

    useEffect(() => {
      if (showForm) {
          document.body.style.overflow = 'hidden';
      } else {
          document.body.style.overflow = 'auto';
      }
      return () => {
          document.body.style.overflow = 'auto';
      };
  }, [showForm]);
    
    const handleShowForm = (e) => {
      e.preventDefault();
      setShowForm(true);
  };

    useGSAP(() => {
        animateWithGsap('#h_fade', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.inOut'
        })
        animateWithGsap('#button', { opacity: 1,
            y: 0,
            duration: 1,
            delay:0.2,
            ease: 'power2.inOut'})
            animateWithGsap('#c1_fade', { opacity: 1,
                y: 0,
                duration: 1,
                delay:0.4,
                ease: 'power2.inOut'})
                animateWithGsap('#c2_fade', { opacity: 1,
                    y: 0,
                    duration: 1,
                    delay:0.4,
                    ease: 'power2.inOut'})
            
       
    }, []);
    return (
        <section id="support" className="w-screen overflow-hidden h-full common-padding bg-white ">
            {showForm && <ContactForm onClose={() => setShowForm(false)} />}
            <div className="screen-max-width">
              <div id="h_fade" className=''>
                <h1 id="h_fade" className="contact-heading mb-12 ">Get in touch with us</h1>
                <div
        id="button"
        className="flex flex-col items-center opacity-0 translate-y-20 mt-10"
      >
                <a    onClick={() => setShowForm(true)} className=" px-10 py-4 rounded-3xl bg-lime-500 my-5 hover:bg-transparent border border-transparent hover:border hover:text-green-500 hover:border-green-500 ">Get in touch</a>
                </div>
                </div>
                <div  className=" flex flex-col pt-10 mt-12 md:flex-row items-stretch justify-center gap-8 ">
                    <div id="c1_fade"  className="w-full md:w-1/2 bg-gray-50 rounded-3xl shadow-md shadow-gray-100/60  p-6 flex flex-col items-center justify-center text-center opacity-0 translate-y-20">

      <h1 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-10">
        Connect with us
      </h1>
      <div className="flex flex-col  space-y-6 text-slate-700 items-left">
        <div className="hover:scale-110">
      <a href="https://instagram.com/yourhandle" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3">
        <Instagram className="w-6 h-6 text-pink-500 " />
        <span className="text-lg font-medium  text-slate-800">@farminspices</span>
      </a></div>
      <div className="hover:scale-110">
      <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3">
        <Twitter className="w-6 h-6 text-teal-500 " />
        <span className="text-lg font-medium text-slate-800 ">@farminspices</span>
      </a></div>
      <div className="hover:scale-110">
      <a href="https://wa.me/+917794934548" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3">
        <MessageCircle className="w-6 h-6 text-green-500 " />
        <span className="text-lg font-medium text-slate-800 ">WhatsApp</span>
      </a></div>
      <div className="hover:scale-110">
      <a href="tel:+917794934548" className="flex items-center space-x-3">
        <Phone className="w-6 h-6 text-indigo-500 " />
        <span className="text-lg font-medium text-slate-800">Call Us at <span className='text-blue'>+91 7794934548</span> </span>
      </a></div>
    </div>
   
                        
                    </div>

                    <div id="c2_fade" className="w-full md:w-1/2 bg-gray-50 rounded-3xl shadow-md shadow-gray-100/60  p-6 flex flex-col items-center justify-center text-center opacity-0 translate-y-20">

     
      <div className="flex flex-col  space-y-6 text-slate-700 items-center">
       
     
      <div className="hover:scale-110">
      <a href="https://wa.me/yourwhatsapplink" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3">
        <img src={chatImg}className="w-40 h-40 text-slate-800 " />
      
      </a></div>
      <h1 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-10">
        Connect with an expert
      </h1>
     <button  onClick={handleShowForm} className='text-xl lg:text2xl font-small text-blue mb-10 hover:underline text- '>Talk to us about your requiremnt</button>
    </div>
   
                        
                    </div></div>
            </div>
            </section>
    );
};

export default Contactus;