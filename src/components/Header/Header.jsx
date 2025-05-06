import './Header.css';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const isMyListPage = location.pathname === '/MyList';

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

      {!isMyListPage && (
        <>
          <button>TV Shows</button>
          <button>Movies</button>
        </>
      )}
      {isMyListPage && (
        <>
          <button>
            <img
              src="./src/assets/arrow-down.png"
              alt="arrow-down"
              style={{ width: '22px' }}
            ></img>
            <div>My List</div>
          </button>
        </>
      )}
    </div>
  );
};

export default Header;
