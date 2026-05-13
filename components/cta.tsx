import { Button } from "@/components/ui/button"
import { Phone, ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-primary px-8 py-16 sm:px-16 sm:py-24 text-center">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-primary-foreground blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary-foreground blur-3xl translate-x-1/3 translate-y-1/3" />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8 max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary-foreground text-balance">
              Ready to transform your cabinets?
            </h2>
            <p className="text-lg leading-relaxed text-primary-foreground/80">
              Contact us today for a free, no-obligation estimate. Our design consultants will come to you with customized solutions for your home.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-base px-8 py-6"
              >
                <a href="https://topshelfpullouts.com/contact-us/" target="_blank" rel="noopener noreferrer">
                  Schedule Free Estimate
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8 py-6"
              >
                <a href="tel:8338677453">
                  <Phone className="mr-2 h-5 w-5" />
                  (833) 867-7453
                </a>
              </Button>
            </div>

            <p className="text-sm text-primary-foreground/60">
              Serving Carlsbad, San Diego, and surrounding areas
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
