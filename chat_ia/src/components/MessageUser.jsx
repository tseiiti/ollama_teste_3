const MessageUser = ({message}) => {
  return (
    <div className="flex flex-col items-end group">
      <div className="max-w-[80%] flex items-start gap-4 flex-row-reverse">
        <div className="w-8 h-8 rounded-full bg-primary-container text-primary flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined">account_circle</span>
        </div>
        <div className="relative">
          <div className="border-l-4 border-primary pl-4 py-1">
            <p className="text-on-surface leading-relaxed text-sm font-medium">{message.content}</p>
          </div>
          <span className="text-[10px] text-on-surface-variant mt-2 block opacity-0 group-hover:opacity-100 transition-opacity font-bold">
            {message.created_at}
          </span>
        </div>
      </div>
    </div>
  )
};

export default MessageUser;