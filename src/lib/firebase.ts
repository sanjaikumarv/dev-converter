// firebase.ts

import { initializeApp, getApps, getApp } from "firebase/app";

// Auth
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firestore
import {
  getFirestore,
  collection,
  query,
  where,
  limit,
  getDocs,
  serverTimestamp,
  Timestamp,
  increment,
} from "firebase/firestore";

// Storage
import { getStorage } from "firebase/storage";

// 🔥 Config
const firebaseConfig = {
  apiKey: "AIzaSyC_loir-wm8o37HaHRQGiSbY9lqwl9Tfyk",
  authDomain: "dev-converter.firebaseapp.com",
  projectId: "dev-converter",
  storageBucket: "dev-converter.appspot.com",
  messagingSenderId: "412010837650",
  appId: "1:412010837650:web:8ddeda1ef1bec38077184b",
  measurementId: "G-ZN6SBXGWDP",
};

// ✅ Initialize app (prevents duplicate apps in Next.js)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// =======================
// 🔐 AUTH
// =======================
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

// =======================
// 📦 FIRESTORE
// =======================
export const firestore = getFirestore(app);

// helpers
export { serverTimestamp, Timestamp, increment };

export const fromMillis = Timestamp.fromMillis;

// =======================
// 🗂 STORAGE
// =======================
export const storage = getStorage(app);

// =======================
// 🧠 HELPER FUNCTIONS
// =======================

/**
 * Gets users/{uid} document with username
 */
export async function getUserWithUsername(username: string) {
  const usersRef = collection(firestore, "users");

  const q = query(usersRef, where("username", "==", username), limit(1));

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs[0] || null;
}

/**
 * Converts Firestore document to JSON
 */
export function postToJSON(doc: any) {
  const data = doc.data();

  return {
    ...data,
    createdAt: data?.createdAt?.toMillis?.() || 0,
    updatedAt: data?.updatedAt?.toMillis?.() || 0,
  };
}
