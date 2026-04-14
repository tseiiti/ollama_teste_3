import { useState } from 'react';
import { storage } from '../services/storage';

import { 
  SendHorizontal,
} from 'lucide-react';

const MessageForm = ({ onClose }) => {
  const [formData, setFormData] = useState({ value: '', role: 'user' });

  const handleSubmit = (e) => {
    e.preventDefault();
    storage.addMessage(formData);
    setFormData({ value: '', role: 'user' });
    onClose();
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.target.form.requestSubmit();
    }
  };

  return (
    <div
      className="bg-white rounded-2xl p-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-outline-variant focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/5 transition-all duration-500">
      <form id="form_chat_api" onSubmit={handleSubmit}>
        <div className="flex items-end gap-2 px-2 py-1">
          <textarea
            value={formData.value}
            name="textarea_prompt"
            className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-sm py-3 px-2 mb-1 resize-none max-h-48 custom-scrollbar placeholder:text-outline text-on-surface font-medium"
            placeholder="Escreva a questão a ser enviada para o modelo de IA" rows="1"
            onKeyDown={handleEnter}
            onChange={(e) => setFormData({ ...formData, value: e.target.value })}></textarea>
          <div className="flex items-center gap-1 mb-1">
            <button
              type="submit"
              className="ml-2 w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 hover:bg-primary-dim hover:scale-105 active:scale-95 transition-all">
              <SendHorizontal />
            </button>
          </div>
        </div>
      </form>
    </div>
  )
};

export default MessageForm;
