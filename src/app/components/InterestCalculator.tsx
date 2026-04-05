"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, ArrowRight, TrendingUp } from "lucide-react";

// The constant rates object remains correct
const rates: Record<number, number> = {
  1: 25, // 25%
  2: 30, // 30%
  3: 35, // 35%
  4: 40, // 40%
};

// Utility for formatting currency (Zambian Kwacha)
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-ZM', {
    style: 'currency',
    currency: 'ZMW',
    minimumFractionDigits: 2,
  }).format(value);
};

export default function InterestCalculator() {
  const [amount, setAmount] = useState<string>("1000"); 
  const [weeks, setWeeks] = useState<number>(1);
  const [result, setResult] = useState<{ interest: number; total: number } | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // 1. Input Validation
    if (!amount) {
      setResult(null);
      setError("Please enter a loan amount.");
      return;
    }

    const loanAmount = Number(amount);
    if (isNaN(loanAmount) || loanAmount <= 0) {
      setResult(null);
      setError("Please enter a valid positive number.");
      return;
    }

    // 2. Calculation Logic
    const rate = rates[weeks] || 0;
    const interest = (loanAmount * rate) / 100;
    const total = loanAmount + interest;

    setResult({ interest, total });
    setError("");
  }, [amount, weeks]);

  return (
    <motion.div
      className="p-8 mt-4 rounded-3xl border border-blue-100 bg-white shadow-2xl shadow-blue-200/50 max-w-2xl mx-auto"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-blue-800 text-2xl font-bold mb-6 flex items-center justify-center">
        <Calculator className="w-6 h-6 mr-2" />
        Loan Repayment Calculator
      </h3>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Loan Amount Input */}
        <div className="space-y-1">
          <label htmlFor="loanAmount" className="block text-gray-700 font-medium text-sm">
            Loan Amount (ZMW)
          </label>
          <motion.input
            id="loanAmount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-lg font-semibold focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition duration-200"
            placeholder="e.g., 1000"
            whileFocus={{ scale: 1.01 }}
          />
        </div>

        {/* Weeks Selection */}
        <div className="space-y-1">
          <label htmlFor="repaymentDuration" className="block text-gray-700 font-medium text-sm">
            Repayment Duration
          </label>
          <motion.select
            id="repaymentDuration"
            value={weeks}
            onChange={(e) => setWeeks(Number(e.target.value))}
            className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-lg font-semibold appearance-none bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition duration-200"
            title="Select repayment duration"
            whileFocus={{ scale: 1.01 }}
          >
            {/* 💡 FIX APPLIED HERE: Dynamically generating options using the rates object */}
            {Object.entries(rates).map(([week, rate]) => (
              <option key={week} value={Number(week)}>
                {week} Week{Number(week) > 1 ? 's' : ''} ({rate}%)
              </option>
            ))}
          </motion.select>
          <p className="text-xs text-gray-500 mt-1 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" />
            Rate: **{rates[weeks] || 0}%**
          </p>
        </div>
      </div>

      {error && <p className="text-red-600 font-semibold text-center mb-4">{error}</p>}

      {/* Result Display */}
      {result && (
        <motion.div
          className="mt-6 p-6 bg-blue-50 border-t-4 border-blue-500 rounded-xl shadow-inner space-y-3"
          key={result.total} 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <div className="flex justify-between items-center border-b border-blue-200 pb-2">
            <p className="text-gray-600 font-medium">Interest Payable</p>
            <p className="text-lg font-bold text-red-600">
              {formatCurrency(result.interest)}
            </p>
          </div>
          
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-extrabold text-blue-900 flex items-center">
                Total Repayment Due
            </h4>
            <h4 className="text-2xl font-extrabold text-green-600">
              {formatCurrency(result.total)}
            </h4>
          </div>

          <p className="text-xs text-center pt-2 text-gray-500">
            * This is an estimate based on your selection. Final terms are accurately based on this.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}