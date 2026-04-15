import {
  Sparkles,
} from 'lucide-react';

const MessageAssistant = ({message}) => {
  return (
    <div className="flex flex-col items-start group">
      <div className="max-w-[85%] flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center flex-shrink-0 mt-1 shadow-md shadow-primary/10">
          <Sparkles />
        </div>
        <div className="bg-white rounded-lg rounded-tl-none p-5 space-y-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-outline-variant/50">
          <div className="prose prose-sm max-w-none">
            <p className="text-on-surface">{message?.content}</p>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button className="p-1.5 hover:bg-surface-container rounded-md transition-colors text-on-surface-variant hover:text-primary">
              <span className="material-symbols-outlined text-sm">thumb_up</span>
            </button>
            <button className="p-1.5 hover:bg-surface-container rounded-md transition-colors text-on-surface-variant hover:text-primary">
              <span className="material-symbols-outlined text-sm">thumb_down</span>
            </button>
            <button className="p-1.5 hover:bg-surface-container rounded-md transition-colors text-on-surface-variant hover:text-primary">
              <span className="material-symbols-outlined text-sm">refresh</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default MessageAssistant;