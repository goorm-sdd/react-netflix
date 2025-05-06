import './banner.css';
import { useEffect, useState, useMemo } from 'react';
import { instance } from '../../api/axios';
import { requests } from '../../api/requests';
import MyListIcon from '../../assets/modal-mylist-icon.png';
import PlayIcon from '../../assets/play-icon.png';
import InfoIcon from '../../assets/info-icon.png';

export default function Banner({ onPreviewClick, onInfoClick }) {
  const [rawMovies, setRawMovies] = useState([]);
  const [rawTVs, setRawTVs] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [content, setContent] = useState(null);

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
      } catch (error) {
        console.error('배너 콘텐츠 로딩 실패:', error);
      }
    };

    fetchMixedContent();
  }, []);

  const movieList = useMemo(() => {
    return rawMovies.map((item) => ({ ...item, media_type: 'movie' }));
  }, [rawMovies]);

  const tvList = useMemo(() => {
    return rawTVs.map((item) => ({ ...item, media_type: 'tv' }));
  }, [rawTVs]);

  const combined = useMemo(() => {
    return [...movieList, ...tvList];
  }, [movieList, tvList]);

  useEffect(() => {
    if (combined.length === 0) return;
    const random = combined[Math.floor(Math.random() * combined.length)];
    setContent(random);
    console.log('배너 콘텐츠:', random);
  }, [combined]);

  useEffect(() => {
    instance
      .get(requests.fetchTrending)
      .then((res) => {
        const mapped = res.data.results
          .filter((item) => item.poster_path)
          .map((item) => ({
            id: item.id,
            title: item.title || item.name,
            image: `https://image.tmdb.org/t/p/w300${item.poster_path}`,
            media_type: item.media_type,
          }));
        setPreviews(mapped);
      })
      .catch((err) => console.error('트렌딩 썸네일 불러오기 실패:', err));
  }, []);

  if (!content) return null;

  return (
    <div className="banner">
      <div
        className="banner_poster"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${content.poster_path})`,
          cursor: 'pointer',
        }}
        onClick={() => onInfoClick(content.id, content.media_type)}
      />
      <div className="banner_contents">
        <div className="banner_buttons">
          <div className="banner_mylist">
            <img src={MyListIcon} alt="My List" className="button_icon" />
            <p>My List</p>
          </div>
          <div className="banner_play">
            <img src={PlayIcon} alt="Play" className="button_play_icon" />
            <p>Play</p>
          </div>
          <div
            className="banner_info"
            onClick={() => onInfoClick(content.id, content.media_type)}
          >
            <img src={InfoIcon} alt="Info" className="button_icon" />
            <p>Info</p>
          </div>
        </div>
        <div className="banner_previews">
          <div className="banner_preview">
            <p>Previews</p>
          </div>
          <div className="banner_previews_container">
            {previews.map((item) => (
              <div
                className="preview_item"
                key={item.id}
                onClick={() => onPreviewClick(item.id, item.media_type)}
                style={{ cursor: 'pointer' }}
              >
                <img src={item.image} alt={item.title} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
