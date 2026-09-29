import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Elizabeth Waeni Mutisya — Liz Mutisya",
    short_name: "Liz Mutisya",
    description:
      "Elizabeth Waeni Mutisya (Liz Mutisya) — Product Manager at Microsoft.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0a12",
    theme_color: "#0b0a12",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
