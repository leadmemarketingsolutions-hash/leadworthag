export default async function handler(req, res) {
  try {
    const { name, email, time } = req.body;

    if (!name || !email || !time) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Your Calendly public booking link
    const CALENDLY_LINK =
      "https://calendly.com/leadmemarketingsolutions/30min";

    const bookingUrl =
      `${CALENDLY_LINK}` +
      `?name=${encodeURIComponent(name)}` +
      `&email=${encodeURIComponent(email)}` +
      `&date=${encodeURIComponent(time)}`;

    return res.status(200).json({
      success: true,
      bookingUrl,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}