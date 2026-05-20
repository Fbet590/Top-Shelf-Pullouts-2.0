import Image from "next/image"
import { LeadForm } from "@/components/lead-form"
import { FeatureDropdown } from "@/components/feature-dropdown"

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-kitchen.jpg"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#1a1208]/75" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Text Content */}
          <div className="flex flex-col gap-8">
            <h1 className="font-serif text-[3.875rem] sm:text-[3.5rem] lg:text-[4.25rem] xl:text-[5rem] leading-tight text-white">
              <span className="block">A new kitchen. <span className="text-amber-400">$11,500 flat.</span></span>
            </h1>

            <p className="text-xl sm:text-2xl leading-relaxed text-amber-100/90 max-w-lg font-light">
              Forget the $30,000 remodel. Have your kitchen repainted and add pullouts for organization.
            </p>

            <a 
              href="#hero-form" 
              className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold tracking-wide text-white rounded-full w-fit overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 bg-[length:200%_100%] animate-shimmer" />
              <span className="absolute inset-0 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute inset-[2px] rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-50" />
              <span className="relative flex items-center gap-2">
                SEE IF MY SPACE QUALIFIES
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
          </div>

          {/* Lead Capture Form */}
          <div id="hero-form" className="bg-background rounded-2xl p-6 lg:p-8 shadow-2xl border-2 border-accent/30 scroll-mt-24 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-accent via-primary to-accent" />
            <div className="flex flex-col gap-4 pb-5 border-b border-border mb-5">
              <h2 className="font-serif text-[37px] sm:text-[43px] text-foreground leading-tight font-semibold">The Kitchen Facelift Package — <span className="text-accent">$11,500 Flat</span></h2>
              <FeatureDropdown />
            </div>
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  )
}
