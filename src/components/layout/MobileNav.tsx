import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, MessageSquare, Newspaper } from 'lucide-react';

export const MobileNav = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 md:hidden">
      <div className="flex justify-around items-center h-16">
        <NavLink to="/" icon={<Home />} label="Accueil" active={isActive('/')} />
        <NavLink to="/feed" icon={<Newspaper />} label="Feed" active={isActive('/feed')} />
        <NavLink to="/mentors" icon={<Users />} label="Mentors" active={isActive('/mentors')} />
        <NavLink to="/messages" icon={<MessageSquare />} label="Messages" active={isActive('/messages')} />
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, label, active }: { to: string; icon: React.ReactNode; label: string; active: boolean }) => (
  <Link
    to={to}
    className={`flex flex-col items-center space-y-1 p-2 ${
      active ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400'
    }`}
  >
    {icon}
    <span className="text-xs">{label}</span>
  </Link>
);