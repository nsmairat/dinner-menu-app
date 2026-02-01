// src/ordersApi.js

export const ORDERS_API_URL =
  "https://script.google.com/macros/s/AKfycbxdWHEEFip0T-gAqILSvGEuyqLW60WAHTzHn4ODGw9LdPtGQA4WbrELGTRE3VFecs4-/exec";

// Send order (fire & forget)
export async function sendOrderToSheet(order) {
  fetch(ORDERS_API_URL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(order),
  });
}

// Reset sheet (expects JSON)
export async function resetOrdersSheet() {
  const res = await fetch(`${ORDERS_API_URL}?action=reset`);
  const data = await res.json();

  if (!data.ok) {
    throw new Error(data.error || "Reset failed");
  }
}

// Fetch orders (Kitchen view)
export async function fetchOrders() {
  // Optional: if you already have this working, keep yours
  return [];
}
