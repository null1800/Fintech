"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Handshake, Zap, ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-blue-100 overflow-hidden">
      {/* Background shape/gradient for depth */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-indigo-700/5 z-0"></div>
      
      {/* Container */}
      <div className="container mx-auto px-6 py-24 md:py-32 relative z-10 grid md:grid-cols-2 items-center gap-12">
        
        {/* Left Content (Text and CTAs) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          {/* Tagline */}
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 mb-2 flex items-center justify-center md:justify-start">
             <Handshake className="w-4 h-4 mr-2"/> The Future of Financing
          </p>

          {/* Heading */}
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-snug mb-6 text-gray-900">
            Smart Loans. <br className="hidden lg:inline" /> Essential Tech.
          </h1>
          
          {/* Subtext - Clearer Value Proposition */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
            Secure flexible personal loans with **instant approval** and get the latest gadgets delivered straight to your door.
          </p>

          {/* Feature Highlights (Bullet points for quick scanning) */}
          <ul className="text-lg text-gray-700 space-y-2 mb-10 max-w-lg mx-auto md:mx-0 md:text-left text-center">
            <li className="flex items-center justify-center md:justify-start">
              <Zap className="w-5 h-5 text-indigo-500 mr-2 flex-shrink-0" /> Fast Payouts (within 24 hours)
            </li>
            <li className="flex items-center justify-center md:justify-start">
              <ArrowRight className="w-5 h-5 text-indigo-500 mr-2 flex-shrink-0" /> Low, Transparent Rates
            </li>
            <li className="flex items-center justify-center md:justify-start">
              <Handshake className="w-5 h-5 text-indigo-500 mr-2 flex-shrink-0" /> Flexible Repayment Terms
            </li>
          </ul>


          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            
            {/* Primary CTA (Loan Application) */}
            <Link href="policies#rates" scroll={true} passHref>
              <button
                className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-xl shadow-indigo-500/30 transition duration-300 transform hover:scale-[1.03] w-full sm:w-auto text-lg"
              >
                Rates <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </Link>

            {/* Secondary CTA (Gadget Shop) */}
            <Link href="#gadgets" scroll={true} passHref>
              <button
                className="flex items-center justify-center bg-white border-2 border-indigo-200 text-indigo-600 font-semibold py-3 px-8 rounded-lg hover:bg-indigo-50 transition duration-300 w-full sm:w-auto text-lg"
              >
                Explore Gadgets
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Right Content (Image inside a clean "Card" visual) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center md:justify-end mt-12 md:mt-0 relative"
        >
            {/* The "Card" container - giving it a premium feel */}
            <div className="relative w-full max-w-xl aspect-[4/3] bg-white rounded-3xl shadow-2xl shadow-gray-400/30 p-4 border border-gray-100">
                {/* Image Wrapper */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                    <Image
                        src="/images/pexels-karolina-grabowska-4968384.jpg" // Use a professional, combined image if possible, or a strong financial one
                        alt="A clean illustration showing finance and technology icons"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                    />
                    {/* Subtle Overlay to make it feel professional */}
                    <div className="absolute inset-0 bg-indigo-500/10 backdrop-blur-[1px]"></div>
                </div>
                
                {/* Decorative Element - simulating a graph or rising value */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg flex items-center space-x-2 border border-gray-100">
                    <Zap className="w-5 h-5 text-emerald-500" />
                    <span className="font-bold text-gray-800 text-sm">99% Approval Rate</span>
                </div>
            </div>
        </motion.div>
      </div>

      {/* Clean Bottom Separator (Simple white base) */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-white z-0"></div>
    </section>
  );
};

export default HeroSection;