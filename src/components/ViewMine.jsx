import React from 'react';
import { FILMS } from '../data/films';
import { useApp } from '../context/AppContext';

export default function ViewMine() {
  const { activeView, setActiveView, watched, toggleWatched, scrollToDay } = useApp();

  const isOpen = activeView === 'mine';
  

  const total = FILMS.length;
  const count = watched.size;
  const percent = total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <section className={`overlay ${isOpen ? "is-open" : ""}`} id="view-mine" data-lenis-prevent="" aria-label="My list">
      <h2>
        <img
          className="mark"
          loading="eager"
          src="/assets/images/mylist-type.svg"
          width="1698"
          height="630"
          alt="My list"
        />
      </h2>

      <div className="mine">
        <div className="mine-progress">
          <div className="big">
            <span id="mine-done">{count}</span>
            <small>of {total} watched</small>
          </div>
          <div className="meter">
            <i id="mine-bar" style={{ width: `${percent}%` }}></i>
          </div>
          <div className="mine-foot">
            <p className="hint" id="mine-hint">
              Tick films off as you go. Progress is automatically saved in your browser.
            </p>
          </div>
        </div>

        <h3>The 38 MCU Films</h3>
        <p className="hint mine-intro">Your personal journey across the Marvel Cinematic Universe.</p>

        <ol className="checklist" id="checklist">
          {FILMS.map((f) => {
            const pad = String(f.day).padStart(2, '0');
            const isWatched = watched.has(f.slug);

            return (
              <li key={f.slug} className={isWatched ? 'is-watched' : ''}>
                <button
                  type="button"
                  className={`chk ${isWatched ? 'is-watched' : ''}`}
                  role="checkbox"
                  aria-checked={isWatched}
                  aria-label={`Watched ${f.title}`}
                  onClick={() => toggleWatched(f.slug)}
                />
                <span
                  className="d"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setActiveView('scroll');
                    setTimeout(() => scrollToDay(f.day), 100);
                  }}
                >
                  MCU {pad}
                </span>
                <span
                  className="t"
                  data-text={f.title}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setActiveView('scroll');
                    setTimeout(() => scrollToDay(f.day), 100);
                  }}
                >
                  {f.title}
                </span>
                <span className="m">{f.director}</span>
                <span className="y">{f.year}</span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
