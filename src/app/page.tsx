import About from "@/components/About";
import Adventures from "@/components/Adventures";
import Approach from "@/components/Approach";
import CareerGoals from "@/components/CareerGoals";
import Contact from "@/components/Contact";
import FeaturedWork from "@/components/FeaturedWork";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <main className="relative overflow-x-clip bg-[rgb(var(--background))]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.1),transparent_25%)]" />
      <Navigation />
      <Hero />
      <About />
      <FeaturedWork />
      <Approach />
      <Skills />
      <Adventures />
      <CareerGoals />
      <Contact />
    </main>
  );
}
