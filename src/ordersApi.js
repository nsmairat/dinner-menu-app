// src/ordersApi.js

export const ORDERS_API_URL =
  "https://script.google.com/macros/s/AKfycbxdWHEEFip0T-gAqILSvGEuyqLW60WAHTzHn4ODGw9LdPtGQA4WbrELGTRE3VFecs4-/exec";

// ✅ Send order (fire & forget) — keep no-cors for POST
export function sendOrderToSheet(order) {
  fetch(ORDERS_API_URL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(order),
  });
}

// ✅ Reset sheet — expects JSON from doGet?action=reset
export async function resetOrdersSheet() {
  const res = await fetch(`${ORDERS_API_URL}?action=reset&t=${Date.now()}`);
  const data = await res.json();

  if (!data.ok) {
    throw new Error(data.error || "Reset failed");
  }

  return true;
}

// ✅ Fetch orders — expects JSON from doGet?action=list
export async function fetchOrders() {
  const res = await fetch(`${ORDERS_API_URL}?action=list&t=${Date.now()}`);
  const data = await res.json();

  if (!data.ok) {
    throw new Error(data.error || "Fetch failed");
  }

  // data.orders should be an array
  return Array.isArray(data.orders) ? data.orders : [];
}
