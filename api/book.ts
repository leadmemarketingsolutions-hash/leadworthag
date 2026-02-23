export default async function handler(req, res) {
  try {
    const API_KEY = process.env.CALENDLY_API_KEY;

    if (!API_KEY) {
      return res.status(500).json({ error: "Missing API key" });
    }

    const { name, email, time } = req.body;

    if (!name || !email || !time) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const EVENT_TYPE =
      "https://api.calendly.com/event_types/921fd6d9-4105-4c13-9720-af2a1ae7e6dd";

    // Step 1 — create scheduling link
    const linkRes = await fetch(
      "https://api.calendly.com/scheduling_links",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          max_event_count: 1,
          owner: EVENT_TYPE,
          owner_type: "EventType",
        }),
      }
    );

    const linkData = await linkRes.json();

    if (!linkData.resource?.booking_url) {
      return res.status(500).json({ error: "Failed to create booking link" });
    }

    return res.status(200).json({
      booking_url: linkData.resource.booking_url,
      message: "Send this link to user to complete booking",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}