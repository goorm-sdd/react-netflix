import './App.css';
import Intro from './pages/Intro/Intro';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Banner from './components/Banner/Banner';
import DetailModal from './components/DetailModal/DetailModal';
import { useState } from 'react';
import { BrowserRouter, Outlet, Routes, Route } from 'react-router-dom';
import MyList from './pages/MyList';

function Main({ openModal }) {
  return (
    <>
      <Logo />
      <Banner onPreviewClick={openModal} onInfoClick={openModal} />
    </>
  );
}

function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (id, type) => {
    setSelectedId(id);
    setSelectedType(type);
    setIsOpen(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              selectedId={selectedId}
              selectedType={selectedType}
            />
          }
        >
          <Route index element={<Main openModal={openModal} />} />
          <Route path="/MyList" element={<MyList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Layout({ isOpen, setIsOpen, selectedId, selectedType }) {
  return (
    <>
      <Intro />
      <Header />
      <Outlet />
      <Footer />
      <DetailModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        movieId={selectedId}
        movieType={selectedType}
      />
    </>
  );
}

export default App;
