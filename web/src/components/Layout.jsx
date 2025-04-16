// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      {/* Puedes agregar un Header, Sidebar, etc. aquí */}
      <Outlet />
    </div>
  );
};

export default Layout;
