import InfoDetail from './InfoDetail';
import {
  Trash2,
} from 'lucide-react';

const InfoArea = ({clearMessages, model, children}) => {
  return (
    <div className="px-2 lg:px-24 pb-8 pt-4 bg-gradient-to-t from-background via-background to-transparent">
      <div className="max-w-4xl mx-auto">
        {children}
        <div className="mt-3 group relative flex justify-center gap-6">
          <p className="text-[10px] text-on-surface-variant/80 flex items-center gap-1.5 font-bold">
            <span className="material-symbols-outlined text-[14px] text-primary">bolt</span>
            <span className="uppercase model">{model?.name}</span>
          </p>
          <p className="text-[10px] text-on-surface-variant/80 flex items-center gap-1.5 font-bold">
            <span className="material-symbols-outlined text-[14px] text-primary">history_edu</span>
            <span className="token">0 TOKENS SPENT</span>
          </p>
          <InfoDetail model={model} />
          <Trash2 className="text-primary" onClick={clearMessages} />
        </div>
      </div>
    </div>
  )
};

export default InfoArea;