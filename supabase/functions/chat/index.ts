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
    const last = messages[messages.length - 1]?.content?.toLowerCase();

    /* ===============================
       STEP 1 — detect booking intent
    =============================== */
    if (
      last?.includes("book") ||
      last?.includes("schedule") ||
      last?.includes("demo")
    ) {
      bookingState = {};
      return reply("Great 👍 Let's book your demo. What's your full name?");
    }

    /* ===============================
       STEP 2 — collect name
    =============================== */
    if (!bookingState.name) {
      bookingState.name = last;
      return reply("Thanks! What's your email?");
    }

    /* ===============================
       STEP 3 — collect email
    =============================== */
    if (!bookingState.email) {
      bookingState.email = last;

      const slots = await fetch(
        "https://www.leadworthy.ca/api/availability"
      ).then((r) => r.json());

      if (!slots?.collection?.length)
        return reply("No available times right now 😞");

      bookingState.slots = slots.collection.slice(0, 5);

      const list = bookingState.slots
        .map(
          (s: any, i: number) =>
            `${i + 1}. ${new Date(s.start_time).toLocaleString()}`
        )
        .join("\n");

      return reply(`Here are available times:\n${list}\nReply with number.`);
    }

    /* ===============================
       STEP 4 — choose slot
    =============================== */
    if (!bookingState.time) {
      const index = parseInt(last) - 1;
      const slot = bookingState.slots?.[index];

      if (!slot) return reply("Please reply with a valid number.");

      bookingState.time = slot.start_time;

      const booked = await fetch("https://www.leadworthy.ca/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: bookingState.name,
          email: bookingState.email,
          time: bookingState.time,
        }),
      }).then((r) => r.json());

      bookingState = {};

      return reply(
        `🎉 You're booked!\nCalendly will email you confirmation.\n\nIf you don’t see it, check spam 🙂`
      );
    }

    /* ===============================
       STEP 5 — normal AI chat
    =============================== */

    return reply(
      "Hi 👋 Want to see how our AI receptionist works or book a demo?"
    );
  } catch (e) {
    return reply("Something went wrong. Try again.");
  }
});

function reply(text: string) {
  return new Response(
    JSON.stringify({
      choices: [{ message: { content: text } }],
    }),
    { headers: corsHeaders }
  );
}