import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import './MainLayout.css';

const MainLayout = () => {
  const location = useLocation();

  // 헤더를 숨길 경로 목록
  const hiddenHeaderRoutes = ['/search'];

  const isHeaderHidden = hiddenHeaderRoutes.some((path) =>
    location.pathname.startsWith(path),
  );
  return (
    <>
      {!isHeaderHidden && <Header />}
      <main className={`container ${isHeaderHidden ? 'no-header' : ''}`}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
