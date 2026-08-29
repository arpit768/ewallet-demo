import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Loader2, ScanLine } from 'lucide-react';
import { useState, useEffect } from 'react';
import { RECENT_TRANSACTIONS } from '../data';
import { Icons } from './Icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionType: string | null;
}

export function ActionModal({ isOpen, onClose, actionType }: ModalProps) {
  const [step, setStep] = useState<'input' | 'processing' | 'success'>('input');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStep('input');
      setAmount('');
    }
  }, [isOpen]);

  if (!isOpen || !actionType) return null;

  const handleProceed = () => {
    setStep('processing');
    setTimeout(() => setStep('success'), 1500);
  };

  const renderContent = () => {
    if (step === 'processing') {
      return (
        <div className="flex flex-col items-center justify-center py-10">
          <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
          <p className="text-gray-600 font-medium">Processing request...</p>
        </div>
      );
    }

    if (step === 'success') {
      return (
        <div className="flex flex-col items-center justify-center py-10">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
          </motion.div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Success!</h3>
          <p className="text-gray-500 dark:text-gray-400 text-center text-sm mb-6">Your {actionType.replace(/_/g, ' ').replace('service ', '')} request has been completed.</p>
          <button onClick={onClose} className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition-colors">
            Done
          </button>
        </div>
      );
    }

    if (actionType === 'scan') {
      return (
        <div className="flex flex-col items-center py-6">
          <div className="relative w-64 h-64 bg-gray-900 rounded-2xl overflow-hidden flex items-center justify-center border-4 border-gray-800 mb-6 shadow-inner">
            <div className="absolute inset-0 bg-black/40"></div>
            <ScanLine className="w-16 h-16 text-emerald-400/50" />
            <div className="absolute top-0 w-full h-1 bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
          </div>
          <p className="text-sm font-medium text-gray-600 text-center">Point your camera at a QR code to pay instantly.</p>
        </div>
      );
    }

    if (actionType.startsWith('transaction_')) {
      const txId = actionType.replace('transaction_', '');
      const tx = RECENT_TRANSACTIONS.find(t => t.id === txId);
      if (!tx) return null;

      const isCredit = tx.type === 'credit';
      const Icon = Icons[tx.icon as keyof typeof Icons];

      return (
        <div className="py-2">
          <div className="flex flex-col items-center mb-8">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${isCredit ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400'}`}>
              <Icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{tx.title}</h3>
            <p className={`text-3xl font-bold ${isCredit ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white'}`}>
              {isCredit ? '+' : '-'} Rs. {tx.amount.toLocaleString()}
            </p>
            <div className="mt-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
              {tx.status}
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-5 space-y-4 border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Reference ID</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">{tx.referenceId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">{tx.date}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Time</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">{tx.time}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Fee</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">Rs. {tx.fee.toFixed(2)}</span>
            </div>
            {tx.remarks && (
              <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Remarks</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white text-right break-words max-w-[60%]">{tx.remarks}</span>
              </div>
            )}
          </div>
          
          <div className="mt-8 grid grid-cols-2 gap-4">
            <button className="w-full py-3.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors rounded-xl font-bold text-sm text-gray-700 dark:text-gray-300">
              Share Receipt
            </button>
            <button className="w-full py-3.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors rounded-xl font-bold text-sm text-gray-700 dark:text-gray-300">
              Report Issue
            </button>
          </div>
        </div>
      );
    }

    const title = actionType.replace('service_', 'Pay ').replace(/_/g, ' ');

    return (
      <div className="py-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 capitalize">{title}</h3>
        
        <div className="space-y-4">
          {actionType.includes('money') || actionType.includes('transfer') || actionType.includes('service') ? (
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase">Receiver / Account</label>
              <input type="text" placeholder="Enter ID or Mobile Number" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow dark:text-white" />
            </div>
          ) : null}
          
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase">Amount (Rs.)</label>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00" 
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow font-bold text-lg dark:text-white" 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase">Remarks (Optional)</label>
            <input type="text" placeholder="What is this for?" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow dark:text-white" />
          </div>
        </div>

        <button 
          onClick={handleProceed}
          disabled={!amount && actionType !== 'profile_menu' && actionType !== 'notifications' && actionType !== 'search' && actionType !== 'view_all_services'}
          className="w-full bg-emerald-600 text-white font-bold py-3.5 rounded-xl mt-8 hover:bg-emerald-700 active:bg-emerald-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Proceed
        </button>
      </div>
    );
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-50 flex items-end md:items-center justify-center bg-gray-900/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div 
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full h-[85vh] md:h-auto md:w-[400px] bg-white dark:bg-gray-900 rounded-t-3xl md:rounded-3xl p-6 relative overflow-y-auto hide-scrollbar flex flex-col shadow-2xl transition-colors"
          onClick={e => e.stopPropagation()}
        >
          <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full mx-auto mb-6 md:hidden"></div>
          <button onClick={onClose} className="absolute top-5 right-5 p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors z-10">
            <X className="w-5 h-5" />
          </button>
          
          {renderContent()}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
