import React, { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import { Message } from '../../types';
import { Button } from '../ui/Button';
import { useHookstate } from '@hookstate/core';
import { globalState } from '../../store';
import axios from 'axios';
import API_URL from '../../api';

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
}

export const ChatInterface = ({ messages, onSendMessage, receiver, fetchMessages }: any) => {
  const [newMessage, setNewMessage] = useState('');
  const state = useHookstate(globalState);
  const currentUser = state.currentUser.get();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {

      // console.log({ newMessage })
      await axios.post(`${API_URL}/messages`, {
        email: currentUser?.email,
        password: currentUser?.password,
        receiver: receiver,
        message: newMessage,
      })
      await fetchMessages();
      setNewMessage('');
    }
  };

  useEffect(() => {
    console.log({ messages })
  })

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {(messages.length > 0) && (messages.map((message) => (

          <div
            key={message._id}
            className={`flex ${message.sender == currentUser?.email ? 'justify-end' : 'justify-start'
              }`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-[70%] ${message.sender === currentUser?.email
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700'
                }`}
            >
              <p>{message.message}</p>
              <span className="text-xs opacity-75">
                {message.sentAt.split("T")[0] + " --- " + new Date(message.sentAt).toLocaleTimeString()}
              </span>
            </div>
          </div>
        )))}
      </div>
      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Écrivez votre message..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800"
          />
          <Button type="submit">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};