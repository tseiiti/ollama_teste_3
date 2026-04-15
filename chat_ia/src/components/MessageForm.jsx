import {useState} from 'react';
import {storageMessages as stgMsg, storageCurrentModel as curMdl, sleep} from '../services/storage';

import {
  SendHorizontal,
} from 'lucide-react';

const CHAT_API_URL = 'http://localhost:11434/api/chat';

const MessageForm = (props) => {
  const [formData, setFormData] = useState({role: 'user', content: ''});

  const call_chat_api = async () => {
    try {
      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: curMdl.get().model,
          messages: stgMsg.toSimple()
        })
      });
      
      const reader = response.body?.getReader();
      if (!reader) return;

      while (true) {
        const {done, value} = await reader.read();
        if (done) break;
        
        let rjson = new TextDecoder().decode(value);
        let json = JSON.parse(rjson);
        if (json.done) {
          props.setMessage(prev => stgMsg.upd(prev));
          await sleep(10);
          props.setMessage(prev => ({...prev, content: ''}));
        } else {
          let content = json.message.content;
          props.setMessage(prev => ({...prev, content: prev.content + content}));
        }
      }
    } catch (error) {
      console.log('call_chat_api error:', error);
    } finally {
      await sleep(10);
      props.setIsThinking(false);
      props.fetchMessages();
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.setIsThinking(true);
    stgMsg.add(formData);
    stgMsg.add({role: 'assistant', content: ''});

    call_chat_api();

    setFormData({role: 'user', content: ''});
    props.fetchMessages();
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.target.form.requestSubmit();
    }
  };

  return (
    <div className="bg-white rounded-2xl p-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-outline-variant focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/5 transition-all duration-500">
      <form id="form_chat_api" onSubmit={handleSubmit}>
        <div className="flex items-end gap-2 px-2 py-1">
          <textarea
            value={formData.content}
            name="textarea_prompt"
            className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-sm py-3 px-2 mb-1 resize-none max-h-48 custom-scrollbar placeholder:text-outline text-on-surface font-medium"
            placeholder="Escreva a questão a ser enviada para o modelo de IA" rows="1"
            onKeyDown={handleEnter}
            onChange={(e) => setFormData({...formData, content: e.target.value})}></textarea>
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
