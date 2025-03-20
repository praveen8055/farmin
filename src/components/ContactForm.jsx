import React, { useRef,useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useContext } from 'react';
import { StoreContext } from '../context/storecontext';

const ContactForm = ({ onClose }) => {
  const formRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const { submitContactForm } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const success = await submitContactForm(formData);
      if (success) {
        onClose();
      }
    } finally {
      setIsLoading(false);
    }
  };
  useGSAP(() => {
    gsap.from(formRef.current, {
      duration: 0.3,
      opacity: 0,
      y: 50,
      ease: "power2.out"
    });
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 p-4 backdrop-blur-sm  flex items-center justify-center z-50">
      <div 
        ref={formRef}
        className="bg-white text-black rounded-2xl p-8 w-full max-w-md relative shadow-xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          ✕
        </button>
        
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Contact Us</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Name
            </label>
            <input
             type="text"
             name="name"
             value={formData.name}
             onChange={handleChange}
             className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-lime-500 focus:border-transparent"
             placeholder="John Doe"
             required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
             type="email"
             name="email"
             value={formData.email}
             onChange={handleChange}
             className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-lime-500 focus:border-transparent"
             placeholder="john@example.com"
             required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Phone
            </label>
            <input
             type="tel"
             name="phone"
             value={formData.phone}
             onChange={handleChange}
             className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-lime-500 focus:border-transparent"
             placeholder="+91 00000 00000"
             required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Message
            </label>
            <textarea
               name="message"
               value={formData.message}
               onChange={handleChange}
               className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-lime-500 focus:border-transparent h-32"
               placeholder="Your message..."
               required
            ></textarea>
          </div>
<div className="flex justify-center">
<button
  type="submit"
  disabled={isLoading}
  className="px-10 py-3 rounded-3xl text-white bg-lime-500 my-5 
           hover:bg-transparent border border-transparent 
           hover:border hover:text-lime-500 hover:border-lime-500 
           items-center disabled:opacity-50 disabled:cursor-not-allowed"
>
  {isLoading ? 'Sending...' : 'Send Message'}
</button>
</div>
          
        </form>
      </div>
    </div>
  );
};

export default ContactForm;