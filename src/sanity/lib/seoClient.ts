import { createClient } from "next-sanity";

export const seoClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "o58ljzka",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: false, // Bypass edge caching to fetch immediate live updates
  stega: false, // Drop stega annotations to ensure clean head elements
});
