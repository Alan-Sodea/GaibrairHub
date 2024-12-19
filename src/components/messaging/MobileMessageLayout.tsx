import React, { useState } from 'react';
import { ArrowLeft, Menu, X } from 'lucide-react';
import { Chat } from '../../types';
// import { ChatList } from './ChatList';
import { ChatInterface } from './ChatInterface';
import { Button } from '../ui/Button';

interface MobileMessageLayoutProps {
  chats: Chat[];
  selectedChat: Chat | null;
  messages: any[];
  onSelectChat: (chat: Chat) => void;
  onSendMessage: (content: string) => void;
  onCreateChat: (chat: Chat) => void;
}

export const MobileMessageLayout = ({
  chats,
  selectedChat,
  messages,
  onSelectChat,
  onSendMessage,
  onCreateChat,
}: MobileMessageLayoutProps) => {
  const [showChatList, setShowChatList] = useState(!selectedChat);

  const handleSelectChat = (chat: Chat) => {
    onSelectChat(chat);
    setShowChatList(false);
  };

  const handleCloseChat = () => {
    onSelectChat(null);
    setShowChatList(true);
  };

  return (
    <div className="h-full relative">
      {showChatList ? (
        <div className="h-full">
          <div className="p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Conversations</h2>
          </div>


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
      ) : selectedChat ? (
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={() => setShowChatList(true)}
                className="mr-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center">
                <img
                  src={selectedChat.participants[1].avatar}
                  alt={selectedChat.participants[1].name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="font-semibold text-gray-900 dark:text-white">
                  {selectedChat.participants[1].name}
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={handleCloseChat}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex-1">
            <ChatInterface messages={messages} onSendMessage={onSendMessage} />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-300">
          Sélectionnez une conversation pour commencer
        </div>
      )}
    </div>
  );
};