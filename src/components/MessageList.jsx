import { useEffect, useRef, useState } from 'react';
import MessageCard from './MessageCard';

export default function MessageList({ messages }) {
  const listRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return undefined;

    const cardsInView = new Map();
    const cards = list.querySelectorAll('[data-message-index]');
    let observer;

    const updateReadingArea = () => {
      observer?.disconnect();
      cardsInView.clear();
      const verticalMargin = Math.round(window.innerHeight * 0.35);

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              cardsInView.set(entry.target, entry);
            } else {
              cardsInView.delete(entry.target);
            }
          });

          const viewportCenterX = window.innerWidth / 2;
          const viewportCenterY = window.innerHeight / 2;
          const closestCard = [...cardsInView.keys()].reduce(
            (closest, element) => {
              const bounds = element.getBoundingClientRect();
              const distance = Math.hypot(
                (bounds.left + bounds.width / 2 - viewportCenterX) / window.innerWidth,
                (bounds.top + bounds.height / 2 - viewportCenterY) / window.innerHeight,
              );

              return !closest || distance < closest.distance
                ? { element, distance }
                : closest;
            },
            null,
          );

          if (closestCard) {
            setActiveIndex(Number(closestCard.element.dataset.messageIndex));
          }
        },
        { rootMargin: `-${verticalMargin}px 0px -${verticalMargin}px 0px` },
      );

      cards.forEach((card) => observer.observe(card));
    };

    updateReadingArea();
    window.addEventListener('resize', updateReadingArea);

    return () => {
      window.removeEventListener('resize', updateReadingArea);
      observer?.disconnect();
    };
  }, [messages]);

  return (
    <div className="card-grid message-grid" ref={listRef}>
      {messages.map((message, index) => (
        <MessageCard
          key={message.title}
          title={message.title}
          body={message.body}
          isReading={index === activeIndex}
          index={index}
        />
      ))}
    </div>
  );
}
