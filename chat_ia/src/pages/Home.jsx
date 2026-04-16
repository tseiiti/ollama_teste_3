import {useState, useEffect, useRef} from 'react';
import {storageMessages as stgMsg, sleep} from '../services/storage';

import Header from '../components/Header';
import MessageForm from '../components/MessageForm';
import MessageList from '../components/MessageList';
import MessageAssistant from '../components/MessageAssistant';
import MessageThinking from '../components/MessageThinking';
import InfoArea from '../components/InfoArea';

const Home = () => {
  const [currentModel, setCurrentModel] = useState({});
  const [messages, setMessages] = useState([]);
  const [assitantMessage, setAssistantMessage] = useState({role: 'assistant', content: ''});
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
    setMessages(stgMsg.list());
    handleScroll();
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return <>
    {/* TopNavBar Shell */}
    <Header model={currentModel} setModel={setCurrentModel} clearMessages={clearMessages} />

    {/* Main Content Canvas */}
    <main className="ml-0 mt-16 h-[calc(100vh-64px)] relative flex flex-col glow-accent">

      {/* Message Stream Area */}
      <MessageList messages={messages} scrollRef={scrollRef} />
      {isThinking && <MessageAssistant message={assitantMessage} />}
      {isThinking && <MessageThinking model={currentModel} />}

      {/* Input and Information Area */}
      <InfoArea clearMessages={clearMessages} model={currentModel}>

        {/* Input Shell Area */}
        <MessageForm 
          textRef={textRef}
          model={currentModel}
          fetchMessages={fetchMessages}
          setMessage={setAssistantMessage}
          setIsThinking={setIsThinking}
          handleScroll={handleScroll} />
      </InfoArea>
    </main>
  </>
};

export default Home;
