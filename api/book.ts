export default async function handler(req, res) {
  const API_KEY = process.env.eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzcxODMwNTYzLCJqdGkiOiIwY2I5ZGZlZC1mM2Q4LTRjYzgtODZlZC0yODlkOTI0NzNmZjkiLCJ1c2VyX3V1aWQiOiI3M2M5NzUzZi0xZWYwLTQxNTYtYTRhOS04NjY4OTZhNGY3OTkifQ.Nx0W3J0jfnqNg8JKdwQXhF-8LtOLj-VhAlG27xZOaOeh8ggfJB391JwS_d2jXtCRjmAJArlg9J-lBC_aZ5perQ;

  const { name, email, time } = req.body;

  const EVENT_TYPE =
    "https://api.calendly.com/event_types/921fd6d9-4105-4c13-9720-af2a1ae7e6dd";

  const response = await fetch(
    "https://api.calendly.com/scheduled_events",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzcxODMwNTYzLCJqdGkiOiIwY2I5ZGZlZC1mM2Q4LTRjYzgtODZlZC0yODlkOTI0NzNmZjkiLCJ1c2VyX3V1aWQiOiI3M2M5NzUzZi0xZWYwLTQxNTYtYTRhOS04NjY4OTZhNGY3OTkifQ.Nx0W3J0jfnqNg8JKdwQXhF-8LtOLj-VhAlG27xZOaOeh8ggfJB391JwS_d2jXtCRjmAJArlg9J-lBC_aZ5perQ}`,
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
  res.status(200).json(data);
}