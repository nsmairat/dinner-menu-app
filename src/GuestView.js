import "./GuestView.css";

export default function GuestView({
  foods = [],
  onOpenDrinks,
  onBack,
  onOpenKitchen,
}) {
  return (
    <div className="guest screen">
      <div className="topbar">
        <button className="nav-arrow" onClick={onBack} aria-label="Go back">
          ‹
        </button>

        <h1 className="screen-title">Tonight</h1>
      </div>

      <section className="card food-card">
        <div className="food-card-header">Food</div>

        <div className="food-items">
          {foods.length ? (
            foods.map((item, idx) => (
              <div className="food-item" key={`${item.name}-${idx}`}>
                <div className="food-name">{item.name}</div>
                <div className="food-desc">{item.description}</div>
              </div>
            ))
          ) : (
            <div className="menu-empty">Loading menu…</div>
          )}
        </div>
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
