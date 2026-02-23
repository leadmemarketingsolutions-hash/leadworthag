import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response(null, { headers: corsHeaders });

  try {
    const { messages, sessionId } = await req.json();

    let state = await getState(sessionId);
    const last = messages[messages.length - 1]?.content;

    /* =============================
       STEP 1 — Detect booking intent
    ============================= */
    if (!state && /book|schedule|appointment/i.test(last)) {
      state = { step: "name" };
      await saveState(sessionId, state);
      return reply("Great! Let’s book your demo. What’s your full name?");
    }

    if (state?.step === "name") {
      state.name = last;
      state.step = "email";
      await saveState(sessionId, state);
      return reply("Thanks! What’s your email?");
    }

    if (state?.step === "email") {
      state.email = last;
      state.step = "slot";

      const slots = await fetch("https://www.leadworthy.ca/api/availability")
        .then(r => r.json());

      state.slots = slots.collection?.slice(0, 5);
      await saveState(sessionId, state);

      const list = state.slots
        .map((s, i) =>
          `${i + 1}. ${new Date(s.start_time).toLocaleString()}`
        )
        .join("\n");

      return reply(`Here are available times:\n${list}\nReply with the number.`);
    }

    if (state?.step === "slot") {
      const slot = state.slots?.[parseInt(last) - 1];
      if (!slot) return reply("Please reply with a valid number.");

      const link = await fetch("https://www.leadworthy.ca/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: state.name,
          email: state.email,
          time: slot.start_time,
        }),
      }).then(r => r.json());

      await clearState(sessionId);

      return reply(
        `You're almost booked! Click here to confirm:\n${link.booking_url}`
      );
    }

    /* =============================
       Normal Gemini Chat
    ============================= */
    return aiReply(messages);

  } catch (e) {
    return reply("Something went wrong. Please try again.");
  }
});

/* =============================
   Helper Functions
============================= */

async function aiReply(messages) {
  const key = Deno.env.get("LOVABLE_API_KEY");

  const ai = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      messages,
    }),
  }).then(r => r.json());

  return reply(ai.choices?.[0]?.message?.content || "How can I help?");
}

function reply(text) {
  return new Response(
    JSON.stringify({ choices: [{ message: { content: text } }] }),
    { headers: corsHeaders }
  );
}

/* ===== Fake DB (replace with Supabase later) ===== */
const sessions = new Map();

async function getState(id) {
  return sessions.get(id);
}
async function saveState(id, data) {
  sessions.set(id, data);
}
async function clearState(id) {
  sessions.delete(id);
}