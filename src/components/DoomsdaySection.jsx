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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'clamp(32px, 5vw, 64px)',
          alignItems: 'center'
        }}
      >
        {/* Left Column: Doctor Doom Poster in Retro VHS Frame */}
        <div className="film-poster" style={{ width: '100%', maxWidth: '440px', margin: '0 auto' }}>
          <div className="frame">
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
                borderRadius: '3px'
              }}
            />
          </div>
        </div>

        {/* Right Column: Title, Tagline, Countdown & Story */}
        <div style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '18px' }}>
            <span
              style={{
                fontFamily: 'var(--font-osd, monospace)',
                fontSize: '13px',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'var(--green, #4dff8c)',
                background: 'rgba(77, 255, 140, 0.08)',
                border: '1px solid rgba(77, 255, 140, 0.3)',
                padding: '5px 12px',
                borderRadius: '4px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 0 16px rgba(77, 255, 140, 0.2)'
              }}
            >
              <span style={{ color: '#ff2d55' }}>●</span> PREVIEW ▶ COMING TO THEATERS
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-title, sans-serif)',
              fontSize: 'clamp(44px, 5.5vw, 84px)',
              lineHeight: '0.9',
              color: '#f3efe4',
              margin: '0 0 12px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              textShadow: '0 0 18px rgba(77, 255, 140, 0.7), 0 0 45px rgba(77, 255, 140, 0.35)'
            }}
          >
            Avengers: Doomsday
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-osd, monospace)',
              fontSize: 'clamp(14px, 1.4vw, 18px)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--green, #4dff8c)',
              margin: '0 0 28px'
            }}
          >
            "There is only Doom."
          </p>

          {/* Countdown Clock Display */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px',
              maxWidth: '520px',
              margin: '0 0 28px',
              padding: '18px',
              background: 'rgba(7, 9, 12, 0.9)',
              border: '1px solid rgba(77, 255, 140, 0.3)',
              borderRadius: '8px',
              boxShadow: '0 0 35px rgba(31, 61, 43, 0.5), inset 0 0 20px rgba(0, 0, 0, 0.8)',
              textAlign: 'center'
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-osd, monospace)',
                  fontSize: 'clamp(28px, 3.4vw, 44px)',
                  fontWeight: 700,
                  color: '#fff',
                  textShadow: '0 0 12px rgba(77, 255, 140, 0.9)'
                }}
              >
                {timeLeft.days}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-osd, monospace)',
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--muted, #8d8a80)',
                  marginTop: '4px'
                }}
              >
                Days
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-osd, monospace)',
                  fontSize: 'clamp(28px, 3.4vw, 44px)',
                  fontWeight: 700,
                  color: '#fff',
                  textShadow: '0 0 12px rgba(77, 255, 140, 0.9)'
                }}
              >
                {pad(timeLeft.hours)}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-osd, monospace)',
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--muted, #8d8a80)',
                  marginTop: '4px'
                }}
              >
                Hours
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-osd, monospace)',
                  fontSize: 'clamp(28px, 3.4vw, 44px)',
                  fontWeight: 700,
                  color: '#fff',
                  textShadow: '0 0 12px rgba(77, 255, 140, 0.9)'
                }}
              >
                {pad(timeLeft.minutes)}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-osd, monospace)',
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--muted, #8d8a80)',
                  marginTop: '4px'
                }}
              >
                Mins
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-osd, monospace)',
                  fontSize: 'clamp(28px, 3.4vw, 44px)',
                  fontWeight: 700,
                  color: 'var(--green, #4dff8c)',
                  textShadow: '0 0 14px rgba(77, 255, 140, 0.9)'
                }}
              >
                {pad(timeLeft.seconds)}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-osd, monospace)',
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--muted, #8d8a80)',
                  marginTop: '4px'
                }}
              >
                Secs
              </div>
            </div>
          </div>

          {/* Meta & Synopsis Box */}
          <div
            style={{
              maxWidth: '560px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              padding: '20px 24px'
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-osd, monospace)',
                fontSize: '13px',
                letterSpacing: '0.12em',
                color: 'var(--ink, #e8e4d8)',
                margin: '0 0 12px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <span><b>RELEASE:</b> DEC 17, 2026 (INDIA)</span>
              <span>•</span>
              <span><b>DIRECTORS:</b> RUSSO BROTHERS</span>
              <span>•</span>
              <span><b>VICTOR VON DOOM:</b> ROBERT DOWNEY JR.</span>
            </p>
            <p
              style={{
                fontSize: '14px',
                lineHeight: '1.6',
                color: 'var(--muted, #8d8a80)',
                margin: 0
              }}
            >
              As multiversal incursions push realities to the brink of collapse, Doctor Doom emerges to claim dominion over existence. Earth's Mightiest Heroes and warriors from across space and time must stand together against the ultimate sovereign threat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
