import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { BrowserRouter, Outlet, Routes, Route } from 'react-router-dom';
import MyList from './pages/MyList';

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/MyList" element={<MyList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
