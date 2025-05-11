import { useState } from 'react';
import Banner from '../../components/Banner/Banner';
import DetailModal from '../../components/DetailModal/DetailModal';
import Feed from '../../components/Feed/Feed';
import './Home.css';

const Home = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (id, type) => {
    setSelectedId(id);
    setSelectedType(type);
    setIsOpen(true);
  };

  return (
    <div className="home">
      <Banner onInfoClick={openModal} />
      <DetailModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        movieId={selectedId}
        movieType={selectedType}
      />
      <Feed />
    </div>
  );
};

export default Home;
