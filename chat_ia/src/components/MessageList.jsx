import MessageUser from './MessageUser';
import MessageAssistant from './MessageAssistant';

const MessageList = ({messages, scrollRef, fetchMessages}) => {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar px-2 sm:px-12 lg:px-24 pt-12 space-y-6">
      {messages.map((message) => (
        message.role == 'user' ? (
          <MessageUser key={message.id} message={message} />
        ) : (
          message.content && <MessageAssistant key={message.id} message={message} fetchMessages={fetchMessages} />
        )
      ))}
      <div ref={scrollRef}></div>
    </div>
  )
};

export default MessageList;