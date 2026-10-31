import React from 'react';
import { useApp } from '../context/AppContext';

export default function Header() {
  const { rewindToTop } = useApp();

  return (
    <header className="topbar">
      <nav className="deck" aria-label="Home">
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
      </nav>
    </header>
  );
}
