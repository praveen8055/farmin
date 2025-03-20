import React, { forwardRef, useRef, useContext } from 'react';
import { useGSAP } from '@gsap/react';
import { animateWithGsap } from '../utils/animations';
import gsap from 'gsap';
import { products } from '../constants';
import ItemComponent from './items';
import { StoreContext } from '../context/storecontext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Products = forwardRef((props, ref) => {
  const cardsRef = useRef([]);
  const navigate = useNavigate();
  const { addToCart, token,setShowLogin } = useContext(StoreContext);

  const handleAddToCart = async (productId) => {
    if (!token) {
      toast.error('Please login to add items');
      setShowLogin(true);
      return;
    }
  
    try {
      // Add console.log to debug
      console.log('Adding to cart:', productId);
      const response = await addToCart(productId);
      console.log('Cart response:', response);
      
      if (response.success) {
        toast.success('Added to cart');
      } else {
        throw new Error(response.message || 'Failed to add item');
      }
    } catch (error) {
      console.error('Cart error:', error);
      toast.error(error.message || 'Failed to add item');
    }
  };

  useGSAP(() => {
    // Card hover animations
    const cards = cardsRef.current;
    
    const hoverAnimation = (card, scale) => {
      gsap.to(card, {
        scale,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    cards.forEach((card, index) => {
      cardsRef.current[index] = card;
      
      card.addEventListener('mouseenter', () => hoverAnimation(card, 1.05));
      card.addEventListener('mouseleave', () => hoverAnimation(card, 1));
    });

    // Section animations
    const timeline = gsap.timeline();
    
    timeline
      .fromTo('#g_fadeIn', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.inOut' }
      )
      .fromTo('#products-animation',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.inOut' },
        '-=0.5'
      );

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mouseenter', () => {});
        card.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  return (
    <section 
      id="products" 
      ref={ref}
      className="w-screen overflow-hidden h-full common-padding bg-black"
    >
      <div className='screen-max-width'>
        <div className="mb-12 w-full md:flex items-end justify-between">
          <h1 id="g_fadeIn" className="products-heading">Our products</h1>
        </div>
        
        <div id="products-animation" className="flex flex-col sm:flex-row justify-center items-center gap-4 p-4">
          {products.map((product, index) => (
            <ItemComponent 
              key={product.id}
              ref={el => cardsRef.current[index] = el}
              product={product}
              onAddToCart={() => handleAddToCart(product.id)}
              className="card"
            />
          ))}
        </div>
      </div>
    </section>
  );
});

Products.displayName = 'Products';

export default Products;