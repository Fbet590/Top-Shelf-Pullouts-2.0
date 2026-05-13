"use client"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, ArrowRight, Check, Loader2, User, Mail, Phone, AlertCircle } from "lucide-react"

const TOTAL_STEPS = 3

// List of disposable/temporary email domains to block
const DISPOSABLE_EMAIL_DOMAINS = [
  "tempmail.com", "throwaway.com", "guerrillamail.com", "mailinator.com",
  "10minutemail.com", "trashmail.com", "fakeinbox.com", "tempinbox.com",
  "dispostable.com", "yopmail.com", "getnada.com", "temp-mail.org",
  "sharklasers.com", "guerrillamail.info", "grr.la", "spam4.me"
]

// Validate email format and quality
function validateEmail(email: string): { valid: boolean; error?: string } {
  const trimmed = email.trim().toLowerCase()
  
  // Basic format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: "Please enter a valid email address" }
  }
  
  // Check for common typos in popular domains
  const domain = trimmed.split("@")[1]
  const typoMap: Record<string, string> = {
    "gmial.com": "gmail.com",
    "gmai.com": "gmail.com", 
    "gamil.com": "gmail.com",
    "gnail.com": "gmail.com",
    "gmail.co": "gmail.com",
    "yahooo.com": "yahoo.com",
    "yaho.com": "yahoo.com",
    "hotmal.com": "hotmail.com",
    "hotmai.com": "hotmail.com",
    "outlok.com": "outlook.com",
    "outloo.com": "outlook.com",
  }
  if (typoMap[domain]) {
    return { valid: false, error: `Did you mean ${trimmed.split("@")[0]}@${typoMap[domain]}?` }
  }
  
  // Block disposable emails
  if (DISPOSABLE_EMAIL_DOMAINS.includes(domain)) {
    return { valid: false, error: "Please use a permanent email address" }
  }
  
  // Check for suspicious patterns (keyboard smashing, repeated chars)
  const localPart = trimmed.split("@")[0]
  if (/^(.)\1{4,}$/.test(localPart) || /^[qwerty]{5,}$/i.test(localPart) || /^[asdfgh]{5,}$/i.test(localPart)) {
    return { valid: false, error: "Please enter a real email address" }
  }
  
  // Minimum length for local part
  if (localPart.length < 2) {
    return { valid: false, error: "Email address is too short" }
  }
  
  return { valid: true }
}

// Validate phone number
function validatePhone(phone: string): { valid: boolean; error?: string } {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, "")
  
  // Must have at least 10 digits
  if (digits.length < 10) {
    return { valid: false, error: "Please enter a valid 10-digit phone number" }
  }
  
  // Check for fake patterns
  const fakePatterns = [
    /^(.)\1{9,}$/, // All same digit (1111111111)
    /^1234567890$/, // Sequential
    /^0123456789$/, // Sequential
    /^9876543210$/, // Reverse sequential
    /^0{10}$/, // All zeros
    /^1{10}$/, // All ones
  ]
  
  if (fakePatterns.some(pattern => pattern.test(digits))) {
    return { valid: false, error: "Please enter a real phone number" }
  }
  
  // Check for obviously fake area codes (000, 111, 555 for non-555-01xx)
  const areaCode = digits.substring(0, 3)
  if (areaCode === "000" || areaCode === "111") {
    return { valid: false, error: "Please enter a valid area code" }
  }
  
  // 555 is only valid for 555-0100 to 555-0199
  if (areaCode === "555") {
    const exchange = digits.substring(3, 7)
    if (exchange < "0100" || exchange > "0199") {
      return { valid: false, error: "Please enter a real phone number" }
    }
  }
  
  return { valid: true }
}

// Format phone number as user types
function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "")
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
}

export function LeadForm() {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState<"forward" | "back">("forward")
  const [isAnimating, setIsAnimating] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const containerRef = useRef<HTMLDivElement>(null)

  // Validate current step
  function validateStep(): boolean {
    switch (step) {
      case 0: {
        if (name.trim().length < 2) {
          setErrors(prev => ({ ...prev, name: "Please enter your full name" }))
          return false
        }
        setErrors(prev => ({ ...prev, name: "" }))
        return true
      }
      case 1: {
        const result = validateEmail(email)
        if (!result.valid) {
          setErrors(prev => ({ ...prev, email: result.error || "Invalid email" }))
          return false
        }
        setErrors(prev => ({ ...prev, email: "" }))
        return true
      }
      case 2: {
        const result = validatePhone(phone)
        if (!result.valid) {
          setErrors(prev => ({ ...prev, phone: result.error || "Invalid phone" }))
          return false
        }
        setErrors(prev => ({ ...prev, phone: "" }))
        return true
      }
      default: return false
    }
  }

  function canAdvance() {
    switch (step) {
      case 0: return name.trim().length >= 2
      case 1: return validateEmail(email).valid
      case 2: return validatePhone(phone).valid
      default: return false
    }
  }

  function goNext() {
    setTouched(prev => ({ ...prev, [["name", "email", "phone"][step]]: true }))
    if (!validateStep() || isAnimating) return
    setDirection("forward")
    setIsAnimating(true)
  }

  function goBack() {
    if (step <= 0 || isAnimating) return
    setDirection("back")
    setIsAnimating(true)
  }

  // Handle phone input with formatting
  function handlePhoneChange(value: string) {
    const formatted = formatPhoneNumber(value)
    setPhone(formatted)
    if (touched.phone) {
      const result = validatePhone(formatted)
      setErrors(prev => ({ ...prev, phone: result.valid ? "" : (result.error || "") }))
    }
  }

  // Handle email input with validation
  function handleEmailChange(value: string) {
    setEmail(value)
    if (touched.email) {
      const result = validateEmail(value)
      setErrors(prev => ({ ...prev, email: result.valid ? "" : (result.error || "") }))
    }
  }

  // Handle name input with validation
  function handleNameChange(value: string) {
    setName(value)
    if (touched.name && value.trim().length >= 2) {
      setErrors(prev => ({ ...prev, name: "" }))
    }
  }

  useEffect(() => {
    if (!isAnimating) return
    const timeout = setTimeout(() => {
      setStep((prev) => (direction === "forward" ? prev + 1 : prev - 1))
      setIsAnimating(false)
    }, 300)
    return () => clearTimeout(timeout)
  }, [isAnimating, direction])

  async function handleSubmit() {
    setIsSubmitting(true)
    const payload = {
      name,
      email,
      phone,
      rooms: [],
      services: [],
      budget: "$1,200 Flat - 6 Pullouts",
    }
    console.log("[v0] Submitting form to webhook with payload:", payload)
    try {
      const response = await fetch("https://services.leadconnectorhq.com/hooks/AQO9rTexfaPKZhlT1L3h/webhook-trigger/b4f002c9-b2bf-454b-bab9-af2c30c83643", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
      console.log("[v0] Webhook response status:", response.status)
      console.log("[v0] Webhook response ok:", response.ok)
      // Fire Facebook Lead conversion event
      if (typeof window !== "undefined" && typeof window.fbq === "function") {
        window.fbq("track", "Lead", {
          content_name: "6 Pullouts $1200 Qualification Form",
          content_category: "Pull Out Shelves",
          value: 1200,
        })
        console.log("[v0] Facebook Lead event fired")
      }
      setSubmitted(true)
    } catch (error) {
      console.error("[v0] Form submission error:", error)
      setSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent animate-pulse">
          <Check className="h-8 w-8 text-accent-foreground" />
        </div>
        <h3 className="font-serif text-2xl text-foreground">You May Qualify!</h3>
        <p className="text-muted-foreground leading-relaxed max-w-xs">
          {"A Top Shelf specialist will reach out within 24 hours to schedule your free in-home assessment."}
        </p>
        <div className="mt-2 flex items-center gap-2 text-sm text-accent font-medium">
          <Phone className="h-4 w-4" />
          {"We'll call you soon!"}
        </div>
      </div>
    )
  }

  const slideClass = isAnimating
    ? direction === "forward"
      ? "translate-x-[-100%] opacity-0"
      : "translate-x-[100%] opacity-0"
    : "translate-x-0 opacity-100"

  const stepIcons = [
    { icon: User, label: "Name" },
    { icon: Mail, label: "Email" },
    { icon: Phone, label: "Phone" },
  ]

  return (
    <div className="flex flex-col gap-5">
      {/* Visual Step Indicator */}
      <div className="flex items-center justify-center gap-3">
        {stepIcons.map((item, index) => {
          const Icon = item.icon
          const isActive = step === index
          const isCompleted = step > index
          return (
            <div key={item.label} className="flex items-center">
              <div
                className={`flex h-12 w-12 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  isCompleted
                    ? "border-accent bg-accent text-accent-foreground"
                    : isActive
                    ? "border-accent bg-accent/10 text-accent scale-110"
                    : "border-border bg-card text-muted-foreground"
                }`}
              >
                {isCompleted ? (
                  <Check className="h-6 w-6 sm:h-5 sm:w-5" />
                ) : (
                  <Icon className="h-6 w-6 sm:h-5 sm:w-5" />
                )}
              </div>
              {index < stepIcons.length - 1 && (
                <div
                  className={`mx-2 sm:mx-2 h-0.5 w-10 sm:w-8 rounded transition-all duration-300 ${
                    step > index ? "bg-accent" : "bg-border"
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Progress bar */}
      <div className="h-2 sm:h-1 rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent to-primary transition-all duration-500 ease-out"
          style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
        />
      </div>

      {/* Steps container with slide animation */}
      <div ref={containerRef} className="overflow-hidden min-h-[200px] sm:min-h-[160px]">
        <div className={`transition-all duration-300 ease-in-out ${slideClass}`}>

          {/* Step 0: Name */}
          {step === 0 && (
            <div className="flex flex-col gap-5 sm:gap-4">
              <div className="text-center">
                <h3 className="font-serif text-2xl sm:text-xl text-foreground">{"Let's start with your name"}</h3>
                <p className="text-base sm:text-sm text-muted-foreground mt-2 sm:mt-1">{"So we know who to ask for!"}</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className={`relative transition-all duration-200 ${focusedField === "name" ? "scale-[1.02]" : ""}`}>
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 sm:h-5 sm:w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => { setFocusedField(null); setTouched(prev => ({ ...prev, name: true })) }}
                    onKeyDown={(e) => e.key === "Enter" && canAdvance() && goNext()}
                    className={`pl-14 sm:pl-12 py-7 sm:py-6 text-lg sm:text-base bg-card border-2 text-foreground placeholder:text-muted-foreground focus:ring-accent transition-all ${
                      errors.name && touched.name ? "border-red-500 focus:border-red-500" : "border-border focus:border-accent"
                    }`}
                    autoFocus
                  />
                </div>
                {errors.name && touched.name && (
                  <div className="flex items-center gap-2 text-red-500 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {errors.name}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 1: Email */}
          {step === 1 && (
            <div className="flex flex-col gap-5 sm:gap-4">
              <div className="text-center">
                <h3 className="font-serif text-2xl sm:text-xl text-foreground">{"What's your email?"}</h3>
                <p className="text-base sm:text-sm text-muted-foreground mt-2 sm:mt-1">{"We'll send your qualification details here"}</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className={`relative transition-all duration-200 ${focusedField === "email" ? "scale-[1.02]" : ""}`}>
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 sm:h-5 sm:w-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => { setFocusedField(null); setTouched(prev => ({ ...prev, email: true })) }}
                    onKeyDown={(e) => e.key === "Enter" && canAdvance() && goNext()}
                    className={`pl-14 sm:pl-12 py-7 sm:py-6 text-lg sm:text-base bg-card border-2 text-foreground placeholder:text-muted-foreground focus:ring-accent transition-all ${
                      errors.email && touched.email ? "border-red-500 focus:border-red-500" : "border-border focus:border-accent"
                    }`}
                    autoFocus
                  />
                </div>
                {errors.email && touched.email && (
                  <div className="flex items-center gap-2 text-red-500 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {errors.email}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Phone */}
          {step === 2 && (
            <div className="flex flex-col gap-5 sm:gap-4">
              <div className="text-center">
                <h3 className="font-serif text-2xl sm:text-xl text-foreground">{"Best number to reach you?"}</h3>
                <p className="text-base sm:text-sm text-muted-foreground mt-2 sm:mt-1">{"We'll call to schedule your free assessment"}</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className={`relative transition-all duration-200 ${focusedField === "phone" ? "scale-[1.02]" : ""}`}>
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 sm:h-5 sm:w-5 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => { setFocusedField(null); setTouched(prev => ({ ...prev, phone: true })) }}
                    onKeyDown={(e) => e.key === "Enter" && canAdvance() && handleSubmit()}
                    className={`pl-14 sm:pl-12 py-7 sm:py-6 text-lg sm:text-base bg-card border-2 text-foreground placeholder:text-muted-foreground focus:ring-accent transition-all ${
                      errors.phone && touched.phone ? "border-red-500 focus:border-red-500" : "border-border focus:border-accent"
                    }`}
                    autoFocus
                  />
                </div>
                {errors.phone && touched.phone && (
                  <div className="flex items-center gap-2 text-red-500 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {errors.phone}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-3 pt-2">
        {step > 0 && (
          <Button
            variant="outline"
            onClick={goBack}
            disabled={isAnimating}
            className="gap-2 border-border text-foreground hover:bg-secondary py-6 sm:py-4 text-base sm:text-sm"
          >
            <ArrowLeft className="h-5 w-5 sm:h-4 sm:w-4" />
            Back
          </Button>
        )}
        {step < TOTAL_STEPS - 1 ? (
          <Button
            onClick={goNext}
            disabled={!canAdvance() || isAnimating}
            className="ml-auto gap-2 bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-40 transition-all hover:scale-105 py-6 sm:py-4 text-base sm:text-sm"
          >
            Continue
            <ArrowRight className="h-5 w-5 sm:h-4 sm:w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={!canAdvance() || isSubmitting}
            className="ml-auto gap-2 bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-40 transition-all hover:scale-105 py-6 sm:py-4 text-base sm:text-sm"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 sm:h-4 sm:w-4 animate-spin" />
                Checking...
              </>
            ) : (
              <>
                Check If I Qualify
                <ArrowRight className="h-5 w-5 sm:h-4 sm:w-4" />
              </>
            )}
          </Button>
        )}
      </div>

    </div>
  )
}
