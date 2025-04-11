import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { rightImg, watchImg } from "../utils"
import { animateWithGsap } from "../utils/animations";

import VideoCarousel from './VideoCarousel';

const Highlights = () => {
  useGSAP(() => {
   
    gsap.to('.link', { opacity: 1, y: 0, duration: 1, stagger: 0.25 }),
    animateWithGsap('#highlights_title', { y:0, opacity:1})
  }, [])
 
  
  return (
    <section id="highlights" className="w-screen overflow-hidden h-full common-padding bg-zinc">
      <div className="screen-max-width">
        <div className="mb-12 w-full md:flex items-end justify-between">
          <h1 id="highlights_title" className="section-heading">Authentic spices </h1>

          <div className="flex flex-wrap items-end gap-5">
            <p id="highlights_title" className="link section-heading">
              Know more about products
              <img src={watchImg} alt="watch" className="ml-2" />
            </p>
           
          </div>
        </div>

        <VideoCarousel />
      </div>
    </section>
  )
}

export default Highlights