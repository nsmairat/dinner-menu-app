import "./GuestView.css";

export default function GuestView({ onOpenDrinks, onBack, onOpenKitchen }) {
  return (
    <div className="guest screen">
      <div className="topbar">
        <button className="nav-arrow" onClick={onBack} aria-label="Go back">
          ‹
        </button>

        <h1 className="screen-title">Tonight</h1>
      </div>

      <section className="card food-card">
        <div className="menu-title">Food</div>

        <div className="food-items">
          <div className="food-item">
            <div className="food-name">Braised Lamb</div>
            <div className="food-desc">Slow-cooked, aromatic</div>
          </div>

          <div className="food-item">
            <div className="food-name">Truffle Pasta</div>
            <div className="food-desc">Homemade, comforting</div>
          </div>

          <div className="food-item">
            <div className="food-name">Seasonal Salad</div>
            <div className="food-desc">Fresh and light</div>
          </div>
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
