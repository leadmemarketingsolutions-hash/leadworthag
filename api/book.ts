import fetch from "node-fetch";

async function getAccessToken() {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });

  const data = await res.json();
  return data.access_token;
}

export default async function handler(req, res) {
  const { name, email, time } = req.body;

  if (!name || !email || !time)
    return res.status(400).json({ error: "Missing fields" });

  const accessToken = await getAccessToken();

  const event = {
    summary: `Call with ${name}`,
    description: `Booked via AI Receptionist\nEmail: ${email}`,
    start: { dateTime: time },
    end: {
      dateTime: new Date(new Date(time).getTime() + 30 * 60000).toISOString(),
    },
    attendees: [{ email }],
    conferenceData: {
      createRequest: {
        requestId: Math.random().toString(),
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    },
  };

  const response = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    }
  );

  const data = await response.json();
  res.json(data);
}