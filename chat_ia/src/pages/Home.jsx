import {useState, useEffect} from 'react';
import {storageMessages as stgMsg} from '../services/storage';

import Header from '../components/Header';
import MessageForm from '../components/MessageForm';
import MessageList from '../components/MessageList';
import MessageAssistant from '../components/MessageAssistant';
import MessageThinking from '../components/MessageThinking';

import {
  Trash2,
} from 'lucide-react';

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState({role: 'assistant', content: ''});
  const [isThinking, setIsThinking] = useState(false);
  
  const fetchMessages = () => {
    setMessages(stgMsg.get());
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return <>
    <Header />
    <main className="ml-0 mt-16 h-[calc(100vh-64px)] relative flex flex-col glow-accent">
      <MessageList messages={messages} />
      {isThinking && <MessageAssistant message={message} />}
      {isThinking && <MessageThinking />}

      <div className="px-2 lg:px-24 pb-8 pt-4 bg-gradient-to-t from-background via-background to-transparent">
        <div className="max-w-4xl mx-auto">
          <MessageForm 
            fetchMessages={fetchMessages}
            setMessage={setMessage}
            setIsThinking={setIsThinking} />

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
            <Trash2 onClick={() => {
              stgMsg.clear();
              fetchMessages();
            }} />
          </div>
        </div>
      </div>
    </main>
  </>
};

export default Home;
