const ST_KEYS = {
  MESSAGES: 'message_list',
};

const get = (key, defaultValue) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

const set = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const storage = {
  getMessages: () => get(ST_KEYS.MESSAGES, []),
  addMessage: (message) => {
    const messages = storage.getMessages();
    const newMessage = {
      ...message,
      id: Math.random().toString(36).substring(2)
    };
    messages.push(newMessage);
    set(ST_KEYS.MESSAGES, messages);
  },
  clearMessages: () => {
    set(ST_KEYS.MESSAGES, []);
  },
};
