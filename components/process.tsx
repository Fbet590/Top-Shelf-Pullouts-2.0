"use client"

import { ClipboardList, Hammer, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Free Consultation",
    description:
      "Schedule a free estimate with our expert shelving designers. They will come to you, measure your spaces, and leave you with a customized quote for tailored services.",
  },
  {
    number: "02",
    icon: Hammer,
    title: "Custom Production",
    description:
      "Our custom pull-out shelves are made to order within 7-10 days using Baltic Birch wood and stainless steel glides. Once built, we schedule a convenient date for installation.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Install & White Glove Service",
    description:
      "We professionally install your sliding drawers in one day. After installation, our optional white glove service provides an organizer to help categorize and arrange your belongings.",
  },
]

export function Process() {
  return (
    <section id="process" className="py-24 lg:py-32 bg-secondary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-medium uppercase tracking-widest text-accent mb-4">How It Works</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-secondary-foreground text-balance">
            Three Simple Steps To A More Organized Home
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[calc(50%+2rem)] right-[calc(-50%+2rem)] h-px bg-border" />
              )}

              <div className="flex flex-col items-center text-center gap-6">
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-card border border-border">
                    <step.icon className="h-10 w-10 text-accent" />
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {step.number}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-xl text-secondary-foreground mb-3">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground max-w-sm">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-12">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6"
            onClick={() => document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Build My Pull Outs
          </Button>
        </div>
      </div>
    </section>
  )
}
