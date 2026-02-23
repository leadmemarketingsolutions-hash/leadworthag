export default async function handler(req, res) {
  try {
    const API_KEY = process.env.CALENDLY_API_KEY;

    if (!API_KEY) {
      return res.status(500).json({ error: "Missing API key" });
    }

    const { name, email, time } = req.body;

    const EVENT_TYPE =
      "https://api.calendly.com/event_types/921fd6d9-4105-4c13-9720-af2a1ae7e6dd";

    const response = await fetch(
      "https://api.calendly.com/scheduled_events",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_type: EVENT_TYPE,
          invitees: [{ email, name }],
          start_time: time,
        }),
      }
    );

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}