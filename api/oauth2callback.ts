import fetch from "node-fetch";

export default async function handler(req, res) {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send("Missing code");
  }

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: "http://localhost:3000/oauth2callback",
      grant_type: "authorization_code",
    }),
  });

  const tokens = await tokenRes.json();

  res.json(tokens);
}