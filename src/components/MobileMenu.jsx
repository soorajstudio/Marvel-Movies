import React from 'react';
import { useApp } from '../context/AppContext';

export default function MobileMenu() {
  const { activeView, setActiveView, menuOpen, setMenuOpen, watchedCount } = useApp();

  const handleSelect = (view) => {
    setActiveView(view);
    setMenuOpen(false);
  };

  return (
    <div className={`menu ${menuOpen ? 'is-open' : ''}`} id="menu" aria-hidden={!menuOpen}>
      <nav className="menu-links" aria-label="Views">
        <button
          type="button"
          data-view="scroll"
          className={activeView === 'scroll' ? 'is-on' : ''}
          onClick={() => handleSelect('scroll')}
        >
          Scroll
        </button>
        <button
          type="button"
          data-view="gallery"
          className={activeView === 'gallery' ? 'is-on' : ''}
          onClick={() => handleSelect('gallery')}
        >
          Shelf
        </button>
        <button
          type="button"
          data-view="list"
          className={activeView === 'list' ? 'is-on' : ''}
          onClick={() => handleSelect('list')}
        >
          List
        </button>
        <button
          type="button"
          data-view="mine"
          className={activeView === 'mine' ? 'is-on' : ''}
          onClick={() => handleSelect('mine')}
        >
          My list <b className="pill" id="menu-progress">{watchedCount}</b>
        </button>
      </nav>
    </div>
  );
}
