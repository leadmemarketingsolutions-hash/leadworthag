export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "POST only" });
    }

    const API_KEY = process.env.CALENDLY_API_KEY;

    if (!API_KEY) {
      return res.status(500).json({ error: "Missing Calendly API key" });
    }

    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Missing name or email" });
    }

    const EVENT_TYPE =
      "https://api.calendly.com/event_types/921fd6d9-4105-4c13-9720-af2a1ae7e6dd";

    const response = await fetch(
      "https://api.calendly.com/scheduling_links",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          owner: EVENT_TYPE,
          owner_type: "EventType",
          max_event_count: 1,
        }),
      }
    );

    const data = await response.json();

    if (!data?.resource?.booking_url) {
      console.error("Calendly error:", data);
      return res.status(500).json({ error: "Failed to create booking link" });
    }

    // Prefill info
    const link =
      data.resource.booking_url +
      `?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;

    return res.status(200).json({ booking_url: link });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}