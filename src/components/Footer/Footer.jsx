import { Link, useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const location = useLocation();

  return (
    <footer className="Footer">
      <Link to="/">
        <img
          src="./src/assets/home-icon.svg"
          alt="home"
          className={`footer-icon ${location.pathname === '/' ? 'active' : ''}`}
        />
        <div className={location.pathname === '/' ? 'active' : ''}>Home</div>
      </Link>
      <Link to="/search">
        <img
          src="./src/assets/search-icon.svg"
          alt="search"
          className={`footer-icon ${location.pathname === '/search' ? 'active' : ''}`}
        />
        <div className={location.pathname === '/search' ? 'active' : ''}>
          Search
        </div>
      </Link>
      <Link to="/coming-soon">
        <img
          src="./src/assets/coming-soon-icon.svg"
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
          src="./src/assets/mylist-icon.svg"
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
