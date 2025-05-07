import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo/Logo';
import BlackScreen from '../BlackScreen/BlackScreen';

const Header = () => {
  const location = useLocation();

  const isMoviesPage = location.pathname === '/movies';
  const isTVShowsPage = location.pathname === '/tv-shows';
  const isHomePage = location.pathname === '/';

  return (
    <div className="Header">
      <Logo />
      {isTVShowsPage && (
        <>
          <BlackScreen
            title="TV Shows"
            items={['All', 'TV Shows', 'Movies', 'My List']}
          />
          <BlackScreen
            title="All Genres"
            items={[
              'Action & Adventure',
              'Comedy',
              'Documentary',
              'Drama',
              'Reality',
            ]}
          />
        </>
      )}
      {isMoviesPage && (
        <>
          <BlackScreen
            title="Movies"
            items={['All', 'TV Shows', 'Movies', 'My List']}
          />
          <BlackScreen
            title="All Genres"
            items={['Action', 'Comedy', 'Horror', 'Romance']}
          />
        </>
      )}
      {isHomePage && (
        <>
          <Link to="/tv-shows" className="Header-link">
            TV Shows
          </Link>
          <Link to="/movies" className="Header-link">
            Movies
          </Link>
        </>
      )}
    </div>
  );
};

export default Header;
