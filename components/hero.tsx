import Image from "next/image"
import { Star } from "lucide-react"
import { LeadForm } from "@/components/lead-form"

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
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm text-amber-100/70">
                5.0 stars on Yelp & Google
              </span>
            </div>

            <h1 className="font-serif text-[3.25rem] sm:text-[3.5rem] lg:text-[4.25rem] xl:text-[5rem] leading-tight text-white">
              <span className="block">A new kitchen. <span className="text-amber-400">$11,500 flat.</span></span>
            </h1>

            <p className="text-xl sm:text-2xl leading-relaxed text-amber-100/90 max-w-lg font-light">
              Forget the $30,000 remodel. Have your kitchen repainted and add pullouts for organization.
            </p>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="font-serif text-3xl text-white">2M+</p>
                <p className="text-sm text-amber-100/60">Shelves Sold</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div>
                <p className="font-serif text-3xl text-white">20+</p>
                <p className="text-sm text-amber-100/60">Years Experience</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div>
                <p className="font-serif text-3xl text-white">5.0</p>
                <p className="text-sm text-amber-100/60">Star Rating</p>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
                <span className="text-sm font-medium text-white">Limited Lifetime Warranty</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
                <span className="text-sm font-medium text-white">Free Estimates</span>
              </div>
            </div>
          </div>

          {/* Lead Capture Form */}
          <div id="hero-form" className="bg-background rounded-2xl p-6 lg:p-8 shadow-2xl border-2 border-accent/30 scroll-mt-24 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-accent via-primary to-accent" />
            <div className="flex flex-col gap-1 pb-5 border-b border-border mb-5">
              <h2 className="font-serif text-[28px] sm:text-[32px] text-foreground leading-tight">10 Pullouts & Cabinet Door Repainting — <span className="text-accent">$11,500 Flat</span></h2>
              <p className="text-[18px] sm:text-[20px] text-muted-foreground">
                {"Replace and repaint your cabinet doors to your desired color. Fill out the form for a free estimate!"}
              </p>
            </div>
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  )
}
