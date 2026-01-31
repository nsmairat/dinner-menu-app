import "./ThankYouView.css";

export default function ThankYouView({ onDone }) {
  return (
    <div className="thanks screen">
      <div className="topbar"></div>

      <section className="card thanks-card">
        <div className="thanks-big">Thank you ♡</div>
        <div className="thanks-small">Your drink request is on its way.</div>

        <button className="primary-btn" onClick={onDone}>
          Back to menu
        </button>
      </section>
    </div>
  );
}
