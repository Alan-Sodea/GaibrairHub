import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../Navbar';
import { MobileNav } from './MobileNav';

export const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 pt-20 pb-20">
        <Outlet />
      </main>
      <MobileNav />
    </div>
  );
};