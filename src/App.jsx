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
import Category from './pages/Category/Category';

function Main({ openModal }) {
  return (
    <>
      <Intro />
      <Banner onInfoClick={openModal} />
      <MainPage />
    </>
  );
}

function App() {
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
}

export default App;
