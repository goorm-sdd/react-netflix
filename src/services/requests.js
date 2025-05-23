export const requests = {
  fetchNowPlaying: 'movie/now_playing',
  fetchPopular: 'movie/popular',
  fetchNetflixOriginals: '/discover/movie?with_networks=213',
  fetchTrending: '/trending/all/week',
  fetchTopRated: '/movie/top_rated',

  fetchTrendingMovies: '/trending/movie/week',
  fetchTrendingTV: '/trending/tv/week',

  fetchReleaseDates: (movieId) => `/movie/${movieId}/release_dates`,
  fetchWatchlist: (accountId) => `/account/${accountId}/watchlist/movies`,

  //movie
  fetchActionMovies: '/discover/movie?with_genres=28',
  fetchComedyMovies: '/discover/movie?with_genres=35',
  fetchHorrorMovies: '/discover/movie?with_genres=27',
  fetchRomanceMovies: '/discover/movie?with_genres=10749',
  fetchDocumentaries: '/discover/movie?with_genres=99',
  fetchUpcoming: '/movie/upcoming', //upcomming request추가
  // TV
  fetchActionAdventureTV: '/discover/tv?with_genres=10759',
  fetchComedyTV: '/discover/tv?with_genres=35',
  fetchDocumentaryTV: '/discover/tv?with_genres=99',
  fetchDramaTV: '/discover/tv?with_genres=18',
  fetchRealityTV: '/discover/tv?with_genres=10764',

  // 검색
  fetchSearchMovies: (query) =>
    `/search/movie?query=${encodeURIComponent(query)}`,
  fetchSearchTV: (query) => `/search/tv?query=${encodeURIComponent(query)}`,

  // 디테일
  fetchMovieDetails: (movieId) => `/movie/${movieId}`,
  fetchTVDetails: (tvId) => `/tv/${tvId}`,
};
