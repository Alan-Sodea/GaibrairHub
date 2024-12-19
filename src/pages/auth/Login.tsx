import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useHookstate } from '@hookstate/core';
import { globalState } from '../../store';
import { Mail, Lock } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import axios from 'axios';
import API_URL from "../../api";

export const Login = () => {
  const state = useHookstate(globalState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("")
  const navigate = useNavigate();



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const elt = await axios.post(`${API_URL}/users/login`, {
        email,
        password
      })

      state.currentUser.set({
        ...(elt.data),
        password
      })
      navigate("/");

    } catch (error: any) {
      return setError(`Error : ${error.response.data.message}`);
    }

  };

  return (

    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
          Connexion
        </h2>
        <div className={'bg-red-300 py-1.5 px-3 font-medium text-red-700 mb-4 rounded-lg ' + String((error == "") && "hidden")}>{error}</div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            icon={<Mail className="w-5 h-5" />}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            icon={<Lock className="w-5 h-5" />}
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" fullWidth>
            Se connecter
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Pas encore de compte ?{' '}
            <Link to="/signup" className="text-indigo-600 hover:text-indigo-500">
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};