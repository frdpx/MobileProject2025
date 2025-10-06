import { db } from "./config";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

const TRANSACTIONS = "transactions";

//add
export const addTransactionToDB = async (userId, transaction) => {
  const docRef = await addDoc(collection(db, TRANSACTIONS), {
    ...transaction,
    userId,
    createdAt: new Date().toISOString(),
  });
  console.log("Firestore added transaction id:", docRef.id);
  return docRef.id;
};

//update
export const updateTransactionInDB = async (id, updatedData) => {
  const ref = doc(db, TRANSACTIONS, id);
  await updateDoc(ref, {
    ...updatedData,
    updatedAt: new Date().toISOString(),
  });
};

//delete
export const deleteTransactionFromDB = async (id) => {
  const ref = doc(db, TRANSACTIONS, id);
  await deleteDoc(ref);
};

//listener
export const listenToUserTransactions = (userId, onChange) => {
  const q = query(collection(db, TRANSACTIONS), where("userId", "==", userId));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    onChange(data);
  });
  return unsubscribe;
};
