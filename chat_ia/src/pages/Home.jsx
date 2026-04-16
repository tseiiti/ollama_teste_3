import {useState, useEffect, useRef} from 'react';
import {storageMessages as stgMsg, sleep} from '../services/storage';

import Header from '../components/Header';
import MessageForm from '../components/MessageForm';
import MessageList from '../components/MessageList';
import MessageAssistant from '../components/MessageAssistant';
import MessageThinking from '../components/MessageThinking';
import InfoArea from '../components/InfoArea';

const Home = () => {
  const [model, setModel] = useState({});
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState({role: 'assistant', content: ''});
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef(null);
  const textRef = useRef(null);
  
  const handleScroll = async () => {
    await sleep(10);
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    textRef.current?.focus();
  };

  const clearMessages = () => {
    stgMsg.clear();
    fetchMessages();
  };

  const fetchMessages = () => {
    setMessages(stgMsg.get());
    handleScroll();
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return <>
    <Header model={model} setModel={setModel} clearMessages={clearMessages} />
    <main className="ml-0 mt-16 h-[calc(100vh-64px)] relative flex flex-col glow-accent">
      <MessageList messages={messages} scrollRef={scrollRef} />
      {isThinking && <MessageAssistant message={message} />}
      {isThinking && <MessageThinking model={model} />}

      <InfoArea clearMessages={clearMessages} model={model}>
        <MessageForm 
          textRef={textRef}
          model={model}
          fetchMessages={fetchMessages}
          setMessage={setMessage}
          setIsThinking={setIsThinking}
          handleScroll={handleScroll} />
      </InfoArea>
    </main>
  </>
};

export default Home;
