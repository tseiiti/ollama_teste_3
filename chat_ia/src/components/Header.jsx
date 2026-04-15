import {useState, useEffect} from 'react';
import {storageCurrentModel as curMdl} from '../services/storage';

import {
  ShieldUser,
} from 'lucide-react';

const Header = ({}) => {
  const [models, setModels] = useState([]);

  const selectModel = (model) => {
    curMdl.set(model);
    fetchModels();
  }
  
  const fetchModels = () => {
    fetch('http://localhost:11434/api/tags')
    .then(response => {return response.json();})
    .then(json => {
      setModels(json.models.filter(m => m.model != 'qwen3-embedding:0.6b').sort(
        (a, b) => a.name.localeCompare(b.name)
      ));
    })
    .catch(error => {console.error(error);});
  };

  useEffect(() => {
    fetchModels();
  }, []);

  return (
    // TopNavBar Shell
    <header className="fixed top-0 right-0 left-0 h-16 z-40 bg-white/80 dark:bg-white/80 backdrop-blur-md border-b border-outline-variant flex justify-between items-center px-8 w-auto">
      <div className="flex items-center gap-8 flex-1 min-w-0">
        <h2 className="text-lg font-black tracking-tighter text-on-surface shrink-0">Chat IA</h2>
        <nav className="flex items-center gap-2 overflow-x-auto hide-scrollbar mask-gradient relative py-1 custom-scrollbar">
          <div className="flex items-center gap-6 whitespace-nowrap font-['Inter'] text-xs font-semibold px-2 uppercase">
            {models.map((model) => (
              <a key={model.digest} className={
                  (model.model == curMdl.get().model ? 
                  'text-primary border-b-2 border-primary pb-1' : 
                  'text-on-surface-variant hover:text-on-surface transition-opacity' ) + ' shrink-0'
                } onClick={() => selectModel(model)}>
                {model.name}
              </a>
            ))}
          </div>
        </nav>
      </div>
      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-violet-600 shadow-sm border border-slate-100 shrink-0 ml-4">
        <div className="h-8 w-8 rounded-full">
          <ShieldUser size={32} />
        </div>
      </div>
    </header>
  );
};

export default Header;