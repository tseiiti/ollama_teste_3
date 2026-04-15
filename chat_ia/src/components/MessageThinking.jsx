const MessageThinking = ({}) => {
  return (
    <div class="flex items-start gap-4 ia_thinking_state">
      <div
          class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 mt-1 opacity-50">
        <span class="material-symbols-outlined text-white text-xs"
          style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
      </div>
      <div
          class="bg-primary-container text-on-primary-container rounded-full px-4 py-2 flex items-center gap-2.5 animate-pulse shadow-sm border border-primary/10">
        <div class="flex gap-1">
          <div class="w-1.5 h-1.5 bg-primary rounded-full"></div>
          <div class="w-1.5 h-1.5 bg-primary rounded-full opacity-60"></div>
          <div class="w-1.5 h-1.5 bg-primary rounded-full opacity-30"></div>
        </div>
        <span class="text-xs font-bold"><label class="uppercase">${CURRENT_MODEL}</label> is thinking...</span>
      </div>
    </div>
  )
};

export default MessageThinking;