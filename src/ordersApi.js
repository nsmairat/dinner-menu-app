// src/ordersApi.js
export const ORDERS_API_URL =
  "https://script.google.com/macros/s/AKfycbxdWHEEFip0T-gAqILSvGEuyqLW60WAHTzHn4ODGw9LdPtGQA4WbrELGTRE3VFecs4-/exec";
// must end with /exec

export async function sendOrderToSheet(order) {
  // IMPORTANT:
  // - no headers
  // - POST
  // - mode: "no-cors"
  // This avoids CORS + preflight problems with Google Apps Script
  await fetch(ORDERS_API_URL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(order),
  });
}
