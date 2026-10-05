export default function MessageCard({ title, body, isReading = false, index }) {
  return (
    <article
      className={isReading ? 'message-card glass-card is-reading' : 'message-card glass-card'}
      data-message-index={index}
      aria-current={isReading ? 'location' : undefined}
    >
      <div className="message-card-heading">
        <div className="card-icon" aria-hidden="true">🦋</div>
        {isReading && <span className="message-reading-indicator">Reading now</span>}
      </div>
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}
