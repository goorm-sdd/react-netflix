import './banner.css';
import { useEffect, useState } from 'react';
import { instance } from '../../api/axios';
import { requests } from '../../api/requests';
import MyListIcon from '../../assets/modal-mylist-icon.png';
import PlayIcon from '../../assets/play-icon.png';
import InfoIcon from '../../assets/info-icon.png';

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
      <div className="banner_contents">
        <div className="banner_buttons">
          <div className="banner_mylist">
            <img src={MyListIcon} alt="My List" className="button_icon" />
            <p>My List</p>
          </div>
          <div className="banner_play">
            <img src={PlayIcon} alt="Play" className="button_play_icon" />
            <p>Play</p>
          </div>
          <div className="banner_info">
            <img src={InfoIcon} alt="Info" className="button_icon" />
            <p>Info</p>
          </div>
        </div>
        <div className="banner_previews">
          <div className="banner_preview">
            <p>Previews</p>
          </div>
          <div className="banner_previews_container"></div>
        </div>
      </div>
    </div>
  );
}
