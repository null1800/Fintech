"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/layout/Header";
import Footer from "../components/layout/footer";
import Link from "next/link"; //  import

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const ContactPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message submitted! We'll get back to you shortly.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col">
      <Header />

      <motion.main
        className="flex-1 max-w-6xl mx-auto px-4 py-20 space-y-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        {/* Page Header */}
        <motion.div className="text-center space-y-4" variants={fadeInUp}>
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-600">
            Contact TechCash
          </h1>
          <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Have questions, need support, or want to know more about our
            services? Fill out the form below or view our policies.
          </p>
        </motion.div>

        {/* Contact Form & Info */}
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-start"
          variants={staggerContainer}
        >
          {/* Contact Info */}
          <motion.div
            className="space-y-6 bg-blue-50 p-8 rounded-2xl shadow-lg"
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-semibold text-blue-600">
              Our Contact Info
            </h2>
            <p className="text-gray-700 text-lg">
              Phone: +260 770 584 978
              <br />
              Email: support@chembefintechsolutions.com
              <br />
              Address: Lusaka, Zambia
            </p>

            {/* Corrected link to home page section */}
            <Link
              href="/#terms"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition inline-block"
            >
              Terms & Interest Rates
            </Link>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-8 rounded-2xl shadow-lg"
            variants={fadeInUp}
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows={5}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </motion.form>
        </motion.div>

        {/* Modal (Optional) */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl p-8 max-w-lg mx-4 shadow-xl text-left"
              >
                <h3 className="text-2xl font-bold text-blue-600 mb-4">
                  Terms & Conditions / Interest Rates
                </h3>
                <p className="text-gray-700 mb-4">
                  1. Loan interest rates range from 25% to 40% depending on
                  duration.
                  <br />
                  2. Loans are subject to approval and verification.
                  <br />
                  3. Collateral Value must be Higher than the loan size.
                  <br />
                  4. Repayments must be made on the agreed schedule or penalties may apply.
                  <br />
                  5. For full terms, contact our support team.
                </p>
                <div className="text-right">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>

      <Footer />
    </div>
  );
};

export default ContactPage;
