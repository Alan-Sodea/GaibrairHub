import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Upload } from 'lucide-react';
import { useHookstate } from '@hookstate/core';
import { globalState } from '../../store';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import axios from 'axios';
import API_URL from "../../api";

export const SignUp = () => {

  const navigate = useNavigate();
  const state = useHookstate(globalState);
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatar: '',
    bio: '',
    sector: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const currentUser = {
      fullName: formData.name,
      email: formData.email,
      password: formData.password,
      profilePhoto: formData.avatar,
      bio: formData.bio,
      sector: formData.sector,
      skills: [],
      pairs: [], // Array of user IDs who follow this user
    }

    if (formData.confirmPassword != formData.password) { setError("Error : Les mots de passe ne correspondent pas"); return; }
    if (formData.sector == " ") return setError("Error : le secteur est obligatoire")

    // TODO: Implement actual registration

    try {
      await axios.post(`${API_URL}/users`, currentUser)
    } catch (error: any) {
      return setError(`Error : ${error.response.data.message}`);
    }

    state.currentUser.set(currentUser);
    navigate('/');
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
          Créer un compte
        </h2>

        <div className={'bg-red-300 py-1.5 px-3 font-medium text-red-700 mb-4 rounded-lg ' + String((error == "") && "hidden")}>{error}</div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            icon={<User className="w-5 h-5" />}
            type="text"
            placeholder="Nom complet"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            icon={<Mail className="w-5 h-5" />}
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            icon={<Lock className="w-5 h-5" />}
            type="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <Input
            icon={<Lock className="w-5 h-5" />}
            type="password"
            placeholder="Confirmer le mot de passe"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />
          <Input
            icon={<Upload className="w-5 h-5" />}
            type="url"
            placeholder="URL de votre photo de profil"
            value={formData.avatar}
            onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
          />
          <textarea
            placeholder="Bio"
            className="w-full rounded-lg border border-gray-300 p-3 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={4}
          />
          <Input
            type="text"
            placeholder="Secteur d'activité"
            value={formData.sector}
            onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
            required
          />
          <Button type="submit" fullWidth>
            S'inscrire
          </Button>
        </form>


        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Déjà un compte ?{' '}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div >
  );
};