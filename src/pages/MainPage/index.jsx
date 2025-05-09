import { React, useState } from 'react';
import { requests } from '../../api/requests';
import './MainPage.css';
import Row from '../../components/Row/Row';
import DetailModal from '../../components/DetailModal/DetailModal';

export default function MainPage() {
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
      <DetailModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        movieId={selectedId}
        movieType={selectedType}
        onInfoClick={openModal}
      />
      <div className="main-page">
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
        <Row
          title="Action TV"
          fetchUrl={requests.fetchActionAdventureTV}
          onInfoClick={openModal}
        />
        <Row
          title="Comedy TV"
          fetchUrl={requests.fetchComedyTV}
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
}
