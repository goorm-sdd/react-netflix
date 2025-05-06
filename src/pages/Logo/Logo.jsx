import React, { useEffect, useState, memo } from 'react';
import './Logo.css';

const Logo = memo(() => {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setShowLogo(false);
  };

  return (
    showLogo && (
      <div className="logo-container" onClick={handleClick}>
        <div className="netflix-logo">
          <img src="./src/assets/netflix-logo-icon.png" alt="Netflix Logo" />
        </div>
      </div>
    )
  );
});

export default Logo;
