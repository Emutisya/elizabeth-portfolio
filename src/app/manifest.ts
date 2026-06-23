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
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
