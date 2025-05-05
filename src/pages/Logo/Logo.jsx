import React, { useEffect, useState, memo } from 'react';
import './Logo.css';

const Logo = memo(() => {
  const [logoClass, setLogoClass] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLogoClass('fade-out');
      setTimeout(() => {
        setLogoClass('hidden');
      }, 1000);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`netflix-logo ${logoClass}`}>
      <img src="./src/assets/netflix-logo-icon.png" alt="Netflix Logo" />
    </div>
  );
});

export default Logo;
