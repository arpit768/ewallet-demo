import { useState } from 'react';
import { Home as HomeIcon, History, QrCode, TicketPercent, User } from 'lucide-react';
import { Header, BalanceCard, Services, Transactions } from './components/Home';
import { StatementsView, OffersView, ProfileView } from './components/Views';
import { ActionModal } from './components/Modals';

function BottomNav({ currentTab, setCurrentTab, onAction }: { currentTab: string, setCurrentTab: (tab: string) => void, onAction: (action: string) => void }) {
  return (
    <div className="absolute bottom-0 w-full bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-6 pt-3 pb-safe z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.02)] transition-colors">
      <div className="flex justify-between items-center relative mb-2">
        <NavItem onClick={() => setCurrentTab('home')} icon={<HomeIcon />} label="Home" active={currentTab === 'home'} />
        <NavItem onClick={() => setCurrentTab('statements')} icon={<History />} label="Statements" active={currentTab === 'statements'} />
        
        {/* Floating Scan Button */}
        <div className="relative -top-7">
          <button onClick={() => onAction('scan')} className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-500 hover:scale-105 active:scale-95 transition-all outline-none border-[4px] border-white ring-1 ring-gray-100 cursor-pointer">
            <QrCode className="w-6 h-6" />
          </button>
        </div>

        <NavItem onClick={() => setCurrentTab('offers')} icon={<TicketPercent />} label="Offers" active={currentTab === 'offers'} />
        <NavItem onClick={() => setCurrentTab('profile')} icon={<User />} label="Profile" active={currentTab === 'profile'} />
      </div>
    </div>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1.5 ${active ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'} transition-colors cursor-pointer`}>
      <div className={`[&>svg]:w-5 [&>svg]:h-5 ${active ? '[&>svg]:fill-emerald-100 dark:[&>svg]:fill-emerald-900/50' : ''}`}>
        {icon}
      </div>
      <span className={`text-[10px] font-semibold ${active ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'}`}>{label}</span>
    </button>
  );
}

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleAction = (action: string) => {
    setActiveModal(action);
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'statements': return <StatementsView onAction={handleAction} />;
      case 'offers': return <OffersView onAction={handleAction} />;
      case 'profile': return <ProfileView onAction={handleAction} />;
      case 'home':
      default:
        return (
          <>
            <BalanceCard onAction={handleAction} />
            <Services onAction={handleAction} />
            <div className="mx-5 my-6 h-px bg-gray-100 dark:bg-gray-800" />
            <Transactions onAction={handleAction} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex items-center justify-center p-0 md:p-6 font-sans transition-colors duration-300">
      <div className="w-full max-w-[420px] h-[100dvh] md:h-[850px] bg-white dark:bg-gray-900 md:rounded-[2.5rem] md:shadow-2xl overflow-hidden relative flex flex-col md:border-[8px] border-gray-800 dark:border-gray-700 transition-colors duration-300">
        {currentTab === 'home' && <Header onAction={handleAction} />}
        
        {/* Main Scrollable Content */}
        <main className="flex-1 overflow-y-auto pb-28 hide-scrollbar bg-white dark:bg-gray-900 transition-colors duration-300">
          {renderContent()}
        </main>
        
        <BottomNav currentTab={currentTab} setCurrentTab={setCurrentTab} onAction={handleAction} />
        <ActionModal isOpen={!!activeModal} onClose={() => setActiveModal(null)} actionType={activeModal} />
      </div>
    </div>
  );
}
