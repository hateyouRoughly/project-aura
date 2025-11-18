// src/components/ChatMessage.tsx
'use client';

import React from 'react';

export type Message = {
  type: 'log' | 'action' | 'thought' | 'image' | 'error';
  content: string;
  imageUrl?: string;
};

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const getMessageStyle = () => {
    switch (message.type) {
      case 'action':
        return 'bg-blue-900 border-blue-700';
      case 'thought':
        return 'bg-gray-700 border-gray-600 italic';
      case 'error':
        return 'bg-red-900 border-red-700';
      case 'image':
        return 'bg-green-900 border-green-700';
      default: // log
        return 'bg-gray-800 border-gray-700';
    }
  };

  return (
    <div className={`p-3 rounded-lg mb-3 border ${getMessageStyle()}`}>
      <p className="text-sm font-mono">{message.content}</p>
      {message.type === 'image' && message.imageUrl && (
        <img src={message.imageUrl} alt="Automation Screenshot" className="mt-2 rounded-lg max-w-full" />
      )}
    </div>
  );
};

export default ChatMessage;
