import React, { useState, useRef, useEffect } from 'react';

export default function FloatingAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0); // 0 = Earth's Mightiest Heroes, 1 = Silvestri March
  const audioRef = useRef(null);

  const tracks = [
    { title: 'The Avengers: Theme', src: '/assets/audio/marvel-theme.mp3' },
    { title: 'Alan Silvestri: Main Titles', src: '/assets/audio/marvel-orchestral.mp3' }
  ];

  const currentTrack = tracks[trackIndex];

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Audio playback error:', err);
      });
    }
  };

  const switchTrack = (e) => {
    e.stopPropagation();
    const nextIndex = (trackIndex + 1) % tracks.length;
    setTrackIndex(nextIndex);
    const audio = audioRef.current;
    if (audio) {
      audio.src = tracks[nextIndex].src;
      if (isPlaying) {
        audio.play().catch(() => {});
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      audio.play().catch(() => {});
    };

    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div className="floating-audio-container" aria-label="Marvel Theme Audio Player">
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="auto"
        loop
      />

      <button
        type="button"
        className={`floating-audio-btn cursor-target ${isPlaying ? 'is-playing' : ''}`}
        data-cursor-label={isPlaying ? 'PAUSE' : 'PLAY THEME'}
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause Marvel Theme Music' : 'Play Marvel Theme Music'}
        title={isPlaying ? `Pause Music (${currentTrack.title})` : `Play Marvel Theme (${currentTrack.title})`}
      >
        {isPlaying ? (
          <div className="audio-bars" aria-hidden="true">
            <span className="bar bar-1" />
            <span className="bar bar-2" />
            <span className="bar bar-3" />
            <span className="bar bar-4" />
          </div>
        ) : (
          <svg className="audio-icon" viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}

        <span className="audio-label">
          {isPlaying ? 'PAUSE MUSIC' : 'PLAY MARVEL THEME'}
        </span>
      </button>

      {isPlaying && (
        <button
          type="button"
          className="audio-track-pill cursor-target"
          data-cursor-label="SWITCH"
          onClick={switchTrack}
          title="Click to switch between Avengers Theme & Orchestral March"
          aria-label="Switch Marvel theme track"
        >
          <span>{trackIndex === 0 ? 'Avengers Theme' : 'Orchestral March'}</span>
          <span className="switch-hint">↻</span>
        </button>
      )}
    </div>
  );
}
