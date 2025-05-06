import React, { useEffect, useState, memo } from 'react';
import './Intro.css';

const Intro = memo(() => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setShowIntro(false);
  };

  return (
    showIntro && (
      <div className="intro-container" onClick={handleClick}>
        <div className="netflix-logo">
          <img src="./src/assets/netflix-logo-icon.png" alt="Netflix Logo" />
        </div>
      </div>
    )
  );
});

export default Intro;
