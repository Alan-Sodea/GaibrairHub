import React, { useState, useRef } from 'react';
import { Image, Send, Upload } from 'lucide-react';
import { Button } from '../ui/Button';

interface CreatePostProps {
  onSubmit: (content: string, imageUrl?: string) => void;
}

export const CreatePost = ({ onSubmit }: any) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState("")

  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ content, imageUrl })
    if (content.trim()) {
      onSubmit(content, imageUrl);
      setContent('');
      setImageUrl('');
    }
    else {
      setError("Error : Vous devez entrer un texte")
    }
  };


  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <div className={'bg-red-300 py-1.5 px-3 font-medium text-red-700 mb-4 rounded-lg ' + String((error == "") && "hidden")}>{error}</div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Partagez votre expérience ou un conseil..."
        className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        rows={4}
      />

      {imageUrl && (
        <div className="mt-2 relative">
          <img src={imageUrl} alt="Preview" className="max-h-48 rounded-lg" />
          <button
            onClick={() => setImageUrl('')}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
            type="button"
          >
            ×
          </button>
        </div>
      )}

      <div className="mt-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="URL de l'image"
            className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <Button type="submit" className="ml-4">
          <Send className="w-5 h-5 md:mr-2" />
          <span className="hidden md:inline">Publier</span>
        </Button>
      </div>
    </form>
  );
};