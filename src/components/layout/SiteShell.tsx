import { getAllProducts } from "@/lib/products";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export async function SiteShell({ children }: { children: React.ReactNode }) {
  // The shell must still render if the catalog cannot load, so a database outage
  // degrades the nav search instead of taking every page down.
  const products = await getAllProducts().catch(() => []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-brand-ink focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <Navbar products={products} />
      {children}
      <Footer />
    </>
  );
}
