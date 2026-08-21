import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio/", "/api/", "/_next/static/", "/_next/image/"],
    },
    sitemap: "https://www.afsaracademy.com/sitemap.xml",
  };
}
