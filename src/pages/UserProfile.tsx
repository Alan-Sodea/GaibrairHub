import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useHookstate } from '@hookstate/core';
import { globalState } from '../store';
import { Button } from '../components/ui/Button';
import { FollowButton } from '../components/ui/FollowButton';

export const UserProfile = () => {
  const { userId } = useParams();
  const state = useHookstate(globalState);
  const user = state.users.get().find(u => u._id === userId);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Utilisateur non trouvé</h2>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <img
              src={user.profilePhoto || "https://www.silcharmunicipality.in/wp-content/uploads/2021/02/male-face.jpg"}
              alt={user.fullName}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.fullName}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                {user.pairs.length} pairs
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <FollowButton userId={user._id} />
            <Button onClick={() => { state.newmail.set(user.email); navigate("/messages") }}>
              Contacter
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 dark:text-white">Secteur</h3>
            <p className="text-gray-600 dark:text-gray-300">{user.sector}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 dark:text-white">Compétences</h3>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 dark:text-white">Expérience</h3>
            <p className="text-gray-600 dark:text-gray-300">{user.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};