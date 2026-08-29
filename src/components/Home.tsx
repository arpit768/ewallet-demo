import { useState } from 'react';
import { Wallet, Send, Download, Building2, Bell, QrCode, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { Icons } from './Icons';
import { DUMMY_BALANCE, RECENT_TRANSACTIONS, UTILITY_SERVICES } from '../data';

export function Header({ onAction }: { onAction: (action: string) => void }) {
  return (
    <header className="px-5 pt-6 pb-4 bg-white dark:bg-gray-900 sticky top-0 z-10 flex justify-between items-center transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg overflow-hidden border border-emerald-200 dark:border-emerald-800">
          <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=d1fae5" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Good Morning,</p>
          <h1 className="text-sm font-bold text-gray-900 dark:text-white">Arpit Jung</h1>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => onAction('search')} className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative cursor-pointer">
          <Search className="w-5 h-5" />
        </button>
        <button onClick={() => onAction('notifications')} className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative cursor-pointer">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
        </button>
      </div>
    </header>
  );
}

export function BalanceCard({ onAction }: { onAction: (action: string) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-emerald-600 text-white mx-4 mt-2 p-5 rounded-3xl shadow-xl shadow-emerald-600/20 relative overflow-hidden"
    >
      {/* Decorative background circle */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 pointer-events-none"></div>
      
      <div className="flex justify-between items-center mb-6 relative z-10">
        <div>
          <p className="text-emerald-50 text-sm font-medium mb-1 opacity-90">Total Balance</p>
          <h2 className="text-3xl font-bold tracking-tight">Rs. {DUMMY_BALANCE.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h2>
        </div>
        <button onClick={() => onAction('scan')} className="bg-emerald-500 hover:bg-emerald-400 transition-colors p-3 rounded-full shadow-sm cursor-pointer" aria-label="Scan QR">
          <QrCode className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 relative z-10">
        <ActionButton onClick={() => onAction('load_fund')} icon={<Download className="w-5 h-5" />} label="Load Fund" />
        <ActionButton onClick={() => onAction('send_money')} icon={<Send className="w-5 h-5" />} label="Send Money" />
        <ActionButton onClick={() => onAction('bank_transfer')} icon={<Building2 className="w-5 h-5" />} label="Bank Transfer" />
      </div>
    </motion.div>
  );
}

function ActionButton({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center justify-center py-2.5 px-2 rounded-2xl hover:bg-emerald-500/50 transition-colors active:bg-emerald-700 cursor-pointer">
      <div className="mb-2.5 p-3 bg-emerald-500 rounded-2xl shadow-sm">
        {icon}
      </div>
      <span className="text-[11px] font-medium text-emerald-50">{label}</span>
    </button>
  );
}

export function Services({ onAction }: { onAction: (action: string) => void }) {
  return (
    <div className="mt-8 px-5">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-gray-900 dark:text-white font-bold text-lg">Payments</h3>
        <button onClick={() => onAction('view_all_services')} className="text-emerald-600 dark:text-emerald-400 text-sm font-medium hover:underline cursor-pointer">View All</button>
      </div>
      <div className="grid grid-cols-4 gap-y-6 gap-x-2">
        {UTILITY_SERVICES.map((service, index) => {
          const Icon = Icons[service.icon as keyof typeof Icons];
          return (
            <motion.button 
              key={service.id} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onAction(`service_${service.label}`)}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-2.5 ${service.color} group-hover:scale-105 group-active:scale-95 transition-transform duration-200 shadow-sm`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">{service.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export function Transactions({ onAction }: { onAction: (action: string) => void }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = RECENT_TRANSACTIONS.filter((tx) =>
    tx.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.date.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-8 px-5 pb-6">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-gray-900 dark:text-white font-bold text-lg">Recent Transactions</h3>
        <button className="text-emerald-600 dark:text-emerald-400 text-sm font-medium hover:underline">History</button>
      </div>

      <div className="relative mb-5">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search merchants or dates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full pl-10 pr-4 py-3 border border-gray-100 dark:border-gray-800 rounded-2xl leading-5 bg-gray-50 dark:bg-gray-800/50 placeholder-gray-400 focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-colors dark:text-white"
        />
      </div>

      <div className="space-y-3">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((tx, index) => {
            const Icon = Icons[tx.icon as keyof typeof Icons];
            const isCredit = tx.type === 'credit';
            
            return (
              <motion.div 
                key={tx.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + (index * 0.05) }}
                onClick={() => onAction('transaction_' + tx.id)}
                className="flex items-center justify-between bg-white dark:bg-gray-800/50 p-3.5 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer border border-gray-100 dark:border-gray-800 shadow-sm"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${isCredit ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-500/10 text-red-500 dark:text-red-400'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">{tx.title}</h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium mt-0.5">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${isCredit ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white'}`}>
                    {isCredit ? '+' : '-'} Rs. {tx.amount.toLocaleString()}
                  </p>
                  <p className="text-[10px] font-semibold text-gray-400 mt-1 uppercase tracking-wider">{tx.status}</p>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <p className="text-sm text-gray-500 dark:text-gray-400">No transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
}
