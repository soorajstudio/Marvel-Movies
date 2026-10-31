import React, { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const reticleRef = useRef(null);
  const dotRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [chip, setChip] = useState('');
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let rafId;

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!active) setActive(true);

      const target = e.target;
      if (target) {
        const posterEl = target.closest('.film-poster, .shelf-card, #doomsday .frame');
        const buttonEl = target.closest('button, a, input, [role="button"], .chk, .watch, .rate');

        if (posterEl) {
          setHovered(true);
          setChip('PLAY ▶');
        } else if (buttonEl) {
          setHovered(true);
          setChip('');
        } else {
          setHovered(false);
          setChip('');
        }
      }
    };

    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);
    const onLeave = () => setActive(false);
    const onEnter = () => setActive(true);

    const updateLoop = () => {
      // Smooth interpolation for reticle glide
      currentX += (targetX - currentX) * 0.42;
      currentY += (targetY - currentY) * 0.42;

      if (reticleRef.current) {
        reticleRef.current.style.transform = `translate3d(${currentX - 18}px, ${currentY - 18}px, 0)`;
      }
      if (dotRef.current) {
        // Immediate 1:1 hardware tracking for center pinpoint
        dotRef.current.style.transform = `translate3d(${targetX - 2.5}px, ${targetY - 2.5}px, 0)`;
      }

      rafId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    rafId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(rafId);
    };
  }, [active]);

  if (!active) return null;

  return (
    <>
      {/* 1:1 Real-time Center Laser Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          backgroundColor: clicked ? '#ff2a5f' : '#ffffff',
          boxShadow: clicked
            ? '0 0 8px #ff2a5f, 0 0 16px #ff2a5f'
            : '0 0 6px #4dff8c, 0 0 12px #4dff8c',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform'
        }}
      />

      {/* Smooth Trailing Marvel HUD Reticle */}
      <div
        ref={reticleRef}
        id="cursor"
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          pointerEvents: 'none',
          zIndex: 99998,
          display: 'block',
          opacity: active ? 1 : 0,
          transition: 'opacity 0.2s ease, width 0.2s ease, height 0.2s ease',
          willChange: 'transform'
        }}
      >
        <svg
          viewBox="0 0 36 36"
          width="36"
          height="36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: clicked
              ? 'scale(0.8) rotate(45deg)'
              : hovered
              ? 'scale(1.3) rotate(15deg)'
              : 'scale(1) rotate(0deg)',
            transition: 'transform 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28)',
            filter: 'drop-shadow(0 0 5px rgba(77,255,140,0.95)) drop-shadow(0 0 12px rgba(77,255,140,0.5))'
          }}
        >
          {/* Top-Left Bracket */}
          <path d="M 5 11 L 5 5 L 11 5" stroke="#4dff8c" strokeWidth="1.8" strokeLinecap="round" />
          {/* Top-Right Bracket */}
          <path d="M 25 5 L 31 5 L 31 11" stroke="#4dff8c" strokeWidth="1.8" strokeLinecap="round" />
          {/* Bottom-Right Bracket */}
          <path d="M 31 25 L 31 31 L 25 31" stroke="#4dff8c" strokeWidth="1.8" strokeLinecap="round" />
          {/* Bottom-Left Bracket */}
          <path d="M 11 31 L 5 31 L 5 25" stroke="#4dff8c" strokeWidth="1.8" strokeLinecap="round" />

          {/* Internal Targeting Ring */}
          <circle
            cx="18"
            cy="18"
            r="6.5"
            stroke="#4dff8c"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            opacity={hovered ? 0.95 : 0.65}
          />
        </svg>

        {/* Hover OSD Chip (e.g. PLAY ▶) */}
        {chip && (
          <div
            style={{
              position: 'absolute',
              left: '42px',
              top: '50%',
              transform: 'translateY(-50%)',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-osd, monospace)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.16em',
              color: '#4dff8c',
              background: 'rgba(7, 9, 12, 0.88)',
              border: '1px solid rgba(77, 255, 140, 0.5)',
              borderRadius: '3px',
              padding: '3px 8px',
              boxShadow: '0 0 14px rgba(77, 255, 140, 0.35)',
              textShadow: '0 0 8px rgba(77, 255, 140, 0.8)',
              pointerEvents: 'none'
            }}
          >
            {chip}
          </div>
        )}
      </div>
    </>
  );
}
