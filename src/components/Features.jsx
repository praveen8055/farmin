import { useGSAP } from '@gsap/react'
import React, { useRef } from 'react'
import { animateWithGsap } from '../utils/animations';
import {drychilliImg,chilliVideo,womenImg} from '../utils';
import gsap from 'gsap';

const Features = () => {
  const videoRef = useRef();

  useGSAP(() => {
    gsap.to('#exploreVideo', {
      scrollTrigger: {
        trigger: '#exploreVideo',
        toggleActions: 'play pause reverse restart',
        start: '-10% bottom',
      },
      onComplete: () => {
        videoRef.current.play();
      }
    })

    animateWithGsap('#features_title', { y:0, opacity:1})
   
    

    animateWithGsap(
      '.g_grow',
      { scale: 1, opacity: 1, ease: 'power1' },
      { scrub: 5.5 }
    );
    animateWithGsap(
      '.g_text',
      {y:0, opacity: 1,ease: 'power2.inOut',duration: 1}
    )
    animateWithGsap("#telugu-txt",{
      opacity: 1,
                    y: 0,
                    duration: 1,
                    delay:0.3,
                    ease: 'power2.inOut'
    })
  }, []);

  return (
    <section id="ourstory" className="h-full common-padding bg-zinc relative overflow-hidden">
      <div className="screen-max-wdith">
        <div className="mb-12 w-full">
          <h1 id="features_title" className="section-heading">Our Story: Where Tradition Meets Women’s Empowerment</h1>
        </div>
        
        <div className="flex flex-col justify-center items-center overflow-hidden">
  <div 
    id="telugu-txt" 
    className="my-10 md:my-16 w-full px-4 md:px-24 opacity-0 md:translate-y-20"
  >
    <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
      <h2 className="text-3xl  md:text-5xl lg:text-7xl font-semibold whitespace-nowrap">
        అవ్వ చేతి కారం,
      </h2>
      <h2 className="text-3xl pt-3 md:text-5xl lg:text-7xl font-semibold whitespace-nowrap">
        అమ్మ చేతి వంట...
      </h2>
    </div>
  </div>

          <div className="flex-center flex-col sm:px-10">
            <div className="relative h-[50vh] w-full flex items-center">
              <video playsInline id="exploreVideo" className="w-full h-full object-cover object-center rounded-md" preload="none" muted autoPlay ref={videoRef}>
                <source src={chilliVideo} type="video/mp4" />
              </video>
            </div>

            <div className="flex flex-col w-full relative">
              <div className="feature-video-container">
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img src={womenImg} alt="Organic Guntur chili plants grown chemical-free in red soil fields" className="feature-video g_grow" />
                </div>
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img src={drychilliImg} alt="Fresh chili harvest basket carried by women farmers in cotton sarees" className="feature-video g_grow" />
                </div>
              </div>

              <div className="feature-text-container">
                <div className="flex-1 flex-center">
                <p className="feature-text g_text">
  From Our Clay Rooftops to Your Kitchen:  
  <span className="text-white">
    7 Days under the  Sun → 3 Generations' Knowledge →
  </span>
  <span className="">
    100% Hand Work. While machines strip flavor, we still:  
    Handpick guntur chillies and sort them perfectly. 
     our hand made karam podi skips factories - 
     made by our village women using 1920s techniques.
    
  </span>
  <span className="text-white">
  The way spices were meant to be made.</span>
</p>
                </div>

                <div className="flex-1 flex-center">
          
                <p className="feature-text g_text">
                Women-Led Processing: Our grandmother-led women's collect red chillies and  {' '}
  <span className="text-white">
    sun-dries organic Guntur chillies for 7 days ,
  </span>

  <span className="hidden md:inline">
    No colors, no preservatives - just pure tradition passed through  generations. {' '}
  </span>
  3rd generation stone-grinding techniques with 3:1 chili-seed ratio for perfect heat balance {' '}
  <span className="text-white">
    we keep grandmothers' spice-making wisdom alive.
  </span>
</p>

                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features