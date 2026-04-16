const MessageThinkingm = ({model}) => {
  return (
    <div className="flex items-start gap-4 ia_thinking_state mt-5">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 mt-1 opacity-50">
        <span className="material-symbols-outlined text-white text-xs">auto_awesome</span>
      </div>
      <div className="bg-primary-container text-on-primary-container rounded-full px-4 py-2 flex items-center gap-2.5 animate-pulse shadow-sm border border-primary/10">
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-primary rounded-full opacity-60"></div>
          <div className="w-1.5 h-1.5 bg-primary rounded-full opacity-30"></div>
        </div>
        <span className="text-xs font-bold">
          <label className="uppercase">{model.name}</label> is thinking...
        </span>
      </div>
    </div>
  )
};

export default MessageThinkingm;