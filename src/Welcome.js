import "./Welcome.css";

export default function Welcome({ onContinue }) {
  return (
    <div className="welcome screen">
      <div className="party-badge">✨ Dinner Party ✨</div>

      <h1 className="welcome-title">
        Welcome to the Smairats <span className="emoji">🥂</span>
      </h1>

      <p className="welcome-text">
        Food is already set 😌
        <br />
        Pick a drink you’ll love 🍷🫧
      </p>

      <button className="primary-btn crazy" onClick={onContinue}>
        Let’s go! 🚀
      </button>
    </div>
  );
}
