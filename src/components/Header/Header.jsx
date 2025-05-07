import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo/Logo';
import BlackScreen from '../BlackScreen/BlackScreen';

const Header = () => {
  const location = useLocation();

  const isMoviesPage = location.pathname === '/movies';
  const isTVShowsPage = location.pathname === '/tv-shows';
  const isHomePage = location.pathname === '/';
  const isListPage = location.pathname === '/my-list';

  return (
    <div className="Header">
      <Logo />
      {isTVShowsPage && (
        <>
          <BlackScreen
            title="TV Shows"
            items={['TV Shows', 'Movies', 'My List']}
          />
          <BlackScreen
            title="All Genres"
            items={[
              {
                label: 'Action & Adventure',
                path: '/tv-shows/action-adventure',
              },
              { label: 'Comedy', path: '/tv-shows/comedy' },
              { label: 'Documentary', path: '/tv-shows/documentary' },
              { label: 'Drama', path: '/tv-shows/drama' },
              { label: 'Reality', path: '/tv-shows/reality' },
            ]}
          />
        </>
      )}
      {isMoviesPage && (
        <>
          <BlackScreen
            title="Movies"
            items={['TV Shows', 'Movies', 'My List']}
          />
          <BlackScreen
            title="All Genres"
            items={[
              { label: 'Action', path: '/movies/action' },
              { label: 'Comedy', path: '/movies/comedy' },
              { label: 'Horror', path: '/movies/horror' },
              { label: 'Romance', path: '/movies/romance' },
            ]}
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
      {isListPage && (
        <>
          <BlackScreen
            title="My List"
            items={['TV Shows', 'Movies', 'My List']}
          />
        </>
      )}
    </div>
  );
};

export default Header;
