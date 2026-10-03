export default function MemoryCard({ title, description, image }) {
  return (
    <article className="memory-card glass-card">
      <div className="memory-visual" aria-label={title}>
        {image ? (
          <img src={image} alt={title} />
        ) : (
          <div className="memory-placeholder">
            <span>🦋</span>
            <small>Memory placeholder</small>
          </div>
        )}
      </div>
      <div className="memory-copy">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}
