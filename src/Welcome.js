// src/Welcome.js
import { useRef } from "react";
import "./Welcome.css";

export default function Welcome({ onContinue, onOpenKitchen }) {
  const pressTimerRef = useRef(null);

  function startLongPress() {
    if (!onOpenKitchen) return;

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
    <div className="welcome screen">
      <h1 className="welcome-title">
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
          Welcome
        </span>{" "}
        to the Smairats
      </h1>

      <div className="divider">✦ ✦ ✦</div>

      <p className="welcome-text">
        Explore tonight’s menu,
        <br />
        then choose a drink
        <br />
        you’ll enjoy.
      </p>

      <div className="divider">✦ ✦ ✦</div>

      <button className="primary-btn" onClick={onContinue}>
        Continue
      </button>
    </div>
  );
}
