import Image from "next/image";
import { Button } from "@/components/ui";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-brand-ink">
      {/* Full-bleed photo anchored to the right edge */}
      <div className="absolute inset-y-0 right-0 z-0 hidden lg:block w-[42%]">
        <Image
          src="/images/mockup/cta-blocks-4k.webp"
          alt="Manufactured Concrete Blocks Ready For Dispatch"
          fill
          sizes="42vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-brand-ink/20" />
      </div>

      {/* Yellow arrow edge cutting between the copy and the photo */}
      <div className="absolute inset-y-0 left-0 z-10 hidden lg:block w-[64%] bg-brand-yellow clip-wedge-right" />
      <div className="absolute inset-y-0 left-0 z-10 hidden lg:block w-[64%] -translate-x-[9px] bg-brand-ink clip-wedge-right" />

      <div className="relative z-20 mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-14 lg:max-w-[62%]">
          <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-white leading-[1.05] shrink-0">
            Let&apos;s Build <br />
            <span className="text-brand-yellow">Together</span>
          </h2>

          <div>
            <p className="max-w-md text-base lg:text-lg text-gray-300 leading-relaxed">
              Get the right machine for your business.
              <br />
              Our team is ready to help you with the best solution.
            </p>

            <Button href="/contact" className="mt-6">
              Request a Quote
            </Button>
          </div>
        </div>

        {/* Photo stacks beneath the copy on small screens */}
        <div className="relative mt-10 aspect-[16/7] w-full overflow-hidden lg:hidden">
          <Image
            src="/images/mockup/cta-blocks-4k.webp"
            alt="Manufactured Concrete Blocks Ready For Dispatch"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
