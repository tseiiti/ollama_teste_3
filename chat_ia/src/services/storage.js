const KEYS = {
  MESSAGES: 'messages',
  CURRENT_MODEL: 'current_model',
  DEFAULT_MESSAGE: {
    role: 'system',
    content: 'Responda a pergunta com base somente no contexto. E você é um especialista no assunto deste contexto. A resposta deve ser sempre em português de forma clara e objetiva. A resposta deve ser em um único parágrafo bem elaborado e completo, a menos que esteja explícito outro formato na pergunta.'
  },
};

const get = (key, defaultValue) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

const set = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const storageMessages = {
  get: () => get(KEYS.MESSAGES, [KEYS.DEFAULT_MESSAGE]),
  toSimple: () => storageMessages.get().map((e) => {return {role: e.role, content: e.content}}),
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
  upd: (message) => {
    const messages = storageMessages.get();
    const index = storageMessages.get().findLastIndex(e => e.role == 'assistant');
    if (index !== -1) {
      messages[index] = {...messages[index], ...message};
      set(KEYS.MESSAGES, messages);
    }
  },
  // upd: (id, message) => {
  //   console.log(id);
  //   console.log(message);
  //   const messages = storageMessages.get();
  //   console.log(messages);
  //   const index = storageMessages.findIndex(c => c.id === id);
  //   if (index !== -1) {
  //     messages[index] = {...messages[index], ...message};
  //     set(KEYS.MESSAGES, messages);
  //   }
  // },
  clear: () => {
    set(KEYS.MESSAGES, [KEYS.DEFAULT_MESSAGE]);
  },
};

export const storageCurrentModel = {
  get: () => get(KEYS.CURRENT_MODEL, {model: 'gemma3:1b', up_tokens: 0, dw_tokens: 0}),
  set: (mdl) => {
    const model = {
      ...mdl,
      up_tokens: 0,
      dw_tokens: 0,
    };
    set(KEYS.CURRENT_MODEL, model)
  },
};

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
