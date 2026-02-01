// src/ordersApi.js
export const ORDERS_API_URL =
  "https://script.google.com/macros/s/AKfycbxdWHEEFip0T-gAqILSvGEuyqLW60WAHTzHn4ODGw9LdPtGQA4WbrELGTRE3VFecs4-/exechttps://script.google.com/macros/s/AKfycbxdWHEEFip0T-gAqILSvGEuyqLW60WAHTzHn4ODGw9LdPtGQA4WbrELGTRE3VFecs4-/exec";
// must end with /exec

export async function fetchOrders() {
  // GET (read)
  const res = await fetch(ORDERS_API_URL);

  // If Google returns HTML or an error, this prevents silent failure:
  if (!res.ok) {
    throw new Error(`Fetch orders failed: ${res.status}`);
  }

  // Your doGet() returns JSON
  return res.json();
}
