import React, { forwardRef,useContext, useRef, useState } from 'react';
import { StoreContext } from '../context/storecontext';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { toast } from 'react-hot-toast';

const ItemComponent = forwardRef(({ product },ref) => {
    const buttonRef = useRef(null);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [reviews] = useState(Math.floor(Math.random() * 100));
    const { addToCart, token,setShowLogin } = useContext(StoreContext);

    const truncateDescription = (text, length = 150) => {
        return text.length > length ? text.substring(0, length) + '...' : text;
    };

     // Format price for schema
     const formatPrice = (price) => {
        return typeof price === 'number' ? price.toString() : price;
    };

    const handleAddToCart = async () => {
        if (!token) {
            toast.error('Please login to add items');
            setShowLogin(true);
            return;
        }

        try {
            await addToCart(product.id);
            toast.success('Added to cart');
        } catch (error) {
            toast.error('Failed to add item');
            console.error('Error:', error);
        }
    };

    useGSAP(() => {
        gsap.to(buttonRef.current, {
            scale: 1.05,
            duration: 0.5,
            yoyo: true,
            repeat: -1,
            ease: "power1.inOut",
        });
    }, []);

    // Schema Markup for SEO (unchanged)
    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "image": product.image,
        "description": truncateDescription(product.description, 300),
        "brand": {
            "@type": "Brand",
            "name": "Granny's Authentic Spices"
        },
        "offers": {
            "@type": "Offer",
            "price":formatPrice(product.price),
            "priceCurrency": "INR"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": product.rating,
            "reviewCount": reviews
        }
    };

    return (
        <div ref={ref} className="card bg-black md:mr-5 rounded-xl shadow-sm shadow-neutral-300 p-4 relative sm:w-[70vw] w-[95vw] md:h-[60vh] sm:h-[80vh] h-[55vh] flex flex-col">
            {/* Schema markup */}
            <script type="application/ld+json">
                {JSON.stringify(productSchema)}
            </script>

            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Image Section */}
                <div className="relative h-40 mb-3 overflow-hidden rounded-lg">
                    <img 
                        src={product.image} 
                        alt={product.alt}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Product Info */}
                <div className="flex flex-col flex-1 overflow-hidden">
                    <h2 className="text-xl font-bold mb-1 text-slate-100">{product.name}</h2>
                    <p className="text-lime-400 text-sm mb-2">{product.quantity}</p>

                    {/* Rating Section */}
                    <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                className={`w-4 h-4 ${i < product.rating ? 'text-yellow-100' : 'text-yellow-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                        ))}
                        <span className="ml-2 text-sm text-gray-400">({reviews} reviews)</span>
                    </div>

                    {/* Description Section */}
                    <div className="flex-1 mb-3 overflow-y-auto">
                <p className="text-slate-300 text-sm leading-6">
                    {showFullDescription ? product.description : truncateDescription(product.description)}
                    {product.description && product.description.length > 150 && (
                        <button 
                            onClick={() => setShowFullDescription(!showFullDescription)}
                            className="text-lime-300 hover:text-lime-200 ml-1 font-medium transition-colors hover:underline focus:outline-none"
                        >
                            {showFullDescription ? 'Show less' : 'Show more'}
                        </button>
                    )}
                </p>
            </div>

                    {/* Price and Add to Cart */}
                    <div className="mt-auto">
                        <p className="text-lg font-bold text-slate-100 mb-3">₹{product.price}</p>
                        <div className="flex justify-center w-full">
                            <button 
                                ref={buttonRef}
                                className="btn text-white px-4 py-4 rounded-lg text-sm w-10/12 
                                         transition-colors duration-300 
                                         disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handleAddToCart}
                               
                            >
                                {token ? 'Add to Cart' : 'Login to Add'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ItemComponent;

// import React, { useContext,useRef } from 'react';
// import { StoreContext } from '../context/storecontext';
// import gsap from 'gsap';
// import { useGSAP } from '@gsap/react'
// import { animateWithGsap } from '../utils/animations';

// const ItemComponent = ({ product }) => {
//     const buttonRef = useRef(null); 
   
//     useGSAP(()=>{ 
        
//         gsap.to(buttonRef.current, {
//             // y: -5, // Move the button up by 20px
//             scale:1.05,
//             duration: 0.5, // Duration of the animation
//             yoyo: true, // Reverse the animation after completion
//             repeat: -1, // Repeat the animation infinitely
//             ease: "power1.inOut", // Smooth easing
//           });
//         animateWithGsap(
//             '#g_grow',
//             {scale:1.1,
//             ease:'power1.inOut',
//             stagger: 0.1,
//             duration: 1},{
//                 scrub: 0.5,

//             }
           
//           )
         
// },[ ])
//     const { storeItemsCount, isVisible, handleAddToStore } = useContext(StoreContext);
//   return (
//     <div className=" card bg-zinc md:mr-5 rounded-xl shadow-sm shadow-neutral-300 s p-4 flex-1   relative sm:w-[70vw] w-[88vw] md:h-[55vh] sm:h-[40vh] h-[35vh] ">
//        <div className='flex-col items-start'>
//       <img id="g_grow"src={product.image} alt={product.name} className="w-full h-full object-cover rounded-t-lg " />
//       <h2  className="text-xl font-bold mb-2 mt-4">{product.name}</h2>
//       <p  className="text-lime-600">{product.quantity}</p>
//       <p  className="text-gray-600">{product.discription}</p>
//       <p  className="text-lg font-bold mt-2">{product.price}</p>
//       </div>
//       <div className='flex justify-center mt-3 w-full '>
//       <button ref={buttonRef}   className=" btn  " onClick={handleAddToStore}>
//         Add to Cart
//       </button>
//       </div>
//     </div>
//   );
// };

// export default ItemComponent;