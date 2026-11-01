import React, { useRef, useEffect } from 'react';
import { FILMS } from '../data/films';
import { useApp } from '../context/AppContext';

export default function ViewShelf() {
  const { activeView, setActiveView, scrollToDay, watched } = useApp();
  const scrollRef = useRef(null);

  const isOpen = activeView === 'gallery';

  const handlePick = (day) => {
    setActiveView('scroll');
    setTimeout(() => {
      scrollToDay(day);
    }, 120);
  };

  

  return (
    <section className={`overlay overlay--shelf ${isOpen ? "is-open" : ""}`} id="view-gallery" data-lenis-prevent="" aria-label="The shelf">
      <h2>
        <img
          className="mark"
          loading="eager"
          src={`${import.meta.env.BASE_URL}assets/images/shelf-type.svg`}
          width="1139"
          height="664"
          alt="The shelf"
        />
      </h2>
      <p className="shelf-hint">Select any cassette to jump to that film on the timeline</p>

      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          gap: '24px',
          overflowX: 'auto',
          padding: '40px 24px',
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'thin'
        }}
      >
        {FILMS.map((f) => {
          const pad = String(f.day).padStart(2, '0');
          const isWatched = watched.has(f.slug);
          const posterPath = `${import.meta.env.BASE_URL}${f.poster.replace(/^\//, '')}`;

          return (
            <div
              key={f.slug}
              onClick={() => handlePick(f.day)}
              style={{
                flex: '0 0 200px',
                scrollSnapAlign: 'center',
                cursor: 'pointer',
                background: '#0d1218',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                overflow: 'hidden',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px) scale(1.04)';
                e.currentTarget.style.borderColor = 'var(--green, #4dff8c)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.8), 0 0 15px rgba(77,255,140,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ position: 'relative', width: '100%', paddingTop: '148%', background: '#000' }}>
                <img
                  src={posterPath}
                  alt={f.title}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                {isWatched && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      background: 'var(--red, #ff2d55)',
                      color: '#fff',
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      padding: '2px 6px',
                      borderRadius: 3,
                      letterSpacing: 1
                    }}
                  >
                    Watched
                  </span>
                )}
              </div>
              <div style={{ padding: '12px 10px', background: '#07090c' }}>
                <div style={{ fontSize: 11, color: 'var(--green, #4dff8c)', fontFamily: 'var(--font-osd, monospace)', marginBottom: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>MCU #{pad} · {f.year}</span>
                  {f.gross && <span style={{ color: '#e8e4d8', fontSize: 10, background: 'rgba(255,255,255,0.08)', padding: '1px 4px', borderRadius: 2 }}>{f.gross}</span>}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {f.title}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
