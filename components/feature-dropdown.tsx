import { Check } from "lucide-react"

const features = [
  "10 Shelf Pullouts",
  "Replacing Old Cabinet Doors",
  "Painting New Doors in Desired Color",
  "Up to 22 Cabinet Doors"
]

export function FeatureDropdown() {
  return (
    <div className="relative">
      {/* Gradient border wrapper */}
      <div className="p-[2px] rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700">
        <div className="bg-background rounded-[10px] overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-border/50">
            <span className="text-[19px] sm:text-sm font-semibold text-foreground">Features</span>
          </div>
          
          {/* Features list - always visible */}
          <ul className="py-2 px-1">
            {features.map((feature, index) => (
              <li 
                key={index}
                className="flex items-center gap-3 px-3 py-2.5 text-[19px] sm:text-sm font-medium text-foreground"
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
