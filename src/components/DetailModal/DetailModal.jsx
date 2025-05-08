import './detail-modal.css';
import { useEffect, useState } from 'react';
import { instance } from '../../api/axios';
import { requests } from '../../api/requests';
import MyListIcon from '../../assets/modal-mylist-icon.svg';
import ShareIcon from '../../assets/modal-share-icon.svg';
import { useMyList } from '../../pages/MyList/MyListContext';

export default function DetailModal({ isOpen, onClose, movieId, movieType }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (!isOpen || !movieId || !movieType) return;

    const fetchDetails = async () => {
      try {
        const url =
          movieType === 'tv'
            ? requests.fetchTVDetails(movieId)
            : requests.fetchMovieDetails(movieId);

        const res = await instance.get(url);
        const data = res.data;

        const subtitle = data.release_date
          ? `개봉일: ${data.release_date}`
          : data.first_air_date
            ? `첫 방영일: ${data.first_air_date}`
            : '';

        const tags = data.genres?.map((genre) => genre.name).join(' · ') || '';

        setMovie({
          title: data.title || data.name,
          image: `https://image.tmdb.org/t/p/w500${data.backdrop_path || data.poster_path}`,
          description: data.overview || '설명이 없습니다.',
          subtitle,
          tags,
        });
      } catch (error) {
        console.error('상세 정보 로딩 실패:', error);
      }
    };

    fetchDetails();
  }, [isOpen, movieId, movieType]);

  const { addToMyList, removeFromMyList, isInMyList } = useMyList();

  const inMyList = movieId ? isInMyList(movieId) : false;

  const handleMyListClick = () => {
    if (!movie) return;

    if (inMyList) {
      removeFromMyList(movieId);
    } else {
      addToMyList({
        id: movieId,
        title: movie.title,
        image: movie.image,
        media_type: movieType,
      });
    }
  };

  if (!isOpen || !movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img className="modal-poster" src={movie.image} alt={movie.title} />
        <div className="modal-detail">
          <div className="modal-buttons">
            <div className="icon-button" onClick={handleMyListClick}>
              <img
                src={MyListIcon}
                alt="My List"
                className={`icon-image ${inMyList ? 'active' : ''}`}
              />
              <p>My List</p>
            </div>
            <div className="icon-button">
              <img src={ShareIcon} alt="Share" className="icon-image" />
              <p>Share</p>
            </div>
          </div>
          <div className="modal-body">
            <p className="modal-subtitle">{movie.subtitle}</p>
            <h2 className="modal-title">{movie.title}</h2>
            <p className="modal-description">{movie.description}</p>
            <p className="modal-tags">{movie.tags}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
