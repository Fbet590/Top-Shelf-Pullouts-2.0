"use client"

import { useState } from "react"
import { ChevronDown, Check } from "lucide-react"

const features = [
  "10 Shelf Pullouts",
  "Replacing Old Cabinet Doors",
  "Painting New Doors in Desired Color",
  "Up to 22 Cabinet Doors"
]

export function FeatureDropdown() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      {/* Gradient border wrapper */}
      <div className="p-[2px] rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-background rounded-[10px] transition-colors hover:bg-secondary/50"
          aria-expanded={isOpen}
          aria-controls="feature-list"
        >
          <span className="text-sm font-medium text-foreground">Features</span>
          <ChevronDown 
            className={`h-4 w-4 text-accent transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </button>
      </div>

      {/* Dropdown content */}
      <div
        id="feature-list"
        className={`overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? 'max-h-64 opacity-100 mt-2' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-[2px] rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700">
          <ul className="bg-background rounded-[10px] py-2 px-1">
            {features.map((feature, index) => (
              <li 
                key={index}
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-foreground"
              >
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center">
                  <Check className="h-3 w-3 text-accent" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
