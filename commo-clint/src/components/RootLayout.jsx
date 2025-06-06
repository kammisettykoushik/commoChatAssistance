// components/RootLayout.jsx
import React from 'react';
import ScrollToTop from './ScrollToTop';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
};

export default RootLayout;
