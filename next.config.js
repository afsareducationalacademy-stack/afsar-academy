/** @type {import('next').NextConfig} */

// ─── Content Security Policy ────────────────────────────────────────────────
// Carefully whitelisted for every external resource this site actually uses:
//   • Google Fonts   (style-src / font-src)
//   • Sanity CDN     (img-src / connect-src) — project o58ljzka
//   • Google Maps    (frame-src) — contact page embed
//   • Next.js        (script-src 'unsafe-inline') — inline hydration scripts
//   • JSON-LD        (script-src 'unsafe-inline') — structured data blocks
// The /studio route gets its own relaxed policy because Sanity Studio
// requires broader access (blob:, data:, eval, web workers, etc.)
const csp = (isStudio) => {
  if (isStudio) {
    // Sanity Studio needs a very permissive policy — keep it scoped to /studio
    return [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https://cdn.sanity.io https://*.sanity.io",
      "connect-src 'self' https://*.api.sanity.io https://*.apicdn.sanity.io wss://*.api.sanity.io https://api.sanity.io",
      "frame-src 'self' https://www.google.com https://maps.google.com",
      "worker-src blob:",
      "object-src 'none'",
      "base-uri 'self'",
    ].join("; ");
  }

  return [
    // Fallback for anything not covered below
    "default-src 'self'",

    // Scripts: Next.js injects inline scripts for hydration and we use
    // dangerouslySetInnerHTML for JSON-LD — so 'unsafe-inline' is required.
    // 'unsafe-eval' is NOT included (not needed in production builds).
    "script-src 'self' 'unsafe-inline'",

    // Styles: Tailwind uses inline styles; Google Fonts stylesheet comes from
    // fonts.googleapis.com, then the actual font files come from gstatic.
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",

    // Fonts: Google Fonts glyphs are served from fonts.gstatic.com
    "font-src 'self' https://fonts.gstatic.com data:",

    // Images: Sanity CDN serves all CMS-uploaded media
    "img-src 'self' data: blob: https://cdn.sanity.io https://*.sanity.io",

    // XHR / fetch / WebSocket: Sanity real-time updates + API calls
    "connect-src 'self' https://*.api.sanity.io https://*.apicdn.sanity.io wss://*.api.sanity.io https://api.sanity.io",

    // Frames: Google Maps embed on the contact page only
    "frame-src https://www.google.com https://maps.google.com",

    // Media: no external audio/video
    "media-src 'self'",

    // Block Flash, Java, etc.
    "object-src 'none'",

    // Prevent <base> tag injection
    "base-uri 'self'",

    // Form submissions only to same origin (form dispatches to WhatsApp via JS
    // window.open, not a form action — so this restriction is safe)
    "form-action 'self'",

    // Prevent this site from being embedded in foreign iframes (same as X-Frame-Options)
    "frame-ancestors 'self'",

    // Force HTTPS for any mixed-content requests
    "upgrade-insecure-requests",
  ].join("; ");
};

const nextConfig = {
  async headers() {
    return [
      // ── Sanity Studio: relaxed policy scoped to /studio only ────────────────
      {
        source: "/studio/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp(true) },
          { key: "X-Frame-Options",         value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options",  value: "nosniff" },
          { key: "Referrer-Policy",          value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
          },
        ],
      },

      // ── All other routes: strict policy ────────────────────────────────────
      {
        source: "/((?!studio).*)",
        headers: [
          { key: "Content-Security-Policy", value: csp(false) },

          // Prevent clickjacking — only allow framing from same origin
          { key: "X-Frame-Options",         value: "SAMEORIGIN" },

          // Prevent MIME-type sniffing attacks
          { key: "X-Content-Type-Options",  value: "nosniff" },

          // Control referrer information sent with outgoing requests
          { key: "Referrer-Policy",          value: "strict-origin-when-cross-origin" },

          // Disable unused browser features / APIs
          {
            key: "Permissions-Policy",
            value: [
              "camera=()",           // no camera access
              "microphone=()",       // no mic access
              "geolocation=(self)",  // allow own origin (maps fallback)
              "interest-cohort=()",  // opt out of FLoC / Topics API
              "payment=()",          // no payment requests
              "usb=()",              // no USB access
            ].join(", "),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
