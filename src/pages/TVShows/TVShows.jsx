import React, { useState } from 'react';
import Banner from '../../components/Banner/Banner';
import DetailModal from '../../components/DetailModal/DetailModal';
import Row from '../../components/Row/Row';
import { requests } from '../../api/requests';

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
        <Row
          title="Action & Adventure TV"
          fetchUrl={requests.fetchActionAdventureTV}
          onInfoClick={openModal}
        />
        <Row
          title="Comedy TV"
          fetchUrl={requests.fetchComedyTV}
          onInfoClick={openModal}
        />
        <Row
          title="Documentary TV"
          fetchUrl={requests.fetchDocumentaryTV}
          onInfoClick={openModal}
        />
        <Row
          title="Drama TV"
          fetchUrl={requests.fetchDramaTV}
          onInfoClick={openModal}
        />
        <Row
          title="Reality TV"
          fetchUrl={requests.fetchRealityTV}
          onInfoClick={openModal}
        />
      </div>
    </>
  );
};
export default TVShows;
