import { 
  CircleUserRound
} from 'lucide-react';

const Header = ({}) => {
  return (
    // TopNavBar Shell
    <header
      className="fixed top-0 right-0 left-0 h-16 z-40 bg-white/80 dark:bg-white/80 backdrop-blur-md border-b border-outline-variant flex justify-between items-center px-8 w-auto">
      <div className="flex items-center gap-8 flex-1 min-w-0">
        <h2 className="text-lg font-black tracking-tighter text-on-surface shrink-0">Chat IA</h2>
        <nav className="flex items-center gap-2 overflow-x-auto hide-scrollbar mask-gradient relative py-1 custom-scrollbar">
          <div className="flex items-center gap-6 whitespace-nowrap font-['Inter'] text-xs font-semibold px-2 uppercase models"></div>
        </nav>
      </div>
      <div className="flex items-center gap-4 shrink-0 ml-4">
        <div className="h-8 w-8 rounded-full">
          <CircleUserRound size={32} />
        </div>
      </div>
    </header>
  );
};

export default Header;