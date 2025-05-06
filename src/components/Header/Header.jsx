import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="Header">
      <Link to="/">
        <button>
          <img
            src="./src/assets/netflix-icon.png"
            alt="Netflix"
            style={{ width: '40px' }}
          ></img>
        </button>
      </Link>
      <button>TV Shows</button>
      <button>Movies</button>
    </div>
  );
};

export default Header;
