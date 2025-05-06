import './App.css';
import Logo from './pages/Logo/Logo';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Banner from './components/Banner/Banner';
import DetailModal from './components/DetailModal/DetailModal';
import { useState } from 'react';

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
    <>
      <Logo />
      <Header />
      <Banner onPreviewClick={openModal} onInfoClick={openModal} />
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
