import { useState } from "react";
import "./DrinksView.css";

export default function DrinksView({ drinks = [], onBack, onConfirm }) {
  const [selectedDrink, setSelectedDrink] = useState("");
  const [name, setName] = useState("");

  const canConfirm = selectedDrink && name.trim().length > 0;

  return (
    <div className="drinks screen">
      <div className="topbar">
        <button className="nav-arrow" onClick={onBack} aria-label="Go back">
          ‹
        </button>

        <h1 className="screen-title">Tonight</h1>

        <div className="topbar-spacer" />
      </div>

      <section className="card drinks-card">
        <div className="menu-title">Drinks</div>
        <div className="menu-subtitle">What would you like to drink?</div>

        <div className="drink-options">
          {drinks.map((drink) => (
            <button
              key={drink}
              type="button"
              className={`drink-row ${
                selectedDrink === drink ? "selected" : ""
              }`}
              onClick={() => setSelectedDrink(drink)}
            >
              <span className="drink-label">{drink}</span>
              <span className="drink-dot" />
            </button>
          ))}
        </div>

        <div className="name-row">
          <div className="name-label">This drink is for</div>
          <input
            className="name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
        </div>

        <button
          className="primary-btn"
          disabled={!canConfirm}
          onClick={() => onConfirm({ name: name.trim(), drink: selectedDrink })}
        >
          Confirm
        </button>
      </section>
    </div>
  );
}
