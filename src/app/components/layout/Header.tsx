"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LoanForm from "../forms/LoanApplicationForm";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoanForm, setShowLoanForm] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Gadgets", path: "/#gadgets" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/*  Fixed Logo Section */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/images/IMG-20251008-WA0009.jpg"
            alt="Chembe Fintech Solutions Logo"
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
          <span className="text-xl font-bold text-blue-600 tracking-tight hover:opacity-80 transition">
            Chembe Fintech Solutions
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => setShowLoanForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow font-semibold hover:bg-blue-700 transition"
          >
            Apply Now!
          </button>
        </div>

        {/*  Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-md border-t"
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  setShowLoanForm(true);
                  setIsOpen(false);
                }}
                className="px-4 py-2 text-center bg-blue-900 text-white rounded-xl shadow hover:bg-blue-500 transition w-full"
              >
                Apply Now!
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loan Form Modal */}
      <AnimatePresence>
        {showLoanForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          >
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
              <LoanForm onClose={() => setShowLoanForm(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
