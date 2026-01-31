import "./KitchenView.css";

export default function KitchenView({ orders, onBack }) {
  return (
    <div className="kitchen screen">
      <div className="topbar">
        <button className="nav-arrow" onClick={onBack} aria-label="Go back">
          ‹
        </button>
        <h1 className="screen-title">Kitchen</h1>
      </div>

      <section className="card kitchen-card">
        {orders.length === 0 ? (
          <div className="kitchen-empty">No orders yet.</div>
        ) : (
          <div className="kitchen-list">
            {orders
              .slice()
              .reverse()
              .map((o, idx) => (
                <div className="kitchen-row" key={idx}>
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
