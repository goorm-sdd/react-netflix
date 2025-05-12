import { useState, useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import Intro from './pages/Intro/Intro';
import Category from './pages/Category/Category';

const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleIntroClick = () => {
    setShowIntro(false);
  };
  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
  };

  return (
    <>
      {showIntro ? (
        <div onClick={handleIntroClick}>
          <Intro />
        </div>
      ) : !selectedProfile ? (
        <Category onProfileSelect={handleProfileSelect} />
      ) : (
        <AppRoutes />
      )}
    </>
  );
};

export default App;
