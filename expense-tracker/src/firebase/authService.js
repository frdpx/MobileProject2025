// src/firebase/authService.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "./config";

const USERS = "users";

export const registerUser = async ({
  email,
  password,
  mobile,
  dateOfBirth,
  firstName,
  lastName,
}) => {
  try {
    console.log("Registering user...");

    // Create account
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    console.log("Firebase Auth created:", user.uid);

    //  Add Firestore document
    await setDoc(doc(db, USERS, user.uid), {
      email,
      mobile,
      dateOfBirth,
      firstName,
      lastName,
      createdAt: serverTimestamp(),
    });

    console.log("Firestore document created successfully!");
    return user;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Login
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // ดึงข้อมูลโปรไฟล์จาก Firestore
    const userDoc = await getDoc(doc(db, USERS, user.uid));
    const userData = userDoc.exists() ? userDoc.data() : {};

    console.log("Login successful:", user.uid);
    return { uid: user.uid, ...userData };
  } catch (error) {
    console.error("Login failed:", error.message);
    throw error;
  }
};

//Logout
export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Logout failed:", error.message);
    throw error;
  }
};

export const forgotPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent!");
  } catch (error) {
    console.error("Failed to send reset email:", error.message);
    throw error;
  }
};

export const updateUserProfile = async (uid, updates) => {
  try {
    const ref = doc(db, USERS, uid);
    await updateDoc(ref, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
    console.log("User profile updated!");
  } catch (error) {
    console.error("Error updating user profile:", error.message);
    throw error;
  }
};
