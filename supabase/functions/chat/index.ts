import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type",
};

const sessions = new Map();

serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response(null, { headers: corsHeaders });

  try {
    const { messages, sessionId } = await req.json();
    const last = messages[messages.length - 1]?.content?.trim();

    let state = sessions.get(sessionId);

    /* =============================
       STEP 1 — Detect booking intent
    ============================= */
    if (!state && /book|schedule|demo|appointment/i.test(last)) {
      state = { step: "name" };
      sessions.set(sessionId, state);
      return reply("Great! Let’s book your demo. What’s your full name?");
    }

    /* =============================
       STEP 2 — Name
    ============================= */
    if (state?.step === "name") {
      state.name = last;
      state.step = "email";
      sessions.set(sessionId, state);
      return reply("Thanks! What’s your email?");
    }

    /* =============================
       STEP 3 — Email
    ============================= */
    if (state?.step === "email") {
      state.email = last;
      state.step = "confirm";
      sessions.set(sessionId, state);

      return reply(
        `Perfect. Generating your booking link...`
      );
    }

    /* =============================
       STEP 4 — Create booking link
    ============================= */
    if (state?.step === "confirm") {
      const result = await fetch("https://www.leadworthy.ca/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: state.name,
          email: state.email,
        }),
      }).then(r => r.json());

      sessions.delete(sessionId);

      if (!result?.booking_url) {
        return reply(
          "Sorry, something went wrong creating your booking. Please try again."
        );
      }

      return reply(
        `You're almost booked! Click here to confirm your demo:\n${result.booking_url}`
      );
    }

    /* =============================
       NORMAL AI CHAT
    ============================= */
    return reply("Hi! Ask anything or type 'Book a demo'.");

  } catch (err) {
    console.error(err);
    return reply("Something went wrong. Please try again.");
  }
});

function reply(text) {
  return new Response(
    JSON.stringify({ choices: [{ message: { content: text } }] }),
    { headers: corsHeaders }
  );
}