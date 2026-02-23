import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type",
};

function streamText(text: string) {
  return new Response(
    `data: ${JSON.stringify({
      choices: [{ delta: { content: text } }],
    })}\n\ndata: [DONE]\n\n`,
    {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    }
  );
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const last = messages[messages.length - 1]?.content || "";

    // ✅ BOOKING INTENT
    if (/book|schedule|demo call|appointment/i.test(last)) {
      const availability = await fetch("https://www.leadworthy.ca/api/availability").then(r => r.json());
      const slots = availability.collection?.slice(0, 3) || [];

      if (!slots.length) {
        return streamText("Sorry, I don't see any available times right now.");
      }

      const formatted = slots
        .map((s, i) => `${i + 1}. ${new Date(s.start_time).toLocaleString()}`)
        .join("\n");

      return streamText(
        `Awesome! Here are the next available demo times:\n${formatted}\n\nReply with 1, 2, or 3.`
      );
    }

    // ✅ SLOT PICK
    if (/^[1-3]$/.test(last.trim())) {
      const availability = await fetch("https://www.leadworthy.ca/api/availability").then(r => r.json());
      const slot = availability.collection?.[parseInt(last) - 1];

      await fetch("https://www.leadworthy.ca/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Website Lead",
          email: "lead@example.com",
          time: slot.start_time,
        }),
      });

      return streamText(
        `You're booked! 🎉 Check your email for confirmation.`
      );
    }

    // ✅ OTHERWISE → GEMINI
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
    return streamText("Sorry, something went wrong. Please try again.");
  }
});