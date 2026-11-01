import React, { useState, useEffect } from 'react';

export default function DoomsdaySection() {
  // Target: December 17, 2026 IST
  const targetDate = new Date('2026-12-17T00:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

  function calculateTimeLeft() {
    const now = Date.now();
    const diff = Math.max(0, targetDate - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds, diff };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <section
      id="doomsday"
      className="doomsday-section"
      aria-label="Avengers: Doomsday Preview & Countdown"
      style={{
        position: 'relative',
        padding: '14vh 6vw',
        maxWidth: '1240px',
        margin: '0 auto',
        zIndex: 2
      }}
    >
      <div className="doomsday-grid">
        {/* Left Column: Doctor Doom Poster in Retro VHS Frame */}
        <div className="film-poster" style={{ width: '100%', maxWidth: '440px', margin: '0 auto' }}>
          <div className="frame" style={{ borderRadius: '16px' }}>
            <img
              src={`${import.meta.env.BASE_URL}assets/images/39-avengers-doomsday.jpg`}
              alt="Doctor Doom - Avengers: Doomsday poster"
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                height: 'auto',
                aspectRatio: '2/3',
                objectFit: 'cover',
                borderRadius: '14px'
              }}
            />
          </div>
        </div>

        {/* Right Column: Title, Tagline, Countdown, Info Card & Story */}
        <div className="doomsday-content">
          {/* Top Pill / Badge */}
          <div className="doomsday-preview-pill">
            <span className="play-icon" aria-hidden="true">▶</span>
            <span>PREVIEW</span>
            <span className="dot" aria-hidden="true">•</span>
            <span>COMING TO THEATERS</span>
          </div>

          {/* Title */}
          <h2 className="doomsday-title">DOOMSDAY</h2>
          <div className="doomsday-title-slash" aria-hidden="true" />

          {/* Tagline with horizontal lines */}
          <div className="doomsday-tagline-wrap">
            <span className="doomsday-tagline-line left" aria-hidden="true" />
            <span className="doomsday-tagline-text">THERE IS ONLY DOOM.</span>
            <span className="doomsday-tagline-line right" aria-hidden="true" />
          </div>

          {/* Countdown Clock Display */}
          <div className="doomsday-countdown">
            <div className="doomsday-count-col">
              <div className="doomsday-count-num">{timeLeft.days}</div>
              <div className="doomsday-count-lbl">DAYS</div>
            </div>

            <div className="doomsday-count-col">
              <div className="doomsday-count-num">{pad(timeLeft.hours)}</div>
              <div className="doomsday-count-lbl">HOURS</div>
            </div>

            <div className="doomsday-count-col">
              <div className="doomsday-count-num">{pad(timeLeft.minutes)}</div>
              <div className="doomsday-count-lbl">MINS</div>
            </div>

            <div className="doomsday-count-col">
              <div className="doomsday-count-num is-accent">{pad(timeLeft.seconds)}</div>
              <div className="doomsday-count-lbl is-accent">SECS</div>
            </div>
          </div>

          {/* Info Card (Release, Directors, Villain) */}
          <div className="doomsday-info-card">
            <div className="doomsday-info-row">
              <div className="doomsday-info-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <span className="doomsday-info-lbl">RELEASE:</span>
              <span className="doomsday-info-sep" aria-hidden="true">│</span>
              <span className="doomsday-info-val">DEC 17, 2026 (INDIA)</span>
            </div>

            <div className="doomsday-info-row">
              <div className="doomsday-info-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M7 4v4M12 4v4M17 4v4M2 8h20" />
                </svg>
              </div>
              <span className="doomsday-info-lbl">DIRECTORS:</span>
              <span className="doomsday-info-sep" aria-hidden="true">│</span>
              <span className="doomsday-info-val">RUSSO BROTHERS</span>
            </div>

            <div className="doomsday-info-row">
              <div className="doomsday-info-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a7 7 0 0 0-7 7c0 5 4 10 7 13 3-3 7-8 7-13a7 7 0 0 0-7-7z" />
                  <circle cx="9" cy="9" r="1.5" fill="currentColor" />
                  <circle cx="15" cy="9" r="1.5" fill="currentColor" />
                  <path d="M9 15h6" />
                </svg>
              </div>
              <span className="doomsday-info-lbl">VILLAIN:</span>
              <span className="doomsday-info-sep" aria-hidden="true">│</span>
              <span className="doomsday-info-val">VICTOR VON DOOM</span>
            </div>
          </div>

          {/* Synopsis Paragraph */}
          <p className="doomsday-synopsis">
            As multiversal incursions push realities to the brink of collapse, Victor Von Doom emerges to claim dominion over existence. Earth's Mightiest Heroes and warriors from across space and time must stand together against the ultimate sovereign threat.
          </p>
        </div>
      </div>
    </section>
  );
}
