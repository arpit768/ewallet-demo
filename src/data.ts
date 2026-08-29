import { Transaction, ServiceItem } from './types';

export const DUMMY_BALANCE = 12450.75;

export const RECENT_TRANSACTIONS: Transaction[] = [
  { id: 't1', referenceId: 'TXN-9827391823', title: 'NTC Prepaid Topup', date: '29 Aug 2026', time: '10:45 AM', amount: 500, type: 'debit', icon: 'smartphone', status: 'success', fee: 0, remarks: '9841234567' },
  { id: 't2', referenceId: 'BTR-8472910384', title: 'Load Fund - Nabil Bank', date: '28 Aug 2026', time: '02:15 PM', amount: 5000, type: 'credit', icon: 'download', status: 'success', fee: 0, remarks: 'Salary transfer' },
  { id: 't3', referenceId: 'WIF-3928475923', title: 'Worldlink Internet', date: '25 Aug 2026', time: '09:00 AM', amount: 1550, type: 'debit', icon: 'wifi', status: 'success', fee: 0, remarks: 'arpit_home_wifi' },
  { id: 't4', referenceId: 'P2P-7483920192', title: 'Received from Ram', date: '22 Aug 2026', time: '06:30 PM', amount: 2000, type: 'credit', icon: 'arrow-down-left', status: 'success', fee: 0, remarks: 'Dinner split' },
  { id: 't5', referenceId: 'MER-8493029384', title: 'QFX Cinemas (Civil Mall)', date: '20 Aug 2026', time: '04:00 PM', amount: 800, type: 'debit', icon: 'receipt', status: 'success', fee: 10, remarks: 'Deadpool & Wolverine - 2 Tickets' },
  { id: 't6', referenceId: 'NEA-2938475630', title: 'NEA Bill Payment', date: '18 Aug 2026', time: '11:20 AM', amount: 1240, type: 'debit', icon: 'zap', status: 'success', fee: 5, remarks: 'Customer SC: 012.34.567' }
];

export const UTILITY_SERVICES: ServiceItem[] = [
  { id: 's1', label: 'Topup', icon: 'smartphone', color: 'bg-emerald-100 text-emerald-600' },
  { id: 's2', label: 'Electricity', icon: 'zap', color: 'bg-yellow-100 text-yellow-600' },
  { id: 's3', label: 'Internet', icon: 'wifi', color: 'bg-blue-100 text-blue-600' },
  { id: 's4', label: 'TV', icon: 'monitor-play', color: 'bg-purple-100 text-purple-600' },
  { id: 's5', label: 'Water', icon: 'droplet', color: 'bg-cyan-100 text-cyan-600' },
  { id: 's6', label: 'Airlines', icon: 'plane', color: 'bg-sky-100 text-sky-600' },
  { id: 's7', label: 'Education', icon: 'graduation-cap', color: 'bg-orange-100 text-orange-600' },
  { id: 's8', label: 'Insurance', icon: 'shield-alert', color: 'bg-indigo-100 text-indigo-600' },
];
