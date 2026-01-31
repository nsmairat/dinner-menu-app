// src/KitchenView.js
import "./KitchenView.css";

export default function KitchenView({ orders, onBack, onClear }) {
  const hasOrders = Array.isArray(orders) && orders.length > 0;

  return (
    <div className="kitchen screen">
      <div className="topbar">
        <button className="nav-arrow" onClick={onBack} aria-label="Go back">
          ‹
        </button>

        <h1 className="screen-title">Kitchen</h1>

        {/* spacer so title stays centered */}
        <div className="topbar-spacer" />
      </div>

      <section className="card kitchen-card">
        <div className="menu-title">Orders</div>
        <div className="menu-subtitle">What guests picked so far</div>

        {!hasOrders ? (
          <div className="kitchen-empty">
            <div className="kitchen-empty-title">No orders yet</div>
            <div className="kitchen-empty-text">
              When someone confirms a drink, it will appear here.
            </div>
          </div>
        ) : (
          <ul className="order-list">
            {orders.map((o, idx) => (
              <li className="order-item" key={`${o.name}-${o.drink}-${idx}`}>
                <div className="order-left">
                  <div className="order-name">{o.name}</div>
                  <div className="order-drink">{o.drink}</div>
                </div>

                <div className="order-badge">#{idx + 1}</div>
              </li>
            ))}
          </ul>
        )}

        {hasOrders && typeof onClear === "function" && (
          <button className="secondary-btn" onClick={onClear}>
            Clear orders
          </button>
        )}
      </section>
    </div>
  );
}
