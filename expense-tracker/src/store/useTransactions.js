import { create } from "zustand";
import { transactions } from "../mock/transactionHistory";

export const useTransactionStore = create((set) => ({
  transactions: transactions,

  // โหลด mock data หรือดึงจาก DB
  setTransactions: (transactions) => set({ transactions }),

  // เพิ่ม
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [
        ...state.transactions,
        {
          id: Date.now(),
          ...transaction,
          amount: Number(transaction.amount) || 0,
        },
      ],
    })),

  // แก้ไข
  updateTransaction: (id, updated) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, ...updated } : t
      ),
    })),

  // ลบ
  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),
}));
