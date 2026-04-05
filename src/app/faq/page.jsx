"use client";

import React, { useState } from "react";

import Header from "../components/layout/Header";
import Footer from "../components/layout/footer"; // Corrected import
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// --- FAQ Data ---
const faqData = [
  {
    category: "The Application & Loan Process",
    items: [
      {
        question: "What types of loans does Chembe Fintech Solutions offer?",
        answer:
          "We primarily offer personal and tech loans designed for quick access to capital. These loans can be used for purchasing gadgets such as iPhones, laptops, and accessories, or for personal financial needs. Our process is fully digital and optimized for speed.",
      },
      {
        question: "What are the basic eligibility requirements?",
        answer:
          "To qualify, you must be at least 18 years old, Must have a Valid Collateral, and valid identification. Our WhatsApp loan Agent quickly verifies your information and provides feedback in minutes.",
      },
      {
        question: "How long does the approval process take?",
        answer:
          "Most applicants receive approval within minutes after submitting their application. Once User information is approved and Collateral is verified, disbursement of funds typically happens within 24 hours.",
      },
      {
        question: "What interest rates and fees should I expect?",
        answer:
          "Interest rates depend on your Flexible needs. We maintain transparent pricing and clearly show all applicable charges before you accept your loan offer.",
      },
    ],
  },
  {
    category: "Technology and Security",
    items: [
      {
        question: "How does Chembe Fintech Solutions use technology to improve the loan process?",
        answer:
          "We leverage technology through WhatsApp and instant data verification to make faster, more accurate lending decisions. This minimizes paperwork, and ensures personalized loan offers.",
      },
      {
        question: "Is my personal and financial data secure?",
        answer:
          "Yes. Your User data is Safe and secure, and is only used for the purpose of verifying loan eligibility. We never share or sell your data to third parties, and we ensure regulatory compliance standards are met.",
      },
    ],
  },
  {
    category: "iPhone & Gadget Financing",
    items: [
      {
        question: "Can I buy an iPhone through Chembe Fintech Solutions?",
        answer:
          "Absolutely. Chembe Fintech Solutions partners with verified suppliers to offer the latest iPhones and gadgets on flexible payment plans. You can apply directly on our platform, choose your preferred model and color, and receive it once you make your payment.",
      },
      {
        question: "Which iPhone models are available?",
        answer:
          "We stock a wide range of iPhones, that includes the iPhone 11 series, iPhone 12, iPhone 13, and select refurbished models at lower prices. Availability may vary based on demand.",
      },
      {
        question: "Do I need to pay a deposit when purchasing an iPhone?",
        answer:
          "In most cases, a pre deposit is required when you wish to purchase using our online channels. Therefore, we may request a small upfront payment to secure your device before shipment.",
      },
      {
        question: "Do you offer lease-to-own options for iPhones?",
        answer:
          "Yes, we offer lease-to-own options for iPhone purchases. This allows you to pay a smaller upfront fee and make scheduled payments over time, with the option to own the device at the end of the lease term.",
      },
      {
        question: "How does repayment work for iPhone purchases?",
        answer:
          "You can choose flexible repayment terms ranging from 1 to 3 months. Payments can be made via Chembe Fintech Solutions mobile money, or linked bank account. Early repayments are allowed with no penalty.",
      },
    ],
  },
  {
    category: "Account Management",
    items: [
      {
        question: "How do I manage my loan and make payments?",
        answer:
          "You can manage your loans through the Tech Cash dashboard or mobile app — track balances, view payment history, and set reminders for upcoming due dates.",
      },
      {
        question: "Can I pay off my loan early?",
        answer:
          "Yes, we encourage early repayments. There are no penalties for clearing your balance before the due date, however you will need to pay the amount due in full with the initially agreed interest e.g if interest was calculated 2 weeks, and you pay in a week. Therefore, you will need to pay the total interest for the remaining week which adds upto (2 week).",
      },
    ],
  },
];

// --- Accordion Item Component ---
const AccordionItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-gray-200">
    <button
      className={`flex justify-between items-center w-full py-4 text-left text-lg font-semibold transition-colors duration-200 focus:outline-none ${
        isOpen ? "text-blue-700" : "text-gray-800 hover:text-blue-600"
      }`}
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls={`faq-answer-${question.replace(/\s/g, "-")}`}
    >
      {question}
      {isOpen ? (
        <FaChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
      ) : (
        <FaChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
      )}
    </button>

    <div
      id={`faq-answer-${question.replace(/\s/g, "-")}`}
      role="region"
      aria-labelledby={`faq-question-${question.replace(/\s/g, "-")}`}
      className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
        isOpen ? "max-h-screen" : "max-h-0"
      }`}
    >
      <p className="pb-6 text-gray-600 leading-relaxed text-base">{answer}</p>
    </div>
  </div>
);

// --- Main FAQ Page Component ---
const FAQPage = () => {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (key) => {
    setOpenItem(openItem === key ? null : key);
  };

  return (
    <>
      <Header />
      <div
        id="faq"
        className="min-h-screen bg-gray-50 flex justify-center py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="w-full max-w-4xl">
          <header className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3">
              Your Questions, Answered
            </h1>
            <p className="text-lg text-blue-600">
              Frequently Asked Questions about Chembe Fintech Solutions.
            </p>
          </header>

          <div className="space-y-10">
            {faqData.map((category, catIndex) => (
              <section
                key={catIndex}
                className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-blue-600/50 pb-3">
                  {category.category}
                </h2>

                <div className="divide-y divide-gray-200">
                  {category.items.map((item, itemIndex) => {
                    const key = `${catIndex}-${itemIndex}`;
                    return (
                      <AccordionItem
                        key={key}
                        question={item.question}
                        answer={item.answer}
                        isOpen={openItem === key}
                        onClick={() => toggleItem(key)}
                      />
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQPage;
