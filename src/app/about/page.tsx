"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants, Transition } from "framer-motion";
import Header from "../components/layout/Header";
import Footer from "../components/layout/footer"; 

import { Zap, ShieldCheck, TrendingUp, Handshake, X } from "lucide-react";

// --- Animation Variants ---
const sectionInView: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.7,
      type: "spring" as const, // ✅ cast as const for correct type
      staggerChildren: 0.15
    } as Transition
  },
};

const itemInView: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5 } as Transition
  },
};

const iconInView: Variants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    transition: { type: "spring" as const, stiffness: 200 } as Transition
  },
};

const AboutUs = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="bg-gray-300 py-24 md:py-32 border-b border-gray-100 overflow-hidden text-center">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div 
                className="space-y-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionInView}
            >
              <motion.p className="text-sm font-semibold uppercase text-blue-600 tracking-widest" variants={itemInView}>
                Our Story & Commitment
              </motion.p>
              <motion.h1 
                className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight" 
                variants={itemInView}
              >
                Empowering Your Future with <span className="text-blue-600">Fintech Excellence</span>
              </motion.h1>
              <motion.p className="text-gray-700 text-xl leading-relaxed max-w-3xl mx-auto" variants={itemInView}>
                Chembe Fintech Solutions is dedicated to providing fast, secure, and accessible financial solutions.
              </motion.p>
              <motion.button
                onClick={() => setShowModal(true)}
                className="inline-block px-8 py-4 bg-green-500 text-white font-semibold rounded-lg shadow-xl shadow-green-500/30 hover:bg-green-600 transform transition duration-300 active:scale-95 mt-4"
                variants={itemInView}
              >
                See Our Transparency Pledge
              </motion.button>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-gray-200 border-b border-gray-200">
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div 
              className="text-center space-y-3 mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionInView}
            >
              <motion.h2 className="text-4xl font-extrabold text-gray-900" variants={itemInView}>
                The Pillars of Chembe Fintech
              </motion.h2>
              <motion.p className="text-xl text-gray-600 max-w-3xl mx-auto" variants={itemInView}>
                Our service model is built on four core values that ensure we serve you better.
              </motion.p>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionInView}
            >
              {/* Pillars */}
              {[
                { title: "Digital Speed", desc: "Instant application processing...", icon: <Zap className="w-8 h-8" />, color: "blue" },
                { title: "Ironclad Security", desc: "Advanced encryption...", icon: <ShieldCheck className="w-8 h-8" />, color: "green" },
                { title: "Financial Growth", desc: "Products designed...", icon: <TrendingUp className="w-8 h-8" />, color: "yellow" },
                { title: "Transparent Trust", desc: "Clear rates, no hidden fees...", icon: <Handshake className="w-8 h-8" />, color: "indigo" }
              ].map((pillar, idx) => (
                <motion.div key={idx} className={`bg-white p-8 rounded-xl shadow-lg border-t-4 border-${pillar.color}-500 hover:shadow-xl transition`} variants={itemInView}>
                  <motion.div className={`text-${pillar.color}-500 mb-4`} variants={iconInView}>
                    {pillar.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{pillar.title}</h3>
                  <p className="text-gray-600">{pillar.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-gray-300">
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div 
              className="grid md:grid-cols-2 gap-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionInView}
            >
              <motion.div className="p-8 border-l-4 border-blue-600 shadow-md bg-blue-50/50 rounded-lg" variants={itemInView}>
                <h2 className="text-4xl font-extrabold text-blue-800 mb-4">Our Vision</h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  To become the most trusted digital financial platform in the region.
                </p>
              </motion.div>
              <motion.div className="p-8 border-l-4 border-green-600 shadow-md bg-green-50/50 rounded-lg" variants={itemInView}>
                <h2 className="text-4xl font-extrabold text-green-800 mb-4">Our Mission</h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  To deliver seamless and secure financial services using cutting-edge technology.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.7, y: -50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.7, y: -50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-2xl p-8 max-w-xl w-full shadow-2xl text-left relative"
            >
              <h3 className="text-3xl font-bold text-blue-600 mb-4 border-b pb-2">
                Transparency Pledge & Rates
              </h3>
              <p className="text-gray-700 mb-6 space-y-3 text-lg">
                <span className="block font-semibold text-gray-800">
                  <span className="text-green-500 mr-2">✔️</span> Interest rates range from 25% to 40% depending on loan duration.
                </span>
              </p>
              <div className="text-right">
                <motion.button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition active:scale-95"
                  whileHover={{ scale: 1.05 }}
                >
                  Close & I Understand
                </motion.button>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AboutUs;
