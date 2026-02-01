// src/ordersApi.js

const ORDERS_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbxdWHEEFip0T-gAqILSvGEuyqLW60WAHTzHn4ODGw9LdPtGQA4WbrELGTRE3VFecs4-/exec";

/**
 * Send an order to Google Apps Script without triggering CORS preflight.
 * We use GET with query params (POST often triggers CORS preflight).
 */
export async function sendOrder({ name, drink }) {
  const url = new URL(ORDERS_WEB_APP_URL);
  url.searchParams.set("name", name);
  url.searchParams.set("drink", drink);

  const res = await fetch(url.toString(), { method: "GET" });

  // If Google returns an HTML login page or an error, this helps you notice.
  if (!res.ok) {
    throw new Error(`Order send failed: ${res.status}`);
  }

  // Optional: If your script returns JSON, you can read it.
  // If it returns plain text, this is still fine.
  const text = await res.text();

  // If script returns something like "OK", great.
  // If it returns an HTML error page, it will be obvious in the text.
  if (text && text.toLowerCase().includes("error")) {
    throw new Error(text);
  }

  return true;
}
