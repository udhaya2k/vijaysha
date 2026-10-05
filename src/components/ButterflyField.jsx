const butterflies = [
  { left: 5, top: 23, size: '2.5rem', duration: '18s', delay: '-7s', tone: 'lavender', startX: '-16px', startY: '18px', midX: '35px', midY: '-28px', endX: '82px', endY: '22px' },
  { left: 19, top: 65, size: '1.8rem', duration: '22s', delay: '-13s', tone: 'blue', startX: '12px', startY: '-16px', midX: '-28px', midY: '32px', endX: '-68px', endY: '-20px' },
  { left: 34, top: 17, size: '2rem', duration: '20s', delay: '-3s', tone: 'gold', startX: '-12px', startY: '14px', midX: '25px', midY: '36px', endX: '60px', endY: '-18px' },
  { left: 55, top: 72, size: '2.6rem', duration: '24s', delay: '-18s', tone: 'blue', startX: '16px', startY: '-12px', midX: '-38px', midY: '-30px', endX: '-78px', endY: '20px' },
  { left: 70, top: 30, size: '2rem', duration: '19s', delay: '-11s', tone: 'lavender', startX: '-14px', startY: '18px', midX: '32px', midY: '-34px', endX: '70px', endY: '24px' },
  { left: 87, top: 58, size: '2.4rem', duration: '23s', delay: '-5s', tone: 'gold', startX: '14px', startY: '-18px', midX: '-32px', midY: '28px', endX: '-74px', endY: '-16px' },
  { left: 12, top: 84, size: '1.6rem', duration: '26s', delay: '-20s', tone: 'gold', startX: '-10px', startY: '-14px', midX: '30px', midY: '-34px', endX: '62px', endY: '18px' },
  { left: 43, top: 88, size: '1.9rem', duration: '21s', delay: '-9s', tone: 'lavender', startX: '12px', startY: '16px', midX: '-30px', midY: '-28px', endX: '-64px', endY: '20px' },
  { left: 63, top: 12, size: '1.7rem', duration: '25s', delay: '-16s', tone: 'blue', startX: '-12px', startY: '18px', midX: '34px', midY: '30px', endX: '72px', endY: '-16px' },
  { left: 94, top: 84, size: '1.8rem', duration: '20s', delay: '-2s', tone: 'lavender', startX: '12px', startY: '-14px', midX: '-28px', midY: '-34px', endX: '-64px', endY: '16px' },
  { left: 27, top: 39, size: '1.5rem', duration: '27s', delay: '-12s', tone: 'blue', startX: '-14px', startY: '16px', midX: '30px', midY: '-30px', endX: '66px', endY: '18px' },
  { left: 78, top: 88, size: '1.7rem', duration: '22s', delay: '-17s', tone: 'gold', startX: '14px', startY: '-12px', midX: '-32px', midY: '30px', endX: '-72px', endY: '-18px' },
];

const sparkles = [
  { left: '12%', top: '42%', delay: '-1s', tone: 'lavender' },
  { left: '31%', top: '78%', delay: '-3s', tone: 'gold' },
  { left: '48%', top: '12%', delay: '-2s', tone: 'blue' },
  { left: '68%', top: '66%', delay: '-4s', tone: 'lavender' },
  { left: '82%', top: '18%', delay: '-1.5s', tone: 'gold' },
  { left: '93%', top: '43%', delay: '-3.5s', tone: 'blue' },
];

const burstButterflies = [
  { tone: 'lavender', size: '1.7rem' },
  { tone: 'blue', size: '1.4rem' },
  { tone: 'gold', size: '1.8rem' },
  { tone: 'blue', size: '1.5rem' },
  { tone: 'lavender', size: '1.6rem' },
  { tone: 'gold', size: '1.4rem' },
  { tone: 'blue', size: '1.8rem' },
  { tone: 'lavender', size: '1.5rem' },
  { tone: 'gold', size: '1.7rem' },
  { tone: 'blue', size: '1.4rem' },
];

export default function ButterflyField({ burstSeed = 0, burstOrigin = { x: '50%', y: '43%', width: 0, height: 0 } }) {
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
            '--start-x': butterfly.startX,
            '--start-y': butterfly.startY,
            '--mid-x': butterfly.midX,
            '--mid-y': butterfly.midY,
            '--end-x': butterfly.endX,
            '--end-y': butterfly.endY,
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
      {sparkles.map((sparkle, index) => (
        <span
          key={`sparkle-${index}`}
          className={`field-sparkle sparkle-${sparkle.tone}`}
          style={{
            left: sparkle.left,
            top: sparkle.top,
            '--sparkle-delay': sparkle.delay,
          }}
        />
      ))}
      {burstSeed > 0 && (
        <>
          {burstButterflies.map((butterfly, index) => {
            const angle = (index / burstButterflies.length) * Math.PI * 2;

            return (
              <span
                key={`butterfly-${burstSeed}-${index}`}
                className={`burst-butterfly butterfly-${butterfly.tone}`}
                style={{
                  '--origin-x': burstOrigin.x,
                  '--origin-y': burstOrigin.y,
                  '--burst-x': `${Math.cos(angle) * burstOrigin.width * 0.42}px`,
                  '--burst-y': `${Math.sin(angle) * burstOrigin.height * 0.42}px`,
                  '--burst-rotation': `${(index % 2 === 0 ? 1 : -1) * (25 + index * 5)}deg`,
                  '--burst-delay': `${index * 35}ms`,
                  '--size': butterfly.size,
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
            );
          })}
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
