import './banner.css';
import { useEffect, useState } from 'react';
import { instance } from '../../api/axios';
import { requests } from '../../api/requests';

export default function Banner() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await instance.get(requests.fetchNetflixOriginals);
      const results = res.data.results;
      const random = results[Math.floor(Math.random() * results.length)];
      setContent(random);
    };
    fetchData();
  }, []);

  if (!content) return null;

  return (
    <div className="banner">
      <div
        className="banner_poster"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${content.poster_path})`,
        }}
      ></div>
    </div>
  );
}
