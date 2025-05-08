import React, { useState, useEffect } from 'react';
import { instance } from '../../api/axios';
import './Row.css';

export default function Row({ title, fetchUrl }) {
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
          poster: `https://image.tmdb.org/t/p/w300${item.poster_path}`,
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
      <h2 className="row-title">{title}</h2>
      <div className="row-posters">
        {items.map((item) => (
          <img
            key={item.id}
            className="row-poster"
            src={item.poster}
            alt={item.title}
          />
        ))}
      </div>
    </div>
  );
}
