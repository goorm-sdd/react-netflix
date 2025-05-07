import React from 'react';
import { requests } from '../../api/requests';
import Row from '../../components/Row/Row';

const MainPage = () => {
  return (
    <main>
      <Row
        title="Popular on Netflix"
        id="PP"
        fetchUrl={requests.fetchPopular}
      />
      <Row title="Trending Now" id="TR" fetchUrl={requests.fetchTrending} />
      <Row
        title="Top 10 in Nigeria Today"
        id="NP"
        fetchUrl={requests.fetchNowPlaying}
      />
      <Row title="My List" id="ML" />
      <Row
        title="African Movies"
        id="AM"
        fetchUrl={requests.fetchActionMovies}
      />
      <Row
        title="Nollywood Movies & TV"
        id="CM"
        fetchUrl={requests.fetchComedyMovies}
      />
      <Row
        title="Netflix Originals"
        id="NO"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row
        title="Watch It Again"
        id="WA"
        fetchUrl={requests.fetchActionAdventureTV}
      />
      <Row title="New Releases" id="NR" fetchUrl={requests.fetchReleaseDates} />
      <Row
        title="TV Thrillers & Mysteries"
        id="TM"
        fetchUrl={requests.fetchDocumentaryTV}
      />
      <Row title="US TV Shows" id="TS" fetchUrl={requests.fetchRealityTV} />
    </main>
  );
};

export default MainPage;
