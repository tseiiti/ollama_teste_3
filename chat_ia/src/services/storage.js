const KEYS = {
  MODELS: 'models',
  CURRENT_MODEL: 'current_model',
  MESSAGES: 'messages',
  DEFAULT_MESSAGE: {
    role: 'system',
    content: 'Responda a pergunta com base somente no contexto. E você é um especialista no assunto deste contexto. A resposta deve ser sempre em português de forma clara e objetiva. A resposta deve ser em um único parágrafo bem elaborado e completo, a menos que esteja explícito outro formato na pergunta.'
  },
};

const CHAT_API_URL = 'http://localhost:11434/api/chat';

const get = (key, defaultValue) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

const set = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const storageMessages = {
  get: () => get(KEYS.MESSAGES, [KEYS.DEFAULT_MESSAGE]),
  list: () => get(KEYS.MESSAGES, [KEYS.DEFAULT_MESSAGE]).filter(e => e.role != 'system'),
  send: () => storageMessages.get().map((e) => {return {role: e.role, content: e.content}}),
  add: (msg) => {
    const messages = storageMessages.get();
    const message = {
      id: Math.random().toString(36).substring(2),
      created_at: (new Date()).toLocaleString(),
      ...msg,
    };
    messages.push(message);
    set(KEYS.MESSAGES, messages);
    return message.id;
  },
  // upd: (message) => {
  //   const messages = storageMessages.get();
  //   const index = storageMessages.get().findLastIndex(e => e.role == 'assistant');
  //   if (index !== -1) {
  //     messages[index] = {...messages[index], ...message};
  //     set(KEYS.MESSAGES, messages);
  //   }
  // },
  upd: (id, message) => {
    const messages = storageMessages.get();
    const index = storageMessages.get().findIndex(c => c.id === id);
    if (index !== -1) {
      messages[index] = {...messages[index], ...message};
      set(KEYS.MESSAGES, messages);
    }
  },
  clear: () => {
    set(KEYS.MESSAGES, [KEYS.DEFAULT_MESSAGE]);
  },
};

export const storageModels = {
  get: () => get(KEYS.MODELS, []),
  set: (models) => set(KEYS.MODELS, models),
  // get: () => get(KEYS.CURRENT_MODEL, {model: 'gemma3:1b', up_tokens: 0, dw_tokens: 0}),
  // set: (mdl) => {
  //   const model = {
  //     ...mdl,
  //     up_tokens: 0,
  //     dw_tokens: 0,
  //   };
  //   set(KEYS.CURRENT_MODEL, model)
  // },
};

export const call_chat_api = async (props) => {
  try {
    const id = storageMessages.add({role: 'assistant', content: ''});

    const response = await fetch(CHAT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: props.model.model,
        messages: storageMessages.send()
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
        props.setMessage(prev => storageMessages.upd(id, prev));
        await sleep(1);
        props.setMessage(prev => ({...prev, content: ''}));
      } else {
        props.setMessage(prev => ({
          ...prev, 
          content: prev.content + json.message.content
        }));
        props.handleScroll();
      }
    }
  } catch (error) {
    console.log('call_chat_api error:', error);
  } finally {
    await sleep(2);
    props.setIsThinking(false);
    props.fetchMessages();
    props.handleScroll();
  }
}