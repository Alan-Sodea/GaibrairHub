import { Chat, Message, User } from '../types';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Sophie Martin',
    email: 'sophie@example.com',
    role: 'mentor',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    skills: ['Leadership', 'Marketing Digital'],
    experience: '10 ans en marketing digital',
    objectives: 'Aider les entrepreneurs à développer leur présence en ligne',
    sector: 'Marketing',
    pairCount: 245,
    followers: [],
  },
  {
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
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    senderId: 'current',
    receiverId: '2',
    content: 'Bonjour Marie, j\'aimerais avoir votre avis sur ma stratégie marketing.',
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: '2',
    senderId: '2',
    receiverId: 'current',
    content: 'Bien sûr ! Je serais ravie de vous aider. Pouvez-vous me donner plus de détails sur votre projet ?',
    timestamp: new Date(Date.now() - 3000000),
  },
  {
    id: '3',
    senderId: 'current',
    receiverId: '2',
    content: 'Je lance une plateforme de e-learning et j\'ai du mal à définir ma cible.',
    timestamp: new Date(Date.now() - 2400000),
  },
  {
    id: '4',
    senderId: '2',
    receiverId: 'current',
    content: 'On peut se retrouver demain pour discuter de votre stratégie ?',
    timestamp: new Date(),
  },
];

export const MOCK_CHATS: Chat[] = [
  {
    id: '1',
    participants: [
      {
        id: 'current',
        name: 'Vous',
        email: 'you@example.com',
        role: 'mentee',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        skills: [],
        experience: '',
        objectives: '',
        sector: '',
        pairCount: 0,
        followers: [],
      },
      MOCK_USERS[0],
    ],
    lastMessage: {
      id: '4',
      senderId: '2',
      receiverId: 'current',
      content: 'On peut se retrouver demain pour discuter de votre stratégie ?',
      timestamp: new Date(),
    },
    unreadCount: 1,
  },
];