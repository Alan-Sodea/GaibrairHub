import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useHookstate } from '@hookstate/core';
import { globalState } from '../../store';
import { Button } from '../ui/Button';
import { FollowButton } from '../ui/FollowButton';

export const AccountSuggestions = () => {
  const state = useHookstate(globalState);
  const users = state.users.get();
  const currentUser = state.currentUser.get();
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 300;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const suggestedUsers = users;

  if (suggestedUsers?.length === 0) return null;

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold dark:text-white">Suggestions</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => scroll('left')}
            className="p-2"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            onClick={() => scroll('right')}
            className="p-2"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div
        ref={sliderRef}
        className="flex space-x-4 overflow-x-hidden scroll-smooth"
      >
        {suggestedUsers.map(user => (
          <div
            key={user._id}
            className="flex-none w-64 bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
          >
            <Link to={`/user/${user._id}`} className="flex items-center space-x-3 mb-3">
              <img
                src={user.profilePhoto || "https://www.silcharmunicipality.in/wp-content/uploads/2021/02/male-face.jpg"}
                alt={user.fullName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="min-w-0">
                <h3 className="font-medium text-gray-900 dark:text-white truncate">
                  {user.fullName}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {user.sector}
                </p>
              </div>
            </Link>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {user.pairs?.length} pairs
              </span>
              <FollowButton userId={user._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};