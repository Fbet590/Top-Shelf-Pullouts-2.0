"use client"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  {
    title: "Pull-Out Shelves",
    description: "Custom sliding shelves for cabinets, pantries, and closets. Get full access to every inch of your storage space.",
    image: "/images/pullout-shelf.jpg",
  },
  {
    title: "Spice Racks",
    description: "Multi-tiered pull-out spice systems that keep your seasonings organized and within reach while cooking.",
    image: "/images/spice-rack.jpg",
  },
  {
    title: "Drawer Organizers",
    description: "Custom divider bins and organizer inserts that transform messy drawers into perfectly arranged storage.",
    image: "/images/drawer-organizer.jpg",
  },
  {
    title: "Blind Corner Solutions",
    description: "Maximize those hard-to-reach corner cabinets with custom slide-out systems designed for full accessibility.",
    image: "/images/blind-corner.jpg",
  },
]

export function Services() {
  return (
    <section id="services" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-medium uppercase tracking-widest text-accent mb-4">Our Services</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground text-balance">
            Customized Shelving For Every Space
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            From tiny linen closets to four-car garages, we construct sliding drawers personalized to match your lifestyle.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <article
              key={service.title}
              className="group relative rounded-xl overflow-hidden bg-card border-[2.5px] border-border hover:border-primary/30 transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif text-xl text-foreground">{service.title}</h3>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors shrink-0 mt-1" />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Additional services list */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {["Overhead Trays", "Divider Bins", "Trash Bins", "Center Post Removal", "Drawer in a Drawer", "Tri-Pull Roll Out", "Caddies"].map((service) => (
            <span
              key={service}
              className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground"
            >
              {service}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-12">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6"
            onClick={() => document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Upgrade My Cabinets
          </Button>
        </div>
      </div>
    </section>
  )
}
