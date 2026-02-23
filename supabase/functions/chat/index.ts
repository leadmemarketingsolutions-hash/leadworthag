import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const CALENDLY_EVENT =
  "https://api.calendly.com/event_types/921fd6d9-4105-4c13-9720-af2a1ae7e6dd";
const CALENDLY_TOKEN = Deno.env.get("CALENDLY_API_KEY");
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const lastMsg = messages[messages.length - 1]?.content?.toLowerCase() || "";

    // ============================
    // 1️⃣ Detect Booking Intent
    // ============================
    const wantsBooking =
      lastMsg.includes("book") ||
      lastMsg.includes("appointment") ||
      lastMsg.includes("schedule") ||
      lastMsg.includes("meeting");

    if (wantsBooking) {
      if (!CALENDLY_TOKEN)
        throw new Error("CALENDLY_API_KEY missing");

      const start = new Date();
      start.setHours(start.getHours() + 1);

      const end = new Date();
      end.setDate(end.getDate() + 7);

      const url = `${CALENDLY_EVENT}/availability?start_time=${start.toISOString()}&end_time=${end.toISOString()}`;

      const cal = await fetch(url, {
        headers: {
          Authorization: `Bearer ${CALENDLY_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      const data = await cal.json();

      const slots =
        data.collection?.slice(0, 5).map((s: any) => s.start_time) || [];

      if (!slots.length) {
        return new Response(
          `data: ${JSON.stringify({
            choices: [
              {
                delta: {
                  content:
                    "I couldn't find any open slots right now. Want me to notify you when availability opens?",
                },
              },
            ],
          })}\n\n`,
          { headers: { ...corsHeaders, "Content-Type": "text/event-stream" } }
        );
      }

      return new Response(
        `data: ${JSON.stringify({
          choices: [
            {
              delta: {
                content:
                  "Great! Here are some available times:\n\n" +
                  slots
                    .map(
                      (s: string, i: number) =>
                        `${i + 1}. ${new Date(s).toLocaleString()}`
                    )
                    .join("\n") +
                  "\n\nReply with the number you want 🙂",
              },
            },
          ],
        })}\n\n`,
        { headers: { ...corsHeaders, "Content-Type": "text/event-stream" } }
      );
    }

    // ============================
    // 2️⃣ Normal AI Chat
    // ============================

    if (!LOVABLE_API_KEY)
      throw new Error("LOVABLE_API_KEY missing");

    const ai = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
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
              content: `
You are LeadWorthy's AI assistant.

IMPORTANT RULES:
- Be direct and short.
- If user wants to book, collect name, email, phone.
- Do NOT roleplay receptionist demos.
- Help user get to booking quickly.
              `,
            },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    return new Response(ai.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});