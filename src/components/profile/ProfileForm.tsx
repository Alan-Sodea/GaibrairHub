import React, { useState } from 'react';
import { useHookstate } from '@hookstate/core';
import { User } from '../../types';
import { globalState } from '../../store';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import axios from 'axios';
import API_URL from "../../api";

export const ProfileForm = () => {
  const state = useHookstate(globalState);
  const currentUser = state.currentUser.get();

  const [formData, setFormData] = useState<Partial<User>>({
    email: currentUser?.email,
    password: currentUser?.password,
    fullName: currentUser?.fullName || '',
    sector: currentUser?.sector || '',
    skills: currentUser?.skills || [],
    bio: currentUser?.bio || '',
    profilePhoto: currentUser?.profilePhoto || "https://www.silcharmunicipality.in/wp-content/uploads/2021/02/male-face.jpg",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (currentUser) {
    //   state.currentUser.set({ ...currentUser, ...formData });
    // }
    // console.log(formData)


    try {
      const elt = await axios.put(`${API_URL}/users/`,
        {
          ...formData,
        }
      )
      console.log({
        ...currentUser,
        ...elt.data.data,
      })
      // state.currentUser.set()

    } catch (error: any) {
      return console.error(`Error : ${error.response.data.message}`);
    }

  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setFormData({ ...formData, skills });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Nom complet"
        value={formData.fullName}
        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        placeholder='Nom complet'
        required
      />
      <Input
        label="Secteur d'activité"
        value={formData.sector}
        onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
        placeholder='secteur'
        required
      />
      <Input
        label="Photo de profile"
        value={formData.profilePhoto}
        onChange={(e) => setFormData({ ...formData, profilePhoto: e.target.value })}
        placeholder="Lien vers la photo de profile"
        required
      />
      <Input
        label="Compétences (séparées par des virgules)"
        value={formData.skills?.join(', ')}
        onChange={handleSkillsChange}
        placeholder="Compétences. ex: Marketing, Finance, Leadership"
      />
      <textarea
        className="w-full rounded-lg border border-gray-300 p-3"
        rows={4}
        placeholder="Votre description..."
        value={formData.bio}
        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
      />

      <Button type="submit">Sauvegarder le profil</Button>
    </form>
  );
};