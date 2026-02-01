import { useState } from "react";
import "./DrinksView.css";
import { sendOrderToSheet } from "./ordersApi";

export default function DrinksView({ onBack, onConfirm, drinks = [] }) {
  const [selectedDrink, setSelectedDrink] = useState("");
  const [name, setName] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  const canConfirm = selectedDrink && name.trim().length > 0 && !sending;

  async function handleConfirm() {
    const order = { name: name.trim(), drink: selectedDrink };

    try {
      setSending(true);
      setSendError("");

      // ✅ send to Google Sheet first
      await sendOrderToSheet(order);

      // ✅ then continue your app flow
      onConfirm(order);
    } catch (err) {
      setSendError(
        err?.message || "Could not save the order. Please try again.",
      );
    } finally {
      setSending(false);
    }
  }

  const list =
    drinks.length > 0
      ? drinks
      : ["Red wine", "White wine", "Sparkling water", "Still water"];

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
          {list.map((drink) => {
            const isSelected = selectedDrink === drink;

            return (
              <button
                type="button"
                key={drink}
                className={`drink-row ${isSelected ? "selected" : ""}`}
                onClick={() => setSelectedDrink(drink)}
              >
                <span className="drink-label">{drink}</span>
                <span className="drink-dot" />
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
          />
        </div>

        {sendError && <div className="form-error">❌ {sendError}</div>}

        <button
          className="primary-btn"
          disabled={!canConfirm}
          onClick={handleConfirm}
        >
          {sending ? "Saving…" : "Confirm"}
        </button>
      </section>
    </div>
  );
}
