import React from 'react';
import { useGSAP } from '@gsap/react';
import { animateWithGsap } from '../utils/animations';
import { aboutImg } from '../utils';

const About = () => {
    useGSAP(() => {
        animateWithGsap('#g_fade', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.inOut'
        });
        animateWithGsap('.g_text', {
            y: 0,
            opacity: 1,
            ease: 'power2.inOut',
            duration: 1
        });
        animateWithGsap('#c1-fade', { opacity: 1,
          y: 0,
          duration: 1,
          delay:0.4,
          ease: 'power2.inOut'})
          animateWithGsap('#c2-fade', { opacity: 1,
              y: 0,
              duration: 1,
              delay:0.5,
              ease: 'power2.inOut'})
              animateWithGsap('#c3-fade', { opacity: 1,
                y: 0,
                duration: 1,
                
                ease: 'power2.inout'})
                animateWithGsap('#c4-fade', { opacity: 1,
                  y: 0,
                  duration: 1,
                  
                  ease: 'power2.inOut'})
                  animateWithGsap('#c5-fade', { opacity: 1,
                    y: 0,
                    duration: 1,
                    
                    ease: 'power2.inOut'})
                    animateWithGsap('#c6-fade', { opacity: 1,
                      y: 0,
                      duration: 1,
                      
                      ease: 'power2.inOut'})
    }, []);

    return (<>
        <section id="about" className="w-screen overflow-hidden h-full common-padding bg-black">
            <div className="screen-max-width">
                <h1 id="g_fade" className="products-heading mb-12">About us</h1>
                
                {/* First Section */}
                <div className="flex flex-col md:mt-10 md:flex-row items-stretch justify-center gap-8">
                    <div  id="c1-fade" className="w-full md:w-1/2 bg-white rounded-3xl shadow-lg shadow-gray-100/50 p-6 flex flex-col opacity-0 translate-y-20">
                        <h1 className="text-xl lg:text-2xl pt-3 font-bold text-slate-800 text-left mb-4">
                            Our women-crafted spices preserve our culinary legacy
                        </h1>
                        <h2 className="text-lg md:text-xl text-slate-600 font-medium mb-4 text-left">
        While factories hurry, we:
    </h2>
                        <ul className="list-none p-4 space-y-3 text-slate-600">
                            {['Hand-select chillies with our grandmaa’s wisdom',
                                'Sun-dry chillies on clay rooftops for 7 days',
                                'Hand-remove stems and stones (no machines!)',
                                'Grandmothers exact stone-grinding techniques',
                                'No Preservatives or Added Colors',
                               '100% hand-processed by women self-help groups'
                            ].map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-emerald-600 mr-2">▹</span>
                                    <span className="text-base md:text-lg font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                       
                    </div>

                    <div  id="c2-fade" className="w-full md:w-1/2 relative opacity-0 translate-y-20">
                        <img
                            src={aboutImg}
                            alt="rural-women-sun-drying-chillies-traditional-method"
                            className="w-full h-full object-cover rounded-3xl shadow-lg shadow-gray-100/50"
                        />
                    </div>
                </div>
                <div className="mt-16 screen-max-width">
                <div id="c3-fade" className="p-4 mt-2 text-slate-600 md:text-lg font-medium bg-emerald-50 rounded-xl shadow-lg shadow-gray-100/50 opacity-0 translate-y-20">
                <p className="">
                            Every purchase supports our women's collective – empowering grandmothers, mothers, 
                            and daughters to preserve their culinary heritage.
                        </p></div>
                </div>

                {/* Second Section */}
                
                </div>
       
        </section>
        <section className="w-screen overflow-hidden h-full common-padding bg-zinc">
        <div className=" screen-max-width">
    <div className="w-full  p-4 font-sans">
    <h1 id="c3-fade" className="text-3xl lg:text-5xl font-bold text-gray text-center mb-8 opacity-0 translate-y-20 ">
    Preserving Heritage: Our traditional Spice Crafting Process
</h1>
<div  id="c4-fade" className="text-slate-200 text-lg leading-relaxed text-center max-w-4xl mx-auto space-y-10 opacity-0 translate-y-20 ">
    <p>
        For over 75 years, our family has perfected the <strong>traditional indian spice-making techniques</strong> passed down through generations. 
        Every batch undergoes our signature <em>Process</em> ensuring authentic flavor and maximum potency:
    </p>

    <div id="c5-fade"className="grid md:grid-cols-3 gap-6  text-left opacity-0 translate-y-20">
        {/* <!-- Process Step 1 --> */}
        <div className="bg-white bg-opacity-10 p-4 rounded-lg">
            <h2 className="text-lime-500 font-semibold mb-2">1. Ethical Farming</h2>
            <ul className="list-disc pl-5 space-y-2">
                <li>Enough days for organic growth cycle</li>
                <li>Chemical-free Guntur  chili cultivation</li>
                <li>Natural pest control using neem extracts</li>
            </ul>
        </div>

        {/* <!-- Process Step 2 --> */}
        <div className="bg-white bg-opacity-10 p-4 rounded-lg  ">
            <h2 className="text-lime-500 font-semibold mb-2">2. Women-Led Processing</h2>
            <ul className="list-disc pl-5 space-y-2">
                <li>We give enough time to open-air sun drying </li>
                <li>Rural women artisans employed</li>
                <li>Stone grinding techniques in 3:1 chili-seed ratio</li>
            </ul>
        </div>

        {/* <!-- Process Step 3 --> */}
        <div className="bg-white bg-opacity-10 p-4 rounded-lg">
            <h2 className="text-lime-500 font-semibold mb-2">3. Quality Assurance</h2>
            <ul className="list-disc pl-5 space-y-2">
                <li>Uniform 300-micron texture</li>
                <li>Natural clay pot storage maturation</li>
                <li>Zero preservatives | Zero artificial colors</li>
            </ul>
        </div>
    </div>

    {/* <!-- Comparison Table --> */}
    <div className="mt-8 overflow-x-auto">
        <table className="min-w-full border-collapse">
            <thead>
                <tr className="bg-lime-50 text-black border-white">
                    <th className="p-3 ">Process Aspect</th>
                    <th className="p-3">Our Method</th>
                    <th className="p-3">Commercial Brands</th>
                </tr>
            </thead>
            <tbody>
                <tr className="border border-slate-100">
                    <td className="p-3">Drying Time</td>
                    <td className="p-3">Natural sun drying</td>
                    <td className="p-3">2h oven roasting</td>
                </tr>
                <tr className="border border-slate-100">
                    <td className="p-3">Workforce</td>
                    <td className="p-3">10+ rural women</td>
                    <td className="p-3">Automated machines</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<div id="c6-fade" className="mt-8 p-6 bg-lime-100 rounded-xl text-center max-w-4xl mx-auto space-y-4 opacity-0 translate-y-20 ">
    <p className="text-slate-600 font-medium text-lg italic">
        "What makes our spices different? The same hands that raised our family now craft your spices - 
        my grandmother's  techniques still works daily in our women's collective workshop."
    </p>
    <p className="text-md text-slate-500">
    "Every step honors our ancestors' wisdom - from seed selection to final packaging"
    </p>
</div>



    </div>
</div>
<script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Traditional Andhra Chili Powder Making Process",
  "description": "Learn our 3-generation old spice crafting technique",
  "step": [
    {
      "@type": "HowToStep",
      "text": "Organic cultivation of Guntur Sannam chilies"
    },
    {
      "@type": "HowToStep",
      "text": "7-day natural sun drying process"
    }
  ]
})}
</script>

        </section>
        </>
    );
};

export default About;

// import React from 'react';
// import { useGSAP } from '@gsap/react'
// import { animateWithGsap } from '../utils/animations';
// import { aboutImg } from '../utils';
// import Highlights from './Highlights';
// const About = () => {
//     useGSAP(()=>{
//         animateWithGsap('#g_fade', {
//             opacity: 1,
//             y: 0,
//             duration: 1,
//             ease: 'power2.inOut'
//           }),
//           animateWithGsap(
//             '.g_text',
//             {y:0, opacity: 1,ease: 'power2.inOut',duration: 1})
//     },[])
//     return (
//         <section className="w-screen overflow-hidden h-full common-padding bg-black">
//         <div className="screen-max-width">
//           <h1 id="g_fade" className="products-heading mb-12">About us</h1>
//           <div className="flex flex-col mt-10 md:flex-row items-center justify-center">
//             <div className="w-full md:w-1/2 h-full  bg-white rounded-3xl shadow-lg shadow-gray-100 md:mb-0 items-center justify-center mb-7  ">
//             <h1 className=" text-xl lg:text-2xl pt-5 font-semibold text-slate-700 text-center">Our women-crafted spices preserve Our culinary legacy. While factories hurry, we:</h1>
//               <ul  className="list-none p-5 mt-3  text-slate-600 text-lg md:text-xl font-semibold ">
//                 <li className="mb-2">
//                   <span className="md:text-xl font-medium sm:font-small text-sm">
//                   Sun-dry chillies on clay rooftops for 7 days
//                   </span>
//                 </li>
//                 <li className="mb-2">
//                   <span className="md:text-xl font-medium sm:font-small text-sm">
//                   Hand-remove stems and stones (no machines!)
//                   </span>
//                 </li>
//                 <li className="mb-2">
//                   <span className="md:text-xl font-medium sm:font-small text-sm">
//                   Grind in small batches using granite stones
//                   </span>
//                 </li>
//                 <li className="mb-2">
//                   <span className="md:text-xl font-medium sm:font-small text-sm">
//                     No Preservatives or Added Colors
//                   </span>
//                 </li>
//                 {/* <li className="mb-2">
//                   <span className="md:text-xl font-medium sm:font-small text-sm">
//                     Fresh and Sourced from our own farms.
//                   </span>
//                 </li>
//                 <li className="mb-2">
//                   <span className="md:text-xl font-medium sm:font-small text-sm">
//                   Empowering rural women through employment opportunities in our village.
//                   </span>
//                 </li> */}
//                {/* <li className="mb-2">
//                   <span className="md:text-xl font-medium sm:font-small text-xs">
//                     Can Buy Online and get delivered to your doorstep with Free Shipping any where in India.
//                   </span>
//                 </li> */}
//               </ul>
//               <p className="p-5 mt-3 text-slate-600 md:text-xl font-medium sm:font-small text-sm ">Every purchase supports our women’s collective – empowering grandmothers, mothers, and daughters to preserve their culinary heritage."</p>
//             </div>
//             <div className="w-full md:ml-10  md:w-1/2 mb-12 md:mb-0">
//               <img
//                 src={aboutImg}
//                 alt="About Image"
//                 className="w-full h-full object-cover rounded-3xl shadow-md shadow-gray-100"
//               />
//             </div>
//           </div>

//          </div>
       
          
           
//           <div className="screen-max-width flex  mt-10 md:flex-row items-center justify-center">
//                 {/* Image First */}
                
//                 <div className="w-full md:w-full h-full bg-white rounded-3xl shadow-lg shadow-gray-100 p-8">
//                     <h1 className="text-xl lg:text-4xl font-semibold text-slate-700 text-center mb-6">
//                         Our Traditional Process
//                     </h1>
//                     <p className="text-slate-600 text-lg md:text-xl font-medium">
//                         For generations, we've perfected the art of spice-making using time-honored techniques. 
//                         Our chillies are sun-dried in open fields, stone-ground using traditional methods, 
//                         and carefully blended by experienced artisans. This meticulous process preserves 
//                         the authentic flavor and potency of our spices while maintaining their natural goodness.
//                     </p>
//                 </div>
            
//         </div>
       
//       </section>
//     );
// };

// export default About;