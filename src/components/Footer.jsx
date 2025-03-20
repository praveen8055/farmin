import React from 'react'
import { farminImg } from '../utils'
import { Instagram, Twitter, Phone, MessageCircle } from "lucide-react"

const Footer = () => {
  const socialLinks = [
    {
      name: 'Instagram',
      icon: <Instagram className="w-5 h-5" />,
      link: 'https://instagram.com'
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-5 h-5" />,
      link: 'https://twitter.com'
    },
    {
      name: 'Phone',
      icon: <Phone className="w-5 h-5" />,
      link: 'tel:+917794934548'
    },
    {
      name: 'Message',
      icon: <MessageCircle className="w-5 h-5" />,
      link: 'mailto:grannys.spices@gmail.com'
    }
  ]
  return (
    <footer id="footer" className="py-12 sm:px-10 px-5 bg-[#1d1d1f]">
      <div className="screen-max-width">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left Section */}
          <div className="space-y-6">
            <img src={farminImg} alt="Granny's Spices" className="h-20 " />
            <p className="text-gray-400 text-sm leading-relaxed">
            Crafted by Grandma’s hands, steeped in tradition—every sprinkle sparks Hyderabad’s fiery soul!
            </p>

            <div className="flex space-x-4">
              
  {socialLinks.map((social) => (
    <a 
      key={social.name}
      href={social.link}
      className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center
                hover:bg-zinc-700 transition-colors duration-300 text-gray-400 hover:text-white"
    >
      {social.icon} {/* Directly render the icon component */}
    </a>
  ))}
</div>
          </div>

          {/* Center Section */}
          <div className="space-y-6">
            <h2 className="text-white text-lg font-semibold">COMPANY</h2>
            <ul className="space-y-4">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors duration-300">
                  About us
                </a>
              </li>
              <li>
                <a href="#delivery" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Delivery
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="space-y-6">
            <h2 className="text-white text-lg font-semibold">GET IN TOUCH</h2>
            <ul className="space-y-4">
              <li className="text-gray-400">
                <a href="tel:+917794934548" className="hover:text-white transition-colors duration-300">
                  +91 779 493 4548
                </a>
              </li>
              <li className="text-gray-400">
                <a href="mailto:grannys.spices@gmail.com" className="hover:text-white transition-colors duration-300">
                  farminspices@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800">
  <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
    <p className="text-gray-400 text-sm">
      Copyright © 2024 Farmin Spices - All Rights Reserved.
    </p>
    <div className="flex space-x-6">
  {socialLinks.map((link) => (
    <a 
      key={link.name} 
      href={link.link} 
      className="text-gray-400 text-sm hover:text-white transition-colors duration-300 flex items-center gap-2"
    >
      {link.icon}
      <span>{link.name}</span>
    </a>
  ))}
</div>
  </div>
</div>
      </div>
    </footer>
  )
}

export default Footer