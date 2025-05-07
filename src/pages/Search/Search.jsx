import React, { useState, useEffect } from 'react';
import { useMovieData } from '../../hooks/useMovieData';
import { requests } from '../../api/requests';
import './Search.css';

const Search = () => {
  const [query, setQuery] = useState('');
  const [searchUrl, setSearchUrl] = useState(null);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [submittedQuery, setSubmittedQuery] = useState(null); // 실제 검색 실행 후 보여줄 쿼리

  // 디바운싱
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // 자동완성용 URL
  useEffect(() => {
    if (debouncedQuery.trim().length > 1) {
      setSearchUrl(requests.fetchSearchMovies(debouncedQuery));
      setShowSuggestions(true);
    } else {
      setSearchUrl(null);
      setShowSuggestions(false);
    }
  }, [debouncedQuery]);

  const { data: suggestions, loading, error } = useMovieData(searchUrl);
  const { data: topRated } = useMovieData(requests.fetchTopRated);
  const { data: results } = useMovieData(
    submittedQuery ? requests.fetchSearchMovies(submittedQuery) : null,
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedQuery(query.trim());
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (title) => {
    setQuery(title);
    setSubmittedQuery(title);
    setShowSuggestions(false);
  };

  return (
    <div className="search-container">
      <form
        onSubmit={handleSubmit}
        role="search"
        method="get"
        className="search-form"
      >
        <div className="search-input-box">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a show, movie, genre, e.t.c."
            className="search-input"
          />
        </div>
        <button type="submit" className="btn-submit"></button>
      </form>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">Error: {error.message}</div>}

      {showSuggestions && suggestions?.length > 0 && (
        <ul className="suggestions">
          {suggestions.slice(0, 6).map((item) => (
            <li
              key={item.id}
              onClick={() => handleSuggestionClick(item.title || item.name)}
            >
              {item.title || item.name}
            </li>
          ))}
        </ul>
      )}
      {/* 실제 검색 결과 */}
      <>
        {!loading && results?.length > 0 && (
          <div className="search-results">
            <h3>Search Results</h3>
            <ul className="thumbnail-container">
              {results.map((item) => (
                <li key={item.id}>
                  <div className="thumbnail-item">
                    <img
                      src={
                        item.poster_path
                          ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                          : './src/assets/no-image.svg'
                      }
                      alt={item.title || item.name}
                    />
                  </div>
                  <p className="item-title">{item.title || item.name}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* 검색하지 않았거나, 결과가 없을 때 Top Rated */}
        {!loading &&
          !submittedQuery &&
          results?.length === 0 &&
          topRated?.length > 0 && (
            <div className="search-results">
              <h3>Top Rated</h3>
              <ul className="thumbnail-container">
                {topRated.slice(0, 10).map((item) => (
                  <li key={item.id}>
                    <div className="thumbnail-item">
                      <img
                        src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                        alt={item.title || item.name}
                      />
                    </div>
                    <p className="item-title">{item.title || item.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
      </>
    </div>
  );
};

export default Search;
