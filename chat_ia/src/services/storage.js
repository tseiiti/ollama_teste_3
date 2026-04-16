const KEYS = {
  MODELS: 'models',
  CURRENT_MODEL: 'current_model',
  MESSAGES: 'messages',
  DEFAULT_MESSAGE: {
    role: 'system',
    content: 'Responda a pergunta com base somente no contexto. E você é um especialista no assunto deste contexto. A resposta deve ser sempre em português de forma clara e objetiva, e sem formatação. A resposta deve ser em um único parágrafo bem elaborado e completo, a menos que esteja explícito outro formato na pergunta.'
  },
  TOKENS: 'tokens',
};

const OLLAMA_BASE = 'http://localhost:11434';
const CHAT_API_URL = OLLAMA_BASE + '/api/chat';
const API_TAGS_URL = OLLAMA_BASE + '/api/tags';
const API_PS_URL = OLLAMA_BASE + '/api/ps';

const get = (key, defaultValue) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

const set = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const get_models = () => {
  fetch(API_TAGS_URL)
  .then(response => {return response.json();})
  .then(json => {
    storageModels.set(json.models.sort(
      (a, b) => a.name.localeCompare(b.name)
    ));
  })
  .catch(error => {console.error(error);});
}
get_models();

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const storageModels = {
  get: () => get(KEYS.MODELS, []),
  set: (models) => set(KEYS.MODELS, models),
  cur: () => get(KEYS.CURRENT_MODEL, {
    "name": "gemma3:1b",
    "model": "gemma3:1b",
    "modified_at": "2026-04-14T14:42:55.890746755Z",
    "size": 815319791,
    "digest": "8648f39daa8fbf5b18c7b4e6a8fb4990c692751d49917417b8842ca5758e7ffc",
    "details": {
      "parent_model": "",
      "format": "gguf",
      "family": "gemma3",
      "families": [
        "gemma3"
      ],
      "parameter_size": "999.89M",
      "quantization_level": "Q4_K_M"
    }
  }),
  setCur: (model) => set(KEYS.CURRENT_MODEL, model),
  getTokens: () => get(KEYS.TOKENS, {up_tokens: 0, dw_tokens: 0}),
  setTokens: (up, dw) => set(KEYS.TOKENS, {
    up_tokens: up,
    dw_tokens: dw,
  }),
  incTokens: (up, dw) => set(KEYS.TOKENS, {
    ...storageModels.getTokens(),
    up_tokens: storageModels.getTokens().up_tokens + up,
    dw_tokens: storageModels.getTokens().dw_tokens + dw,
  }),
};

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
    storageModels.setTokens(0, 0);
  },
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
        storageModels.incTokens(json.prompt_eval_count, json.eval_count)
        props.setMessage(prev => storageMessages.upd(id, {
          ...prev,
          up_tokens: json.prompt_eval_count,
          dw_tokens: json.eval_count,
        }));
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
    console.error('call_chat_api error:', error);
  } finally {
    await sleep(2);
    props.setIsThinking(false);
    props.fetchMessages();
    props.handleScroll();
  }
}