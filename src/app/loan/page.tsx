"use client";

import LoanApplicationForm from "../components/forms/LoanApplicationForm";

export default function LoanPage() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center py-10">
      <div className="w-full max-w-lg">
        <LoanApplicationForm onClose={() => {}} />
      </div>
    </main>
  );
}
