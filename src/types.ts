export type TransactionType = 'credit' | 'debit';

export interface Transaction {
  id: string;
  referenceId: string;
  title: string;
  date: string;
  time: string;
  amount: number;
  type: TransactionType;
  icon: string;
  status: 'success' | 'pending' | 'failed';
  fee: number;
  remarks?: string;
}

export interface ServiceItem {
  id: string;
  label: string;
  icon: string;
  color: string;
}
