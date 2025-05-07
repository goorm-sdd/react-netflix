import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { instance } from '../../api/axios';
import { requests } from '../../api/requests';

const EachTVGenrePage = () => {
  const { genreName } = useParams();
  const [tvShows, setTVShows] = useState([]);

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        let request;

        switch (genreName) {
          case 'action-adventure':
            request = requests.fetchActionAdventureTV;
            break;
          case 'comedy':
            request = requests.fetchComedyTV;
            break;
          case 'documentary':
            request = requests.fetchDocumentaryTV;
            break;
          case 'drama':
            request = requests.fetchDramaTV;
            break;
          case 'reality':
            request = requests.fetchRealityTV;
            break;
          default:
            return;
        }

        const response = await instance.get(request);
        setTVShows(response.data.results);
      } catch (error) {
        console.error('Error fetching TV shows:', error);
      }
    };

    fetchTVShows();
  }, [genreName]);

  return (
    <>
      {tvShows.map(
        (tvShow) =>
          tvShow.poster_path && (
            <div key={tvShow.id} className="grid-item">
              <img
                src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                alt={tvShow.title}
              />
            </div>
          ),
      )}
    </>
  );
};

export default EachTVGenrePage;
