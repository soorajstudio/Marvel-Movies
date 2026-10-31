import React from 'react';
import { useApp } from '../context/AppContext';

export default function RewindSection() {
  const { rewindToTop } = useApp();

  return (
    <section
      id="rewind"
      className="mcu-rewind-section"
      aria-label="Timeline Rewind"
      style={{
        position: 'relative',
        zIndex: 2,
        padding: '60px 24px 40px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px'
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'var(--font-osd, monospace)',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--green, #4dff8c)',
          background: 'rgba(77, 255, 140, 0.08)',
          border: '1px solid rgba(77, 255, 140, 0.25)',
          padding: '5px 14px',
          borderRadius: '20px'
        }}
      >
        <span>MCU TIMELINE COMPLETE</span>
        <span>•</span>
        <span>38 / 38 FILMS</span>
      </div>

      <h2
        style={{
          fontFamily: 'var(--font-osd, monospace)',
          fontSize: 'clamp(22px, 3.5vw, 36px)',
          fontWeight: 800,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#ffffff',
          margin: '0',
          textShadow: '0 0 20px rgba(77, 255, 140, 0.35)'
        }}
      >
        END OF CHRONOLOGY
      </h2>

      <p
        style={{
          maxWidth: '540px',
          margin: '0 auto',
          color: 'var(--muted, #8d8a80)',
          fontSize: '15px',
          lineHeight: '1.6'
        }}
      >
        You have explored the Marvel Cinematic Universe from Captain America in 1942 to the threshold of Doomsday. Ready to return to the beginning?
      </p>

      <button
        type="button"
        className="cursor-target mcu-rewind-btn"
        data-cursor-label="REWIND"
        onClick={rewindToTop}
        style={{
          marginTop: '10px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          fontFamily: 'var(--font-osd, monospace)',
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#07090c',
          background: 'var(--green, #4dff8c)',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '4px',
          boxShadow: '0 0 20px rgba(77, 255, 140, 0.45)',
          cursor: 'pointer',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
          <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
        </svg>
        <span>REWIND TO START</span>
      </button>
    </section>
  );
}
