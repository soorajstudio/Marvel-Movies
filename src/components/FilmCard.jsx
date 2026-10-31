import React from 'react';
import { useApp } from '../context/AppContext';

export default function FilmCard({ film }) {
  const { watched, toggleWatched, ratings, setRating } = useApp();
  const pad = String(film.day).padStart(2, '0');
  const isWatched = watched.has(film.slug);
  const rating = ratings[film.slug];

  const justwatchUrl = `https://www.justwatch.com/us/search?q=${encodeURIComponent(`${film.title} ${film.year}`)}`;
  const posterSrc = film.poster.startsWith('/') ? film.poster : `/${film.poster}`;

  return (
    <section
      className={`film ${isWatched ? 'is-watched' : ''}`}
      id={`day-${pad}`}
      data-slug={film.slug}
      data-day={film.day}
    >
      <div className="film-day" aria-hidden="true">
        {pad}
      </div>

      <div className="film-poster">
        <div className={`frame cursor-target ${isWatched ? 'is-watched' : ''}`} data-cursor-label="PLAY ▶">
          <img
            src={posterSrc}
            alt={`${film.title} poster`}
            loading="lazy"
            decoding="async"
          />
          <span className="stamp" aria-hidden="true">
            Watched
          </span>
          <span className="tc tc-top" aria-hidden="true">
            <span>PLAY ▶</span>
            <span>MCU #{pad}</span>
          </span>
        </div>
      </div>

      <div className="film-copy">
        <p className="film-kicker">
          <span className="sr-only">Era </span>
          {film.era || 'MCU'} · #{film.day}/38
        </p>
        <h2 className="film-title">{film.title}</h2>
        <p className="film-meta">
          <span>{film.year}</span>
          <span>DIR. {film.director.toUpperCase()}</span>
          {film.gross && (
            <span
              style={{
                color: 'var(--green, #4dff8c)',
                fontWeight: 600,
                letterSpacing: '0.04em',
                background: 'rgba(77, 255, 140, 0.08)',
                padding: '2px 8px',
                borderRadius: '3px',
                border: '1px solid rgba(77, 255, 140, 0.25)'
              }}
            >
              BOX OFFICE: {film.gross}
            </span>
          )}
        </p>
        <p className="film-blurb">{film.blurb}</p>

        <div className="actions">
          <div className="watch-row">
            <button
              type="button"
              className={`watch cursor-target ${isWatched ? 'is-on' : ''}`}
              data-cursor-label={isWatched ? 'UNWATCH' : 'WATCH'}
              data-slug={film.slug}
              aria-pressed={isWatched}
              onClick={() => toggleWatched(film.slug)}
            >
              <span className="box"></span>
              <span className="txt">{isWatched ? 'Watched' : 'Mark watched'}</span>
            </button>
          </div>
        </div>

        <div className="links">
          <a
            className="stream"
            href={justwatchUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Opens a JustWatch search for this film"
          >
            Where to watch{' '}
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 13 13 3M6 3h7v7" />
            </svg>
          </a>

          <div className="after-watch">
            <div className="rate" data-slug={film.slug} aria-label="Rate it">
              <button
                type="button"
                className={`like ${rating === 'like' ? 'is-on' : ''}`}
                data-kind="like"
                aria-label={`Like ${film.title}`}
                onClick={() => setRating(film.slug, 'like')}
              >
                <svg className="thumb" viewBox="0 0 392 387" aria-hidden="true" focusable="false">
                  <use href="#thumb" />
                </svg>
                <span className="count">{rating === 'like' ? '1' : '–'}</span>
              </button>

              <button
                type="button"
                className={`dislike ${rating === 'dislike' ? 'is-on' : ''}`}
                data-kind="dislike"
                aria-label={`Dislike ${film.title}`}
                onClick={() => setRating(film.slug, 'dislike')}
              >
                <svg className="thumb" viewBox="0 0 392 387" aria-hidden="true" focusable="false">
                  <use href="#thumb" />
                </svg>
                <span className="count">{rating === 'dislike' ? '1' : '–'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
