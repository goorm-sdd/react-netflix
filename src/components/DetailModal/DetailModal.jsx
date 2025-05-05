import './detail-modal.css';
import { useEffect, useState } from 'react';
import { instance } from '../../api/axios';
import { requests } from '../../api/requests';
import MyListIcon from '../../assets/modal-mylist-icon.png';
import ShareIcon from '../../assets/modal-share-icon.png';

export default function DetailModal({ isOpen, onClose, movieId, movieType }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (!isOpen || !movieId) return;

    const fetchDetails = async () => {
      try {
        const res = await instance.get(
          movieType === 'tv'
            ? requests.fetchTVDetails(movieId)
            : requests.fetchMovieDetails(movieId),
        );
        const data = res.data;

        const subtitle = data.release_date
          ? `개봉일: ${data.release_date}`
          : data.first_air_date
            ? `첫 방영일: ${data.first_air_date}`
            : '';

        const tags = data.genres?.map((genre) => genre.name).join(' · ') || '';

        setMovie({
          title: data.title || data.name,
          image: `https://image.tmdb.org/t/p/w300${data.backdrop_path || data.poster_path}`,
          description: data.overview || '설명이 없습니다.',
          subtitle,
          tags,
        });
      } catch (error) {
        console.error('모달 데이터 로딩 실패:', error);
      }
    };

    fetchDetails();
  }, [isOpen, movieId, movieType]);

  if (!isOpen || !movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img className="modal-poster" src={movie.image} alt={movie.title} />
        <div className="modal-detail">
          <div className="modal-buttons">
            <div className="icon-button">
              <img src={MyListIcon} alt="My List" className="icon-image" />
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
