import { useState, useEffect } from 'react';
import { storage } from '../services/storage';
import MessageForm from './MessageForm';
import MessageShow from './MessageShow';

import {
  Trash2,
} from 'lucide-react';

const MessageList = ({}) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const fetchMessages = () => {
    setMessages(storage.getMessages());
    setLoading(false);
  };

  const clearMessages = () => {
    storage.clearMessages();
    fetchMessages();
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  return (
    <main className="ml-0 mt-16 h-[calc(100vh-64px)] relative flex flex-col glow-accent">
      {/* Message Stream Area */}
      <MessageShow messages={messages} />
 
      {/* Input Shell Area */}
      <div className="px-2 lg:px-24 pb-8 pt-4 bg-gradient-to-t from-background via-background to-transparent">
        <div className="max-w-4xl mx-auto">
          <MessageForm 
            onClose={() => {
              fetchMessages();
            }} />

          <div className="mt-3 group relative flex justify-center gap-6">
            <p className="text-[10px] text-on-surface-variant/80 flex items-center gap-1.5 font-bold">
              <span className="material-symbols-outlined text-[14px] text-primary">bolt</span>
              <span className="uppercase model"></span>
            </p>
            <p className="text-[10px] text-on-surface-variant/80 flex items-center gap-1.5 font-bold">
              <span className="material-symbols-outlined text-[14px] text-primary">history_edu</span>
              <span className="token">0 TOKENS REMAINING</span>
            </p>
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-300 p-4 bg-white shadow-lg rounded-lg w-100 z-10 border border-gray-200 model_tooltip"></span>
            <Trash2 size={32} onClick={clearMessages} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MessageList;