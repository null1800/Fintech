// convexClient.ts
"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";

// The deployment URL will be shown in your Convex dashboard
const address = process.env.NEXT_PUBLIC_CONVEX_URL as string;

// Create the client
export const convex = new ConvexReactClient(address);

// Export provider wrapper
export { ConvexProvider };
// Usage: Wrap your app with <ConvexProvider client={convex}>...</ConvexProvider>