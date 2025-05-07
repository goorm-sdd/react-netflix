import { useState, useEffect } from 'react';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import Intro from './pages/Intro/Intro';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Banner from './components/Banner/Banner';
import DetailModal from './components/DetailModal/DetailModal';
import MainPage from './pages/MainPage';
import { BrowserRouter, Outlet, Routes, Route } from 'react-router-dom';
import MyList from './pages/MyList/MyList';

function Main({ openModal }) {
  return (
    <>
      <Intro />
      <Banner onPreviewClick={openModal} onInfoClick={openModal} />
      <MainPage />
    </>
  );
}

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
