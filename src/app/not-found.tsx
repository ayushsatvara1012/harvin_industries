import { Navbar, Footer } from "@/components/layout";
import { Button, Eyebrow } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex flex-1 flex-col items-center justify-center bg-white px-4 py-24 text-center">
        <Eyebrow tone="accent">404 Error</Eyebrow>
        <h1 className="mt-4 font-display text-5xl tracking-tight text-brand-ink sm:text-6xl">
          Page Not Found
        </h1>
        <p className="mt-4 max-w-md text-base text-brand-text-secondary">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <Button href="/" className="mt-8">
          Back to Home
        </Button>
      </main>
      <Footer />
    </>
  );
}
