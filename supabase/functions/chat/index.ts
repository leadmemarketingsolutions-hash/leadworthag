import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type",
};

let state = {};

serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const last = messages[messages.length - 1].content.toLowerCase();

    // STEP 1: Detect booking intent
    if (
      last.includes("book") ||
      last.includes("schedule") ||
      last.includes("appointment")
    ) {
      state = { step: "name" };
      return reply("Awesome! What's your full name?");
    }

    // STEP 2: Collect name
    if (state.step === "name") {
      state.name = last;
      state.step = "email";
      return reply("Great. What's your email?");
    }

    // STEP 3: Collect email
    if (state.step === "email") {
      state.email = last;
      state.step = "slot";

      const slots = await fetch("https://www.leadworthy.ca/api/availability")
        .then(r => r.json());

      const options = slots.collection
        ?.slice(0, 5)
        ?.map((s, i) =>
          `${i + 1}. ${new Date(s.start_time).toLocaleString()}`
        )
        .join("\n");

      state.slots = slots.collection;

      return reply(
        `Here are available times:\n${options}\nReply with a number.`
      );
    }

    // STEP 4: Choose slot
    if (state.step === "slot") {
      const index = parseInt(last) - 1;
      const slot = state.slots?.[index];

      if (!slot) return reply("Please reply with a valid number.");

      const booking = await fetch("https://www.leadworthy.ca/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: state.name,
          email: state.email,
          time: slot.start_time,
        }),
      }).then(r => r.json());

      state = {};

      return reply(
        `You're almost booked!\nClick here to confirm:\n${booking.bookingUrl}`
      );
    }

    // STEP 5: Normal AI
    return reply(
      "Hi! Want me to book you a demo? Just say 'book a call'."
    );

  } catch {
    return reply("Something went wrong.");
  }
});

function reply(msg) {
  return new Response(
    JSON.stringify({
      choices: [{ message: { content: msg } }],
    }),
    { headers: corsHeaders }
  );
}