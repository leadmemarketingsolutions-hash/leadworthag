export default async function handler(req, res) {
  try {
    const API_KEY = process.env.CALENDLY_API_KEY;

    if (!API_KEY) {
      return res.status(500).json({ error: "Missing API key" });
    }

    const EVENT_TYPE =
      "https://api.calendly.com/event_types/921fd6d9-4105-4c13-9720-af2a1ae7e6dd";

    const USER =
      "https://api.calendly.com/users/73c9753f-1ef0-4156-a4a9-866896a4f799";

    // ✅ FIX: Start time must be in the future (add 10 minutes buffer)
    const start = new Date(Date.now() + 10 * 60 * 1000).toISOString();
    const end = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    const url =
      "https://api.calendly.com/event_type_available_times" +
      `?event_type=${EVENT_TYPE}` +
      `&user=${USER}` +
      `&start_time=${start}` +
      `&end_time=${end}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const data = await response.json();

    return res.status(200).json(data);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}