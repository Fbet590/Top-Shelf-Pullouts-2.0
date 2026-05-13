"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function YelpIcon() {
  return (
    <Image
      src="/images/yelp-logo.png"
      alt="Yelp"
      width={48}
      height={24}
      className="h-6 w-auto"
    />
  )
}

const testimonials = [
  {
    name: "Phil B.",
    text: "It's been a year since we had the company build and install a number of pull out shelves in our kitchen. They still look and work like new and my wife couldn't be happier.",
    source: "yelp" as const,
  },
  {
    name: "Lisa P.",
    text: "Excellent quality and service. Efficient ideas for customizing all your needs. I ordered 13 pullouts total and might do a few more, now that my kitchen is so organized.",
    source: "yelp" as const,
  },
  {
    name: "Maria Butler",
    text: "Great job! These new shelves make a difference. The entire process was a pleasure. People were all great, from sales to installation. Shelves were well made. They glide out easily.",
    source: "google" as const,
  },
  {
    name: "Charlie Schooler",
    text: "It is wonderful to be able to finally use all of the shelf space. Top Shelf did exactly what they said they were going to do - at the time they initially quoted. No surprises.",
    source: "google" as const,
  },
  {
    name: "Marc & Eva",
    text: "Fantastic service - honest and great craftsmanship! We had TOP SHELF do our food cupboard with all the pull out shelves and wow - what a difference it makes!",
    source: "google" as const,
  },
  {
    name: "Vicki B.",
    text: "My kitchen life is SO MUCH EASIER with Top Shelf drawers. I can see my supplies and grocery inventory by easing the cabinet drawers in and out on smooth glides.",
    source: "yelp" as const,
  },
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [direction, setDirection] = useState<"left" | "right">("right")

  // Always use 3 items per page for consistent rendering
  const itemsPerPage = 3
  const totalPages = Math.ceil(testimonials.length / itemsPerPage)

  const goTo = useCallback((index: number, dir: "left" | "right") => {
    if (isTransitioning) return
    setDirection(dir)
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrent(index)
      setIsTransitioning(false)
    }, 300)
  }, [isTransitioning])

  const next = useCallback(() => {
    goTo((current + 1) % totalPages, "right")
  }, [current, totalPages, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + totalPages) % totalPages, "left")
  }, [current, totalPages, goTo])

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  const visibleTestimonials = testimonials.slice(current * itemsPerPage, current * itemsPerPage + itemsPerPage)

  return (
    <section id="reviews" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-medium uppercase tracking-widest text-accent mb-4">Testimonials</p>
          <h2 className="font-serif text-[2.25rem] sm:text-4xl lg:text-5xl text-foreground text-balance">
            Loved By Homeowners Across San Diego
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">5.0 on Yelp</span>
              <span className="text-sm text-muted-foreground">(102 reviews)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">5.0 on Google</span>
              <span className="text-sm text-muted-foreground">(45 reviews)</span>
            </div>
          </div>
        </div>

        {/* Slideshow */}
        <div className="relative overflow-hidden">
          <div
            className="grid md:grid-cols-3 gap-6 transition-all duration-500 ease-in-out"
            style={{
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning
                ? direction === "right"
                  ? "translateX(60px)"
                  : "translateX(-60px)"
                : "translateX(0)",
            }}
          >
            {visibleTestimonials.map((testimonial, index) => (
              <article
                key={testimonial.name}
                className={`rounded-xl bg-card border border-border p-10 sm:p-8 flex flex-col gap-6 sm:gap-5 ${index > 0 ? "hidden md:flex" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <Quote className="h-12 w-12 sm:h-10 sm:w-10 text-accent/30" />
                  {testimonial.source === "google" ? (
                    <GoogleIcon className="h-8 w-8 sm:h-7 sm:w-7" />
                  ) : (
                    <YelpIcon />
                  )}
                </div>
                <p className="text-lg sm:text-base leading-relaxed text-muted-foreground flex-1">
                  {`"${testimonial.text}"`}
                </p>
                <div className="flex items-center justify-between pt-5 sm:pt-4 border-t border-border">
                  <div className="flex items-center gap-4 sm:gap-3">
                    <div className="flex h-14 w-14 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-secondary">
                      <span className="text-lg sm:text-base font-bold text-secondary-foreground">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-lg sm:text-base font-medium text-foreground">{testimonial.name}</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 sm:h-4 sm:w-4 fill-accent text-accent" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-base sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    {testimonial.source}
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full border-border"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > current ? "right" : "left")}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-6 bg-accent" : "w-2 bg-border hover:bg-muted-foreground"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full border-border"
              aria-label="Next testimonials"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-12">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6"
            onClick={() => document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get A Free Quote
          </Button>
        </div>
      </div>
    </section>
  )
}
