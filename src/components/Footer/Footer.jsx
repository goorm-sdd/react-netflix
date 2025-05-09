import { Link, useLocation } from 'react-router-dom';
import './Footer.css';
import HomeIcon from '../../assets/icon-home.svg';
import SearchIcon from '../../assets/icon-search.svg';
import ComigSoonIcon from '../../assets/icon-coming-soon.svg';
import MylistIcon from '../../assets/icon-mylist.svg';

const Footer = () => {
  const location = useLocation();

  return (
    <footer className="Footer">
      <Link to="/">
        <img
          src={HomeIcon}
          alt="home"
          className={`footer-icon ${location.pathname === '/' ? 'active' : ''}`}
        />
        <div className={location.pathname === '/' ? 'active' : ''}>Home</div>
      </Link>
      <Link to="/search">
        <img
          src={SearchIcon}
          alt="search"
          className={`footer-icon ${location.pathname === '/search' ? 'active' : ''}`}
        />
        <div className={location.pathname === '/search' ? 'active' : ''}>
          Search
        </div>
      </Link>
      <Link to="/coming-soon">
        <img
          src={ComigSoonIcon}
          alt="coming-soon"
          style={{ width: '22px' }}
          className={`footer-icon ${location.pathname === '/coming-soon' ? 'active' : ''}`}
        />
        <div className={location.pathname === '/coming-soon' ? 'active' : ''}>
          Coming Soon
        </div>
      </Link>
      <Link to="/my-list">
        <img
          src={MylistIcon}
          alt="my-list"
          style={{ width: '22px', marginBottom: '3px' }}
          className={`footer-icon ${location.pathname === '/my-list' ? 'active' : ''}`}
        />
        <div className={location.pathname === '/my-list' ? 'active' : ''}>
          My List
        </div>
      </Link>
    </footer>
  );
};

export default Footer;
