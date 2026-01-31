import "./GuestView.css";

export default function GuestView({ foods = [], onOpenDrinks, onBack }) {
  return (
    <div className="guest screen">
      <div className="topbar">
        <button className="nav-arrow" onClick={onBack} aria-label="Go back">
          ‹
        </button>

        <h1 className="screen-title">Tonight</h1>

        <div className="topbar-spacer" />
      </div>

      <section className="card food-card">
        <div className="food-card-header">Food</div>

        {foods.length === 0 ? (
          <div className="menu-empty">Menu coming soon…</div>
        ) : (
          <div className="food-items">
            {foods.map((item, i) => (
              <div className="food-item" key={i}>
                <div className="food-name">{item.name}</div>
                <div className="food-desc">{item.description}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      <button className="drinks-bar" onClick={onOpenDrinks}>
        <span className="drinks-left">
          Drinks <span className="drinks-arrow">›</span>
        </span>
        <span className="drinks-right">Choose a drink</span>
      </button>
    </div>
  );
}
