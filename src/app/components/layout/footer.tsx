"use client";

import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion"; // Optional: Added motion for potential future animations

const Footer = () => (
  // 💡 IMPROVEMENT 1: Changed background to a deeper black for a more premium dark mode feel
  <footer className="bg-gray-950 text-gray-300 pt-16 pb-8">
    <div className="container mx-auto px-6 grid gap-12 lg:grid-cols-5 xl:gap-20">
      
      {/* 1. Brand Info & Social Icons (Spans 2 columns on large screens) */}
      <div className="space-y-4 lg:col-span-2">
        <h3 className="text-3xl font-extrabold text-blue-400 tracking-wide">
          Chembe Fintech
        </h3>
        <p className="text-gray-400 leading-relaxed text-sm max-w-md">
          Your one-stop solution for financial needs and the latest tech. Fast,
          secure, and convenient services designed for the modern era.
        </p>

        {/* Social Icons (Slightly improved styling) */}
        <div className="flex space-x-3 pt-2">
          {/* 💡 IMPROVEMENT 2: Encased icons in a subtle circle/square for visual weight */}
          <Link href="#" aria-label="Facebook" className="p-2 rounded-full bg-gray-800 text-gray-400 hover:bg-blue-600 hover:text-white transition duration-300">
            <FaFacebookF className="w-4 h-4" />
          </Link>
          <Link href="#" aria-label="Twitter" className="p-2 rounded-full bg-gray-800 text-gray-400 hover:bg-blue-400 hover:text-white transition duration-300">
            <FaTwitter className="w-4 h-4" />
          </Link>
          <Link href="#" aria-label="LinkedIn" className="p-2 rounded-full bg-gray-800 text-gray-400 hover:bg-blue-700 hover:text-white transition duration-300">
            <FaLinkedinIn className="w-4 h-4" />
          </Link>
          <Link href="#" aria-label="Instagram" className="p-2 rounded-full bg-gray-800 text-gray-400 hover:bg-pink-600 hover:text-white transition duration-300">
            <FaInstagram className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 2. Quick Links */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider">
          Quick Links
        </h3>
        <ul className="space-y-3 text-sm">
          <li>
            <Link href="/about" className="text-gray-400 hover:text-blue-400 transition">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/#gadgets" className="text-gray-400 hover:text-blue-400 transition">
              Tech Shop
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-gray-400 hover:text-blue-400 transition">
              Support/Help Center
            </Link>
          </li>
        </ul>
      </div>

      {/* 3. Legal & Policies (Separated from quick links for clarity) */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider">
          Policies
        </h3>
        <ul className="space-y-3 text-sm">
          <li>
            <Link href="/policies#terms" className="text-gray-400 hover:text-blue-400 transition">
              Terms & Conditions
            </Link>
          </li>
          <li>
            <Link href="/policies#privacy" className="text-gray-400 hover:text-blue-400 transition">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/policies#rates" className="text-gray-400 hover:text-blue-400 transition">
              Interest Rates
            </Link>
          </li>
          <li>
            <Link href="/faq" className="text-gray-400 hover:text-blue-400 transition">
              FAQs
            </Link>
          </li>
        </ul>
      </div>

      {/* 4. Newsletter Signup & Contact (Combined into a utility section) */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider">
          Get Updates
        </h3>
        {/* 💡 IMPROVEMENT 3: Dedicated newsletter section (simulated) */}
        <p className="text-sm text-gray-400">
            Join our mailing list for exclusive deals and market insights.
        </p>
        <div className="flex flex-col space-y-3">
            <input
                type="email"
                placeholder="Enter your email"
                className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <motion.button
                type="submit"
                className="bg-blue-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition duration-300 hover:bg-blue-500 shadow-lg shadow-blue-500/30"
                whileTap={{ scale: 0.98 }}
            >
                <FaEnvelope className="w-4 h-4" /> Subscribe
            </motion.button>
        </div>
        
        {/* Contact Info (Moved below newsletter for hierarchy) */}
        <div className="pt-4 text-sm space-y-2 border-t border-gray-800">
            <h4 className="text-md font-bold text-white">Reach Us</h4>
            <p>Email: <a href="mailto:philipchembe73@gmail.com" className="hover:text-blue-400">philipchembe72@gmail.com</a></p>
            <p>Phone: <a href="tel:+260-970-386-848" className="hover:text-blue-400">+260-970-386-848</a></p>
        </div>
      </div>
    </div>

    {/* Bottom Footer */}
    <div className="border-t border-gray-700 mt-12 pt-6 text-center text-xs text-gray-500">
      &copy; {new Date().getFullYear()} Chembe Fintech Solutions. All rights reserved.
      <br />
      <span className="text-gray-600 mt-1 block">Designed And Developed by: Ray Mtonga.</span>
    </div>
  </footer>
);

export default Footer;