export default async function handler(req, res) {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Missing name or email" });
    }

    // Your actual booking link slug
    const CALENDLY_LINK =
      "https://calendly.com/leadworthy/demo";

    const url =
      `${CALENDLY_LINK}?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;

    return res.status(200).json({
      success: true,
      booking_url: url,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}