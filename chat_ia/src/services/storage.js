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

export const storage = {
  getMessages: () => get(KEYS.MESSAGES, [KEYS.DEFAULT_MESSAGE]),
  getMsg: () => storage.getMessages().map((e) => { return { role: e.role, content: e.content }}),
  addMessage: (message) => {
    const messages = storage.getMessages();
    const newMessage = {
      id: Math.random().toString(36).substring(2),
      created_at: (new Date()).toLocaleString(),
      ...message,
    };
    messages.push(newMessage);
    set(KEYS.MESSAGES, messages);
    return newMessage.id;
  },
  updMessage: (id, message) => {
    const messages = storage.getMessages();
    const index = messages.findIndex(c => c.id === id);
    if (index !== -1) {
      messages[index] = { ...messages[index], ...message };
      set(KEYS.MESSAGES, messages);
    }
  },
  clearMessages: () => {
    set(KEYS.MESSAGES, [KEYS.DEFAULT_MESSAGE]);
  },

  getCurrentModel: () => get(KEYS.CURRENT_MODEL, 'gemma3:1b'),
  setCurrentModel: (model) => set(KEYS.CURRENT_MODEL, model),
};
