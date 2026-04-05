"use client";

import InterestCalculator from "../components/InterestCalculator";
import Header from "../components/layout/Header";
import Footer from "../components/layout/footer";

// Framer Motion Imports
import { motion, Transition } from "framer-motion";
import { Scale, Shield, Landmark, TrendingUp, Check } from "lucide-react";

// --- Animation Variants ---

const transition: Transition = {
  type: "spring",
  bounce: 0.4,
  duration: 0.8,
};

const cardVariants: {
  offscreen: { y: number; opacity: number };
  onscreen: { y: number; opacity: number; transition: Transition };
} = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: { y: 0, opacity: 1, transition },
};

const containerVariants: {
  hidden: { opacity: number };
  visible: { opacity: number; transition: { delayChildren: number; staggerChildren: number } };
} = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: 0.3, staggerChildren: 0.2 } },
};

const itemVariants: {
  hidden: { y: number; opacity: number };
  visible: { y: number; opacity: number };
} = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function HomePage() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section
          id="hero"
          className="py-36 text-center bg-gradient-to-br from-blue-700 to-blue-900 text-white overflow-hidden relative"
          aria-label="Welcome Section"
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="w-1/2 h-full bg-blue-500 rounded-full blur-3xl absolute -left-1/4 -top-1/4"
            />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.h1
              className="text-6xl font-extrabold mb-4 drop-shadow-lg"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              Welcome to Chembe Fintech Solutions
            </motion.h1>
            <motion.p
              className="text-2xl mb-8 font-light"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Fast loans and the latest gadgets, simplifying your life in one place.
            </motion.p>
            <motion.a
              href="#rates"
              className="px-10 py-4 bg-yellow-400 text-blue-900 font-bold text-lg rounded-full shadow-lg hover:bg-yellow-300 transition transform hover:scale-105 active:scale-95"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 300, damping: 20 }}
            >
              Check Loan Rates & Calculate
            </motion.a>
          </div>
        </section>

        {/* Terms & Conditions */}
        <section id="terms" className="py-24 bg-white" aria-label="Terms and Conditions">
          <div className="container mx-auto px-6 max-w-5xl">
            <motion.h2
              className="text-4xl font-extrabold mb-8 text-gray-900 border-b-2 pb-2 border-blue-100"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
            >
              <Scale className="inline-block w-8 h-8 text-blue-600 mr-3 align-text-bottom" />
              Terms & Conditions
            </motion.h2>
            <motion.ul
              className="space-y-4 text-gray-700 leading-relaxed grid md:grid-cols-2 gap-x-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <motion.li variants={itemVariants} className="flex items-start text-lg">
                <Check className="w-5 h-5 text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span>Loan approvals are subject to strict verification of Personal Information and Collateral.</span>
              </motion.li>
              <motion.li variants={itemVariants} className="flex items-start text-lg">
                <Check className="w-5 h-5 text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span>Clients must provide accurate details; false information may result in immediate rejection.</span>
              </motion.li>
              <motion.li variants={itemVariants} className="flex items-start text-lg">
                <Check className="w-5 h-5 text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span>Chembe Fintech may modify or discontinue services without prior notice based on regulatory requirements.</span>
              </motion.li>
              <motion.li variants={itemVariants} className="flex items-start text-lg">
                <Check className="w-5 h-5 text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span>Users must be at least 18 years old and legally capable of entering into a contract to apply for services.</span>
              </motion.li>
            </motion.ul>
          </div>
        </section>

        {/* Privacy Policy */}
        <section id="privacy" className="py-24 bg-gray-100" aria-label="Privacy Policy">
          <div className="container mx-auto px-6 max-w-5xl">
            <motion.h2
              className="text-4xl font-extrabold mb-8 text-gray-900 border-b-2 pb-2 border-blue-200"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
            >
              <Shield className="inline-block w-8 h-8 text-blue-600 mr-3 align-text-bottom" />
              Privacy Policy
            </motion.h2>
            <motion.div
              className="text-gray-700 leading-relaxed grid md:grid-cols-2 gap-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <motion.div variants={itemVariants}>
                <p className="mb-4 text-lg font-semibold text-gray-800">
                  Chembe Fintech Solutions is committed to protecting your privacy. We collect personal information to provide and improve our services, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 pl-4">
                  <li>Contact details (name, phone, email, address)</li>
                  <li>Financial data and income verification for loan processing</li>
                  <li>Device information and usage data for security and service quality</li>
                </ul>
              </motion.div>
              <motion.div variants={itemVariants}>
                <p className="mt-0 text-lg">
                  Your information is held securely and will never be sold to third parties. It is only
                  shared with necessary trusted payment and verification providers or as strictly required by Zambian law.
                </p>
                <p className="mt-4 text-lg font-semibold">
                  By actively using our services, you acknowledge and consent to the practices outlined in this policy.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Interest Rates & Calculator */}
        <section id="rates" className="py-24 bg-white" aria-label="Interest Rates and Loan Calculator">
          <div className="container mx-auto px-6 max-w-5xl">
            <motion.h2
              className="text-4xl font-extrabold mb-8 text-gray-900 border-b-2 pb-2 border-blue-100"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
            >
              <TrendingUp className="inline-block w-8 h-8 text-blue-600 mr-3 align-text-bottom" />
              Flexible Interest Rates & Calculator
            </motion.h2>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Rates Table */}
              <motion.div
                className="lg:col-span-1 p-8 rounded-2xl bg-blue-50 border border-blue-200 shadow-xl"
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
              >
                <h3 className="text-xl text-blue-900 font-bold mb-4 flex items-center">
                  <Landmark className="w-5 h-5 mr-2" />
                  Our Weekly Rates
                </h3>
                <ul className="space-y-4 text-lg text-blue-900 font-semibold">
                  <li className="flex justify-between border-b border-blue-200 pb-2">
                    <span>1 Week</span> <span className="text-green-600">25%</span>
                  </li>
                  <li className="flex justify-between border-b border-blue-200 pb-2">
                    <span>2 Weeks</span> <span className="text-green-600">30%</span>
                  </li>
                  <li className="flex justify-between border-b border-blue-200 pb-2">
                    <span>3 Weeks</span> <span className="text-green-600">35%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>4 Weeks</span> <span className="text-green-600">40%</span>
                  </li>
                </ul>
                <div className="mt-8 p-4 bg-yellow-100 rounded-lg text-sm text-gray-800">
                  <h4 className="font-bold mb-1">Important Notice:</h4>
                  <p>
                    Late payments incur additional fees. We are committed to remain transparent with our rates and provide regular updates in case of any change in the current market conditions. Review all terms before application.
                  </p>
                </div>
              </motion.div>

              {/* Calculator */}
              <motion.div
                className="lg:col-span-2 p-8 rounded-2xl bg-white border border-gray-200 shadow-xl"
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Loan Repayment Calculator</h3>
                <InterestCalculator />
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
