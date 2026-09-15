import React, { useState, useEffect } from 'react';
import './OpeningIntro.css';

export function OpeningIntro({ onFinish }) {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Snappy, effortless intro: 750ms display, then smooth dissolve
    const t1 = setTimeout(() => setFade(true), 750);
    const t2 = setTimeout(() => {
      if (onFinish) onFinish();
    }, 1100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onFinish]);

  return (
    <div
      className={`opening-screen ${fade ? 'screen-leave' : ''}`}
      onClick={() => onFinish && onFinish()}
      role="banner"
      aria-label="Loading BuildBoard"
    >
      <div className="opening-center">
        <div className="opening-logo">
          <span className="logo-build">Build</span>
          <span className="logo-board">Board</span>
          <span className="logo-dot" />
        </div>

        <div className="opening-laser-track">
          <div className="opening-laser-fill" />
        </div>

        <span className="opening-tagline">Curated Developer Products</span>
      </div>
    </div>
  );
}
