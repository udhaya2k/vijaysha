export default function MessageCard({ title, body, highlighted = false }) {
  return (
    <article className={highlighted ? 'message-card glass-card highlighted' : 'message-card glass-card'}>
      <div className="card-icon">🦋</div>
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}
