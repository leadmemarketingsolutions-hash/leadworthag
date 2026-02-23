import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1]?.content || "";

    // ✅ BOOKING INTENT DETECTION
    if (/book|schedule|demo|appointment/i.test(lastMessage)) {
      const availabilityRes = await fetch("https://www.leadworthy.ca/api/availability");
      const availability = await availabilityRes.json();

      const slots = availability.collection?.slice(0, 3) || [];

      if (!slots.length) {
        return new Response(
          JSON.stringify({ message: "Sorry, I don't see any available times right now." }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const formatted = slots
        .map((s: any, i: number) => `${i + 1}. ${new Date(s.start_time).toLocaleString()}`)
        .join("\n");

      return new Response(
        JSON.stringify({
          message: `I'd be happy to book that for you! Here are the next available times:\n\n${formatted}\n\nReply with the number you'd like.`,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ✅ TIME SELECTION DETECTION (User replies 1, 2, or 3)
    if (/^[1-3]$/.test(lastMessage.trim())) {
      const availabilityRes = await fetch("https://www.leadworthy.ca/api/availability");
      const availability = await availabilityRes.json();
      const slots = availability.collection?.slice(0, 3) || [];

      const index = parseInt(lastMessage.trim()) - 1;
      const chosen = slots[index];

      if (!chosen) {
        return new Response(
          JSON.stringify({ message: "That option is not valid. Please reply with 1, 2, or 3." }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // ⚠️ For now we use placeholder name/email
      await fetch("https://www.leadworthy.ca/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Website Lead",
          email: "lead@example.com",
          time: chosen.start_time,
        }),
      });

      return new Response(
        JSON.stringify({
          message: `You're all set! 🎉 Your demo has been scheduled for ${new Date(
            chosen.start_time
          ).toLocaleString()}. You'll receive a confirmation email shortly.`,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ✅ OTHERWISE CONTINUE TO GEMINI

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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
            content: `You are LeadWorthy's AI receptionist demo bot.
After demonstrating how the AI works, ask if they'd like to schedule a live demo call.`,
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });

  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});