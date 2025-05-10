import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://api.themoviedb.org/3',
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: import.meta.env.VITE_TMDB_LANGUAGE,
  },
});

// 요청 인터셉터 추가
instance.interceptors.request.use(
  (config) => {
    // 요청 보내기 전에 수행할 작업 (예: 로깅)
    // console.log('Request sent:', config);
    return config;
  },
  (error) => {
    // 요청 에러 처리
    console.error('Request error:', error);
    return Promise.reject(error);
  },
);

// 응답 인터셉터 추가
instance.interceptors.response.use(
  (response) => {
    // 응답 데이터 처리
    return response;
  },
  (error) => {
    // 응답 에러 처리 (예: 토큰 만료 시 리디렉션)
    console.error('Response error:', error);
    return Promise.reject(error);
  },
);
