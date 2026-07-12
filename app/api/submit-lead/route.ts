import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const FB_PIXEL_ID = "172947360045746"
// Set FB_ACCESS_TOKEN in your environment variables (from Facebook Events Manager > Settings > Conversions API)
const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN

function hashSHA256(value: string): string {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex")
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, phone } = body

  const lcPayload = {
    name,
    email,
    phone,
    package: "Kitchen Facelift Package",
    value: 11500,
  }

  const zapierPayload = {
    full_name: name,
    email,
    phone,
    package: "Kitchen Facelift Package",
    value: 11500,
  }

  // Facebook Conversions API payload (server-side — bypasses ad blockers)
  const eventTime = Math.floor(Date.now() / 1000)
  const fbPayload = {
    data: [
      {
        event_name: "Lead",
        event_time: eventTime,
        action_source: "website",
        event_source_url: "https://topshelfpullouts.com",
        user_data: {
          em: email ? [hashSHA256(email)] : undefined,
          ph: phone ? [hashSHA256(phone.replace(/\D/g, ""))] : undefined,
          fn: name ? [hashSHA256(name.split(" ")[0])] : undefined,
          ln: name && name.includes(" ") ? [hashSHA256(name.split(" ").slice(1).join(" "))] : undefined,
          client_ip_address: req.headers.get("x-forwarded-for")?.split(",")[0] || req.headers.get("x-real-ip") || undefined,
          client_user_agent: req.headers.get("user-agent") || undefined,
        },
        custom_data: {
          content_name: "Kitchen Facelift Package",
          content_category: "Pull Out Shelves",
          currency: "USD",
          value: 11500,
        },
      },
    ],
  }

  const webhooks: Promise<unknown>[] = [
    fetch(
      "https://services.leadconnectorhq.com/hooks/AQO9rTexfaPKZhlT1L3h/webhook-trigger/3cfed59d-6435-45d2-813d-f6332b00f6e1",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lcPayload),
      }
    ),
    fetch("https://hooks.zapier.com/hooks/catch/24750736/4uq5w45/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(zapierPayload),
    }),
  ]

  // Add Facebook Conversions API call only if access token is configured
  if (FB_ACCESS_TOKEN) {
    webhooks.push(
      fetch(
        `https://graph.facebook.com/v19.0/${FB_PIXEL_ID}/events?access_token=${FB_ACCESS_TOKEN}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fbPayload),
        }
      )
    )
  }

  const results = await Promise.allSettled(webhooks)
  const [lc, zapier, fb] = results

  const lcOk = lc.status === "fulfilled" && (lc.value as Response).ok
  const zapierOk = zapier.status === "fulfilled" && (zapier.value as Response).ok
  const fbOk = fb ? fb.status === "fulfilled" && (fb.value as Response).ok : null

  return NextResponse.json({ lcOk, zapierOk, fbOk }, { status: 200 })
}
