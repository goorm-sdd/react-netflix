import React, { useEffect, useState } from 'react';
import { instance } from '../../services/api';
import ShareIcon from '../../assets/icon-share.svg';
import RemindIcon from '../../assets/icon-notification.svg';
import './MovieCard.css';

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
    <div className="movie_card">
      <img
        className="movie_image"
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
        alt={movie.title}
      />

      <div className="movie_info">
        <div className="movie_buttons">
          <div className="movie_button_remindme">
            <img
              src={RemindIcon}
              alt="Remind Me"
              className="remindme_icon_img"
            />
            <span>Remind Me</span>
          </div>
          <div className="movie_button_share">
            <img src={ShareIcon} alt="Share" className="movie_icon_img" />
            <span>Share</span>
          </div>
        </div>

        <div className="movie_meta">
          <p className="release">
            Coming {formatReleaseDate(movie.release_date)}
          </p>
          <h2 className="movie_title">{movie.title}</h2>
          <p className="movie_overview">{movie.overview}</p>
          <div className="movie_genres">
            {genres.map((genre, index) => (
              <span key={genre.id} className="genre_item">
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
