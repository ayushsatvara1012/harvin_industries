import { Suspense } from "react";
import {
  Hero,
  AboutSnippet,
  LatestProducts,
  ProductsSectionSkeleton,
  ManufacturingSection,
  AdvantageSection,
  IndustriesSection,
  CtaBanner,
} from "@/components/home";

export default function Home() {
  return (
    <>
      <main id="main" className="min-h-screen">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Who We Are Section */}
        <AboutSnippet />

        {/* 3. Our Products Section with Integrated Stats Strip */}
        <Suspense fallback={<ProductsSectionSkeleton />}>
          <LatestProducts />
        </Suspense>

        {/* 4. Our Manufacturing Section */}
        <ManufacturingSection />

        {/* 5. Our Advantage Section */}
        <AdvantageSection />

        {/* 6. Industries We Serve Section */}
        <IndustriesSection />

        {/* 7. Let's Build Together CTA Banner */}
        <CtaBanner />
      </main>
    </>
  );
}
