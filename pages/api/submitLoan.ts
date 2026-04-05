import type { NextApiRequest, NextApiResponse } from "next";
import rateLimit from "express-rate-limit";

// ✅ Define rate limiter
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // max 5 requests per minute
  message: "Too many requests, please try again later.",
});

// ✅ Helper to run middleware properly in Next.js
const runMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  fn: (req: NextApiRequest, res: NextApiResponse, next: (result?: unknown) => void) => void
): Promise<void> => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result?: unknown) => {
      if (result instanceof Error) return reject(result);
      return resolve();
    });
  });
};

// ✅ Main handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await runMiddleware(req, res, limiter);

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { fullName, email, phone, loanAmount } = req.body;

    if (!fullName || !email || !phone || !loanAmount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Example: log or process the loan data
    console.log("Loan submission received:", req.body);

    return res.status(200).json({ success: true, message: "Loan submitted successfully" });
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
