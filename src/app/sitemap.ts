import type { MetadataRoute } from "next";
import { pmWritingPreviews } from "@/content/pmWritingPreviews";

const SITE_URL = "https://www.lizmutisya.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const writingPages: MetadataRoute.Sitemap = pmWritingPreviews.map(
    ({ slug }) => ({
      url: `${SITE_URL}/writings/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/recommendations`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...writingPages,
  ];
}
