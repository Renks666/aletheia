import type {MetadataRoute} from "next";

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://aletheia.pro";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  return [
    {
      url: `${siteUrl}/ru`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/en`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
