import React, { useMemo, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FILMS, BLOCKS, weekOf } from '../data/films';
import { useApp } from '../context/AppContext';
import FilmCard from './FilmCard';
import EraBlock from './EraBlock';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const { setActiveDay } = useApp();

  const sections = useMemo(() => {
    const weeksMap = new Map();
    for (let w = 1; w <= 5; w++) {
      weeksMap.set(w, []);
    }

    FILMS.forEach(film => {
      const w = weekOf(film.day);
      if (weeksMap.has(w)) {
        weeksMap.get(w).push(film);
      }
    });

    const result = [];
    for (let w = 1; w <= 5; w++) {
      result.push({
        type: 'week',
        weekNum: w,
        films: weeksMap.get(w)
      });

      if (w === 1 && BLOCKS[2]) {
        result.push({ type: 'block', block: BLOCKS[2] });
      } else if (w === 2 && BLOCKS[14]) {
        result.push({ type: 'block', block: BLOCKS[14] });
      } else if (w === 3 && BLOCKS[22]) {
        result.push({ type: 'block', block: BLOCKS[22] });
      } else if (w === 4 && BLOCKS[33]) {
        result.push({ type: 'block', block: BLOCKS[33] });
      }
    }
    return result;
  }, []);

  // Set up horizontal right-to-left pinning and scroll translation on week--h
  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 861px)').matches;
    if (!isDesktop) return;

    // Small delay to ensure DOM and images calculate scrollWidth properly
    const timer = setTimeout(() => {
      const horizontalWeeks = document.querySelectorAll('.week--h');
      const stList = [];

      horizontalWeeks.forEach(week => {
        const track = week.querySelector('.track');
        if (!track) return;

        const dist = () => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: week,
            start: 'top top',
            end: () => '+=' + dist(),
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            anticipatePin: 1
          }
        });

        if (tween.scrollTrigger) {
          stList.push(tween.scrollTrigger);
        }
      });

      ScrollTrigger.refresh();

      return () => {
        stList.forEach(st => st.kill());
      };
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // Update active day in view for OSD
  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll('.film');
      const midY = window.innerHeight / 2;
      const midX = window.innerWidth / 2;
      let closestDay = 1;
      let minDiff = Infinity;

      cards.forEach(c => {
        const rect = c.getBoundingClientRect();
        const cy = rect.top + rect.height / 2;
        const cx = rect.left + rect.width / 2;
        const diff = Math.hypot(cy - midY, cx - midX);
        if (diff < minDiff) {
          minDiff = diff;
          closestDay = parseInt(c.dataset.day, 10);
        }
      });

      if (closestDay) setActiveDay(closestDay);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveDay]);

  return (
    <div className="films" id="films">
      {sections.map((sec) => {
        if (sec.type === 'block') {
          return <EraBlock key={sec.block.id} block={sec.block} />;
        }
        return (
          <div
            key={`week-${sec.weekNum}`}
            className={`week ${sec.weekNum % 2 === 0 ? 'week--h' : ''}`}
            data-week={sec.weekNum}
          >
            <div className="track">
              {sec.films.map(film => (
                <FilmCard key={film.slug} film={film} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
