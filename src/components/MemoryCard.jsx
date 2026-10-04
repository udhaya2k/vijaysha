export default function MemoryCard({ title, description, images = [] }) {
  return (
    <article className="memory-card glass-card">
      <div className={images.length > 1 ? 'memory-visual memory-gallery' : 'memory-visual'} aria-label={title}>
        {images.length > 0 ? (
          images.map((image) => (
            <a
              className="memory-image-link"
              href={image.source}
              key={image.src}
              target="_blank"
              rel="noreferrer"
              aria-label={`${image.alt} (opens photo source on Pexels)`}
            >
              <img src={image.src} alt={image.alt} loading="lazy" />
              <span>Photo on Pexels ↗</span>
            </a>
          ))
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
