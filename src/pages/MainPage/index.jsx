import React from 'react';
import Row from '../../components/Row/Row';
import { requests } from '../../api/requests';
import './MainPage.css';

export default function MainPage() {
  return (
    <div className="main-page">
      <Row
        title="Netflix Originals"
        fetchUrl={requests.fetchNetflixOriginals}
      />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
      <Row title="Action TV" fetchUrl={requests.fetchActionAdventureTV} />
      <Row title="Comedy TV" fetchUrl={requests.fetchComedyTV} />
      <Row title="Drama TV" fetchUrl={requests.fetchDramaTV} />
      <Row title="Reality TV" fetchUrl={requests.fetchRealityTV} />
    </div>
  );
}
