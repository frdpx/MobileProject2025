import { initializeApp, getApps, getApp } from "firebase/app";
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDulWGV3hArlJVNnrMW9RJEwP1XJWe9I1A",
  authDomain: "expense-tracker-2025-dc096.firebaseapp.com",
  projectId: "expense-tracker-2025-dc096",
  storageBucket: "expense-tracker-2025-dc096.appspot.com",
  messagingSenderId: "971555531567",
  appId: "1:971555531567:web:f87c227223fb7942f3cfda",
};

//ใช้ getApps เพื่อป้องกัน re-initialize
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// initializeAuth ต้องอยู่หลังจาก initializeApp เสมอ
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
  console.log("Firebase Auth initialized with persistence");
} catch (e) {
  auth = getAuth(app); // fallback กรณีถูก init แล้ว
  console.log("⚠️ Firebase Auth already initialized, using existing one");
}

export const db = getFirestore(app);
export { auth, app };
