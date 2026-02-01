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
      const list = await fetchOrders();
      setOrders(Array.isArray(list) ? list : []);
    } catch (e) {
      setErr(e?.message || "Could not load orders.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleReset() {
    const ok = window.confirm("Reset all orders? This cannot be undone.");
    if (!ok) return;

    try {
      setResetting(true);
      setErr("");

      await resetOrdersSheet(); // clears Google Sheet
      await loadOrders(); // immediately refresh UI after reset
    } catch (e) {
      setErr(e?.message || "Reset failed.");
    } finally {
      setResetting(false);
    }
  }

  useEffect(() => {
    // load immediately
    loadOrders();

    // auto refresh every 3 seconds
    const id = setInterval(() => {
      loadOrders();
    }, 3000);

    return () => clearInterval(id);
  }, []);

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
        <div className="menu-title">Orders</div>

        {/* ✅ ONLY ONE BUTTON */}
        <div className="kitchen-actions">
          <button
            className="primary-btn"
            onClick={handleReset}
            disabled={resetting}
          >
            {resetting ? "Resetting…" : "Reset Orders"}
          </button>
        </div>

        {err && <div className="form-error">❌ {err}</div>}

        {loading ? (
          <div className="menu-empty">Loading…</div>
        ) : orders.length === 0 ? (
          <div className="menu-empty">No orders to show.</div>
        ) : (
          <ul className="orders-list">
            {orders.map((o, idx) => (
              <li className="order-row" key={idx}>
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
