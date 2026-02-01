// src/KitchenView.js
import "./KitchenView.css";

export default function KitchenView({ orders, onBack }) {
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
        <div className="menu-subtitle">Name + drink only</div>

        {orders.length === 0 ? (
          <div className="kitchen-empty">No orders yet ✨</div>
        ) : (
          <div className="kitchen-list">
            {orders.map((o, i) => (
              <div key={i} className="kitchen-row">
                <div className="kitchen-name">{o.name}</div>
                <div className="kitchen-drink">{o.drink}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
