// src/KitchenView.js
import { useEffect, useState } from "react";
import "./KitchenView.css";
import { fetchOrders, resetOrdersSheet } from "./ordersApi";

export default function KitchenView({ onBack }) {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [resetting, setResetting] = useState(false);

  async function loadOrders() {
    try {
      setError("");
      const data = await fetchOrders();

      // Expecting: [{ name: "Nila", drink: "Fanta" }, ...]
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.message || "Failed to fetch");
    }
  }

  async function handleReset() {
    const ok = window.confirm("Clear all orders?");
    if (!ok) return;

    try {
      setResetting(true);
      setError("");

      // Reset sheet
      await resetOrdersSheet();

      // Clear UI immediately
      setOrders([]);
    } catch (err) {
      setError(err?.message || "Reset failed");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

        <button
          className="primary-btn"
          onClick={handleReset}
          disabled={resetting}
          style={{ width: "100%", marginTop: 10 }}
        >
          {resetting ? "Resetting…" : "Reset Orders"}
        </button>

        {error && (
          <div className="form-error" style={{ marginTop: 12 }}>
            ❌ {error}
          </div>
        )}

        <div style={{ marginTop: 14 }}>
          {orders.length === 0 ? (
            <div className="menu-subtitle" style={{ opacity: 0.9 }}>
              No orders to show.
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((o, idx) => (
                <div className="order-row" key={idx}>
                  <span className="order-name">{o.name}</span>
                  <span className="order-drink">{o.drink}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
