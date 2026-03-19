export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { wallet, amount } = req.body;

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_KEY;

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/mints`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`
      },
      body: JSON.stringify({
        wallet,
        amount: amount * 1000,
        usd: amount
      })
    });

    if (!response.ok) throw new Error();

    return res.json({ success: true });

  } catch (err) {
    return res.status(500).json({ success: false });
  }
}
