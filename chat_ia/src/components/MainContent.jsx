import MessageList from '../components/MessageList';

const MainContent = ({ children }) => {
  return (
    // Main Content Canvas
    <main className="ml-0 mt-16 h-[calc(100vh-64px)] relative flex flex-col glow-accent">
      <MessageList />
      { children }
    </main>
  );
};

export default MainContent;