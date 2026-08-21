import { MetadataRoute } from "next";

// ─── Static sitemap ──────────────────────────────────────────────────────────
// Purely static — no external API calls, no async, no dependencies.
// A static sitemap is the most reliable possible implementation:
//   • Can never fail due to a Sanity network error at build time
//   • Produces valid, deterministic XML every single build
//   • Any "Sitemap could not be read" error is a deployment/DNS issue, not code
//
// The canonical domain is hard-coded here intentionally.  If you ever change
// domain, update it in exactly one place: the CANONICAL constant below.
// ─────────────────────────────────────────────────────────────────────────────

const CANONICAL = "https://afsaracademy.com";

// Use a fixed date so the sitemap is identical across builds (avoids spurious
// cache busts).  Update this when you make significant content changes.
const LAST_MODIFIED = new Date("2025-01-01");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: CANONICAL,
      lastModified: LAST_MODIFIED,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${CANONICAL}/about`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${CANONICAL}/courses`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${CANONICAL}/faculty`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${CANONICAL}/gallery`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${CANONICAL}/contact`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
