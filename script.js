// Dirt & Diamonds — calculator logic
// All numbers are player-supplied; nothing here is hard-coded game data,
// since Growtopia's economy (prices, exchange rates) shifts constantly.

function fmt(n, decimals = 2) {
  if (!isFinite(n)) return "—";
  return n.toLocaleString(undefined, {
    maximumFractionDigits: decimals,
    minimumFractionDigits: 0,
  });
}

function num(id) {
  const el = document.getElementById(id);
  const v = parseFloat(el.value);
  return isNaN(v) ? 0 : v;
}

/* ---------------- Farming profit calculator ---------------- */

function calcFarming() {
  const seedCost = num("f-seed-cost");
  const seeds = num("f-seed-count");
  const growHours = num("f-grow-time");
  const yieldPer = num("f-yield");
  const price = num("f-price");

  const totalCost = seedCost * seeds;
  const totalRevenue = seeds * yieldPer * price;
  const profit = totalRevenue - totalCost;
  const profitPerHour = growHours > 0 ? profit / growHours : 0;

  document.getElementById("f-out-revenue").textContent = fmt(totalRevenue) + " WL";
  document.getElementById("f-out-cost").textContent = fmt(totalCost) + " WL";

  const profitTile = document.getElementById("f-out-profit-tile");
  const profitEl = document.getElementById("f-out-profit");
  profitEl.textContent = fmt(profit) + " WL";
  profitTile.classList.toggle("warn", profit < 0);

  const perHourTile = document.getElementById("f-out-per-hour-tile");
  const perHourEl = document.getElementById("f-out-per-hour");
  perHourEl.textContent = fmt(profitPerHour) + " WL/hr";
  perHourTile.classList.toggle("warn", profitPerHour < 0);
}

/* ---------------- Currency converter ---------------- */

function calcConvert(source) {
  const rate = Math.max(num("c-rate"), 1); // gems per world lock
  const gemsEl = document.getElementById("c-gems");
  const wlEl = document.getElementById("c-wl");
  const dlEl = document.getElementById("c-dl");

  let gems, wl, dl;

  if (source === "gems") {
    gems = num("c-gems");
    wl = gems / rate;
    dl = wl / 100;
  } else if (source === "wl") {
    wl = num("c-wl");
    gems = wl * rate;
    dl = wl / 100;
  } else {
    dl = num("c-dl");
    wl = dl * 100;
    gems = wl * rate;
  }

  if (source !== "gems") gemsEl.value = fmt(gems, 0);
  if (source !== "wl") wlEl.value = fmt(wl, 2);
  if (source !== "dl") dlEl.value = fmt(dl, 4);
}

/* ---------------- Flip / trade profit-per-hour ---------------- */

function calcFlip() {
  const buy = num("t-buy");
  const sell = num("t-sell");
  const qty = num("t-qty");
  const minutes = num("t-time");

  const profitPerItem = sell - buy;
  const profitPerTrade = profitPerItem * qty;
  const tradesPerHour = minutes > 0 ? 60 / minutes : 0;
  const profitPerHour = profitPerTrade * tradesPerHour;

  document.getElementById("t-out-per-trade").textContent = fmt(profitPerTrade) + " WL";

  const perHourTile = document.getElementById("t-out-per-hour-tile");
  document.getElementById("t-out-per-hour").textContent = fmt(profitPerHour) + " WL/hr";
  perHourTile.classList.toggle("warn", profitPerHour < 0);

  const marginTile = document.getElementById("t-out-margin-tile");
  const margin = buy > 0 ? (profitPerItem / buy) * 100 : 0;
  document.getElementById("t-out-margin").textContent = fmt(margin, 1) + "%";
  marginTile.classList.toggle("warn", margin < 0);
}

function wireCalculators() {
  const farmIds = ["f-seed-cost", "f-seed-count", "f-grow-time", "f-yield", "f-price"];
  farmIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", calcFarming);
  });
  if (document.getElementById("f-seed-cost")) calcFarming();

  const convertConfig = [
    ["c-gems", "gems"],
    ["c-wl", "wl"],
    ["c-dl", "dl"],
  ];
  convertConfig.forEach(([id, source]) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", () => calcConvert(source));
  });
  const rateEl = document.getElementById("c-rate");
  if (rateEl) rateEl.addEventListener("input", () => calcConvert("wl"));
  if (document.getElementById("c-gems")) calcConvert("wl");

  const flipIds = ["t-buy", "t-sell", "t-qty", "t-time"];
  flipIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", calcFlip);
  });
  if (document.getElementById("t-buy")) calcFlip();
}

document.addEventListener("DOMContentLoaded", wireCalculators);
