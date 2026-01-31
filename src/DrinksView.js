import { useMemo, useState } from "react";
import "./DrinksView.css";

export default function DrinksView({
  onBack,
  onConfirm,
  drinks: drinksFromProps,
}) {
  const [selectedDrink, setSelectedDrink] = useState("");
  const [name, setName] = useState("");

  // Use drinks from props if provided, otherwise fallback
  const drinks = useMemo(() => {
    const fallback = [
      "Red wine",
      "White wine",
      "Sparkling water",
      "Still water",
    ];
    return Array.isArray(drinksFromProps) && drinksFromProps.length > 0
      ? drinksFromProps
      : fallback;
  }, [drinksFromProps]);

  const trimmedName = name.trim();
  const canConfirm = selectedDrink && trimmedName.length > 0;

  function handleConfirm() {
    if (!canConfirm) return;

    const order = { name: trimmedName, drink: selectedDrink };

    // Helpful debug (you can remove later)
    console.log("Confirming order:", order);

    onConfirm(order);
  }

  return (
    <div className="drinks screen">
      <div className="topbar">
        <button
          type="button"
          className="nav-arrow"
          onClick={onBack}
          aria-label="Go back"
        >
          ‹
        </button>

        <h1 className="screen-title">Tonight</h1>

        {/* spacer to keep title centered if you use topbar grid/flex later */}
        <div style={{ width: 36, height: 36 }} />
      </div>

      <section className="card drinks-card">
        <div className="menu-title">Drinks</div>
        <div className="menu-subtitle">What would you like to drink?</div>

        <div className="drink-options" role="list">
          {drinks.map((drink) => {
            const isSelected = selectedDrink === drink;

            return (
              <button
                type="button"
                key={drink}
                className={`drink-row ${isSelected ? "selected" : ""}`}
                onClick={() => setSelectedDrink(drink)}
              >
                <span className="drink-label">{drink}</span>
                <span className="drink-dot" aria-hidden="true" />
              </button>
            );
          })}
        </div>

        <div className="name-row">
          <div className="name-label">This drink is for</div>

          <input
            className="name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            inputMode="text"
            autoComplete="name"
            placeholder="Name"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleConfirm();
            }}
          />
        </div>

        <button
          type="button"
          className="primary-btn"
          disabled={!canConfirm}
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </section>
    </div>
  );
}
