// src/app/page.tsx
import Header from "./components/layout/Header";
import Footer from "./components/layout/footer";
import HeroSection from "./components/Home/HeroSection";
import GadgetShowcase from "./components/Gadgets/GadgetCard";
import FeaturesGrid from "./components/FeaturedGrid";

export const metadata = {
  title: "Chembe Fintech Solutions",
  description: "Get a loan and shop for the latest gadgets.",
};

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="pt-20">
        <HeroSection />
        <section className="container mx-auto px-6 py-16">
          <FeaturesGrid />
          <div className="mt-16">
            <GadgetShowcase />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
