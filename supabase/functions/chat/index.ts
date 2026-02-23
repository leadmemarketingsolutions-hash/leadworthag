import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const last = messages[messages.length - 1]?.content?.trim() || "";

    // 🧠 Detect if booking already started
    const bookingStarted = messages.some(m =>
      m.content.includes("[BOOKING_STARTED]")
    );

    // ---------------------------
    // STEP 1 — Detect intent
    // ---------------------------
    if (!bookingStarted && /book|schedule|demo call|appointment/i.test(last)) {
      return new Response(JSON.stringify({
        message:
          "[BOOKING_STARTED]\nGreat! I'd love to get you booked. What's your name?"
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ---------------------------
    // STEP 2 — Get Name
    // ---------------------------
    if (bookingStarted && !messages.some(m => m.content.includes("[NAME]"))) {
      return new Response(JSON.stringify({
        message: `[NAME] Thanks ${last}! What's the best email to send confirmation to?`
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ---------------------------
    // STEP 3 — Get Email
    // ---------------------------
    if (bookingStarted && messages.some(m => m.content.includes("[NAME]"))
        && !messages.some(m => m.content.includes("[EMAIL]"))) {

      return new Response(JSON.stringify({
        message: `[EMAIL] Perfect. Let me check available times for you…`
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ---------------------------
    // STEP 4 — Show Slots
    // ---------------------------
    if (bookingStarted && messages.some(m => m.content.includes("[EMAIL]"))
        && !messages.some(m => m.content.includes("[SLOTS]"))) {

      const availability = await fetch("https://www.leadworthy.ca/api/availability").then(r => r.json());
      const slots = availability.collection?.slice(0, 3) || [];

      const formatted = slots.map((s, i) =>
        `${i + 1}. ${new Date(s.start_time).toLocaleString()}`
      ).join("\n");

      return new Response(JSON.stringify({
        message: `[SLOTS]\nHere are the next available times:\n${formatted}\nReply with 1, 2, or 3.`
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ---------------------------
    // STEP 5 — Book
    // ---------------------------
    if (bookingStarted && /^[1-3]$/.test(last)) {

      const availability = await fetch("https://www.leadworthy.ca/api/availability").then(r => r.json());
      const slot = availability.collection?.[parseInt(last) - 1];

      await fetch("https://www.leadworthy.ca/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Website Lead",
          email: "lead@example.com",
          time: slot.start_time
        })
      });

      return new Response(JSON.stringify({
        message: `You're booked! 🎉 You'll get a confirmation email shortly.`
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ---------------------------
    // OTHERWISE — GEMINI DEMO
    // ---------------------------
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages,
        stream: true,
      }),
    });

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});