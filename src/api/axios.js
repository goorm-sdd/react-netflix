import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://api.themoviedb.org/3',
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: import.meta.env.VITE_TMDB_LANGUAGE,
  },
});
