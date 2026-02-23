import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import ProblemSection from "@/components/landing/ProblemSection";
import Comparison from "@/components/landing/Comparison";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-offwhite">
      <Header />
      <main>
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <Comparison />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
