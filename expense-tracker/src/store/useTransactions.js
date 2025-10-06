import { create } from "zustand";
import {
  addTransactionToDB,
  updateTransactionInDB,
  deleteTransactionFromDB,
  listenToUserTransactions,
} from "../firebase/firestoreService";

export const useTransactionStore = create((set, get) => ({
  transactions: [],
  loading: false,
  error: null,
  unsubscribe: null,

  //realtime
  listenTransactions: (userId) => {
    const { unsubscribe } = get();
    if (unsubscribe) unsubscribe(); //close old listener

    set({ loading: true });
    const unsub = listenToUserTransactions(userId, (data) => {
      set({ transactions: data, loading: false });
    });

    set({ unsubscribe: unsub });
  },

  addTransaction: async (userId, transaction) => {
    try {
      const id = await addTransactionToDB(userId, transaction);
      console.log("Added transaction with Firestore ID:", id);
      return id;
    } catch (err) {
      console.error("Add Error:", err);
      set({ error: err.message });
    }
  },

  updateTransaction: async (id, updatedData) => {
    try {
      await updateTransactionInDB(id, updatedData);
    } catch (err) {
      console.error("Update Error:", err);
      set({ error: err.message });
    }
  },

  deleteTransaction: async (id) => {
    try {
      await deleteTransactionFromDB(id);
    } catch (err) {
      console.error("Delete Error:", err);
      set({ error: err.message });
    }
  },
}));
