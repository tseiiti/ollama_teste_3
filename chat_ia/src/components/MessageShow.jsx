import { storage } from '../services/storage';

import {
  CircleUserRound,
  Sparkles,
} from 'lucide-react';

const MessageShow = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar px-8 lg:px-24 py-12 space-y-10 messages">
      { messages.map((message) => (
        message.role == 'user' ? (
          <div key={message.id} className="flex flex-col items-end group">
            <div className="max-w-[80%] flex items-start gap-4 flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0">
                <CircleUserRound className="text-primary text-xs" size={32} />
              </div>
              <div className="relative">
                <div className="border-l-4 border-primary pl-4 py-1">
                  <p className="text-on-surface leading-relaxed text-sm font-medium">{ message.content }</p>
                </div>
                <span className="text-[10px] text-on-surface-variant mt-2 block opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                  { message.created_at }
                </span>
              </div>
            </div>
          </div>
        ) : message.role == 'assistant' ? (
          <div key={message.id} className="flex flex-col items-start group">
            <div className="max-w-[85%] flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 mt-1 shadow-md shadow-primary/10">
                <Sparkles />
              </div>
              <div className="bg-white rounded-lg rounded-tl-none p-5 space-y-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-outline-variant/50">
                <div className="prose prose-sm max-w-none">
                  <p className="text-on-surface" id="ia_msg_{message.id}">{ message.content }</p>
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
        ) : message.role == 'thinking' ? (
          <div key={message.id} className="flex items-start gap-4 ia_thinking_state">
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
                <label className="uppercase">{storage.getCurrentModel().name}</label> is thinking...
              </span>
            </div>
          </div>
        ) : (
          <div key={1}></div>
        )
      ))}
    </div>
  )
};

export default MessageShow;