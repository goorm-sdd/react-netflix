import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '../../assets/icon-home.svg';
import SearchIcon from '../../assets/icon-search.svg';
import ComigSoonIcon from '../../assets/icon-coming-soon.svg';
import MylistIcon from '../../assets/icon-mylist.svg';
import './Footer.css';

const Footer = () => {
  const location = useLocation();

  return (
    <footer className="footer">
      <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
        <img src={HomeIcon} alt="home" className="footer_icon" />
        <em>Home</em>
      </Link>
      <Link
        to="/search"
        className={location.pathname === '/search' ? 'active' : ''}
      >
        <img src={SearchIcon} alt="search" className="footer_icon" />
        <em>Search</em>
      </Link>
      <Link
        to="/coming-soon"
        className={location.pathname === '/coming-soon' ? 'active' : ''}
      >
        <img
          src={ComigSoonIcon}
          alt="coming-soon"
          style={{ width: '22px' }}
          className="footer_icon"
        />
        <em>Coming Soon</em>
      </Link>
      <Link
        to="/my-list"
        className={location.pathname === '/my-list' ? 'active' : ''}
      >
        <img
          src={MylistIcon}
          alt="my-list"
          style={{ width: '22px', marginBottom: '3px' }}
          className="footer_icon"
        />
        <em>My List</em>
      </Link>
    </footer>
  );
};

export default Footer;
