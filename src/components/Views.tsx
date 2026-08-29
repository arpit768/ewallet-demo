import { motion } from 'motion/react';
import { RECENT_TRANSACTIONS } from '../data';
import { Icons } from './Icons';
import { LogOut, ChevronRight, Gift, Tag, User, Shield, HelpCircle, CreditCard, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

export function StatementsView({ onAction }: { onAction: (action: string) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredTransactions = RECENT_TRANSACTIONS.filter((tx) =>
    tx.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.date.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-6 px-5 pb-32">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Account Statements</h2>
      
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search history..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors dark:text-white"
        />
      </div>

      <div className="space-y-3">
        {filteredTransactions.map((tx, index) => {
          const Icon = Icons[tx.icon as keyof typeof Icons];
          const isCredit = tx.type === 'credit';
          return (
            <motion.div key={tx.id} onClick={() => onAction('transaction_' + tx.id)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="flex items-center justify-between bg-white dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isCredit ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-500/10 text-red-500 dark:text-red-400'}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">{tx.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{tx.date}</p>
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
        })}
      </div>
    </div>
  );
}

export function OffersView({ onAction }: { onAction: (action: string) => void }) {
  const offers = [
    { id: 1, title: '10% Cashback on NTC Topup', desc: 'Use code NTC10 on your next recharge.', color: 'bg-blue-500 dark:bg-blue-600' },
    { id: 2, title: 'Free Movie Tickets', desc: 'Buy 1 Get 1 Free on QFX Cinemas.', color: 'bg-purple-500 dark:bg-purple-600' },
    { id: 3, title: 'Rs. 500 Bonus', desc: 'Link your primary bank account today.', color: 'bg-emerald-500 dark:bg-emerald-600' }
  ];

  return (
    <div className="pt-6 px-5 pb-32">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Latest Offers</h2>
      <div className="space-y-4">
        {offers.map((offer, i) => (
          <motion.div key={offer.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className={`${offer.color} rounded-3xl p-6 text-white shadow-lg relative overflow-hidden`}>
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
            <Tag className="w-8 h-8 mb-4 opacity-80" />
            <h3 className="text-lg font-bold mb-1">{offer.title}</h3>
            <p className="text-white/80 text-sm font-medium">{offer.desc}</p>
            <button onClick={() => onAction('claim_offer')} className="mt-5 bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-xl text-xs font-bold backdrop-blur-sm cursor-pointer">Claim Offer</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ProfileView({ onAction }: { onAction: (action: string) => void }) {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  const toggleDarkMode = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const menuItems = [
    { icon: User, label: 'Personal Information' },
    { icon: CreditCard, label: 'Linked Accounts' },
    { icon: Shield, label: 'Security Settings' },
    { icon: HelpCircle, label: 'Help & Support' },
  ];

  return (
    <div className="pt-6 px-5 pb-32">
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-1 mb-4 border-2 border-emerald-200 dark:border-emerald-800">
          <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=d1fae5" alt="Profile" className="w-full h-full rounded-full object-cover" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Arpit Jung</h2>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">98XXXXXXXX • KYC Verified</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden mb-6 transition-colors p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300">
            {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </div>
          <span className="font-semibold text-sm text-gray-800 dark:text-white">Dark Mode</span>
        </div>
        <button onClick={toggleDarkMode} className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer ${isDark ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
          <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${isDark ? 'translate-x-6' : 'translate-x-0'}`}></div>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden mb-6 transition-colors">
        {menuItems.map((item, i) => (
          <div key={i} onClick={() => onAction(`profile_menu_${i}`)} className="flex items-center justify-between p-4 border-b border-gray-50 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300">
                <item.icon className="w-5 h-5" />
              </div>
              <span className="font-semibold text-sm text-gray-800 dark:text-white">{item.label}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          </div>
        ))}
      </div>

      <button onClick={() => onAction('logout')} className="w-full flex items-center justify-center gap-2 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 font-bold py-4 rounded-2xl hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors cursor-pointer">
        <LogOut className="w-5 h-5" />
        Sign Out
      </button>
    </div>
  );
}
