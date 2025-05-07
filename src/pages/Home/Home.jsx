import Banner from '../../components/Banner/Banner';
import DetailModal from '../../components/DetailModal/DetailModal';
import { useState } from 'react';

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
    <div className="Home">
      <Banner onPreviewClick={openModal} onInfoClick={openModal} />
      <DetailModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        movieId={selectedId}
        movieType={selectedType}
      />
    </div>
  );
};

export default Home;
