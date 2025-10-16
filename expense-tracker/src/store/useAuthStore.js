// import { create } from "zustand";

// export const useAuthStore = create((set) => ({
//   user: null,
//   isLoggedIn: false,

//   login: (userData) =>
//     set({
//       user: userData,
//       isLoggedIn: true,
//     }),

//   logout: () =>
//     set({
//       user: null,
//       isLoggedIn: false,
//     }),

//   updateUser: (updates) =>
//     set((state) => ({
//       user: { ...state.user, ...updates },
//     })),
// }));

import { create } from "zustand";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUserProfile,
  forgotPassword as forgotPasswordAPI,
} from "../firebase/authService";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const useAuthStore = create((set, get) => ({
  user: null,
  isLoggedIn: false,
  loading: true,
  error: null,

  init: () => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      console.log("👀 Auth state changed:", fbUser ? fbUser.uid : "No user");

      if (fbUser) {
        const ref = doc(db, "users", fbUser.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          set({
            user: { uid: fbUser.uid, ...snap.data() },
            isLoggedIn: true,
            loading: false,
          });
        } else {
          // 🔴 ถ้าไม่มี document ก็ไม่ให้เข้า Home
          await auth.signOut();
          Alert.alert("Account Error", "Your account data was removed.");
          set({ user: null, isLoggedIn: false, loading: false });
        }
      } else {
        set({ user: null, isLoggedIn: false, loading: false });
      }
    });

    return unsubscribe;
  },

  register: async (data) => {
    set({ loading: true });
    try {
      const user = await registerUser(data);
      set({ user, isLoggedIn: true, loading: false });
    } catch (err) {
      console.error("Register failed:", err);
      set({
        user: null,
        isLoggedIn: false,
        error: err.message,
        loading: false,
      });
      throw err;
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const userData = await loginUser(email, password);
      set({ user: userData, isLoggedIn: true, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  logout: async () => {
    await logoutUser();
    set({ user: null, isLoggedIn: false });
  },

  updateUser: async (updates) => {
    const { user } = get();
    if (!user?.uid) {
      console.warn("⚠️ No user logged in");
      return;
    }

    try {
      await updateUserProfile(user.uid, updates);
      set({ user: { ...user, ...updates } });
      console.log("User updated successfully in Firestore + Zustand");
    } catch (err) {
      console.error(" Failed to update user:", err);
      throw err;
    }
  },

  forgotPassword: async (email) => {
    if (!email?.trim()) throw new Error("Please enter your email");
    await forgotPasswordAPI(email.trim());
  },
}));
