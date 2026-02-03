// src/ThankYouView.js
import "./ThankYouView.css";

export default function ThankYouView({ onDone }) {
  return (
    <div className="thanks screen">
      <div className="thanks-card card">
        <div className="thanks-title">Thank you ♡</div>

        <p className="thanks-text">Your drink is on the way ✨</p>

        <button className="primary-btn" onClick={onDone}>
          Back to menu
        </button>

        <div className="thanks-hint"> </div>
      </div>
    </div>
  );
}
