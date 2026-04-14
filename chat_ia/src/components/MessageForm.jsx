import { useState } from 'react';
import { storage } from '../services/storage';

import { 
  SendHorizontal,
} from 'lucide-react';

const CHAT_API_URL = 'http://localhost:11434/api/chat';

const get_content = value => {
  try {
    let rjson = new TextDecoder().decode(value);
    let json = JSON.parse(rjson);
    // if (json.done) {
    //   TOKENS += json.prompt_eval_count;
    //   TOKENS += json.eval_count;

    //   qs('.token').innerHTML = `${TOKENS} TOKENS REMAINING`;
    // } else {
      let content = json.message.content;
      qs(`#ia_msg_${IA_MSG_ID}`).innerHTML += content;
    // }
  } catch (error) {
    console.log('get_content error:', error);
  }
}

const call_chat_api = async () => {
  try {
    const response = await fetch(CHAT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: storage.getCurrentModel(),
        messages: storage.getMessages(),
      })
    });
    
    const reader = response.body?.getReader();
    if (!reader) return;

    // qs('.flex.flex-col.items-start.group.invisible').classList.remove('invisible');
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      get_content(value);
    }
  } catch (error) {
    console.log('call_chat_api error:', error);
  // } finally {
  //   let msg = MESSAGES.findLast(msg => msg.role == 'user');
  //   msg.content = PROMPT;
  //   set_assitent_messages();
  }
}

const MessageForm = ({ onClose }) => {
  const [formData, setFormData] = useState({ content: '', role: 'user' });

  const handleSubmit = (e) => {
    e.preventDefault();
    storage.addMessage(formData);
    storage.addMessage({
      content: '',
      role: 'assistant'
    });
    // storage.addMessage({
    //   role: 'thinking'
    // });


    console.log(formData.content)


    setFormData({ content: '', role: 'user' });
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
            value={formData.content}
            name="textarea_prompt"
            className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-sm py-3 px-2 mb-1 resize-none max-h-48 custom-scrollbar placeholder:text-outline text-on-surface font-medium"
            placeholder="Escreva a questão a ser enviada para o modelo de IA" rows="1"
            onKeyDown={handleEnter}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}></textarea>
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
