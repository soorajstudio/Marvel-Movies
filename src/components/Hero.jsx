import React from 'react';

export default function Hero() {
  const handleScrollCue = () => {
    const firstFilm = document.getElementById('day-01');
    if (firstFilm) {
      if (window.lenis) {
        window.lenis.scrollTo(firstFilm, { duration: 1.2 });
      } else {
        firstFilm.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="hero">
      <div className="hero-inner">
        <h1 className="title">
          <img
            className="mark"
            src="/assets/images/hero-type.png"
            alt="Marvel Cinematic Universe"
            width="2108"
            height="746"
            decoding="async"
            fetchPriority="high"
          />
        </h1>
        <p className="sub">
          The complete MCU timeline across 5 epic eras. Thirty eight films, rewound and ready. Scroll to enter the multiverse.
        </p>
      </div>

      <div className="hero-tape" />

      <div className="scroll-cue" aria-hidden="true" onClick={handleScrollCue} style={{ cursor: 'pointer' }}>
        <svg className="arrow" viewBox="0 0 24 40" width="24" height="40">
          <path d="M12 2v34M3 27l9 9 9-9" />
        </svg>
      </div>
    </section>
  );
}
