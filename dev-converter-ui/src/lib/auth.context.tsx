"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore, googleAuthProvider } from "./firebase";
import Loader from "@/src/components/common/Loader";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext<any>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState({ user: null, loading: true });
  const [loading, setLoading] = useState(true);

  function login() {
    return signInWithPopup(auth, googleAuthProvider);
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr: any) => {
      setUser({ user: usr, loading: false });
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ ...user, login, logout }}>
      {!user.loading ? (
        children
      ) : (
        <div className='flex justify-center mt-2'>
          <Loader color={"#ffffff"} loading={user?.loading} size={20} />
        </div>
      )}
    </AuthContext.Provider>
  );
}

export { useAuth, AuthProvider };
