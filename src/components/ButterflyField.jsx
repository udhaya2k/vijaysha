const butterflies = [
  { left: 5, top: 23, size: '2.5rem', duration: '18s', delay: '-7s', tone: 'lavender' },
  { left: 19, top: 65, size: '1.8rem', duration: '22s', delay: '-13s', tone: 'blue' },
  { left: 34, top: 17, size: '2rem', duration: '20s', delay: '-3s', tone: 'gold' },
  { left: 55, top: 72, size: '2.6rem', duration: '24s', delay: '-18s', tone: 'blue' },
  { left: 70, top: 30, size: '2rem', duration: '19s', delay: '-11s', tone: 'lavender' },
  { left: 87, top: 58, size: '2.4rem', duration: '23s', delay: '-5s', tone: 'gold' },
];

export default function ButterflyField({ burstSeed = 0 }) {
  return (
    <div className="butterfly-field" aria-hidden="true">
      {butterflies.map((butterfly) => (
        <span
          key={`${butterfly.left}-${butterfly.top}`}
          className={`butterfly-flight butterfly-${butterfly.tone}`}
          style={{
            '--left': `${butterfly.left}%`,
            '--top': `${butterfly.top}%`,
            '--size': butterfly.size,
            '--duration': butterfly.duration,
            '--delay': butterfly.delay,
          }}
        >
          <svg viewBox="0 0 64 64" className="butterfly-shape">
            <g className="butterfly-wings">
              <path className="wing wing-left" d="M31 29C24 11 5 7 7 23c1 9 11 12 22 13-10 2-16 8-12 15 5 8 14-2 16-15Z" />
              <path className="wing wing-right" d="M33 29C40 11 59 7 57 23c-1 9-11 12-22 13 10 2 16 8 12 15-5 8-14-2-16-15Z" />
            </g>
            <path className="butterfly-body" d="M32 27c-3 6-3 13 0 20 3-7 3-14 0-20Zm-1-2-6-7m7 7 6-7" />
          </svg>
        </span>
      ))}
      {burstSeed > 0 && (
        <>
          {Array.from({ length: 12 }, (_, index) => (
            <span
              key={`${burstSeed}-${index}`}
              className="burst-particle"
              style={{ '--angle': `${index * 30}deg`, '--particle-index': index }}
            />
          ))}
        </>
      )}
    </div>
  );
}
