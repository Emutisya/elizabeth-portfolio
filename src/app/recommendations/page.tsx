import type { Metadata } from "next";
import Aurora from "@/components/Aurora";
import ColleagueRecommendations from "@/components/ColleagueRecommendations";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "Colleague Recommendations",
  description:
    "What Microsoft colleagues say about working with Elizabeth Mutisya and the impact she delivers.",
  alternates: {
    canonical: "/recommendations",
  },
};

export default function RecommendationsPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-[rgb(var(--background))]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.1),transparent_25%)]" />
      <Aurora />
      <ScrollProgress />
      <Navigation />
      <ColleagueRecommendations />
    </main>
  );
}
