import React, { useState } from 'react';
import Banner from '../../components/Banner/Banner';
import DetailModal from '../../components/DetailModal/DetailModal';
import RowMovie from '../../components/RowMovie/RowMovie';
import { requests } from '../../services/requests';

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
      <Banner onInfoClick={openModal} type="movie" />
      <DetailModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        movieId={selectedId}
        movieType={selectedType}
      />
      <div className="movies-container">
        <RowMovie
          title="Netflix Originals"
          fetchUrl={requests.fetchNetflixOriginals}
          onInfoClick={openModal}
        />
        <RowMovie
          title="Action Movies"
          fetchUrl={requests.fetchActionMovies}
          onInfoClick={openModal}
        />
        <RowMovie
          title="Comedy Movies"
          fetchUrl={requests.fetchComedyMovies}
          onInfoClick={openModal}
        />
        <RowMovie
          title="Horror Movies"
          fetchUrl={requests.fetchHorrorMovies}
          onInfoClick={openModal}
        />
        <RowMovie
          title="Romance Movies"
          fetchUrl={requests.fetchRomanceMovies}
          onInfoClick={openModal}
        />
        <RowMovie
          title="Documentaries"
          fetchUrl={requests.fetchDocumentaries}
          onInfoClick={openModal}
        />
      </div>
    </>
  );
};

export default Movies;
