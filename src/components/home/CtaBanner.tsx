import Link from "next/link";
import Image from "next/image";

export function CtaBanner() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-[#121417] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[320px]">
            {/* Left Side: Text & Button on Dark Angled Background */}
            <div className="lg:col-span-7 z-10 flex flex-col justify-center p-8 sm:p-12 lg:p-16">
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.1]">
                Let&apos;s Build <br />
                <span className="text-amber-400">Together</span>
              </h2>

              <p className="mt-4 max-w-md text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                Get the right machine for your business. Our team is ready to help you with the best
                solution.
              </p>

              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-sm bg-amber-500 hover:bg-amber-600 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-black transition-all shadow-md hover:shadow-lg"
                >
                  <span>Request a Quote</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right Side: Palletized Finished Blocks Photo */}
            <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full">
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  clipPath: "polygon(14% 0%, 100% 0%, 100% 100%, 0% 100%)",
                }}
              >
                <Image
                  src="/images/mockup/cta-blocks-4k.webp"
                  alt="Manufactured Concrete Blocks Ready For Dispatch"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#121417]/80 via-transparent to-transparent lg:hidden" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
