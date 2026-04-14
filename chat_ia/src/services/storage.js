const ST_KEYS = {
  MESSAGES: 'message_list',
  CURRENT_MODEL: 'current_model',
  DEFAULT_MESSAGES: [{
    role: 'system',
    content: 'Responda a pergunta com base somente no contexto. E você é um especialista no assunto deste contexto. A resposta deve ser sempre em português de forma clara e objetiva. A resposta deve ser em um único parágrafo bem elaborado e completo, a menos que esteja explícito outro formato na pergunta.'
  }]
};

const get = (key, defaultValue) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

const set = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const storage = {
  getMessages: () => get(ST_KEYS.MESSAGES, ST_KEYS.DEFAULT_MESSAGES),
  addMessage: (message) => {
    const messages = storage.getMessages();
    const newMessage = {
      id: Math.random().toString(36).substring(2),
      created_at: (new Date()).toLocaleString(),
      ...message,
    };
    messages.push(newMessage);
    set(ST_KEYS.MESSAGES, messages);
  },
  clearMessages: () => {
    set(ST_KEYS.MESSAGES, ST_KEYS.DEFAULT_MESSAGES);
  },

  getCurrentModel: () => get(ST_KEYS.CURRENT_MODEL, 'gemma3:1b'),
  setCurrentModel: (model) => set(ST_KEYS.CURRENT_MODEL, model),
};
