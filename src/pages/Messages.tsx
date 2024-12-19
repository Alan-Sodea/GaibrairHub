import React, { useEffect, useState } from 'react';
import { useHookstate } from '@hookstate/core';
import { globalState } from '../store';
import { ChatInterface } from '../components/messaging/ChatInterface';
import { ChatList } from '../components/messaging/ChatList';
import { MobileMessageLayout } from '../components/messaging/MobileMessageLayout';
import { Message, Chat } from '../types';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { MOCK_MESSAGES, MOCK_CHATS } from '../data/mockData';
import { Plus } from 'lucide-react';
import { timeAgo } from '../../src/utils/date';
import { Button } from '../components/ui/Button';
import { NewChatDialog } from '../components/messaging/NewChatDialog';
import axios from 'axios';
import API_URL from '../api';

export const Messages = () => {
  const state = useHookstate(globalState);
  const [messages, setMessages] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [showNewChatDialog, setShowNewChatDialog] = useState(false);
  const currentUser = state.currentUser.get();
  const users = state.users.get();

  const onSelectChat = (chatelt: any) => {
    setSelectedChat(chatelt)
  }

  const fetchMessages = async () => {
    const elt = await axios.get(`${API_URL}/messages`, {
      params: {
        email: currentUser?.email,
        password: currentUser?.password,
      }
    })

    const values = [...elt.data]
    const theChats = [];
    const theMessages = [];

    for (let i = 0; i < values.length; i++) {
      theChats.push(values[i].interlocutor)
      theMessages.push(values[i].messages)
    }

    setChats(theChats)
    setMessages(theMessages)
    console.log(messages[chats.indexOf(chats[0])][0])
    // console.log(messages)
  }

  useEffect(() => {
    fetchMessages();
  }, [])

  const handleSendMessage = (content: string) => {
    if (selectedChat) {
      const newMessage: Message = {
        id: String(messages.length + 1),
        senderId: 'current',
        content,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
    }
  };

  const handleCreateChat = (newChat: Chat) => {
    if (!chats.includes(newChat)) {
      setChats([newChat, ...chats]);
      setMessages([[], ...messages]);
    }
    setSelectedChat(newChat);
  };

  if (isMobile) {
    return (
      <div className="h-[calc(100vh-8rem)]">
        <MobileMessageLayout
          chats={chats}
          selectedChat={selectedChat}
          messages={messages}
          onSelectChat={setSelectedChat}
          onSendMessage={handleSendMessage}
          onCreateChat={handleCreateChat}
        />
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-semibold dark:text-white">Conversations</h2>
        </div>
        <div className="overflow-y-auto h-[calc(100%-4rem)]">


          <div className="p-4">
            <Button
              onClick={() => setShowNewChatDialog(true)}
              fullWidth
              className="mb-4"
            >
              <Plus className="w-5 h-5 mr-2" />
              Nouvelle discussion
            </Button>
          </div>
          <div className="divide-y dark:divide-gray-700">

            {chats.map((chat, index) => {

              return (
                <button
                  key={index}
                  onClick={() => onSelectChat(chat)}
                  className={`w-full p-4 flex items-center space-x-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${chat === selectedChat ? 'bg-gray-100 dark:bg-gray-700' : ''
                    }`}
                >
                  <img
                    src={users.filter(user => user.email == chat)[0]?.profilePhoto || "https://www.silcharmunicipality.in/wp-content/uploads/2021/02/male-face.jpg"}
                    alt={users.filter(user => user.email == chat)[0]?.fullName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-sm font-medium truncate dark:text-white">
                        {users.filter(user => user.email == chat)[0]?.fullName}
                      </h3>
                      {messages[chats.indexOf(chat)][0] && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {messages[chats.indexOf(chat)][messages.length - 1]?.createdAt.split("T")[0]}
                        </span>
                      )}
                    </div>
                    {messages[chats.indexOf(chats[0])][0] && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {messages[chats.indexOf(chat)][messages.length - 1]?.message}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}


          </div>

          {showNewChatDialog && (
            <NewChatDialog
              onClose={() => setShowNewChatDialog(false)}
              onCreateChat={handleCreateChat}
            />
          )}



        </div>
      </div>
      <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {selectedChat ? (
          <ChatInterface messages={messages[chats.indexOf(selectedChat)]} receiver={selectedChat} fetchMessages={fetchMessages} onSendMessage={handleSendMessage} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            Sélectionnez une conversation pour commencer
          </div>
        )}
      </div>
    </div>
  );
};