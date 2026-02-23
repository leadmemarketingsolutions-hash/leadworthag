import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

let bookingState: any = {};

serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const lastMsg = messages[messages.length - 1]?.content?.toLowerCase();

    /* =============================
       STEP 1 — Detect booking intent
    ============================= */
    if (
      lastMsg?.includes("book") ||
      lastMsg?.includes("schedule") ||
      lastMsg?.includes("appointment")
    ) {
      bookingState = {};
      return json("Great! Let’s book your demo. What’s your full name?");
    }

    /* =============================
       STEP 2 — Collect name
    ============================= */
    if (!bookingState.name) {
      bookingState.name = lastMsg;
      return json("Thanks! What’s your email?");
    }

    /* =============================
       STEP 3 — Collect email
    ============================= */
    if (!bookingState.email) {
      bookingState.email = lastMsg;

      const slots = await fetch("https://www.leadworthy.ca/api/availability")
        .then(r => r.json());

      const options = slots.collection
        ?.slice(0, 5)
        ?.map((s: any, i: number) =>
          `${i + 1}. ${new Date(s.start_time).toLocaleString()}`
        )
        ?.join("\n");

      bookingState.slots = slots.collection;

      return json(`Here are available times:\n${options}\nReply with the number.`);
    }

    /* =============================
       STEP 4 — Pick slot
    ============================= */
    if (!bookingState.time) {
      const index = parseInt(lastMsg) - 1;
      const slot = bookingState.slots?.[index];

      if (!slot) return json("Please reply with a valid number.");

      bookingState.time = slot.start_time;

      const result = await fetch("https://www.leadworthy.ca/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: bookingState.name,
          email: bookingState.email,
          time: bookingState.time,
        }),
      }).then(r => r.json());

      bookingState = {};

      return json(
        "🎉 You're booked! Check your email for confirmation. Looking forward to speaking with you!"
      );
    }

    /* =============================
       STEP 5 — Normal AI chat
    ============================= */
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
              "You are LeadWorthy's AI receptionist. If the user wants to book, guide them to scheduling.",
          },
          ...messages,
        ],
      }),
    }).then(r => r.json());

    return json(ai.choices?.[0]?.message?.content || "How can I help?");
  } catch (e) {
    return json("Something went wrong. Please try again.");
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