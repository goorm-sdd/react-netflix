import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home.jsx';
import TVShows from '../pages/TVShows/TVShows.jsx';
import Movies from '../pages/Movies/Movies.jsx';
import Search from '../pages/Search/Search';
import ComingSoon from '../pages/ComingSoon/ComingSoon';
import MainLayout from '../layouts/MainLayout';
import GenrePage from '../pages/Genre/Genre';
import MyList from '../pages/MyList/MyList.jsx';
import { MyListProvider } from '../context/MyListContext.jsx';

const AppRoutes = () => {
  return (
    <MyListProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/tv-shows" element={<TVShows />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/:mediaType/:genreName" element={<GenrePage />} />
            <Route path="/search" element={<Search />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/my-list" element={<MyList />} />
          </Route>
        </Routes>
      </Router>
    </MyListProvider>
  );
};

export default AppRoutes;
