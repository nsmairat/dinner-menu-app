// src/ordersApi.js

// Apps Script Web App (used for POST + reset)
export const ORDERS_API_URL =
  "https://script.google.com/macros/s/AKfycbypmaK7b0jCAzRoMwHKXkBcGE6PbP-L0RKojFpzTOi8f1ferhj-M66gKSa35Zup71o8/exec";

// Google Sheets CSV export (used for Kitchen read)
export const ORDERS_CSV_URL =
  "https://docs.google.com/spreadsheets/d/140lR2k1ygsDaqVvvon0Vg2T8L9XiXBwfdsdwV_FlHHo/export?format=csv&gid=2062898116";

// ✅ Send order (fire & forget)
export function sendOrderToSheet(order) {
  fetch(ORDERS_API_URL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(order),
  });
}

// ✅ Reset orders (clears sheet)
export async function resetOrdersSheet() {
  const url = `${ORDERS_API_URL}?action=reset&ts=${Date.now()}`; // ts busts cache
  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();

  if (!data.ok) throw new Error(data.error || "Reset failed");
}

// ✅ Fetch orders (CSV) — IMPORTANT: bust cache so it doesn't reuse old CSV
export async function fetchOrders() {
  const url = `${ORDERS_CSV_URL}&t=${Date.now()}`;

  const res = await fetch(url, {
    cache: "no-store", // ✅ tells browser not to cache
  });

  if (!res.ok) throw new Error("Fetch failed");

  const text = await res.text();

  // Parse CSV: assumes header row: name,drink
  const lines = text.trim().split("\n");

  // If only header or empty
  if (lines.length <= 1) return [];

  // helper to remove quotes
  const clean = (s) => s.replace(/^"(.*)"$/, "$1").trim();

  const rows = lines.slice(1).map((line) => {
    const parts = line.split(",");
    const name = clean(parts[0] || "");
    const drink = clean(parts[1] || "");
    return { name, drink };
  });

  // Remove blank rows
  return rows.filter((r) => r.name && r.drink);
}
