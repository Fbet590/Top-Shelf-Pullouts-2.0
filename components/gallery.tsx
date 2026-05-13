"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const images = [
  { src: "/images/gallery-dark-cabinet-pullouts.png", alt: "Double pull-out birch shelves in dark espresso cabinets" },
  { src: "/images/gallery-narrow-spice-rack.png", alt: "Narrow pull-out spice and pantry rack in cherry cabinets" },
  { src: "/images/gallery-tall-cabinet-shelves.png", alt: "Multiple pull-out shelves extended from tall cabinet" },
  { src: "/images/gallery-full-pantry.png", alt: "Full pantry with ten pull-out birch shelves in maple cabinets" },
  { src: "/images/gallery-trash-organizer-dark.png", alt: "Pull-out trash can organizer in dark gray cabinet" },
  { src: "/images/gallery-double-trash-white.png", alt: "Double trash can pull-out system in white cabinets" },
  { src: "/images/gallery-before-after.png", alt: "Before and after closet transformation with pull-out shelves" },
  { src: "/images/pullout-shelf.jpg", alt: "Custom pull-out shelf installed in kitchen cabinet" },
  { src: "/images/spice-rack.jpg", alt: "Pull-out spice rack with organized bottles" },
  { src: "/images/drawer-organizer.jpg", alt: "Custom drawer organizer with dividers" },
  { src: "/images/blind-corner.jpg", alt: "Blind corner pull-out shelf solution" },
]

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex + 1) % images.length)
  }, [lightboxIndex])

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)
  }, [lightboxIndex])

  useEffect(() => {
    if (lightboxIndex === null) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowRight") goNext()
      if (e.key === "ArrowLeft") goPrev()
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKey)
    }
  }, [lightboxIndex, goNext, goPrev])

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-secondary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-medium uppercase tracking-widest text-accent mb-4">Our Work</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-secondary-foreground text-balance">
            See The Transformation
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Browse our portfolio of custom installations across kitchens, pantries, bathrooms, and more.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={`${image.src}-${index}`}
              onClick={() => openLightbox(index)}
              className={`relative overflow-hidden rounded-xl cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                index === 0 || index === 3 || index === 6 || index === 9 ? "row-span-2 aspect-[3/4]" : "aspect-[4/3]"
              }`}
              aria-label={`View larger: ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium bg-foreground/50 backdrop-blur-sm rounded-full px-4 py-2">
                  View larger
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-12">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6"
            onClick={() => document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Book Free Consultation
          </Button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 backdrop-blur-sm"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Image: ${images[lightboxIndex].alt}`}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/20 text-background hover:bg-background/30 transition-colors backdrop-blur-sm"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            className="absolute left-4 lg:left-8 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-background/20 text-background hover:bg-background/30 transition-colors backdrop-blur-sm"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Image */}
          <div
            className="relative w-[90vw] h-[80vh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext() }}
            className="absolute right-4 lg:right-8 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-background/20 text-background hover:bg-background/30 transition-colors backdrop-blur-sm"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-background/70 bg-foreground/40 backdrop-blur-sm rounded-full px-4 py-1.5">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  )
}
