import { useEffect, useState } from 'react';
import Header from '../components/Header';
import MessageList from '../components/MessageList';

const Home = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages('teste');
  }, []);

  return <>
    <Header />
    <MessageList />
  </>
};

export default Home;
