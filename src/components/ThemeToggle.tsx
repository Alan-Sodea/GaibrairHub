import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useHookstate } from '@hookstate/core';
import { globalState } from '../store';

export const ThemeToggle = () => {
  const state = useHookstate(globalState);
  
  const toggleTheme = () => {
    state.darkMode.set(prev => !prev);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label="Toggle theme"
    >
      {state.darkMode.get() ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-gray-700" />
      )}
    </button>
  );
};