import { Navbar, Footer } from "@/components/layout";
import {
  Hero,
  AboutSnippet,
  LatestProducts,
  ManufacturingSection,
  AdvantageSection,
  IndustriesSection,
  CtaBanner,
  ClientLogosSection,
} from "@/components/home";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Who We Are Section */}
        <AboutSnippet />

        {/* 3. Our Products Section with Integrated Stats Strip */}
        <LatestProducts />

        {/* 4. Our Manufacturing Section */}
        <ManufacturingSection />

        {/* 5. Our Advantage Section */}
        <AdvantageSection />

        {/* 6. Industries We Serve Section */}
        <IndustriesSection />

        {/* 7. Let's Build Together CTA Banner */}
        <CtaBanner />

        {/* 8. Our Valued Customers Client Logos Section */}
        <ClientLogosSection />
      </main>
      <Footer />
    </>
  );
}
