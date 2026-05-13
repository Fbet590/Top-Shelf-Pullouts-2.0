import { MapPin, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <div>
              <span className="font-serif text-2xl text-card-foreground">Top Shelf</span>
              <span className="ml-1 text-sm font-medium uppercase tracking-widest text-muted-foreground">Pull Outs</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Custom pull-out shelves handcrafted in San Diego since 2002. Over 2 million shelves sold.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-card-foreground mb-4">Services</h3>
            <ul className="flex flex-col gap-3" role="list">
              {["Pull-Out Shelves", "Spice Racks", "Drawer Organizers", "Blind Corner Solutions", "Overhead Trays", "Trash Bins"].map((service) => (
                <li key={service}>
                  <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-card-foreground mb-4">Company</h3>
            <ul className="flex flex-col gap-4" role="list">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                Carlsbad, CA &mdash; Serving San Diego & surrounding areas
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 shrink-0 mt-0.5" />
                Free estimates available
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Top Shelf Pull Outs. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Handcrafted in San Diego, CA
          </p>
        </div>
      </div>
    </footer>
  )
}
