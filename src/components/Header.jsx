import React from 'react';
import { useApp } from '../context/AppContext';

export default function Header() {
  const { activeView, setActiveView, menuOpen, setMenuOpen, watchedCount, totalFilms, rewindToTop } = useApp();

  const handleViewClick = (view) => {
    setActiveView(prev => prev === view ? 'scroll' : view);
  };

  return (
    <header className="topbar">
      <nav className="deck" aria-label="View">
        <button
          type="button"
          className="deck-badge cursor-target"
          data-cursor-label="REWIND"
          aria-label="Back to the start"
          title="Back to the start"
          onClick={rewindToTop}
        >
          <img src="/assets/images/nav-badge.png" alt="Avengers Emblem" width="50" height="50" />
        </button>

        <button
          type="button"
          className={`deck-burger cursor-target ${menuOpen ? 'is-open' : ''}`}
          data-cursor-label="MENU"
          aria-label="Open the menu"
          aria-expanded={menuOpen}
          aria-controls="menu"
          onClick={() => setMenuOpen(prev => !prev)}
        >
          <span></span>
          <span></span>
        </button>

        <div className="deck-links">
          <div className="deck-links-in">
            <button
              type="button"
              data-view="scroll"
              className={`cursor-target ${activeView === 'scroll' ? 'is-on' : ''}`}
              data-cursor-label="SCROLL"
              data-label="Scroll"
              onClick={() => handleViewClick('scroll')}
            >
              Scroll
            </button>
            <button
              type="button"
              data-view="gallery"
              className={`cursor-target ${activeView === 'gallery' ? 'is-on' : ''}`}
              data-cursor-label="SHELF"
              data-label="Shelf"
              onClick={() => handleViewClick('gallery')}
            >
              Shelf
            </button>
            <button
              type="button"
              data-view="list"
              className={`cursor-target ${activeView === 'list' ? 'is-on' : ''}`}
              data-cursor-label="LIST"
              data-label="List"
              onClick={() => handleViewClick('list')}
            >
              List
            </button>
            <button
              type="button"
              data-view="mine"
              className={`cursor-target ${activeView === 'mine' ? 'is-on' : ''}`}
              data-cursor-label="MY LIST"
              data-label="My list"
              onClick={() => handleViewClick('mine')}
            >
              <span className="lbl">My list</span>{' '}
              <b className="badge" id="deck-progress">[{watchedCount}/{totalFilms}]</b>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
