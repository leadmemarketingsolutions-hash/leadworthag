import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type",
};

let state: any = {};

serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const last = messages[messages.length - 1]?.content?.trim();

    /* ---------- START BOOKING ---------- */
    if (/book|schedule|appointment/i.test(last)) {
      state = {};
      return json("Great! What’s your full name?");
    }

    /* ---------- NAME ---------- */
    if (!state.name) {
      state.name = last;
      return json("Thanks! What’s your email?");
    }

    /* ---------- EMAIL ---------- */
    if (!state.email) {
      state.email = last;

      const result = await fetch("https://www.leadworthy.ca/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: state.name,
          email: state.email,
        }),
      }).then(r => r.json());

      state = {};

      if (!result.booking_url)
        return json("Something went wrong creating your booking link.");

      return json(
        `Perfect! Book your demo here:\n${result.booking_url}`
      );
    }

    /* ---------- NORMAL CHAT ---------- */
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    const ai = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content:
              "You are LeadWorthy AI receptionist. Keep replies short. If user wants booking, ask for name then email.",
          },
          ...messages,
        ],
      }),
    }).then(r => r.json());

    return json(ai.choices?.[0]?.message?.content || "How can I help?");
  } catch {
    return json("Something went wrong.");
  }
});

function json(msg: string) {
  return new Response(
    JSON.stringify({
      choices: [{ message: { content: msg } }],
    }),
    { headers: corsHeaders }
  );
}