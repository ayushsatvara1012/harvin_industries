import { Header, Footer } from "@/components/layout";
import {
  Hero,
  TrustStrip,
  AboutSnippet,
  KeyFactors,
  HowItWorks,
  LatestProducts,
  CtaBanner,
} from "@/components/home";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <AboutSnippet />
        <KeyFactors />
        <HowItWorks />
        <LatestProducts />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
