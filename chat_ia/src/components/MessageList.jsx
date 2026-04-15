import MessageUser from './MessageUser';
import MessageAssistant from './MessageAssistant';

const MessageList = ({messages}) => {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar px-8 lg:px-24 py-12 space-y-10">
      {messages.filter(e => e.role != 'system').map((message) => (
        message.role == 'user' ? (
          <MessageUser key={message.id} message={message} />
        ) : (
          message.content && <MessageAssistant key={message.id} message={message} />
        )
      ))}
    </div>
  )
};

export default MessageList;