import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="Footer">
      <button>
        <img
          src="./src/assets/home-icon.png"
          alt="home"
          className="footer-icon"
        ></img>
        <div>home</div>
      </button>
      <button>
        <img
          src="./src/assets/search-icon.png"
          alt="search"
          className="footer-icon"
        ></img>
        <div>Search</div>
      </button>
      <button>
        <img
          src="./src/assets/coming-soon-icon.png"
          alt="coming-soon"
          style={{ width: '22px' }}
        ></img>
        <div>Coming Soon</div>
      </button>
      <Link to="/MyList">
        <button>
          <img
            src="./src/assets/mylist-icon.png"
            alt="my-list"
            style={{ width: '22px', marginBottom: '3px' }}
          ></img>
          <div>My List</div>
        </button>
      </Link>
    </div>
  );
};

export default Footer;
