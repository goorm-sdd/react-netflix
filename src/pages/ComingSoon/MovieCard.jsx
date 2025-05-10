import React, { useEffect, useState } from 'react';
import { instance } from '../../services/api';
import './ComingSoon.css';
import ShareIcon from '../../assets/icon-share.svg';
import RemindIcon from '../../assets/icon-notification.svg';

const MovieCard = ({ movie }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await instance.get(`/movie/${movie.id}`);
        setGenres(res.data.genres || []);
      } catch (err) {
        console.error('장르 불러오기 실패:', err);
      }
    };
    fetchGenres();
  }, [movie.id]);

  // 날짜 포맷 함수
  const formatReleaseDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  return (
    <div className="movie-card">
      <img
        className="movie-image"
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
        alt={movie.title}
      />

      <div className="movie-info">
        <div className="movie-buttons">
          <div className="movie-button-remindme">
            <img
              src={RemindIcon}
              alt="Remind Me"
              className="remindme-icon-img"
            />
            <span>Remind Me</span>
          </div>
          <div className="movie-button-share">
            <img src={ShareIcon} alt="Share" className="movie-icon-img" />
            <span>Share</span>
          </div>
        </div>

        <div className="movie-meta">
          <p className="release">
            Coming {formatReleaseDate(movie.release_date)}
          </p>
          <h2 className="movie-title">{movie.title}</h2>
          <p className="movie-overview">{movie.overview}</p>
          <div className="movie-genres">
            {genres.map((genre, index) => (
              <span key={genre.id} className="genre-item">
                {index > 0 && <span className="dot"> • </span>}
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieCard;
