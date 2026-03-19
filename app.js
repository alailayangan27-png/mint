let amount = 1;

function setAmount(val) {
  amount = val;
  document.getElementById("usd").innerText = "$" + val;
  document.getElementById("token").innerText = val * 1000;
}

async function mint() {
  const wallet = document.getElementById("wallet").value;
  const status = document.getElementById("status");

  if (!wallet) {
    status.innerText = "Enter wallet";
    return;
  }

  status.innerText = "Processing...";

  const res = await fetch("/api/mint", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wallet, amount })
  });

  const data = await res.json();

  if (data.success) {
    status.innerText = "Mint recorded!";
  } else {
    status.innerText = "Error";
  }
}
