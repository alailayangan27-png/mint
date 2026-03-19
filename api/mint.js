export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { wallet, amount } = req.body;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_KEY;

  try {
    const response = await fetch(url + "/rest/v1/mints", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": key,
        "Authorization": "Bearer " + key
      },
      body: JSON.stringify({
        wallet: wallet,
        amount: amount * 1000,
        usd: amount
      })
    });

    const text = await response.text();

    if (!response.ok) {
      return res.status(500).json({ error: text });
    }

    return res.json({ success: true });

  } catch (e) {
    return res.status(500).json({ error: "Server error" });
  }
}
