import React, { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import { useHookstate } from '@hookstate/core';
import { globalState } from '../../store';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Chat } from '../../types';

interface NewChatDialogProps {
  onClose: () => void;
  onCreateChat: (chat: Chat) => void;
}

export const NewChatDialog = ({ onClose, onCreateChat }: NewChatDialogProps) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const state = useHookstate(globalState);
  const users = state.users.get();
  const currentUser = state.currentUser.get();
  const newmail = state.newmail.get();

  useEffect(() => {
    if (newmail) setEmail(newmail);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetUser = users.find(u => u.email === email);

    if (!targetUser) {
      setError('Utilisateur non trouvé');
      return;
    }

    if (!currentUser) {
      setError('Vous devez être connecté');
      return;
    }

    onCreateChat(email);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">
          Nouvelle discussion
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            icon={<Mail className="w-5 h-5" />}
            type="email"
            placeholder="Email du contact"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
            required
          />
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              Créer
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};