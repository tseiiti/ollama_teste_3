import {useEffect} from 'react';
import {storageModels as stgMdl} from '../services/storage';

import {
  ShieldUser,
} from 'lucide-react';

const Header = ({model, setModel, clearMessages}) => {
  const selectModel = (model) => {
    if (!model) {
      model = stgMdl.cur();
    }
    setModel(model);
    stgMdl.setCur(model);
  }

  useEffect(() => {
    selectModel();
  }, []);

  return (
    <header className="fixed top-0 right-0 left-0 h-16 z-40 bg-white/80 dark:bg-white/80 backdrop-blur-md border-b border-outline-variant flex justify-between items-center px-8 w-auto">
      <div className="flex items-center gap-8 flex-1 min-w-0">
        <h2 className="text-lg font-black tracking-tighter text-on-secondary-container shrink-0">
          Chat IA
        </h2>
        <nav className="flex items-center gap-2 overflow-x-auto hide-scrollbar mask-gradient relative py-1 custom-scrollbar">
          <div className="flex items-center gap-6 whitespace-nowrap font-['Inter'] text-xs font-semibold px-2 uppercase">
            {stgMdl.get().filter(m => !m.model.includes('embedding')).map((m) => (
              <a key={m.digest} className={
                  (m.model == model?.model ? 
                  'text-primary border-b-2 border-primary pb-1' : 
                  'text-on-surface-variant hover:text-on-surface transition-opacity' ) + ' shrink-0'
                } onClick={() => {selectModel(m); clearMessages();}}>
                {m.name}
              </a>
            ))}
          </div>
        </nav>
      </div>
      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-violet-600 shadow-sm border border-slate-100 shrink-0 ml-4">
        <ShieldUser size={36} />
      </div>
    </header>
  );
};

export default Header;