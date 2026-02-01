// src/KitchenView.js
import { useEffect, useState } from "react";
import "./KitchenView.css";
import { fetchOrders } from "./ordersApi";

export default function KitchenView({ onBack }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setError("");
        const data = await fetchOrders();
        if (isMounted) {
          setOrders(Array.isArray(data) ? data : []);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setLoading(false);
          setError(err?.message || "Could not load orders.");
        }
      }
    }

    load(); // first load now
    const interval = setInterval(load, 3000); // then every 3 seconds

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
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
        {loading && <div className="menu-empty">Loading orders…</div>}

        {!loading && error && <div className="menu-empty">❌ {error}</div>}

        {!loading && !error && orders.length === 0 && (
          <div className="menu-empty">No orders yet</div>
        )}

        {!loading &&
          !error &&
          orders.map((o, idx) => (
            <div key={idx} className="order-row">
              <div className="order-name">{o.name}</div>
              <div className="order-drink">{o.drink}</div>
            </div>
          ))}
      </section>
    </div>
  );
}
