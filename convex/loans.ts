import { mutation } from "convex/server";

interface LoanData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  employed: "Yes" | "No";
  jobTitle?: string; // optional if employed = "No"
  loanAmount: string;
  duration: string;
  collateralType: string;
  collateralValue: string;
  collateralDescription: string;
}

export const createLoan = mutation(async ({ db }, loanData: LoanData) => {
  await db.insert("loans", loanData);
});
