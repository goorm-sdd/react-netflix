import { React, useState } from 'react';
import { requests } from '../../services/requests';
import RowMovie from '../RowMovie/RowMovie';
import DetailModal from '../../components/DetailModal/DetailModal';
import './Feed.css';

const Feed = () => {
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
        <RowMovie
          title="Action TV"
          fetchUrl={requests.fetchActionAdventureTV}
          onInfoClick={openModal}
        />
        <RowMovie
          title="Comedy TV"
          fetchUrl={requests.fetchComedyTV}
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
export default Feed;
