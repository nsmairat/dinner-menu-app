import { useState } from "react";
import "./KitchenView.css";
import { resetOrdersSheet } from "./ordersApi";

// If your app already passes orders as props, you can ignore this.
// This file focuses on showing the button + resetting the sheet.

export default function KitchenView({ onBack, orders = [] }) {
  const [resetting, setResetting] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleReset() {
    const ok = window.confirm("Reset all orders in the Google Sheet?");
    if (!ok) return;

    try {
      setResetting(true);
      setMsg("");

      await resetOrdersSheet();

      setMsg("✅ Orders cleared!");
      // If you also keep local orders state somewhere else,
      // we can hook it here later (for now, this confirms reset worked).
    } catch (err) {
      setMsg("❌ " + (err?.message || "Reset failed"));
    } finally {
      setResetting(false);
    }
  }

  return (
    <div className="kitchen screen">
      <div className="topbar">
        <button className="nav-arrow" onClick={onBack} aria-label="Go back">
          ‹
        </button>

        <h1 className="screen-title">Kitchen</h1>

        <div className="topbar-spacer" />
      </div>

      <section className="card kitchen-card">
        {/* ✅ VERY VISIBLE BUTTON */}
        <button
          type="button"
          className="reset-btn"
          onClick={handleReset}
          disabled={resetting}
        >
          {resetting ? "Resetting…" : "Reset Orders 🧹"}
        </button>

        {msg ? <div className="kitchen-msg">{msg}</div> : null}

        <div className="kitchen-subtitle">Orders</div>

        {orders.length === 0 ? (
          <div className="kitchen-empty">No orders yet.</div>
        ) : (
          <ul className="kitchen-list">
            {orders.map((o, idx) => (
              <li key={idx} className="kitchen-item">
                <div className="kitchen-drink">{o.drink}</div>
                <div className="kitchen-name">{o.name}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
