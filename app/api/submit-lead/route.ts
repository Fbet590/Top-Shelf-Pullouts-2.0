import { NextRequest, NextResponse } from "next/server"

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

  const results = await Promise.allSettled([
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
  ])

  const [lc, zapier] = results
  const lcOk = lc.status === "fulfilled" && lc.value.ok
  const zapierOk = zapier.status === "fulfilled" && zapier.value.ok

  return NextResponse.json({ lcOk, zapierOk }, { status: 200 })
}
