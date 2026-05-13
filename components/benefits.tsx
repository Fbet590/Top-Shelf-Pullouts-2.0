"use client"

import { Accessibility, Maximize2, LayoutGrid, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

const benefits = [
  {
    icon: Accessibility,
    title: "Better Access",
    description:
      "No more awkwardly getting on your hands and knees. Everything is properly displayed and within easy reach.",
  },
  {
    icon: Maximize2,
    title: "Increase Your Space",
    description:
      "Optimize unused cabinet space with pull-out shelves, giving you more room in areas you thought were useless.",
  },
  {
    icon: LayoutGrid,
    title: "More Organization",
    description:
      "Our roll-out shelves help you organize your belongings for easy delegation. Save time for more productive things in life.",
  },
  {
    icon: ShieldCheck,
    title: "Lifetime Warranty",
    description:
      "Built with Baltic Birch and stainless steel glides using dovetail manufacturing. We stand behind our products with a limited lifetime warranty.",
  },
]

export function Benefits() {
  return (
    <section id="benefits" className="py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-medium uppercase tracking-widest text-primary-foreground/60 mb-4">
            Why Top Shelf
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary-foreground text-balance">
            Get The Most Out Of Your Shelves
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex flex-col items-center text-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/10 border border-primary-foreground/20">
                <benefit.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="font-serif text-xl text-primary-foreground">{benefit.title}</h3>
              <p className="text-sm leading-relaxed text-primary-foreground/70">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-12">
          <Button
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-base px-8 py-6"
            onClick={() => document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Upgrade My Space
          </Button>
        </div>
      </div>
    </section>
  )
}
