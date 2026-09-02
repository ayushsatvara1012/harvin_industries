import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AboutSnippet } from "@/components/AboutSnippet";
import { KeyFactors } from "@/components/KeyFactors";
import { LatestProducts } from "@/components/LatestProducts";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutSnippet />
        <KeyFactors />
        <LatestProducts />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
