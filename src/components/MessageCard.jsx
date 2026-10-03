export default function MessageCard({ title, body }) {
  return (
    <article className="message-card glass-card">
      <div className="card-icon">🦋</div>
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}
