import { z } from "zod";

const loanFormSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?[0-9]{9,15}$/, "Invalid phone number"),
  address: z.string().min(5, "Address is too short"),
  employed: z.string().nonempty("Employment status required"),
  jobTitle: z.string().optional(),
  loanAmount: z.string().nonempty("Loan amount required"),
  duration: z.string().nonempty("Duration required"),
  collateralType: z.string().nonempty("Collateral type required"),
  collateralValue: z.string().nonempty("Collateral value required"),
  collateralDescription: z.string().min(5, "Description must be at least 5 characters"),
});
