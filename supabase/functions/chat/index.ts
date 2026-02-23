import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type",
};

let state: any = {};

serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response(null, { headers: corsHeaders });

  const { messages } = await req.json();
  const last = messages[messages.length - 1]?.content?.toLowerCase();

  /* STEP 1 — detect booking intent */
  if (
    last?.includes("book") ||
    last?.includes("appointment") ||
    last?.includes("schedule")
  ) {
    state = {};
    return reply("Great! What's your full name?");
  }

  /* STEP 2 — name */
  if (!state.name) {
    state.name = last;
    return reply("Thanks! What's your email?");
  }

  /* STEP 3 — email → generate Calendly link */
  if (!state.email) {
    state.email = last;

    const link =
      "https://calendly.com/YOUR-LINK?name=" +
      encodeURIComponent(state.name) +
      "&email=" +
      encodeURIComponent(state.email);

    state = {};

    return reply(
      `Perfect! Click below to confirm your booking:\n\n👉 ${link}\n\nYou'll get an email confirmation immediately.`
    );
  }

  return reply("How can I help?");
});

function reply(msg: string) {
  return new Response(
    JSON.stringify({
      choices: [{ message: { content: msg } }],
    }),
    { headers: corsHeaders }
  );
}