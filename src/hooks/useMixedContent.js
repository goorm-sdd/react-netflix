import { useEffect, useState } from 'react';
import { instance } from '../api/axios';
import { requests } from '../api/requests';

export const useMixedContent = () => {
  const [rawMovies, setRawMovies] = useState([]);
  const [rawTVs, setRawTVs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMixedContent = async () => {
      try {
        const [
          netflixRes,
          actionMovieRes,
          comedyMovieRes,
          horrorMovieRes,
          romanceMovieRes,
          actionTVRes,
          comedyTVRes,
          docTVRes,
          dramaTVRes,
          realityTVRes,
        ] = await Promise.all([
          instance.get(requests.fetchNetflixOriginals),
          instance.get(requests.fetchActionMovies),
          instance.get(requests.fetchComedyMovies),
          instance.get(requests.fetchHorrorMovies),
          instance.get(requests.fetchRomanceMovies),
          instance.get(requests.fetchActionAdventureTV),
          instance.get(requests.fetchComedyTV),
          instance.get(requests.fetchDocumentaryTV),
          instance.get(requests.fetchDramaTV),
          instance.get(requests.fetchRealityTV),
        ]);

        setRawMovies([
          ...netflixRes.data.results,
          ...actionMovieRes.data.results,
          ...comedyMovieRes.data.results,
          ...horrorMovieRes.data.results,
          ...romanceMovieRes.data.results,
        ]);

        setRawTVs([
          ...actionTVRes.data.results,
          ...comedyTVRes.data.results,
          ...docTVRes.data.results,
          ...dramaTVRes.data.results,
          ...realityTVRes.data.results,
        ]);
      } catch (err) {
        console.error('useMixedContent Error:', err);
        setError(err);
      }
    };

    fetchMixedContent();
  }, []);

  return { rawMovies, rawTVs, error };
};
