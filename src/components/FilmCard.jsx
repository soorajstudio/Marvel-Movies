import React from 'react';
import { useApp } from '../context/AppContext';

export default function FilmCard({ film }) {
  const { watched, toggleWatched, ratings, setRating } = useApp();
  const pad = String(film.day).padStart(2, '0');
  const isWatched = watched.has(film.slug);
  const rating = ratings[film.slug];

  const justwatchUrl = `https://www.justwatch.com/us/search?q=${encodeURIComponent(`${film.title} ${film.year}`)}`;
  const posterSrc = `${import.meta.env.BASE_URL}${film.poster.replace(/^\//, '')}`;

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
        </div>
      </div>

      <div className="film-copy">
        <div className="film-kicker">
          <span className="film-kicker-line" aria-hidden="true" />
          <span className="film-kicker-text">
            <span className="sr-only">Era </span>
            {film.era || 'MCU'} · #{film.day}/38
          </span>
        </div>

        <div className="film-title-wrap">
          <h2 className="film-title">{film.title}</h2>
          <div className="film-title-bar" aria-hidden="true" />
        </div>

        <div className="film-meta">
          <span className="film-meta-item">{film.year}</span>
          <span className="film-meta-sep" aria-hidden="true">│</span>
          <span className="film-meta-item">DIR. {film.director.toUpperCase()}</span>
          {film.gross && (
            <>
              <span className="film-meta-sep" aria-hidden="true">│</span>
              <span className="film-box-office">BOX OFFICE: {film.gross}</span>
            </>
          )}
        </div>

        <p className="film-blurb">{film.blurb}</p>

        <div className="actions">
          <div className="watch-row">
            <button
              type="button"
              className={`watch ${isWatched ? 'is-on' : ''}`}
              data-slug={film.slug}
              aria-pressed={isWatched}
              onClick={() => toggleWatched(film.slug)}
            >
              <svg className="watch-check" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 10.5L8 14.5L16 6" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="watch-sep" aria-hidden="true" />
              <span className="watch-txt">{isWatched ? 'WATCHED' : 'MARK WATCHED'}</span>
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
            <span>WHERE TO WATCH</span>
            <svg className="stream-arr" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <div className="after-watch">
            <div className="rate" data-slug={film.slug} aria-label="Rate it">
              <button
                type="button"
                className={`like ${rating === 'like' ? 'is-on' : ''}`}
                data-kind="like"
                aria-label={`Like ${film.title}`}
                onClick={() => setRating(film.slug, rating === 'like' ? null : 'like')}
              >
                <svg className="thumb" viewBox="0 0 24 24" fill={rating === 'like' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
              </button>

              <button
                type="button"
                className={`dislike ${rating === 'dislike' ? 'is-on' : ''}`}
                data-kind="dislike"
                aria-label={`Dislike ${film.title}`}
                onClick={() => setRating(film.slug, rating === 'dislike' ? null : 'dislike')}
              >
                <svg className="thumb thumb-down" viewBox="0 0 24 24" fill={rating === 'dislike' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
