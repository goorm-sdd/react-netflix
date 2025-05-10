import { useEffect, useState } from 'react';
import { instance } from '../services/api';
import { requests } from '../services/requests';

export const useDetailData = (isOpen, movieId, movieType) => {
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

  return movie;
};
