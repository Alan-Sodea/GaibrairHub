import React from 'react';
import { useHookstate } from '@hookstate/core';
import { Users, MessageSquare, Home, Newspaper } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { globalState } from '../store';

export const Navbar = () => {
  const state = useHookstate(globalState);
  const navigate = useNavigate();
  const currentUser = state.currentUser.get();

  const handleAuthClick = () => {
    if (currentUser) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-gray-800 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            GaibrairHub
          </Link>

          <div className="hidden md:flex items-center justify-center flex-1 px-8">
            <div className="flex space-x-8">
              <NavLink to="/" icon={<Home className="w-5 h-5" />} text="Accueil" />
              <NavLink to="/feed" icon={<Newspaper className="w-5 h-5" />} text="Feed" />
              <NavLink to="/mentors" icon={<Users className="w-5 h-5" />} text="Mentors" />
              <NavLink to="/messages" icon={<MessageSquare className="w-5 h-5" />} text="Messages" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {currentUser ? (
              <button onClick={handleAuthClick} className="flex items-center space-x-2">
                <img
                  src={currentUser.profilePhoto || "https://www.silcharmunicipality.in/wp-content/uploads/2021/02/male-face.jpg"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="hidden md:inline text-gray-700 dark:text-gray-300">
                  {currentUser.fullName}
                </span>
              </button>
            ) : (
              <button
                onClick={handleAuthClick}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Connexion
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) => (
  <Link
    to={to}
    className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
  >
    {icon}
    <span>{text}</span>
  </Link>
);