import React, { memo } from 'react';
import './Intro.css';

const Intro = memo(() => {
  return (
    <div className="intro-container">
      <div className="netflix-logo">
        <img src="./src/assets/logo.svg" alt="Netflix Logo" />
      </div>
    </div>
  );
});

export default Intro;
