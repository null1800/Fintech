"use client";

import React from "react";
import { motion, Transition, Variants } from "framer-motion";
import { Zap, Repeat, Monitor, ArrowRight } from "lucide-react";

export default function FeaturesGrid() {
  const features = [
    {
      title: "Instant Approval Loans",
      description: "Apply in minutes and get approved instantly, with funds hitting your account within 24 hours.",
      icon: Zap,
      color: "text-amber-300",
      ring: "ring-amber-400/50",
    },
    {
      title: "Personalized Repayments",
      description: "Our flexible repayment plans are tailored to your unique budget and financial calendar.",
      icon: Repeat,
      color: "text-green-300",
      ring: "ring-green-400/50",
    },
    {
      title: "Curated Tech Store",
      description: "Explore the latest smartphones, PCs, and smart home devices with exclusive financing options.",
      icon: Monitor,
      color: "text-rose-300",
      ring: "ring-rose-400/50",
    },
  ];

  const transition: Transition = { type: "spring", stiffness: 50, duration: 0.5 };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition },
  };

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-200 mb-2">
            Core Value
          </p>
          <h2 className="text-4xl font-extrabold text-black sm:text-5xl">
            Why Choose Our Platform?
          </h2>
          <p className="mt-4 text-xl text-black">
            We blend rapid financial solutions with access to cutting-edge technology, ensuring you are always a step ahead.
          </p>
        </div>

        <motion.div
          className="grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className={`relative bg-blue-900 rounded-3xl p-8 shadow-xl border border-blue-700
                         group transition duration-500 ease-in-out transform hover:ring-4 ${feature.ring}`}
            >
              <div className={`p-3 inline-flex rounded-xl mb-4 bg-blue-950 group-hover:bg-opacity-100 transition-colors duration-300`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>

              <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-blue-100 mb-4 text-base">{feature.description}</p>

              <a
                href={index === 2 ? "/#gadget" : "/about"}
                className={`text-sm font-semibold flex items-center ${feature.color} hover:underline`}
              >
                {index === 2 ? "View Gadgets" : "Learn More"}
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
