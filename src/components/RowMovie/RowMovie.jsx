import React, { useState, useEffect } from 'react';
import { instance } from '../../services/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './RowMovie.css';

const RowMovie = ({ title, fetchUrl, onInfoClick }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get(fetchUrl);
        const data = res.data.results || [];
        const filtered = data.filter((item) => item.poster_path); // poster_path가 있는 것만
        const mapped = filtered.map((item) => ({
          id: item.id,
          title: item.title || item.name,
          poster: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
          media_type: item.media_type || (item.title ? 'movie' : 'tv'),
        }));
        setItems(mapped);
      } catch (err) {
        console.error(`Row fetch 실패: ${title}`, err);
      }
    };
    fetchData();
  }, [fetchUrl, title]);

  return (
    <div className="row">
      <h2 className="row_title">{title}</h2>
      <Swiper
        className="row_swiper"
        spaceBetween={8}
        grabCursor={true}
        slidesPerView="auto"
        breakpoints={{
          1000: {
            slidesPerView: 10,
            slidesPerGroup: 10,
          },
          800: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          600: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          400: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          300: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <img
              className="row_poster"
              src={item.poster}
              alt={item.title}
              onClick={() => onInfoClick(item.id, item.media_type)}
              style={{ cursor: 'pointer' }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default RowMovie;
