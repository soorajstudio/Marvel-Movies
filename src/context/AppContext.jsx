import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { FILMS } from '../data/films';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [activeView, setActiveView] = useState('scroll');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDay, setActiveDay] = useState(1);

  // Watched state
  const [watched, setWatched] = useState(() => {
    try {
      const saved = localStorage.getItem('mcu_watched');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Ratings state
  const [ratings, setRatings] = useState(() => {
    try {
      const saved = localStorage.getItem('mcu_ratings');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Sound state
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      return localStorage.getItem('v31_sound') === '1';
    } catch {
      return false;
    }
  });

  // Sync activeView class on documentElement
  useEffect(() => {
    if (activeView !== 'scroll') {
      document.documentElement.classList.add('view-open');
    } else {
      document.documentElement.classList.remove('view-open');
    }
  }, [activeView]);

  // Persist watched
  useEffect(() => {
    try {
      localStorage.setItem('mcu_watched', JSON.stringify([...watched]));
    } catch {}
  }, [watched]);

  // Persist ratings
  useEffect(() => {
    try {
      localStorage.setItem('mcu_ratings', JSON.stringify(ratings));
    } catch {}
  }, [ratings]);

  // Persist sound
  useEffect(() => {
    try {
      localStorage.setItem('v31_sound', soundEnabled ? '1' : '0');
    } catch {}
  }, [soundEnabled]);

  const toggleWatched = useCallback((slug) => {
    setWatched(prev => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  }, []);

  const setRating = useCallback((slug, kind) => {
    setRatings(prev => {
      const current = prev[slug];
      if (current === kind) {
        const next = { ...prev };
        delete next[slug];
        return next;
      }
      return { ...prev, [slug]: kind };
    });
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, []);

  const scrollToDay = useCallback((day, instant = false) => {
    const pad = String(day).padStart(2, '0');
    const el = document.getElementById(`day-${pad}`);
    if (el) {
      if (window.lenis && !instant) {
        window.lenis.scrollTo(el, { duration: 1.4, easing: t => 1 - Math.pow(1 - t, 4) });
      } else {
        el.scrollIntoView({ behavior: instant ? 'auto' : 'smooth' });
      }
    }
  }, []);

  const rewindToTop = useCallback(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 2.2, easing: t => 1 - Math.pow(1 - t, 4) });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Listen for Escape key to close open overlays
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        if (menuOpen) setMenuOpen(false);
        else if (activeView !== 'scroll') setActiveView('scroll');
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [menuOpen, activeView]);

  return (
    <AppContext.Provider value={{
      activeView,
      setActiveView,
      menuOpen,
      setMenuOpen,
      activeDay,
      setActiveDay,
      watched,
      toggleWatched,
      ratings,
      setRating,
      soundEnabled,
      toggleSound,
      scrollToDay,
      rewindToTop,
      totalFilms: FILMS.length,
      watchedCount: watched.size
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
