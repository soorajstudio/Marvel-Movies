import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';

export default function TimelineNav() {
  const { activeDay, scrollToDay, activeView, setActiveView } = useApp();

  const eras = useMemo(() => [
    { id: 'early', label: 'Early Eras', day: 1, range: '2011–2019' },
    { id: 'phase12', label: 'Phase 1 & 2', day: 3, range: '2008–2015' },
    { id: 'snap', label: 'The Snap', day: 15, range: '2016–2018' },
    { id: 'multiverse', label: 'Multiverse', day: 23, range: '2019–2023' },
    { id: 'modern', label: 'Modern Era', day: 34, range: '2024–2026' },
    { id: 'doomsday', label: 'Doomsday', targetId: 'doomsday', range: 'DEC 2026' },
  ], []);

  // Determine current active era based on activeDay
  const currentEraId = useMemo(() => {
    if (activeDay <= 2) return 'early';
    if (activeDay <= 14) return 'phase12';
    if (activeDay <= 22) return 'snap';
    if (activeDay <= 33) return 'multiverse';
    if (activeDay <= 38) return 'modern';
    return 'doomsday';
  }, [activeDay]);

  const handleJump = (era) => {
    if (activeView !== 'scroll') {
      setActiveView('scroll');
    }

    setTimeout(() => {
      if (era.targetId === 'doomsday') {
        const doomEl = document.getElementById('doomsday');
        if (doomEl) {
          if (window.lenis) {
            window.lenis.scrollTo(doomEl, { duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
          } else {
            doomEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      } else {
        scrollToDay(era.day);
      }
    }, activeView !== 'scroll' ? 120 : 0);
  };

  return (
    <nav className="timeline-nav" aria-label="MCU Timeline Quick Navigation">
      <div className="timeline-nav-inner">
        {eras.map((era) => {
          const isActive = currentEraId === era.id;
          return (
            <button
              key={era.id}
              type="button"
              className={`timeline-nav-item cursor-target ${isActive ? 'is-active' : ''}`}
              data-cursor-label={era.label}
              onClick={() => handleJump(era)}
              title={`Jump to ${era.label} (${era.range})`}
            >
              <span className="nav-label">{era.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
