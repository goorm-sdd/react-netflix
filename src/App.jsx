import { useState, useEffect } from 'react';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import Intro from './pages/Intro/Intro';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleIntroClick = () => {
    setShowIntro(false);
  };

  return (
    <>
      {showIntro ? (
        <div onClick={handleIntroClick}>
          <Intro />
        </div>
      ) : (
        <AppRoutes />
      )}
    </>
  );
}

export default App;
