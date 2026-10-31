import React, { useState, useMemo } from 'react';
import { FILMS } from '../data/films';
import { useApp } from '../context/AppContext';

export default function ViewList() {
  const { activeView, setActiveView, watched, toggleWatched, ratings, scrollToDay } = useApp();
  const [sortBy, setSortBy] = useState('day'); // 'day' | 'title' | 'director' | 'year'
  const [filterBy, setFilterBy] = useState('all'); // 'all' | 'watched' | 'unwatched'
  const [peekPoster, setPeekPoster] = useState(null);
  const [peekPos, setPeekPos] = useState({ x: 0, y: 0 });

  const isOpen = activeView === 'list';

  const surname = (d) => {
    const first = d.split('&')[0].trim();
    const src = first.includes(' ') ? first : d;
    return src.trim().split(/\s+/).pop().toLowerCase();
  };

  const processedFilms = useMemo(() => {
    let list = [...FILMS];

    // Filter
    if (filterBy === 'watched') {
      list = list.filter(f => watched.has(f.slug));
    } else if (filterBy === 'unwatched') {
      list = list.filter(f => !watched.has(f.slug));
    }

    // Sort
    list.sort((a, b) => {
      if (sortBy === 'day') return a.day - b.day;
      if (sortBy === 'year') return a.year - b.year || a.day - b.day;
      if (sortBy === 'title') {
        const cleanA = a.title.replace(/^(the|a|an)\s+/i, '').toLowerCase();
        const cleanB = b.title.replace(/^(the|a|an)\s+/i, '').toLowerCase();
        return cleanA.localeCompare(cleanB);
      }
      if (sortBy === 'director') {
        return surname(a.director).localeCompare(surname(b.director));
      }
      return 0;
    });

    return list;
  }, [sortBy, filterBy, watched]);

  const handleMouseMove = (e) => {
    setPeekPos({ x: e.clientX, y: e.clientY });
  };

  

  return (
    <section className={`overlay ${isOpen ? "is-open" : ""}`} id="view-list" data-lenis-prevent="" aria-label="Film list">
      <h2>
        <img
          className="mark"
          loading="eager"
          src="/assets/images/lineup-type.svg"
          width="1338"
          height="570"
          alt="The lineup"
        />
      </h2>

      <div className="list-bar" role="toolbar" aria-label="Views, sort and filter">
        <span className="list-count" id="list-count" title="Nights shown">
          {processedFilms.length}
        </span>
        <span className="list-done" id="list-done">
          {watched.size > 0 ? `(${watched.size} watched)` : ''}
        </span>

        {/* Sort control */}
        <div className="sel-wrap">
          <div className="sel" data-label="Sort by:">
            <span className="sel-k" style={{ marginRight: 6 }}>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: 'transparent',
                color: 'var(--ink, #fff)',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '4px 8px',
                borderRadius: '4px',
                fontFamily: 'inherit'
              }}
            >
              <option value="day" style={{ background: '#111' }}>Night</option>
              <option value="title" style={{ background: '#111' }}>Title</option>
              <option value="director" style={{ background: '#111' }}>Director</option>
              <option value="year" style={{ background: '#111' }}>Year</option>
            </select>
          </div>
        </div>

        {/* Filter control */}
        <div className="sel-wrap">
          <div className="sel" data-label="Show:">
            <span className="sel-k" style={{ marginRight: 6 }}>Show:</span>
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              style={{
                background: 'transparent',
                color: 'var(--ink, #fff)',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '4px 8px',
                borderRadius: '4px',
                fontFamily: 'inherit'
              }}
            >
              <option value="all" style={{ background: '#111' }}>All</option>
              <option value="watched" style={{ background: '#111' }}>Watched</option>
              <option value="unwatched" style={{ background: '#111' }}>Unwatched</option>
            </select>
          </div>
        </div>
      </div>

      <ol className="list" id="list" onMouseMove={handleMouseMove}>
        {processedFilms.map((f) => {
          const pad = String(f.day).padStart(2, '0');
          const isWatched = watched.has(f.slug);
          const rating = ratings[f.slug];
          const posterPath = f.poster.startsWith('/') ? f.poster : `/${f.poster}`;

          return (
            <li
              key={f.slug}
              data-day={f.day}
              data-slug={f.slug}
              onMouseEnter={() => setPeekPoster(posterPath)}
              onMouseLeave={() => setPeekPoster(null)}
            >
              <a
                href={`#day-${pad}`}
                data-slug={f.slug}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveView('scroll');
                  setTimeout(() => scrollToDay(f.day), 100);
                }}
              >
                <span
                  className={`chk ${isWatched ? 'is-watched' : ''}`}
                  role="checkbox"
                  tabIndex={0}
                  aria-checked={isWatched}
                  aria-label={`Watched ${f.title}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWatched(f.slug);
                  }}
                />
                <span className="d">MCU #{pad}</span>
                <span className="t" data-text={f.title}>{f.title}</span>
                <span className="m">{f.director}</span>
                <span className="y">{f.year}</span>
                {f.gross && <span style={{ color: "var(--green, #4dff8c)", fontFamily: "var(--font-osd)", fontSize: 13, marginRight: 12 }}>{f.gross}</span>}
                <span className="lk" title="Likes">
                  <svg className="thumb" viewBox="0 0 392 387" aria-hidden="true" focusable="false">
                    <use href="#thumb" />
                  </svg>
                  <span className="l-like">{rating === 'like' ? '1' : '–'}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ol>

      {/* Floating peek poster */}
      {peekPoster && (
        <div
          className="list-peek"
          style={{
            display: 'block',
            position: 'fixed',
            left: peekPos.x + 20,
            top: peekPos.y - 120,
            pointerEvents: 'none',
            zIndex: 99999
          }}
        >
          <img src={peekPoster} alt="Poster peek" style={{ width: 140, borderRadius: 4, boxShadow: '0 8px 24px rgba(0,0,0,0.8)' }} />
        </div>
      )}
    </section>
  );
}
