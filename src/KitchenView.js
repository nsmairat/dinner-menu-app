// src/KitchenView.js
import { useEffect, useState } from "react";
import "./KitchenView.css";
import { fetchOrders, resetOrdersSheet } from "./ordersApi";

export default function KitchenView({ onBack }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [resetting, setResetting] = useState(false);

  async function loadOrders() {
    try {
      setErr("");
      const data = await fetchOrders();
      setOrders(data);
    } catch (e) {
      setErr(e?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }

  async function handleReset() {
    const ok = window.confirm("Reset all orders? This will clear the sheet.");
    if (!ok) return;

    try {
      setResetting(true);
      setErr("");
      await resetOrdersSheet();
      await loadOrders();
    } catch (e) {
      setErr(e?.message || "Reset failed");
    } finally {
      setResetting(false);
    }
  }

  useEffect(() => {
    loadOrders();
    const id = setInterval(loadOrders, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="screen kitchen">
      {/* TOP BAR */}
      <header className="topbar">
        <button className="nav-arrow" onClick={onBack} aria-label="Go back">
          ‹
        </button>

        <h1 className="screen-title">Kitchen</h1>

        <div className="topbar-spacer" />
      </header>

      {/* CARD */}
      <section className="card kitchen-card">
        <div className="food-card-header">Orders</div>

        <div className="reset-wrap">
          <button
            className="primary-btn reset-btn"
            onClick={handleReset}
            disabled={resetting}
          >
            {resetting ? "Resetting…" : "Reset Orders"}
          </button>
        </div>

        {err && <div className="form-error">❌ {err}</div>}

        {loading ? (
          <div className="muted">Loading…</div>
        ) : orders.length === 0 ? (
          <div className="muted">No orders to show.</div>
        ) : (
          <ul className="orders-list">
            {orders.map((o, idx) => (
              <li key={`${o.name}-${o.drink}-${idx}`} className="order-row">
                <span className="order-name">{o.name}</span>
                <span className="order-drink">{o.drink}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
