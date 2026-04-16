import {storageModels as stgMdl} from '../services/storage';
import InfoDetail from './InfoDetail';

const InfoArea = ({clearMessages, model, children}) => {
  return (
    <div className="px-2 sm:px-12 lg:px-24 pb-8 pt-4 bg-gradient-to-t from-background via-background to-transparent">
      <div className="max-w-4xl mx-auto">
        {children}
        <div className="mt-3 group relative flex justify-center gap-4">
          <p className="text-[10px] text-on-surface-variant/80 flex items-center gap-1 font-bold">
            <span className="material-symbols-outlined text-[14px] text-primary">graph_8</span>
            <span className="uppercase model">{model?.name}</span>
          </p>
          <p className="text-[10px] text-on-surface-variant/80 flex items-center gap-1 font-bold">
            <span className="material-symbols-outlined text-[14px] text-primary">move_selection_up</span>
            <span className="token">{stgMdl.getTokens().up_tokens} TOKENS ENVIADOS</span>
          </p>
          <p className="text-[10px] text-on-surface-variant/80 flex items-center gap-1 font-bold">
            <span className="material-symbols-outlined text-[14px] text-primary">move_selection_down</span>
            <span className="token">{stgMdl.getTokens().dw_tokens} TOKENS RECEBIDOS</span>
          </p>
          <p className="text-[10px] text-on-surface-variant/80 flex items-center gap-1 font-bold" onClick={clearMessages}>
            <span className="material-symbols-outlined text-[14px] text-primary">contract_delete</span>
            <span className="token">NOVO CHAT</span>
          </p>
          <InfoDetail model={model} />
        </div>
      </div>
    </div>
  )
};

export default InfoArea;