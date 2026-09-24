import { Navbar, Footer } from "@/components/layout";
import { PRODUCTS } from "@/data/products";

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar products={PRODUCTS} />
      {children}
      <Footer />
    </>
  );
}
