import React, { useEffect, useState } from 'react';
import { CreatePost } from '../components/feed/CreatePost';
import { PostList } from '../components/feed/PostList';
import { AccountSuggestions } from '../components/feed/AccountSuggestions';
import { Post } from '../types';
import axios from 'axios';
import API_URL from '../api';
import { useHookstate } from '@hookstate/core';
import { globalState } from '../store';
import { User } from 'lucide-react';

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    authorId: '1',
    author: {
      id: '1',
      name: 'Sophie Martin',
      email: 'sophie@example.com',
      role: 'mentor',
      avatar: "https://www.silcharmunicipality.in/wp-content/uploads/2021/02/male-face.jpg",
      skills: ['Leadership', 'Marketing Digital'],
      experience: '10 ans en marketing digital',
      objectives: 'Aider les entrepreneurs à développer leur présence en ligne',
      sector: 'Marketing',
      pairCount: 245,
      followers: [],
    },
    content: "Le succès n'est pas final, l'échec n'est pas fatal. C'est le courage de continuer qui compte. N'oubliez jamais que chaque expert a débuté comme débutant. Continuez d'apprendre et de grandir ! 💪",
    timestamp: new Date(),
    likes: 42,
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
  },
  {
    id: '2',
    authorId: '2',
    author: {
      id: '2',
      name: 'Thomas Dubois',
      email: 'thomas@example.com',
      role: 'mentor',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      skills: ['Finance', 'Stratégie'],
      experience: '15 ans en finance d\'entreprise',
      objectives: 'Partager mon expertise en gestion financière',
      sector: 'Finance',
      pairCount: 189,
      followers: [],
    },
    content: "Conseil du jour : La trésorerie est le nerf de la guerre pour toute startup. Apprenez à bien gérer votre cash-flow dès le début. Voici un tableau simple mais efficace pour suivre vos finances 📊",
    timestamp: new Date(),
    likes: 35,
  },
];

export const Feed = () => {
  const [posts, setPosts] = useState([]);
  const state = useHookstate(globalState)
  const currentUser = state.currentUser.get();

  useEffect(() => {
    (async () => {

      try {
        const elt = await axios.get(`${API_URL}/posts`);
        setPosts(elt.data.postsList)
        // state.currentUser.set({
        //   ...(elt.data),
        //   password
        // })
        // navigate("/");
        // setPosts(elt.)
        console.log({ posts })
      } catch (error: any) {
        return console.error(`Error : ${error}`);
      }

    })()
  }, [])

  const handleCreatePost = async (content: string, imageUrl: string) => {
    const newPost = {
      creator: currentUser?.email,
      imageUrl: imageUrl,
      text: content,
      date: String(new Date()),
    };
    // console.log(imageUrl);
    try {
      const elt = await axios.post(`${API_URL}/posts`,
        {
          imageUrl,
          text: content,
          email: currentUser?.email,
          password: currentUser?.password,
        }
      );
      let elt2 = await axios.get(`${API_URL}/posts`);
      setPosts(elt.data.postsList)

    } catch (error: any) {
      return console.error(`Error : ${error}`);
    }
  };

  const handleLike = async (postId: string) => {
    console.log({ postId })
    await axios.put(`${API_URL}/posts/like`,
      {
        email: currentUser?.email,
        password: currentUser?.password,
        postId,
      }
    );

    let elt2 = await axios.get(`${API_URL}/posts`);
    setPosts(elt2.data.postsList)
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <CreatePost onSubmit={handleCreatePost} />
      <AccountSuggestions />
      <PostList posts={posts} onLike={handleLike} />
    </div>
  );
};