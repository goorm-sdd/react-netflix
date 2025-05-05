import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Banner from './components/Banner/Banner';
import DetailModal from './components/DetailModal/DetailModal';
import { useState } from 'react';

function App() {
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [selectedMovieType, setSelectedMovieType] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Header />
      <Banner
        onPreviewClick={(id, type) => {
          setSelectedMovieId(id);
          setSelectedMovieType(type);
          setIsOpen(true);
        }}
      />
      <Footer />
      <DetailModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        movieId={selectedMovieId}
        movieType={selectedMovieType}
      />
    </>
  );
}

export default App;
