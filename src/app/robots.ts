import type {MetadataRoute} from "next";

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://aletheia.pro";
}

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/ru/legal/", "/en/legal/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
