import React, { memo } from 'react';
import './Intro.css';

const Intro = memo(() => {
  return (
    <div className="intro_container">
      <div className="netflix_logo">
        <img src="./src/assets/logo.svg" alt="Netflix Logo" />
      </div>
    </div>
  );
});

export default Intro;
