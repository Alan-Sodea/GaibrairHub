import React from 'react';
import { useHookstate } from '@hookstate/core';
import { globalState } from '../store';
import { ProfileForm } from '../components/profile/ProfileForm';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';


export const Profile = () => {
  const state = useHookstate(globalState);
  const currentUser = state.currentUser.get();
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Connectez-vous pour accéder à votre profil</h2>
        <Button onClick={() => { navigate("/login") }}>Se connecter</Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="flex items-center space-x-4 mb-8 w-full justify-center flex-col gap-4">
          <img
            src={currentUser.profilePhoto || "https://www.silcharmunicipality.in/wp-content/uploads/2021/02/male-face.jpg"}
            alt={currentUser.fullName}
            className="w-20 h-20 rounded-full object-cover outline-1 outline-indigo-950 outline-dashed bg-indigo-700"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {currentUser.fullName}
            </h2>
            {/* <p className="text-gray-600 font-bold text-2xl dark:text-gray-300">{currentUser.fullName}</p> */}
          </div>
        </div>
        <ProfileForm />
      </div>
    </div>
  );
};