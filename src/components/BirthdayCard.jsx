export default function BirthdayCard({ isOpen, onToggle, message }) {
  return (
    <div className="birthday-card-wrap">
      <button
        type="button"
        className={isOpen ? 'birthday-card open' : 'birthday-card'}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-label="Open birthday message card"
      >
        <div className="card-header">
          <span className="card-tag">🎁 A little something for you</span>
          <span className="card-toggle">{isOpen ? 'Close' : 'Open'}</span>
        </div>

        {isOpen ? (
          <div className="birthday-message">
            <h3>{message.heading}</h3>
            <p>{message.body}</p>
          </div>
        ) : (
          <div className="card-preview">
            <span className="spark">✨</span>
            <span>Open your surprise</span>
          </div>
        )}
      </button>
    </div>
  );
}
