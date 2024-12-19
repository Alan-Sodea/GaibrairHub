export interface User {
  fullName: string;
  email: string;
  password: String,
  profilePhoto: string;
  bio: String,
  sector: string;
  skills: string[];
  pairs: string[]; // Array of user IDs who follow this user
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
}

export interface Post {
  id: string;
  authorId: string;
  author: User;
  content: string;
  imageUrl?: string;
  timestamp: Date;
  likes: number;
}

export interface Chat {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
}