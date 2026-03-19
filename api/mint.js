import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {

  const { wallet, amount } = req.body;

  if (!wallet) {
    return res.json({ message: "Enter wallet" });
  }

  // ambil total mint
  const { data } = await supabase
    .from('mint')
    .select('amount');

  let total = 0;
  data.forEach(d => total += d.amount);

  if (total + amount > 10000) {
    return res.json({ message: "Mint full" });
  }

  // simpan
  await supabase.from('mint').insert({
    wallet,
    amount,
    status: "pending"
  });

  res.json({
    message: `Send $${amount} USDC to project wallet`
  });
}
