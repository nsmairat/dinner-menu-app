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
    <div className="welcome-screen">
      <div className="welcome-card">
        <div className="party-badge">✨ Dinner Party ✨</div>

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
          to the Smairats <span className="emoji">🥂</span>
        </h1>

        <p className="welcome-text">
          Food is already set 😌
          <br />
          Pick a drink you’ll love 🍷🫧
        </p>

        <button className="primary-btn" onClick={onContinue}>
          Let’s go! 🚀
        </button>
      </div>
    </div>
  );
}
