import { useRef, useState } from 'react';

const swipeThreshold = 45;

export default function MemoriesSlider({ memories }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(null);
  const activeMemory = memories[activeIndex];

  const showMemory = (index) => {
    setActiveIndex(Math.max(0, Math.min(index, memories.length - 1)));
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.changedTouches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;

    const distance = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(distance) < swipeThreshold) return;
    showMemory(activeIndex + (distance < 0 ? 1 : -1));
  };

  return (
    <section className="memory-slider glass-card" aria-label="Memories in order">
      <div className="memory-slider-heading">
        <span>CHAPTER {String(activeIndex + 1).padStart(2, '0')}</span>
        <span>{String(memories.length).padStart(2, '0')} MOMENTS</span>
      </div>

      <div
        className="memory-slider-viewport"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="memory-slider-track" style={{ '--active-slide': activeIndex }}>
          {memories.map((memory, index) => (
            <article
              className={`memory-slide memory-tone-${memory.tone}`}
              key={memory.title}
              role="group"
              aria-roledescription="slide"
              aria-label={`Memory ${index + 1} of ${memories.length}`}
              aria-hidden={index !== activeIndex}
              inert={index !== activeIndex}
            >
              <span className="memory-chapter">{memory.chapter}</span>
              <span className="memory-slide-butterfly" aria-hidden="true">🦋</span>
              <h3>{memory.title}</h3>
              <p>{memory.description}</p>
            </article>
          ))}
        </div>
      </div>

      <div
        className="memory-progress"
        role="progressbar"
        aria-label="Memory reading progress"
        aria-valuemin={1}
        aria-valuemax={memories.length}
        aria-valuenow={activeIndex + 1}
      >
        <span style={{ width: `${((activeIndex + 1) / memories.length) * 100}%` }} />
      </div>

      <div className="memory-slider-controls">
        <button
          className="memory-arrow"
          type="button"
          onClick={() => showMemory(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Previous memory"
        >
          <span aria-hidden="true">←</span>
          <span className="memory-arrow-label">Previous</span>
        </button>

        <nav className="memory-pagination" aria-label="Choose a memory">
          {memories.map((memory, index) => (
            <button
              className={index === activeIndex ? 'memory-page active' : 'memory-page'}
              key={memory.title}
              type="button"
              onClick={() => showMemory(index)}
              aria-label={`Go to memory ${index + 1}: ${memory.chapter}`}
              aria-current={index === activeIndex ? 'step' : undefined}
            />
          ))}
        </nav>

        <button
          className="memory-arrow"
          type="button"
          onClick={() => showMemory(activeIndex + 1)}
          disabled={activeIndex === memories.length - 1}
          aria-label="Next memory"
        >
          <span className="memory-arrow-label">Next</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <span className="memory-current-title" aria-live="polite" aria-atomic="true">
        {activeMemory.chapter}
      </span>
    </section>
  );
}
