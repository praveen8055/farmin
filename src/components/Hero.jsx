import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { heroVideo, smallHeroVideo } from '../utils';
import { useEffect, useState, useRef } from 'react';
import { animateWithGsap } from '../utils/animations';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo)
  const buttonRef = useRef(null); 
  const handleVideoSrcSet = () => {
    if(window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo)
    } else {
      setVideoSrc(heroVideo)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleVideoSrcSet);

    return () => {
      window.removeEventListener('resize', handleVideoSrcSet)
    }
  }, [])

  useGSAP(() => {
    gsap.to('#hero', { opacity: 1, delay: 1 })
    gsap.to('#cta', { opacity: 1, y: -90, delay: 1 })
    gsap.to(buttonRef.current, {
      y: -15,
      duration: 0.5,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    })
   
  }, [])

  return (
    <section className="w-full nav-height md:mt-10 bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col mt-4">
        <p id="hero" className="hero-title text">Chilli Powder</p>
     
        <div className="md:w-10.5/12 w-11/12 relative">
          {/* Modified h1 with overlay positioning */}
          <h1 
            id="cta" 
            className="hero-heading absolute font-medium  text-center top-1/2  z-10 w-full max-w-[90%] 
                      md:max-w-[80%] lg:max-w-[1200px] px-4 md:px-8 "
          >
            Our Traditional Journey From Farm to Kitchen
          </h1>
          <video 
            className="pointer-events-none" 
            autoPlay 
            muted  
            playsInline={true} 
            key={videoSrc}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>

      <div
        id="cta"
        className="flex flex-col items-center opacity-0 translate-y-20"
      >
        <Link to="/chilli-powder" ref={buttonRef} href="#highlights" className="btn">Order Now</Link>
        <p className="font-normal text-xl">From ₹499/kg </p>
      </div>
    </section>
  )
}

export default Hero;
// import gsap from 'gsap';
// import { useGSAP } from '@gsap/react';
// import { heroVideo, smallHeroVideo } from '../utils';
// import { useEffect, useState,useRef } from 'react';
// import { animateWithGsap } from '../utils/animations';

// const Hero = () => {
//   const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo)
//   const buttonRef = useRef(null); 
//   const handleVideoSrcSet = () => {
//     if(window.innerWidth < 760) {
//       setVideoSrc(smallHeroVideo)
//     } else {
//       setVideoSrc(heroVideo)
//     }
//   }

//   useEffect(() => {
//     window.addEventListener('resize', handleVideoSrcSet);

//     return () => {
//       window.removeEventListener('reisze', handleVideoSrcSet)
//     }
//   }, [])

//   useGSAP(() => {
//     gsap.to('#hero', { opacity: 1, delay: 2 })
//     gsap.to('#cta', { opacity: 1, y: -90, delay: 2 })
//     gsap.to(buttonRef.current, {
//       y: -15, // Move the button up by 20px
//       duration: 0.5, // Duration of the animation
//       yoyo: true, // Reverse the animation after completion
//       repeat: -1, // Repeat the animation infinitely
//       ease: "power1.inOut", // Smooth easing
//     })
//     animateWithGsap('#highlights_title', { y:0, opacity:1});
//   }, [])

//   return (
  
//     <section className="w-full nav-height mt-7 bg-black relative ">
//       <div className="h-5/6 w-full flex-center flex-col ">
//         <p id="hero" className="hero-title text  ">Chilli Powder</p>
     
//         <div className="md:w-10.5/12 w-11/12">
//         <h1 id="highlights_title" className="section-heading  -translate-y-20">Authentic spices </h1>
//           <video className="pointer-events-none" autoPlay muted  playsInline={true} key={videoSrc}>
//             <source src={videoSrc} type="video/mp4" />
//           </video>
//         </div>
//       </div>

//       <div
//         id="cta"
//         className="flex flex-col items-center opacity-0 translate-y-20 "
//       >
//         <a ref={buttonRef}  href="#highlights" className="btn">Order Now</a>
//         <p className="font-normal text-xl">From ₹499/kg </p>
//       </div>
//     </section>
//   )
// }

// export default Hero