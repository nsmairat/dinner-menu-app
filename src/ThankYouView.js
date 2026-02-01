// src/ThankYouView.js
import { useRef } from "react";
import "./ThankYouView.css";

export default function ThankYouView({ onDone, onOpenKitchen }) {
  const pressTimerRef = useRef(null);

  function startLongPress() {
    if (!onOpenKitchen) return;

    // long-press after 900ms
    pressTimerRef.current = setTimeout(() => {
      onOpenKitchen();
    }, 900);
  }

  function cancelLongPress() {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
  }

  return (
    <div className="thanks screen">
      <div className="thanks-card card">
        <div className="thanks-title">Thank you ♡</div>

        <p className="thanks-text">
          Your{" "}
          <span
            className="secret-kitchen"
            onMouseDown={startLongPress}
            onMouseUp={cancelLongPress}
            onMouseLeave={cancelLongPress}
            onTouchStart={startLongPress}
            onTouchEnd={cancelLongPress}
            onTouchCancel={cancelLongPress}
            aria-label="Hidden kitchen"
          >
            drink
          </span>{" "}
          is on the way ✨
        </p>

        <button className="primary-btn" onClick={onDone}>
          Back to menu
        </button>

        <div className="thanks-hint"> </div>
      </div>
    </div>
  );
}
