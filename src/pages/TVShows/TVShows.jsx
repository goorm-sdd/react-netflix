import React, { useState } from 'react';
import Banner from '../../components/Banner/Banner';
import DetailModal from '../../components/DetailModal/DetailModal';
import RowMovie from '../../components/RowMovie/RowMovie';
import { requests } from '../../services/requests';

const TVShows = () => {
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
      <Banner onInfoClick={openModal} type="tv" />
      <DetailModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        movieId={selectedId}
        movieType={selectedType}
      />
      <div className="movies-container">
        <RowMovie
          title="Action & Adventure TV"
          fetchUrl={requests.fetchActionAdventureTV}
          onInfoClick={openModal}
        />
        <RowMovie
          title="Comedy TV"
          fetchUrl={requests.fetchComedyTV}
          onInfoClick={openModal}
        />
        <RowMovie
          title="Documentary TV"
          fetchUrl={requests.fetchDocumentaryTV}
          onInfoClick={openModal}
        />
        <RowMovie
          title="Drama TV"
          fetchUrl={requests.fetchDramaTV}
          onInfoClick={openModal}
        />
        <RowMovie
          title="Reality TV"
          fetchUrl={requests.fetchRealityTV}
          onInfoClick={openModal}
        />
      </div>
    </>
  );
};
export default TVShows;
