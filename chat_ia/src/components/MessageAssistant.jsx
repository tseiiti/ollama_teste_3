import {storageMessages as stgMsg} from '../services/storage';

const MessageAssistant = ({message, fetchMessages}) => {
  const like = (message, value) => {
    if (value == message?.like) value = 0;
    stgMsg.upd(message.id, {...message, like: value});
    fetchMessages();
  }
  
  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Texto copiado!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-start group" id={message?.id}>
      <div className="max-w-[85%] flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center flex-shrink-0 mt-1 shadow-md shadow-primary/10">
          <span className="material-symbols-outlined">auto_awesome</span>
        </div>
        <div className="bg-white rounded-lg rounded-tl-none p-5 space-y-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-outline-variant/50">
          <div className="prose prose-sm max-w-none">
            <p className="text-on-surface">{message?.content}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-1.5 hover:bg-surface-container rounded-md transition-colors text-outline hover:text-primary"
              onClick={() => like(message, 1)} title='Marcar essa reposta como "Gostei! &#128522;"'>
              <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: (message?.like == 1 ? "'FILL' 1" : '')}}>thumb_up</span>
            </button>
            <button className="p-1.5 hover:bg-surface-container rounded-md transition-colors text-outline hover:text-primary"
              onClick={() => like(message, -1)} title='Marcar essa reposta como "Não gostei...  &#128542;"'>
              <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: (message?.like == -1 ? "'FILL' 1" : '')}}>thumb_down</span>
            </button>
            <button className="p-1.5 hover:bg-surface-container rounded-md transition-colors text-outline hover:text-primary"
              onClick={() => copy(message?.content)} title="Copiar o texto da resposta para Área de Transferência">
              <span className="material-symbols-outlined text-sm">content_copy</span>
            </button>
            <p className="text-[10px] text-on-surface-variant/80 mb-2">{message?.created_at}</p>
          </div>
        </div>
      </div>
      <span className="ml-12 text-[10px] text-on-surface-variant mt-2 block opacity-0 group-hover:opacity-100 transition-opacity font-bold">
        tokens enviados: {message?.up_tokens} | tokens recebidos: {message?.dw_tokens}
      </span>
    </div>
  )
};

export default MessageAssistant;