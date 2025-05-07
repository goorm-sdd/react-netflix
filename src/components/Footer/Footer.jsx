import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="Footer">
      <Link to="/">
        <img
          src="./src/assets/home-icon.png"
          alt="home"
          className="footer-icon"
        />
        <div>Home</div>
      </Link>
      <Link to="/search">
        <img
          src="./src/assets/search-icon.png"
          alt="search"
          className="footer-icon"
        />
        <div>Search</div>
      </Link>
      <Link to="/coming-soon">
        <img
          src="./src/assets/coming-soon-icon.png"
          alt="coming-soon"
          style={{ width: '22px' }}
        />
        <div>Coming Soon</div>
      </Link>
      <Link to="/my-list">
        <img
          src="./src/assets/mylist-icon.png"
          alt="my-list"
          style={{ width: '22px', marginBottom: '3px' }}
        />
        <div>My List</div>
      </Link>
    </footer>
  );
};

export default Footer;
