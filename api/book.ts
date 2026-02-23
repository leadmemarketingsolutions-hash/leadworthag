export default async function handler(req, res) {
  try {
    const API_KEY = process.env.CALENDLY_API_KEY;

    const { name, email, time } = req.body;

    const response = await fetch(
      "https://api.calendly.com/scheduling_links",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          max_event_count: 1,
          owner:
            "https://api.calendly.com/event_types/921fd6d9-4105-4c13-9720-af2a1ae7e6dd",
          owner_type: "EventType",
        }),
      }
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}