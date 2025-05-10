import './Banner.css';
import { useEffect, useState, useMemo } from 'react';
import { useMixedContentData } from '../../hooks/useMixedContentData';
import { instance } from '../../services/api';
import { requests } from '../../services/requests';
import MyListIcon from '../../assets/icon-mylist-plus.svg';
import PlayIcon from '../../assets/icon-modal-play.svg';
import InfoIcon from '../../assets/icon-info.svg';
import { useMyList } from '../../context/MyListContext';

const Banner = ({ onInfoClick, type = 'all' }) => {
  const { rawMovies, rawTVs } = useMixedContentData(type);
  const [previews, setPreviews] = useState([]);
  const [content, setContent] = useState(null);

  const { addToMyList, removeFromMyList, isInMyList } = useMyList();
  const contentInMyList = content ? isInMyList(content.id) : false;

  const handleMyListClick = () => {
    if (!content) return;

    if (contentInMyList) {
      removeFromMyList(content.id);
    } else {
      addToMyList({
        id: content.id,
        title: content.title || content.name,
        image: `https://image.tmdb.org/t/p/original${content.poster_path}`,
        media_type: content.media_type,
        genre_ids: content.genre_ids,
      });
    }
  };

  const movieList = useMemo(() => {
    return rawMovies.map((item) => ({
      ...item,
      media_type: 'movie',
      genre_ids: item.genre_ids,
    }));
  }, [rawMovies]);

  const tvList = useMemo(() => {
    return rawTVs.map((item) => ({
      ...item,
      media_type: 'tv',
      genre_ids: item.genre_ids,
    }));
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
    const fetchPreviews = async () => {
      try {
        const url =
          type === 'tv'
            ? requests.fetchTrendingTV
            : type === 'movie'
              ? requests.fetchTrendingMovies
              : requests.fetchTrending;

        const res = await instance.get(url);
        const mapped = res.data.results
          .filter((item) => item.poster_path)
          .map((item) => ({
            id: item.id,
            title: item.title || item.name,
            image: `https://image.tmdb.org/t/p/w300${item.poster_path}`,
            media_type: item.media_type || (item.title ? 'movie' : 'tv'),
            genre_ids: item.genre_ids,
          }));
        setPreviews(mapped);
      } catch (err) {
        console.error('프리뷰 콘텐츠 로딩 실패:', err);
      }
    };

    fetchPreviews();
  }, [type]);

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
          <div
            className={`banner_mylist ${contentInMyList ? 'active' : ''}`}
            onClick={handleMyListClick}
          >
            <img
              src={MyListIcon}
              alt="My List"
              className={`button_icon ${contentInMyList ? 'active' : ''}`}
            />
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
            {previews.map((content) => (
              <div
                className="preview_item"
                key={content.id}
                onClick={() => onInfoClick(content.id, content.media_type)}
                style={{ cursor: 'pointer' }}
              >
                <img src={content.image} alt={content.title} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
