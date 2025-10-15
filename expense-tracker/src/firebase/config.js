import { initializeApp, getApps, getApp } from "firebase/app";
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage"; // ✅ ต้องแบบนี้
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// ใช้ getApps เพื่อป้องกัน re-initialize
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// initializeAuth ต้องอยู่หลังจาก initializeApp เสมอ
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage), // ✅ ใช้ตัวนี้
  });
  console.log("✅ Firebase Auth initialized with persistence");
} catch (e) {
  auth = getAuth(app);
  console.log("⚠️ Firebase Auth already initialized, using existing one");
}

export const db = getFirestore(app);
export { auth, app };
