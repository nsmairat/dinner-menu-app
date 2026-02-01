// src/ordersApi.js

export const ORDERS_API_URL =
  "https://script.google.com/macros/s/AKfycbxdWHEEFip0T-gAqILSvGEuyqLW60WAHTzHn4ODGw9LdPtGQA4WbrELGTRE3VFecs4-/exec";

// Send order (fire & forget)
export async function sendOrderToSheet(order) {
  await fetch(ORDERS_API_URL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(order),
  });
}

/**
 * Reset sheet (fire & forget)
 * IMPORTANT:
 * - no-cors means we can't read response (that's OK)
 * - we rely on the Apps Script doing the reset
 */
export async function resetOrdersSheet() {
  await fetch(`${ORDERS_API_URL}?action=reset`, {
    method: "POST",
    mode: "no-cors",
  });
}

/**
 * Fetch orders
 * If your Kitchen view already shows orders, you likely fetch them elsewhere.
 * For now we keep this safe so your app doesn't crash.
 */
export async function fetchOrders() {
  return [];
}
