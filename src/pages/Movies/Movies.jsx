import React, { useState } from 'react';
import Banner from '../../components/Banner/Banner';
import DetailModal from '../../components/DetailModal/DetailModal';
import Row from '../../components/Row/Row';
import { requests } from '../../api/requests';

const Movies = () => {
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
      <Banner onInfoClick={openModal} />
      <DetailModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        movieId={selectedId}
        movieType={selectedType}
      />
      <div className="movies-container">
        <Row
          title="Netflix Originals"
          fetchUrl={requests.fetchNetflixOriginals}
          onInfoClick={openModal}
        />
        <Row
          title="Action Movies"
          fetchUrl={requests.fetchActionMovies}
          onInfoClick={openModal}
        />
        <Row
          title="Comedy Movies"
          fetchUrl={requests.fetchComedyMovies}
          onInfoClick={openModal}
        />
        <Row
          title="Horror Movies"
          fetchUrl={requests.fetchHorrorMovies}
          onInfoClick={openModal}
        />
        <Row
          title="Romance Movies"
          fetchUrl={requests.fetchRomanceMovies}
          onInfoClick={openModal}
        />
        <Row
          title="Documentaries"
          fetchUrl={requests.fetchDocumentaries}
          onInfoClick={openModal}
        />
      </div>
    </>
  );
};

export default Movies;
