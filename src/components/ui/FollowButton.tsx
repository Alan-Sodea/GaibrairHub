import React, { useEffect, useState } from 'react';
import { useHookstate } from '@hookstate/core';
import { globalState } from '../../store';
import { Button } from './Button';
import { User } from '../../types';
import axios from 'axios';
import API_URL from '../../api';

interface FollowButtonProps {
  userId: string;
  className?: string;
}

export const FollowButton = ({ userId, className = '' }: FollowButtonProps) => {
  const state = useHookstate(globalState);
  const currentUser = state.currentUser.get();
  const users = state.users.get();

  let user = users.filter(u => u._id == userId)[0];

  let [isFollowing, setIsFollowing] = useState(user?.pairs?.includes(currentUser?.email || ''));

  useEffect(() => { isFollowing = user?.pairs?.includes(currentUser?.email || '') }, state.users)
  const handleFollow = async () => {
    if (!currentUser) return;
    const email = currentUser.email;
    const password = currentUser.password;
    try {
      const elt = await axios.post(`${API_URL}/users/pair`, {
        email,
        password,
        pairEmail: user.email,
      })

      try {
        const elt = await axios.get(`${API_URL}/users/suggestions`,
          {
            params: {
              email,
              password,
            }
          }
        );
        state.users.set(elt.data);
        user = users.filter(u => u._id == userId)[0];
        setIsFollowing(user?.pairs?.includes(currentUser?.email || ''))
        // console.log({ elt: elt.data })
      } catch (error) {
        console.error("Error : suggestions's loading aborted...\n", error.message)
      }


      // state.currentUser.set({
      //   ...(elt.data),
      //   password
      // })

      // navigate("/");

    } catch (error: any) {
      // return setError(`Error : ${error.response.data.message}`);
    }
  };

  if (!currentUser || currentUser.id === userId) return null;

  return (
    <Button
      variant={isFollowing ? 'outline' : 'primary'}
      onClick={handleFollow}
      className={className}
    >
      {isFollowing ? 'Se désabonner' : "S'abonner"}
    </Button>
  );
};